import React, { Component } from 'react';

// Components
import AppWrapper from './AppWrapper';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Modal from 'components/Modal';

// Don't forget PROPS TYPE!!
class App extends Component {
  state = {
    ifModalOpen: false,
    ifLoadMorePossible: true,
    modalImg: '',
    modalAlt: '',
    searchQuery: '',
  };

  onFormSubmit = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
    });
  };

  onImgCardClick = ({ img, alt }) => {
    this.setState(() => {
      return {
        ifModalOpen: true,
        modalAlt: alt,
        modalImg: img,
      };
    });
  };

  onModalClose = () => {
    this.setState(() => {
      return { ifModalOpen: false };
    });
  };

  render() {
    const { searchQuery, ifModalOpen, modalImg, modalAlt } = this.state;
    return (
      <AppWrapper>
        <SearchBar onFormSubmit={this.onFormSubmit} />
        <ImageGallery
          onImgCardClick={this.onImgCardClick}
          searchQuery={searchQuery}
        />
        {ifModalOpen && (
          <Modal
            onModalClose={this.onModalClose}
            alt={modalAlt}
            img={modalImg}
          />
        )}
      </AppWrapper>
    );
  }
}

export default App;
