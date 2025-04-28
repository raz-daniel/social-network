import FollowersList from '../../follow/followers-list/FollowersList'
import './Followers.css'

export default function Followers(): JSX.Element {

    return (
        <div className='Followers'>
            <h3>Followers</h3>
            <FollowersList />
        </div>
    )
}