// Alert.tsx
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import useOverlayStore from '@/stores/useOverlayStore';
import { ReactNode } from 'react';
import styled, { CSSProperties } from 'styled-components';

type AlertProps = {
  type: 'cancel' | 'confirm';
  children: ReactNode;
  cancelLabel?: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel?: () => void;
  style?: CSSProperties;
};

const AlertWrap = styled(Container.FlexCol)`
  position: absolute;
  background-color: white;
  border-radius: 8px;
  z-index: 1000;
  width: 100%;
  max-width: 482px;
  padding: 24px 42px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const AlertButtons = styled(Container.FlexRow)`
  max-height: 46px;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const Alert = (props: AlertProps) => {
  const { type, children, cancelLabel, confirmLabel, onConfirm, onCancel, style } = props;
  const { isOpen } = useOverlayStore();
  if (!isOpen) return null;
  return (
    <AlertWrap gap="24" onClick={(e) => e.stopPropagation()}>
      <Container.FlexCol gap="12" style={{ alignItems: 'center', ...style }}>
        {children}
      </Container.FlexCol>
      {type === 'cancel' ? (
        <AlertButtons gap="16">
          <Button.Stroke onClick={onCancel} style={{ padding: '15px' }}>
            <Typography.B1 fontWeight="semiBold">{cancelLabel}</Typography.B1>
          </Button.Stroke>
          <Button.Fill onClick={onConfirm} style={{ padding: '15px' }}>
            <Typography.B1 fontWeight="semiBold">{confirmLabel}</Typography.B1>
          </Button.Fill>
        </AlertButtons>
      ) : (
        <Button.Fill onClick={onConfirm} style={{ padding: '15px' }}>
          <Typography.B1 fontWeight="semiBold">{confirmLabel}</Typography.B1>
        </Button.Fill>
      )}
    </AlertWrap>
  );
};

export default Alert;
