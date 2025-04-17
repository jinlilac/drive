/* eslint-disable react/display-name */
import styled, { keyframes } from 'styled-components';
import { forwardRef } from 'react';

import Container from '@/components/atoms/Container';

const LoaderKeyFrame = keyframes`
    0%,
    80%,
    100% {
      box-shadow: 0 14px 0 -1.3em;
    }
    40% {
      box-shadow: 0 14px 0 0;
    }
  `;

const LoaderContainer = styled(Container.FlexRow)`
  grid-column-start: 1;
  grid-column-end: 7;
  width: 100%;
  margin-bottom: 32px;
  justify-content: center;
`;
const Loader = styled.span`
  &,
  &:before,
  &:after {
    border-radius: 50%;
    width: 14px;
    height: 14px;
    animation-fill-mode: both;
    animation: ${LoaderKeyFrame} 1.6s infinite ease-in-out;
  }
  & {
    color: ${(props) => props.theme.Colors.gray_50};
    font-size: 7px;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.14s;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
  }
  &:before {
    left: -3.5em;
    animation-delay: -0.28s;
  }
  &:after {
    left: 3.5em;
  }
`;

const LoaderBox = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <LoaderContainer ref={ref}>
      <Loader />
    </LoaderContainer>
  );
});
export default LoaderBox;
