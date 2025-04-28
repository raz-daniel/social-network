import { useNavigate } from 'react-router-dom'
import PostModel from '../../../models/post/Post'
import './Post.css'
import Comments from '../comments/Comments'
import { useAppDispatch } from '../../../redux/hooks'
import { remove, setNewPost } from '../../../redux/profileSlice'
import useService from '../../../hooks/useService'
import ProfileService from '../../../services/auth-aware/Profile'
import { useRef } from 'react'
import { Toast } from 'primereact/toast'

interface PostProps {
    post: PostModel
    isAllowActions?: boolean
    isNew?: boolean
}

export default function Post(props: PostProps): JSX.Element {

    const { title, body, createdAt, id, comments, imageUrl } = props.post
    const { name } = props.post.user
    const { isNew } = props

    const toast = useRef<Toast | null>(null)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const profile = useService(ProfileService)

    async function deleteMe() {
        if (confirm(`Are you sure you want to delete "${title}"`)) {
            try {
                await profile.remove(id)
                dispatch(remove({ id }))
            } catch {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Failed to Delete the Post`,
                    life: 3000
                })
            }
        }
    }

    function editMe() {
        navigate(`/edit/${id}`)
    }

    function dismiss() {
        dispatch(setNewPost(false))
    }

    return (
        <div className={`Post ${isNew ? 'growth' : ''}`}
            onAnimationEnd={dismiss}
        >
            <div className='firstPart'>
                <div>
                    {title}
                </div>
                <div className='info'>
                    {name} at {createdAt}
                </div>
                {imageUrl && <div>
                    <img src={`${import.meta.env.VITE_AWS_SERVER_URL}/${imageUrl}`} />
                </div>}
                <div>
                    {body}
                </div>
            </div>

            {props.isAllowActions && <>
                <div>

                    <button onClick={deleteMe}>Delete</button>
                    <button onClick={editMe}>Edit</button>
                    <span>Total Comments: {comments.length}</span>
                </div>
            </>}

            <Comments
                comments={comments}
                postId={id}
            />
            <hr />
        </div>
    )
}