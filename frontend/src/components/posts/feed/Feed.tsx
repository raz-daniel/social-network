import './Feed.css'
import Post from '../post/Post'
import useTitle from '../../../hooks/useTitle'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init, setNewContent } from '../../../redux/feedSlice'
import { useEffect, useRef } from 'react'
import Loading from '../../common/loading/Loading'
import useService from '../../../hooks/useService'
import FeedService from '../../../services/auth-aware/Feed'
import { Toast } from 'primereact/toast'

export default function Feed(): JSX.Element {

    const posts = useAppSelector(state => state.feed.posts)
    const isLoading = useAppSelector(state => state.feed.isLoading)
    const toast = useRef<Toast | null>(null)

    const dispatch = useAppDispatch()
    const feed = useService(FeedService)
    useEffect(() => {
        (async () => {
            try {
                if (posts.length === 0) {
                    const postsFromServer = await feed.getFeed()
                    dispatch(init(postsFromServer))
                }
            } catch {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Failed to Load Posts from Feed`,
                    life: 3000
                })
            }
        })()
    }, [])


    useTitle('SN - Feed')

    

    async function reload() {
        try {
            const postsFromServer = await feed.getFeed()
            dispatch(init(postsFromServer))

        } catch (error) {
            alert(error)
        }

    }
    function dismiss() {
        dispatch(setNewContent(false))
    }

    const isNewContent = useAppSelector(state => state.feed.isNewContent)

    return (
        <div className='Feed'>
            {isLoading && <Loading />}

            {!isLoading && posts.length === 0 && <p>Your Feed is Empty</p>}

            {posts.length > 0 && <>

                {isNewContent && <>
                    <div className='info'>You have new content in your feed. reload? <button onClick={reload}>yes</button> <button onClick={dismiss}>No</button></div>
                </>}

                {posts.map(p => <Post
                    key={p.id}
                    post={p}
                    isAllowActions={false}
                />
                )}
            </>}


        </div>
    )
}