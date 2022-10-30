import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import ImageGalleryItem from 'components/ImageGalleryItem';

// Styled components
import { GalleryList } from './ImageGallery.styled';

class ImageGallery extends Component {
  render() {
    const { data } = this.props;
    return (
      <GalleryList>
        {data.map(image => {
          const { id, largeImageURL, tags } = image;
          return (
            <ImageGalleryItem
              onImgCardClick={this.props.onImgCardClick}
              key={id}
              previewImg={largeImageURL}
              tags={tags}
            />
          );
        })}
      </GalleryList>
    );
  }
}

// ImageGallery.propTypes = {

//   onImgCardClick: PropTypes.func.isRequired,
// };

export default ImageGallery;