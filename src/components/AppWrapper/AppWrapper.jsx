import React, { Component } from 'react';

// Styled components
import { AppWrapperDiv } from './AppWrapper.styled';

class AppWrapper extends Component {
  render() {
    const { children } = this.props;

    return <AppWrapperDiv>{children}</AppWrapperDiv>;
  }
}

export default AppWrapper;
