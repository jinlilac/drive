import styled, { css } from 'styled-components';
import { CSSProperties } from 'react';

type ImgProps = {
  full?: boolean;
  fit?: CSSProperties['objectFit'];
};

const Img = styled.img.attrs<ImgProps>((props) => ({ loading: 'lazy' }))`
  ${(props) =>
    props.full &&
    css`
      width: 100%;
    `};
  object-fit: ${(props) => props.fit ?? 'contain'};
`;
export default Img;
