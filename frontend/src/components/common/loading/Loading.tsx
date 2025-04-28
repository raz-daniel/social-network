import './Loading.css'
import LoadingSource from '../../../assets/images/loading.png'


export default function Loading(): JSX.Element {
    return (
        <div className='Loading'>
            <img src={LoadingSource}/>
        </div>
    )
}