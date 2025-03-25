import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { ReactNode } from 'react';
import styled from 'styled-components';

type AlertProps = {
  type: 'cancel' | 'confirm';
  isOpen: boolean;
  children: ReactNode;
  cancelLabel?: string;
  confirmLabel: string;
  onClose?: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
};

const AlertOverlay = styled.div`
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 239px;
`;
const AlertWrap = styled(Container.FlexCol)`
  width: 100%;
  max-width: 482px;
  background-color: white;
  padding: 24px 42px;
  align-items: center;
  border-radius: 8px;
`;

const AlertButtons = styled(Container.FlexRow)`
  height: 100%;
  width: 100%;
  align-items: center;
`;

export const BasicAlert = (props: AlertProps) => {
  const { type, isOpen, children, cancelLabel, confirmLabel, onClose, onConfirm, onCancel, ...others } = props;
  if (!isOpen) return null;
  return (
    <AlertOverlay onClick={onClose}>
      <AlertWrap gap="24" onClick={(e) => e.stopPropagation()}>
        <Container.FlexCol alignItems="center" gap="12">
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
          <Button.Fill style={{ padding: '15px' }}>
            <Typography.B1 onClick={onConfirm} fontWeight="semiBold">
              {confirmLabel}
            </Typography.B1>
          </Button.Fill>
        )}
      </AlertWrap>
    </AlertOverlay>
  );
};
