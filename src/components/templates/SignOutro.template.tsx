import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import { ICON } from '@/constants/icon';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect } from 'react';
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

  // 소셜 회원가입 성공 시 3초 후 자동 이동
  useEffect(() => {
    if (user?.social !== 0) {
      const timer = setTimeout(() => {
        navigate('/workspace');
      }, 3000);

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [user, navigate]);

  const onClickButton = () => {
    navigate('/sign/in');
  };

  return (
    <SignOutroWrap gap="32">
      <Img src={ICON.confirm} style={{ width: '120px' }} />
      <Container.FlexCol gap="17" alignItems="center">
        <Container.FlexRow
          justifyContent="center"
          gap="12"
          style={{ maxWidth: '320px', whiteSpace: 'pre-wrap', flexWrap: 'wrap' }}
        >
          <Typography.H2 fontWeight="semiBold" color="gray_200">
            반갑습니다,
          </Typography.H2>
          <Typography.H2 style={{ whiteSpace: 'nowrap' }} fontWeight="semiBold" color="gray_200">
            {user?.name}님
          </Typography.H2>
        </Container.FlexRow>
        <Typography.H2 fontWeight="semiBold" color="gray_200">
          회원가입을 완료했어요
        </Typography.H2>
      </Container.FlexCol>
      {user?.social === 0 ? (
        <Button.Fill onClick={onClickButton} style={{ maxHeight: '52px', marginTop: '48px' }}>
          로그인 바로가기
        </Button.Fill>
      ) : null}
    </SignOutroWrap>
  );
}
