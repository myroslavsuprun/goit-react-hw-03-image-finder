import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PixabayAPI from 'js/Components/PixabayAPI';

// Components
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import ErrorMessage from 'components/ErrorMessage';
import LoadMoreButton from 'components/LoadMoreButton';

// Toastify notification component
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Styled components
import { GalleryList } from './ImageGallery.styled';

class ImageGallery extends Component {
  static defaultProps = {
    searchQuery: '',
  };

  state = {
    ifModalOpen: false,
    status: 'idle',
    loadMoreStatus: 'hidden',
    data: [],
    rejectMessage: '',
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({
        status: 'pending',
      });

      try {
        const data = await PixabayAPI.getImages(this.props.searchQuery);
        const loadMoreStatus = this.createLoadMoreStatus();

        this.setState(
          {
            data,
            loadMoreStatus,
            status: 'resolved',
          },
          this.showMessageDependingOnDataLength
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
      loadMoreStatus: 'pending',
    });
    try {
      const incomingData = await PixabayAPI.getImages();
      const loadMoreStatus = this.createLoadMoreStatus();

      this.setState(prevState => ({
        data: [...prevState.data, ...incomingData],
        loadMoreStatus,
      }));
    } catch (e) {
      this.setState({
        rejectMessage: e.message,
        status: 'rejected',
      });
    }
  };

  showMessageDependingOnDataLength = () => {
    if (this.state.data.length <= 0) {
      toast.warning('Woops, nothing was found.');
    } else {
      toast('Here are your results');
    }
  };

  createLoadMoreStatus = () =>
    PixabayAPI.ifMoreImagesPossible ? 'shown' : 'hidden';

  render() {
    const { status, data, rejectMessage, loadMoreStatus } = this.state;
    const { onImgCardClick } = this.props;

    const DataMapCallback = image => {
      const { id, largeImageURL, tags } = image;
      return (
        <ImageGalleryItem
          onImgCardClick={onImgCardClick}
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
      return <Loader positionType="absolute" ifLargeSize={true} />;
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
          <LoadMoreButton
            status={loadMoreStatus}
            onClick={this.onLoadMoreClick}
          />
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onImgCardClick: PropTypes.func.isRequired,
};

export default ImageGallery;
