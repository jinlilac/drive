import styled from 'styled-components';
import Container from '@/components/atoms/Container';
import useToastStore from '@/stores/useToastStore';
import Button from '@/components/atoms/Button';
import Img from '@/components/atoms/Img';
import { ICON } from '@/constants/icon';
import Typography from '@/components/atoms/Typography';
import useWorkStack from '@/stores/useWorkStack';

const ToastContainer = styled(Container.FlexRow)<{
  isActive: boolean;
  isCenter: boolean;
  bottomLocation: number;
}>`
  z-index: 9999;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${(props) => props.theme.Colors.gray_10};
  padding: 16px;
  position: fixed;
  bottom: ${(props) => props.bottomLocation}px;
  max-width: 810px;
  left: 316px;
  right: 16px;
  visibility: ${(props) => (props.isActive ? 'visible' : 'hidden')};
  transform: translateY(${(props) => (props.isActive ? '0' : '200%')});
  transition: transform 0.5s ease;
  justify-content: ${(props) => (props.isCenter ? 'center' : 'space-between')};
`;
const CancelButton = ({ onClick }: { onClick: () => void }) => (
  <Button.Ghost onClick={onClick}>
    <Typography.B2 color="gray_50">실행취소</Typography.B2>
  </Button.Ghost>
);
export default function Toast({ ...others }) {
  const { active, text, center, bottomLocation, button, resetToast } = useToastStore();
  const { undoLastJob } = useWorkStack();
  return (
    <ToastContainer isActive={active} isCenter={!!center} bottomLocation={bottomLocation ?? 16} {...others}>
      <Container.FlexRow gap="16">
        <pre>{text}</pre>
        {button && <CancelButton onClick={undoLastJob} />}
      </Container.FlexRow>
      <Button.Ghost onClick={resetToast}>
        <Img src={ICON['all-clear']} />
      </Button.Ghost>
    </ToastContainer>
  );
}
