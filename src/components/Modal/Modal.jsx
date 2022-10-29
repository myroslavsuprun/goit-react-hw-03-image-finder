import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

// Styled components
import { Overlay, ModalWrapper } from './Modal.styled';

class Modal extends Component {
  static defaultProps = {
    img: '',
    alt: '',
  };

  componentDidMount() {
    document.body.style.overflowY = 'hidden';
    window.addEventListener('keydown', this.onWindowKeypress);
  }

  componentWillUnmount() {
    document.body.style.overflowY = 'unset';
    window.removeEventListener('keydown', this.onWindowKeypress);
  }

  handleClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onModalClose();
    }
  };

  onWindowKeypress = e => {
    const pressedKey = e.code;
    if (pressedKey === `Escape`) {
      this.props.onModalClose();
    }
  };

  render() {
    const { img, alt } = this.props;

    const modalLayout = (
      <Overlay onClick={this.handleClick}>
        <ModalWrapper>
          <img src={img} alt={alt} />
        </ModalWrapper>
      </Overlay>
    );

    const modalRoot = document.getElementById('modal-root');

    return createPortal(modalLayout, modalRoot);
  }
}

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
