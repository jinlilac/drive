import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { Outlet } from 'react-router-dom';

export default function Notice() {
  return (
    <Container.FlexCol gap="45" style={{ paddingLeft: '16px', paddingTop: '50px' }}>
      <Typography.T1 fontWeight="semiBold" color="gray_100">
        공지사항
      </Typography.T1>
      <Outlet />
    </Container.FlexCol>
  );
}
