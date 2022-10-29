import React, { Component } from 'react';

import PixabayAPI from 'js/Components/PixabayAPI';

// Components
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import ErrorMessage from 'components/ErrorMessage';

// Toastify notification component
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Styled components
import { GalleryList } from './ImageGallery.styled';
import Button from 'components/Button';

class ImageGallery extends Component {
  static defaultProps = {
    searchQuery: '',
  };

  state = {
    ifLoadMorePossible: false,
    ifModalOpen: false,
    status: 'idle',
    data: [],
    rejectMessage: '',
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({
        status: 'pending',
      });

      try {
        this.setState(
          {
            data: await PixabayAPI.getImages(this.props.searchQuery),
            status: 'resolved',
            ifLoadMorePossible: PixabayAPI.ifMoreImagesPossible,
          },
          this.checkDataLength
        );
      } catch (e) {
        this.setState({
          rejectMessage: e.message,
          status: 'rejected',
        });
      }
    }
  }

  onLoadMoreClick = async () => {
    this.setState({
      status: 'pending',
    });

    try {
      const incomingData = await PixabayAPI.getImages();

      this.setState(prevState => ({
        data: [...prevState.data, ...incomingData],
        status: 'resolved',
        ifLoadMorePossible: PixabayAPI.ifMoreImagesPossible,
      }));
    } catch (e) {
      this.setState({
        rejectMessage: e.message,
        status: 'rejected',
      });
    }
  };

  checkDataLength = () => {
    if (this.state.data.length <= 0) {
      toast.warning('Woops, nothing was found.');
    } else {
      toast('Here are your results');
    }
  };

  render() {
    const { status, data, rejectMessage, ifLoadMorePossible } = this.state;

    const DataMapCallback = image => {
      const { id, largeImageURL, tags } = image;
      return (
        <ImageGalleryItem
          onImgCardClick={this.props.onImgCardClick}
          key={id}
          previewImg={largeImageURL}
          tags={tags}
        />
      );
    };

    if (status === 'idle') {
      return;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return (
        <ErrorMessage title={rejectMessage || 'Something went wrong... '} />
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <GalleryList>{data.map(DataMapCallback)}</GalleryList>
          {ifLoadMorePossible && (
            <Button onClick={this.onLoadMoreClick} title={'Load More'} />
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
