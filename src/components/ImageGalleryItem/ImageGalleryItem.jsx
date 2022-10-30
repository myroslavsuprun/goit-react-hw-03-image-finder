import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styled components
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  static defaultProps = {
    previewImg: 'https://picsum.photos/id/2/1000/?blur=10',
  };

  handleClick = () => {
    const { previewImg, tags, onImgCardClick } = this.props;

    onImgCardClick({ alt: tags, img: previewImg });
  };

  render() {
    const { previewImg, tags } = this.props;

    return (
      <GalleryItem onClick={this.handleClick}>
        <GalleryImage loading="lazy" src={previewImg} alt={tags} />
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  previewImg: PropTypes.string,
  tags: PropTypes.string,
  onImgCardClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
