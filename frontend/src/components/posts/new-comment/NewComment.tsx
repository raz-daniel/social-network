import { useForm } from 'react-hook-form'
import './NewComment.css'
import CommentDraft from '../../../models/comment/CommentDraft'
import LoadingButton from '../../common/loadingButton/LoadingButton'
import { useAppDispatch } from '../../../redux/hooks'
import { addComment as addCommentProfile } from '../../../redux/profileSlice'
import { addComment as addCommentFeed } from '../../../redux/feedSlice'
import useService from '../../../hooks/useService'
import CommentsService from '../../../services/auth-aware/Comments'
import { useRef } from 'react'
import { Toast } from 'primereact/toast'

interface NewCommentProps {
    postId: string
}

export default function NewComment(props: NewCommentProps): JSX.Element {

    const { postId } = props
    const { register, handleSubmit, formState, reset } = useForm<CommentDraft>()
    const toast = useRef<Toast | null>(null)
    const dispatch = useAppDispatch()
    const comments = useService(CommentsService)
async function submit(draft: CommentDraft) {
    try {
        const newComment = await comments.create(postId, draft)
        reset()
        dispatch(addCommentProfile(newComment))
        dispatch(addCommentFeed(newComment))
    } catch {
        toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to Create a Comment`,
            life: 3000
        })
    }
}

    return (
        <div className='NewComment'>
            <form onSubmit={handleSubmit(submit)}>
                <textarea placeholder='Enter comments...' {...register('body', {
                    required: {
                        value: true,
                        message: 'Comment body is mandatory'
                    }, minLength: {
                        value: 20,
                        message: 'Comment must be at least 20 chars long'
                    }
                })}></textarea>
                <span>{formState.errors.body?.message}</span>
                <LoadingButton 
                    isSubmitting={formState.isSubmitting}
                    buttonText='Post Comment'
                    loadingText='Posting Comment'
                />
            </form>
        </div>
    )
}