import Img from '@/components/atoms/Img';
import { ICON } from '@/constants/icon';
import styled, { keyframes } from 'styled-components';

const mulShdSpin = keyframes`
100% {
  transform: rotate(180deg);
}

`;

const Loader = styled(Img)<{ size?: number }>`
  animation: ${mulShdSpin} 1s infinite linear;
  transform-origin: 50% 50%;
  width: ${({ size = 10 }) => `${size}px`};
  height: ${({ size = 10 }) => `${size}px`};
`;

const UploadingBox = ({ size }: { size?: number }) => {
  return <Loader size={size} src={ICON.uploading} />;
};
export default UploadingBox;
