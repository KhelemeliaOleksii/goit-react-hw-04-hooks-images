import PropTypes from 'prop-types'

import styles from './ImageGallery.module.css'

import ImageGalleryItem from '../ImageGalleryItem'

const ImageGallery = ({ gallaryList, showPoster }) => {
    return (
        <div className={styles.ImageGallery}>
            {gallaryList.map(({ id, webformatURL, tags }) =>
                <ImageGalleryItem
                    key={id}
                    previewImageURL={webformatURL}
                    description={tags}
                    onClick={() => showPoster(id)}
                />)}
        </div>
    )
}

export default ImageGallery

ImageGallery.propTypes = {
    gallaryList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired
}