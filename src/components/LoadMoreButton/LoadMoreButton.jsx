import React, { Component } from 'react';

// Components
import Button from 'components/Button';
import Loader from 'components/Loader';

class LoadMoreButton extends Component {
  static defaultProps = {
    status: 'hidden',
  };

  componentDidUpdate() {
    if (this.props.status === 'pending') return;

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  render() {
    const { onClick, status } = this.props;

    if (status === 'hidden') return;

    if (status === 'pending') {
      return <Loader positionType="centered" ifLargeSize={false} />;
    }

    if (status === 'shown') {
      return <Button onClick={onClick} title={'Load More'} />;
    }
  }
}

export default LoadMoreButton;
