import React, { Component } from 'react';

// Styled components
import { Form, FormButton, FormInput } from './SearchFrom.styled';

// Icons
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

class SearchForm extends Component {
  state = {
    searchQuery: '',
    inputValue: '',
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const searchQuery = e.target.elements.search.value;

    if (searchQuery === this.state.searchQuery)
      return toast.warning('Try something new');

    this.setState({
      searchQuery,
    });
    this.props.onFormSubmit(searchQuery);
    this.resetForm();
  };

  handleChange = e => {
    const currentValue = e.target.value;

    this.setState({
      inputValue: currentValue,
    });
  };

  resetForm = () => {
    this.setState({
      inputValue: '',
    });
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleFormSubmit}>
          <FormButton type="submit" aria-label="Search">
            <BsSearch size="22" />
          </FormButton>
          <FormInput
            type="text"
            onChange={this.handleChange}
            value={this.state.inputValue}
            autocomplete="off"
            name="search"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </>
    );
  }
}

export default SearchForm;
