import React, { Component } from 'react';

// Components
import SearchForm from 'components/SearchForm';

// Styled components
import { Header } from './SearchBar.styled';

class SearchBar extends Component {
  render() {
    const { onFormSubmit } = this.props;
    return (
      <Header>
        <SearchForm onFormSubmit={onFormSubmit} />
      </Header>
    );
  }
}

export default SearchBar;
