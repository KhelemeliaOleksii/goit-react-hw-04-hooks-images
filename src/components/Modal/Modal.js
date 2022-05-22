import { useEffect } from "react";
import PropTypes from 'prop-types'
import styles from './Modal.module.css'


const Modal = ({ onClose, url, description }) => {
    useEffect(() => {
        const onEscapeClick = (event) => {
            if (event.code === "Escape") {
                onClose();
            }
        }
        window.addEventListener('keydown', onEscapeClick);
        return (() => {
            window.removeEventListener('keydown', onEscapeClick);
        });
    }, [onClose])
    const onOverlayClick = ({ target, currentTarget }) => {
        if (target === currentTarget) {
            onClose();
        }
    }
    return (
        <div className={styles.Overlay} onClick={onOverlayClick}>
            <div className={styles.Modal}>
                <img src={url} alt={description} />
            </div>
        </div>
    )
}
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

// export default class Modal extends Component {
//     static propTypes = {
//         onClose: PropTypes.func.isRequired,
//         url: PropTypes.string.isRequired,
//         description: PropTypes.string.isRequired,
//     }
//     componentDidMount() {
//         window.addEventListener('keydown', this.onEscapeClick)
//     }
//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.onEscapeClick);
//     }
//     onEscapeClick = (event) => {
//         if (event.code === "Escape") {
//             this.props.onClose();
//         }
//     }
//     onOverlayClick = ({ target, currentTarget }) => {
//         if (target === currentTarget) {
//             this.props.onClose();
//         }
//     }
//     render() {
//         const { url, description } = this.props;
//         return (
//             <div className={styles.Overlay} onClick={this.onOverlayClick}>
//                 <div className={styles.Modal}>
//                     <img src={url} alt={description} />
//                 </div>
//             </div>
//         )
//     }
// }

export default Modal;