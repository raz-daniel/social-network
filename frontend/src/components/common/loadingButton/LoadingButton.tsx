import './LoadingButton.css'
import loadingPhoto from '../../../assets/images/loading.png'
interface LoadingButtonProps {
    isSubmitting: boolean
    buttonText: string
    loadingText: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function LoadingButton(props: LoadingButtonProps):JSX.Element {

    const { isSubmitting, buttonText, loadingText, onClick} = props

    return (
        <div className='LoadingButton'>
            {!isSubmitting && <button onClick={onClick}>{buttonText}</button>}
            {isSubmitting && <p>{loadingText}<i><img src={loadingPhoto} /></i></p>}
        </div>
    )
}