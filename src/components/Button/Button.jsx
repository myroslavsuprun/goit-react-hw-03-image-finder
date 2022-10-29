import React, { Component } from 'react';

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

export default Button;
