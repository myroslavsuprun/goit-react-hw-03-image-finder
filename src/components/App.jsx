import React, { Component } from 'react';

import PixabayAPI from 'js/Components/PixabayAPI';

// Components
import AppWrapper from './AppWrapper';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Modal from 'components/Modal';
import Loader from './Loader';
import Message from './Message';
import Button from './Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {
  static defaultProps = {
    searchQuery: '',
  };

  state = {
    status: 'idle',
    loadMoreStatus: 'hidden',
    searchQuery: '',
    data: [],
    rejectMessage: '',
    modalAlt: '',
    modalImg: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.loadMoreStatus !== prevState.loadMoreStatus) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({
        status: 'pending',
      });

      try {
        const data = await PixabayAPI.getImages(this.state.searchQuery);

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

  onFormSubmit = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
    });
  };

  onImgCardClick = ({ img: modalImg, alt: modalAlt }) => {
    this.setState(() => ({
      modalImg,
      modalAlt,
    }));
  };

  onModalClose = () => {
    this.setState(() => ({
      modalImg: '',
      modalAlt: '',
    }));
  };

  render() {
    const renderIfStatusIdle = () =>
      this.state.status === 'idle' && (
        <Message title="Start looking for images 🔎" />
      );

    const renderIfStatusPending = () =>
      this.state.status === 'pending' && (
        <Loader positionType={'absolute'} ifLargeSize={true} />
      );

    const renderIfStatusResolved = () =>
      this.state.status === 'resolved' && (
        <ImageGallery
          data={this.state.data}
          onImgCardClick={this.onImgCardClick}
        />
      );

    const renderIfStatusRejected = () =>
      this.state.status === 'rejected' && (
        <Message title={this.state.rejectMessage} />
      );

    const renderLoadMore = () => {
      if (this.state.loadMoreStatus === 'hidden') return;

      if (this.state.loadMoreStatus === 'pending')
        return <Loader positionType="centered" ifLargeSize={false} />;

      if (this.state.loadMoreStatus === 'shown')
        return <Button onClick={this.onLoadMoreClick} title="Load More" />;
    };

    return (
      <AppWrapper>
        <SearchBar onFormSubmit={this.onFormSubmit} />

        {renderIfStatusIdle()}
        {renderIfStatusPending()}
        {renderIfStatusResolved()}
        {renderIfStatusRejected()}
        {renderLoadMore()}

        {this.state.modalImg && (
          <Modal
            onModalClose={this.onModalClose}
            alt={this.state.modalAlt}
            img={this.state.modalImg}
          />
        )}

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AppWrapper>
    );
  }
}

export default App;
