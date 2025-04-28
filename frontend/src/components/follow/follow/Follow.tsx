import User from '../../../models/user/User'
import './Follow.css'
import userPhoto from '../../../assets/images/userPhoto.jpeg'
import LoadingButton from '../../common/loadingButton/LoadingButton'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { unfollow as unfollowNow, follow as followNow } from '../../../redux/followingSlice'
import followingService from '../../../services/auth-aware/Following'
import useService from '../../../hooks/useService'
import { setNewContent } from '../../../redux/feedSlice'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button';
import { useRef } from 'react'



interface FollowProps {
    user: User
}

export default function Follow(props: FollowProps): JSX.Element {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const { user: { name, id } } = props

    const toast = useRef<Toast | null>(null);

    const dispatch = useAppDispatch()
    const following = useService(followingService)
    const isFollowing = useAppSelector(state => state.following.following.findIndex(f => f.id === id) > -1)

    async function unFollow() {
        
            toast.current?.show({
                severity: 'info',
                summary: 'Conform Unfollow',
                detail: `are you sure you want to stop follow ${name}?`,
                sticky: true,
                content: (props) => (
                    <div className="flex flex-column align-items-center">
                        <p>{props.message.detail}</p>
                        <Button label="Unfollow!" onClick={async () => {
                            try {
                                setIsSubmitting(true)
                                await following.unFollow(id)
                                dispatch(unfollowNow({ userId: id }))
                                dispatch(setNewContent(true))
                            } catch {
                                toast.current?.show({
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: `Failed to unfollow ${name}`,
                                    life: 3000
                                })
                            } finally {
                                setIsSubmitting(false)
                                toast.current?.clear()
                            }
                        }} />
                    </div>
                )
            })
        
    }

    async function follow() {
        try {
            setIsSubmitting(true)
            await following.follow(id)
            dispatch(followNow(props.user))
            dispatch(setNewContent(true))
        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: `Failed to follow ${name}`,
                life: 3000
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='Follow'>
            <Toast ref={toast} />
            <div>
                <img src={userPhoto} />
            </div>
            <div>
                {name}
            </div>
            <div>
                {isFollowing && <LoadingButton
                    onClick={unFollow}
                    isSubmitting={isSubmitting}
                    buttonText='Unfollow'
                    loadingText='Unfollowing'
                />}
                {!isFollowing && <LoadingButton
                    onClick={follow}
                    isSubmitting={isSubmitting}
                    buttonText='follow'
                    loadingText='following'
                />}
            </div>
        </div>
    )
}