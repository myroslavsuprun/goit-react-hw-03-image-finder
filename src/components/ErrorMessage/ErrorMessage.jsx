import React, { Component } from 'react';

// Styled components
import { Title } from './ErrorMessage.styled';

class ErrorMessage extends Component {
  static defaultProps = {
    title: 'Something went wrong...',
  };

  render() {
    const { title } = this.props;

    return <Title>{title}</Title>;
  }
}

export default ErrorMessage;
