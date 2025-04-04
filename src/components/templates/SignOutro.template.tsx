import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import { ICON } from '@/constants/icon';
import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignOutroWrap = styled(Container.FlexCol)`
  min-width: 480px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export default function SignOutroTemplate() {
  const { user } = useAuthStore();

  const navigate = useNavigate();
  const onClickButton = () => {
    navigate('/sign/in');
  };
  return (
    <SignOutroWrap gap="32">
      <Img src={ICON.confirm} style={{ width: '120px' }} />
      <Container.FlexCol gap="17" alignItems="center">
        <Typography.H2 fontWeight="semiBold" color="gray_200">
          반갑습니다, {user?.name}님
        </Typography.H2>
        <Typography.H2 fontWeight="semiBold" color="gray_200">
          회원가입을 완료했어요
        </Typography.H2>
      </Container.FlexCol>
      <Button.Fill onClick={onClickButton} style={{ maxHeight: '52px', marginTop: '48px' }}>
        로그인 바로가기
      </Button.Fill>
    </SignOutroWrap>
  );
}
