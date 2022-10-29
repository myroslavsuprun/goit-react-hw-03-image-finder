import React, { Component } from 'react';

// Components
import { Bars } from 'react-loader-spinner';

// Styled components
import { LoaderWrapper } from './Loader.styled';

class Loader extends Component {
  render() {
    return (
      <LoaderWrapper>
        <Bars
          height="90"
          width="90"
          color="#3f51b5"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </LoaderWrapper>
    );
  }
}

export default Loader;
