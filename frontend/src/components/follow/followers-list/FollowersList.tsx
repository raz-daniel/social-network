import { useEffect, useRef, } from 'react'
import './FollowersList.css'
import Follow from '../follow/Follow'
import Loading from '../../common/loading/Loading'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/followersSlice'
import useService from '../../../hooks/useService'
import FollowersService from '../../../services/auth-aware/Followers'
import { Toast } from 'primereact/toast'


export default function FollowersList(): JSX.Element {

    const users = useAppSelector(state => state.followers.followers)
    const isLoading = useAppSelector(state => state.followers.isLoading)

    const toast = useRef<Toast | null>(null);

    const dispatch = useAppDispatch()
    const followers = useService(FollowersService)

    useEffect(() => {
        (async () => {
            try {
                const followersFromServer = await followers.getFollowers()
                dispatch(init(followersFromServer))
            } catch {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Failed to Load Followers List`,
                    life: 3000
                })
            }
        })()
    }, [dispatch])
    return (
        <div className="FollowersList">

            {isLoading && <Loading />}
            {!isLoading && users.length === 0 && <p>You have 0 Followers</p>}

            {users.length > 0 && <>

                {users.map(f => <Follow
                    key={f.id}
                    user={f}
                >
                </Follow>)}
            </>}
        </div>
    )
}