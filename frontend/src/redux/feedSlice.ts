import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Post from "../models/post/Post"
import Comment from "../models/comment/Comment"

interface FeedState {
    posts: Post[]
    isNewContent: boolean
    isLoading: boolean
}

const initialState: FeedState = {
    posts: [],
    isNewContent: false,
    isLoading: true
}

export const feedSlice = createSlice({
    name: 'Feed',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload
            state.isNewContent = false
            state.isLoading = false
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            state.posts.find(p => p.id === action.payload.postId)?.comments.push(action.payload)
        },
        setNewContent: (state, action: PayloadAction<boolean>) => {
            state.isNewContent = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
})

export const {init, addComment, setNewContent} = feedSlice.actions

export default feedSlice.reducer