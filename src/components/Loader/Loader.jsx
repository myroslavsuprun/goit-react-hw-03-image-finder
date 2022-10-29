import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { Bars } from 'react-loader-spinner';

// Styled components
import { LoaderWrapper } from './Loader.styled';

class Loader extends Component {
  static defaultProps = {
    positionType: 'absolute',
    ifLargeSize: true,
  };

  render() {
    const { positionType, ifLargeSize } = this.props;

    return (
      <LoaderWrapper positionType={positionType}>
        <Bars
          height={ifLargeSize ? '90' : '60'}
          width={ifLargeSize ? '90' : '60'}
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

Loader.propTypes = {
  positionType: PropTypes.string,
  ifLargeSize: PropTypes.bool,
};

export default Loader;
