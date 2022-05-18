import { Component } from "react";
import PropTypes from 'prop-types'
import styles from './Modal.module.css'

export default class Modal extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        url: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }
    componentDidMount() {
        window.addEventListener('keydown', this.onEscapeClick)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.onEscapeClick);
    }
    onEscapeClick = (event) => {
        if (event.code === "Escape") {
            this.props.onClose();
        }
    }
    onOverlayClick = ({ target, currentTarget }) => {
        if (target === currentTarget) {
            this.props.onClose();
        }
    }
    render() {
        const { url, description } = this.props;
        return (
            <div className={styles.Overlay} onClick={this.onOverlayClick}>
                <div className={styles.Modal}>
                    <img src={url} alt={description} />
                </div>
            </div>
        )
    }
}