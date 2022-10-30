import React, { Component } from 'react';

import PropTypes from 'prop-types';

// Styled components
import { Title } from './Message.styled';

class ErrorMessage extends Component {
  static defaultProps = {
    title: 'Something went wrong...',
  };

  render() {
    const { title } = this.props;

    return <Title>{title}</Title>;
  }
}

ErrorMessage.propTypes = {
  title: PropTypes.string,
};

export default ErrorMessage;
