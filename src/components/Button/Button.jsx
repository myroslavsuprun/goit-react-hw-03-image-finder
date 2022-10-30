import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styled components
import { StyledBtn } from './Button.styled';

class Button extends Component {
  render() {
    const { onClick, title } = this.props;
    return (
      <StyledBtn type="button" onClick={onClick}>
        {title}
      </StyledBtn>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
