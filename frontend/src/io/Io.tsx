import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAppDispatch } from "../redux/hooks";
import { addComment, newPost } from "../redux/profileSlice";
import Post from "../models/post/Post";
import { v4 } from "uuid";
import SocketMessages from "socket-enum-danielraz";
import Comment from "../models/comment/Comment";
import useUserId from "../hooks/useUserId";

interface SocketContextInterface {
    xClientId: string
}
export const SocketContext = createContext<SocketContextInterface>({
    xClientId: ''
})

export default function Io(props: PropsWithChildren): JSX.Element {

    const { children } = props
    const [xClientId] = useState<string>(v4())
    const value = { xClientId }
    const dispatch = useAppDispatch()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_IO_SERVER_URL)
        socket.onAny((eventName, payload) => {

            console.log(eventName, payload)

            if (payload.from !== xClientId) {

                switch (eventName) {

                    case SocketMessages.NEW_POST: {
                        const newPostPayload = payload.data as Post
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        if (newPostPayload.userId === useUserId()) {
                            dispatch(newPost(newPostPayload))
                        }
                        break;
                    }

                    case SocketMessages.NEW_COMMENT: {
                        const newCommentPayload = payload.data as Comment
                        dispatch(addComment(newCommentPayload))
                        break;
                    }

                }
            }
        })

        return () => {
            socket.disconnect()
        }

    }, [])
    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}