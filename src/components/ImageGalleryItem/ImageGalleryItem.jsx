import React, { Component } from 'react';

// Styled components
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  static defaultProps = {
    previewImg: '',
    tags: '',
  };

  handleClick = () => {
    const { previewImg, tags } = this.props;
    this.props.onImgCardClick({ alt: tags, img: previewImg });
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

export default ImageGalleryItem;
