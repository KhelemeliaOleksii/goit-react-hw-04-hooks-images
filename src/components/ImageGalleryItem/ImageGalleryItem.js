import PropTypes from "prop-types"

import styles from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ previewImageURL, description, onClick }) => {
    return (
        <div className={styles.ImageGalleryItem} onClick={onClick}>
            <img src={previewImageURL} alt={description} />
        </div>
    )
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    previewImageURL: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}