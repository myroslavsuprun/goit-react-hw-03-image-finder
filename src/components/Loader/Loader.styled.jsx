import styled from 'styled-components';
import { css } from 'styled-components';

export const LoaderWrapper = styled.div`
  ${props => {
    switch (props.positionType) {
      case 'absolute':
        return css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `;
      case 'centered':
        return css`
          margin: 0 auto;
        `;
      default:
        return;
    }
  }}
`;
