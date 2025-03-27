// Overlay.tsx

import useOverlayStore from '@/stores/useOverlayStore';
import { styled } from 'styled-components';

const OverlayBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  z-index: 100;
`;

const Overlay = () => {
  const { isOpen, closeOverlay } = useOverlayStore();

  if (!isOpen) return null;

  return <OverlayBackground onClick={closeOverlay} />;
};

export default Overlay;
