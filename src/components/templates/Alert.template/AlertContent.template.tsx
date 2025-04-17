import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import { ICON } from '@/constants/icon';
import Typography from '@/components/atoms/Typography';
import { ReactNode } from 'react';

type AlertTempProps = {
  type?: keyof typeof ICON;
  title: string;
  content: string;
  subContent?: string;
  customContent?: ReactNode;
};

function AlertTemplate(props: AlertTempProps) {
  const { type, title, content, subContent } = props;

  return (
    <Container.FlexCol gap="12" alignItems="center" style={{ marginBottom: '12px' }}>
      <Img style={{ width: '53px' }} src={ICON[type || 'confirm']} />
      <Typography.T2 fontWeight="bold" color="gray_100">
        {title}
      </Typography.T2>
      <Container.FlexCol gap="4" alignItems="center">
        <Typography.B1 fontWeight="medium" color="gray_70">
          {content}
        </Typography.B1>
        <Typography.B1 fontWeight="medium" color="gray_70">
          {subContent}
        </Typography.B1>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}

export default AlertTemplate;
