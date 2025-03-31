import WiiveLogo from '@/assets/wiive.svg?react';
import { keyframes, styled } from 'styled-components';

const firstAppearKeyframe = keyframes`
    0% {
        opacity: 0;
        transform: translateY(50%);
    }
    25% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;
const secondAppearKeyframe = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-50%);
    }
    25% {
        opacity: 0;
        transform: translateY(-50%);
    }
    50% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const moveAndRotateKeyframe = keyframes`
    0% {
        opacity: 0;
        transform: rotate(0deg) translateY(50%)
    }
    50% {
        opacity: 0;
        transform: rotate(0deg) translateY(50%)
    }
    75% {
        opacity: 1;
        transform: rotate(0) 
    }
    100% {
        opacity: 1;
        transform: rotate(18deg) 
    }
`;

const Loading = styled(WiiveLogo)`
  #first {
    opacity: 0;
    animation: ${firstAppearKeyframe} 2.5s infinite;
  }
  #second {
    opacity: 0;
    animation: ${secondAppearKeyframe} 2.5s infinite;
  }
  #third {
    opacity: 0;
    animation: ${moveAndRotateKeyframe} 2.5s infinite;
    transform-origin: 59px 48px;
  }
`;

export default Loading;
