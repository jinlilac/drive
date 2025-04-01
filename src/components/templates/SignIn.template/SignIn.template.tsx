import Button from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import LabelWithInput from '@/components/molecles/LabelWithInput';
import { ICON } from '@/constants/icon';
import { useSignInEmail } from '@/hooks/useSignIn';
import { EmailAuth, SignInEmailType } from '@/types/signin.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SignInWrap = styled(Container.FlexCol)`
  min-width: 480px;
  height: 100%;
  justify-content: center;
  gap: 56px;
`;
const SaveId = styled(Button.Ghost)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default function SignInTemplate() {
  // visible password
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

  const onClickPasswordVisible = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;

    if (id === 'password') {
      setPasswordVisible((prev) => !prev);
    } else if (id === 'confirmPassword') {
      setConfirmPasswordVisible((prev) => !prev);
    }
  };
  // signin form
  const methods = useForm<SignInEmailType>({
    resolver: zodResolver(EmailAuth),
    mode: 'onChange',
    defaultValues: {
      email: localStorage.getItem('savedEmail') || '',
      saveId: !!localStorage.getItem('savedEmail'),
    },
  });
  const { signInEmail, isPending } = useSignInEmail();
  // 저장된 이메일이 있으면 폼에 설정
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      methods.setValue('email', savedEmail);
      methods.setValue('saveId', true);
    }
  }, [methods]);
  // onSubmitForm
  const onSubmitSignIn = async (data: SignInEmailType) => {
    signInEmail(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          if (data.saveId) {
            localStorage.setItem('savedEmail', data.email);
          } else {
            localStorage.removeItem('savedEmail');
          }
        },
        onError: (error) => {
          if (error) {
            methods.setError('email', { message: '이메일 또는 비밀번호가 틀립니다.' });
            methods.setError('password', { message: '이메일 또는 비밀번호가 틀립니다.' });
          }
        },
      },
    );
  };
  const onErrorSignIn = (error: FieldErrors<SignInEmailType>) => {
    if (error.email?.ref?.value === '' && error.password?.ref?.value === '') {
      methods.setError('email', { message: '이메일을 입력해주세요.' });
      methods.setError('password', { message: '비밀번호를 입력해주세요.' });
    }
  };

  // sign-in oauth
  const onClickKakao = () => {
    const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  const onClickGoogle = () => {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  const onClickNaver = () => {
    const CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;
  };

  return (
    <SignInWrap>
      <Container.FlexCol gap="17">
        <Typography.H1 fontWeight="bold" color="gray_200">
          로그인
        </Typography.H1>
        <Container.FlexRow alignItems="center" justifyContent="space-between">
          <Typography.T2 fontWeight="medium" color="gray_70">
            위브에 처음 오셨나요?
          </Typography.T2>
          <Link to={'/sign/up'}>
            <Typography.T3 fontWeight="medium" color="blue">
              회원가입
            </Typography.T3>
          </Link>
        </Container.FlexRow>
      </Container.FlexCol>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitSignIn, onErrorSignIn)}>
          <LabelWithInput
            type="text"
            name="email"
            label="이메일주소"
            placeholder="이메일을 입력해주세요."
            containerStyle={{ marginBottom: '36px' }}
          />
          <LabelWithInput
            label="비밀번호"
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요"
            icon={
              <Button.Ghost id="password" type="button" onClick={onClickPasswordVisible}>
                <Img src={ICON[passwordVisible ? 'eye-on' : 'eye-off']} />
              </Button.Ghost>
            }
          />
          <Container.FlexRow style={{ marginTop: '36px' }} alignItems="center" justifyContent="space-between">
            <SaveId>
              <CheckBox
                option="square"
                checked={methods.watch('saveId')}
                onChange={(e) => methods.setValue('saveId', e.target.checked)}
              />
              <Typography.B2 fontWeight="medium" color="gray_90">
                아이디 저장
              </Typography.B2>
            </SaveId>
            <Link to={'/test'}>
              <Typography.B2 fontWeight="regular" color="gray_70">
                비밀번호를 잊으셨나요?
              </Typography.B2>
            </Link>
          </Container.FlexRow>
          <Button.Fill type="submit" style={{ maxHeight: '54px', marginTop: '56px' }}>
            로그인
          </Button.Fill>
        </form>
      </FormProvider>
      <Container.FlexCol alignItems="center" gap="16">
        <Divider.Row size="medium" style={{ maxWidth: '65px', marginBottom: '32px' }} />
        <Typography.B1 fontWeight="medium" color="gray_70">
          SNS 계정으로 로그인/회원가입
        </Typography.B1>
        <Container.FlexRow gap="24" alignItems="center" justifyContent="center">
          <Button.Ghost onClick={onClickGoogle}>
            <Img src={ICON['google-logo']} />
          </Button.Ghost>
          <Button.Ghost onClick={onClickKakao}>
            <Img src={ICON['kakao-logo']} />
          </Button.Ghost>
          <Button.Ghost onClick={onClickNaver}>
            <Img src={ICON['naver-logo']} />
          </Button.Ghost>
        </Container.FlexRow>
      </Container.FlexCol>
    </SignInWrap>
  );
}
