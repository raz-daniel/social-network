import { useEffect, useRef, } from 'react'
import './FollowingList.css'
import Follow from '../follow/Follow'
import Loading from '../../common/loading/Loading'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/followingSlice'
import useService from '../../../hooks/useService'
import Following from '../../../services/auth-aware/Following'
import { Toast } from 'primereact/toast'



export default function FollowingList(): JSX.Element {
    
    const following = useAppSelector(state => state.following.following)
    const isLoading = useAppSelector(state => state.following.isLoading)
    const toast = useRef<Toast | null>(null)

    const dispatch = useAppDispatch()

    const followingService = useService(Following)

    useEffect(() => {

        (async () => {
            try {
                const following = await followingService.getFollowing()
                dispatch(init(following))
            } catch {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Failed to Load Following List`,
                    life: 3000
                })
            }
    })()
}, [ dispatch ])


return (
    <div className="FollowingList">

        {isLoading && <Loading />}
        {!isLoading && following.length === 0 && <p>You are not following anyone at the moment</p>}

        {following.length > 0 && <>

            {following.map(f => <Follow
                key={f.id}
                user={f}
            >
            </Follow>)}
        </>}
    </div>
)
}