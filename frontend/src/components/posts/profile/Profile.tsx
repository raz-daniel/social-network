import './Profile.css'
import { useEffect, useRef } from 'react'
import ProfileService from '../../../services/auth-aware/Profile'
import Post from '../post/Post'
import NewPost from '../new/NewPost'
import Loading from '../../common/loading/Loading'
import useTitle from '../../../hooks/useTitle'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/profileSlice'
import useService from '../../../hooks/useService'
import { Toast } from 'primereact/toast'


export default function Profile(): JSX.Element {

    const profile = useService(ProfileService)
    const isLoading = useAppSelector(state => state.profile.isLoading)
    const toast = useRef<Toast | null>(null)

    const isNewPost = useAppSelector(state => state.profile.isNewPost)
    const posts = useAppSelector(state => state.profile.posts)
    const dispatch = useAppDispatch()

    useTitle('SN - Profile')
    useEffect(() => {
        (async () => {
            try {
                if (posts.length === 0) {
                    const postsFromServer = await profile.getProfile()
                    dispatch(init(postsFromServer))
                }

            } catch {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Failed to Posts from Profile`,
                    life: 3000
                })
            }
        })()
    }, [])

    return (
        <div className='Profile'>

            {isLoading && <Loading />}

            {!isLoading && posts.length === 0 && <>
                <NewPost />
                <p>You didn't Post yet!</p>
            </>}

            {posts.length > 0 && <>
                <NewPost />
                {posts.map((p, index) => <Post
                    key={p.id}
                    post={p} 
                    isAllowActions={true}
                    isNew={index === 0 && isNewPost}
                />
                )}
            </>}
        </div>
    )
}