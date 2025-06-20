// Overlay.tsx

import useOverlayStore from '@/stores/useOverlayStore';
import { styled } from 'styled-components';

const OverlayBackground = styled.div<{ isActive?: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  pointer-events: ${(props) => (props.isActive ? 'auto' : 'none')};
  z-index: 100;
`;

const Overlay = ({ closeOnClick = true }: { closeOnClick?: boolean }) => {
  const { isOpen, closeOverlay } = useOverlayStore();

  if (!isOpen) return null;

  return <OverlayBackground isActive={isOpen} onClick={closeOnClick ? closeOverlay : undefined} />;
};

export default Overlay;
