import FollowingList from '../../follow/following-list/FollowingList'
import './Following.css'

export default function Following(): JSX.Element {

    return (
        <div className='Following'>
            <h3>Following</h3>
            <FollowingList />
        </div>
    )
}