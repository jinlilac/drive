import Overlay from '@/components/atoms/Overlay';
import Button from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import Accordion from '@/components/molecules/Accordion';
import Alert from '@/components/molecules/Alert';
import LabelWithInput, {
  InfoBoxComponent,
  LabelWithInputProps,
  TextInput,
} from '@/components/molecules/LabelWithInput';
import { AGREEMENT_OPTIONS } from '@/constants/agreements';
import { ICON } from '@/constants/icon';
import useOverlayStore from '@/stores/useOverlayStore';
import { ReactNode, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import AgreementAlertTemplate from '@/components/templates/Alert.template/AgreementAlert.template';
import { useEmailVerification } from '@/apis/EmailVerification';
import { SignUpPayload, SignUpType } from '@/types/signup.type';
import { zodResolver } from '@hookform/resolvers/zod';
import formatMilliseconds from '@/libs/parseMsToTimer';
import { useCheckVerificationEmail } from '@/apis/CheckVerificationEmail';
import { useSignUp } from '@/apis/SignUp';
import AlertTemplate from '@/components/templates/Alert.template/AlertContent.template';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/atoms/Loading';
import { usePasswordVisibility } from '@/hooks/usePasswordVisibility';

type LinkItem = {
  text: string;
  contents: string;
};
type AccordionContentProps = {
  id: string;
  isRequired: boolean;
  label: string;
  isChecked: boolean;
  link: LinkItem[];
  onClickAgreement: () => void;
  onClickLink: (secondIndex: number) => void;
};
const AgreementLink = styled(Button.Ghost)`
  font-size: ${(props) => props.theme.Font.fontSize.b3};
  font-weight: ${(props) => props.theme.Font.fontWeight.medium};
  color: ${(props) => props.theme.Colors.gray_70};
  display: flex;
  align-items: center;
  padding: 6px 28px;
  text-decoration: underline;
  text-underline-offset: 2px;
  gap: 2px;
`;

const CodeContainer = styled(Container.FlexRow)<{ isVisible: boolean; isExpanded: boolean }>`
  position: relative;
  gap: 4px;
  height: 84px;
  ${({ isVisible, isExpanded }) => css`
    opacity: ${isVisible ? '1' : '0'};
    max-height: ${isVisible ? (isExpanded ? '84px' : '48px') : '0'};
    visibility: ${isVisible ? 'visible' : 'hidden'};
    transform: ${isVisible ? 'translateY(0)' : 'translateY(-60%)'};
    margin-bottom: ${isVisible ? '24px' : '0'};
  `}
  transition: all 0.3s ease;
  overflow: hidden;
`;

const CodeTimer = styled(Typography.B1)`
  position: absolute;
  right: 16px;
  top: 16px;
`;

const CodeInfoBox = styled(InfoBoxComponent)`
  margin-bottom: 0;
`;

const AccordionContent = (props: AccordionContentProps) => {
  const { id, isRequired, link, label, isChecked, onClickLink, onClickAgreement } = props;
  return (
    <Container.FlexCol style={{ paddingBottom: '24px' }}>
      <Container.FlexRow style={{ cursor: 'pointer' }} alignItems="center" gap="4" onClick={() => onClickAgreement()}>
        <CheckBox option="circle" checked={isChecked} id={id} onClick={() => onClickAgreement()} />
        {isRequired ? (
          <Typography.B2 fontWeight="semiBold" color="purple">
            [필수]
          </Typography.B2>
        ) : (
          <Typography.B2 fontWeight="semiBold" color="gray_60">
            [선택]
          </Typography.B2>
        )}
        <Typography.B2 fontWeight="medium" color="gray_100">
          {label}
        </Typography.B2>
      </Container.FlexRow>
      {link.map((value, index) => (
        <AgreementLink key={value.text} onClick={() => onClickLink(index)}>
          {value.text}
          <Img src={ICON['chevron-right']} />
        </AgreementLink>
      ))}
    </Container.FlexCol>
  );
};

const SignUpWrap = styled(Container.FlexCol)`
  position: relative;
  height: 100%;
  min-width: 480px;
  justify-content: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;
const LoaderWrap = styled(Container.FlexCol)`
  position: absolute;
  border-radius: 8px;
  z-index: 999;
  width: 100%;
  align-items: center;
`;

const FormLabelWithInput = ({ isExpanded, ...others }: { isExpanded: boolean } & LabelWithInputProps) => (
  <LabelWithInput {...others} containerStyle={isExpanded ? { marginBottom: 0 } : { marginBottom: 12 }} />
);

export default function SignUpTemplate() {
  const { passwordVisible, confirmPasswordVisible, togglePasswordVisibility } = usePasswordVisibility();

  // 이메일 검증
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [codeTimer, setCodeTimer] = useState<number>(180_000); // 3분 -> 180_000ms
  const [isEmailVerificationRequested, setIsEmailVerificationRequested] = useState<boolean>(false);

  const [emailAuthCode, setEmailAuthCode] = useState<string>();
  const [emailAuthState, setEmailAuthState] = useState<string>('');

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const signUpForm = useForm<SignUpType>({ resolver: zodResolver(SignUpPayload), mode: 'onSubmit' });
  const { emailVerification, isVerifying } = useEmailVerification();
  const { checkVerificationEmail, isCheckVerificationEmail } = useCheckVerificationEmail();
  const { signUp, isSigning } = useSignUp();
  const password = signUpForm.watch('password');
  const confirmPassword = signUpForm.watch('confirmPassword');

  // Password, confirmPassword 검증
  useEffect(() => {
    if (passwordTouched && !confirmPasswordTouched) signUpForm.trigger(['password']);
    else if (confirmPasswordTouched && !passwordTouched) signUpForm.trigger(['confirmPassword']);
    else if (passwordTouched && confirmPasswordTouched) {
      signUpForm.trigger(['password', 'confirmPassword']).then((isValid) => {
        if (isValid && password === confirmPassword) setPasswordState('비밀번호가 일치합니다.');
        else {
          setPasswordState('');
          signUpForm.setError('confirmPassword', { message: '비밀번호가 일치하지 않습니다.' });
        }
      });
    }
  }, [password, confirmPassword, passwordTouched, confirmPasswordTouched, signUpForm.trigger]);

  // Confirm Alert
  const { openOverlay, closeOverlay } = useOverlayStore();
  const [alertContent, setAlertContent] = useState<ReactNode>(null);
  const [signAlert, setSignAlert] = useState<ReactNode>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();

  // 타이머 설정
  useEffect(() => {
    const timer = setInterval(() => {
      setCodeTimer((prevTime) => prevTime - 1000); // 1초마다 감소
    }, 1000);

    // 시간이 0 이하가 되면 타이머 종료
    if (codeTimer <= 0) {
      clearInterval(timer);
    }

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      clearInterval(timer);
    };
  }, [codeTimer]);
  const onRequestEmailVerification = () => {
    signUpForm.trigger('email').then((isValid) => {
      if (isValid) {
        openOverlay();
        setLoader(true);
        emailVerification(
          { email: signUpForm.getValues('email') },
          {
            onSuccess: () => {
              setCodeTimer(180_000);
              setIsEmailVerificationRequested(true);
              handleEmailAuthAlert();
              setLoader(false);
            },
            onError: (error) => {
              closeOverlay();
              if (error) signUpForm.setError('email', { message: error as unknown as string });
            },
          },
        );
      }
    });
  };

  const handleEmailAuthAlert = () => {
    openOverlay();
    setAlertContent(
      <AlertTemplate
        type="confirm"
        title="이메일 인증 번호를 발송하였습니다."
        content="입력하신 메일로 수신하신 번호를 확인 후"
        subContent="인증 번호를 입력하여 인증을 완료하세요."
      />,
    );
  };

  const handleSigninAlert = () => {
    openOverlay();
    setSignAlert(
      <AlertTemplate
        type="upload-failed"
        title="정말 나가시겠습니까?"
        content="현재까지 작성된 내용은 저장되지 않습니다."
      />,
    );
  };
  const handleCloseSignAlert = () => {
    closeOverlay();
    setSignAlert(null);
  };

  const handleCloseAlert = () => {
    closeOverlay();
    setAlertContent(null);
  };

  const onChangeAuthCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value.length <= 6) {
      setEmailAuthCode(value);
    }
    if (value.length === 6) {
      checkVerificationEmail(
        { email: signUpForm.getValues('email'), code: Number(value) },
        {
          onSuccess: () => {
            setIsEmailVerificationRequested(false);
            setEmailState('인증 완료되었습니다.');
          },
          onError: (error) => {
            setEmailAuthState(error as unknown as string);
          },
        },
      );
    }
  };

  const onClickAgreement = (index: number) => () => {
    if (index === 0) {
      if (signUpForm.watch('serviceAgreement')) signUpForm.setValue('serviceAgreement', false);
      else signUpForm.setValue('serviceAgreement', true);
    } else if (index === 1) {
      if (signUpForm.watch('userAgreement')) signUpForm.setValue('userAgreement', false);
      else signUpForm.setValue('userAgreement', true);
    }
  };

  const onClickAgreementDetail = (firstIndex: number) => (secondIndex: number) => {
    openOverlay();
    setAlertContent(<AgreementAlertTemplate firstIndex={firstIndex} secondIndex={secondIndex} />);
  };

  const [serviceAgreement, userAgreement] = signUpForm.watch(['serviceAgreement', 'userAgreement']);

  const onClickAgreementAll = () => {
    if (serviceAgreement && userAgreement) {
      signUpForm.setValue('serviceAgreement', false);
      signUpForm.setValue('userAgreement', false);
    } else {
      signUpForm.setValue('serviceAgreement', true);
      signUpForm.setValue('userAgreement', true);
    }
  };

  const onSubmitSignUp = (data: SignUpType) => {
    const { confirmPassword: _confirmPassword, ...others } = data;
    signUp(others);
  };

  const preventSignUp = isSigning || !userAgreement || !serviceAgreement;
  return (
    <SignUpWrap gap="32">
      <Container.FlexRow justifyContent={'space-between'}>
        <Typography.H1 fontWeight="bold" color="gray_200">
          회원가입
        </Typography.H1>
        <Button.Ghost onClick={handleSigninAlert} style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Typography.B1 fontWeight="medium" color="blue">
            로그인 바로가기
          </Typography.B1>
        </Button.Ghost>
      </Container.FlexRow>
      <FormProvider {...signUpForm}>
        <FormContainer onSubmit={signUpForm.handleSubmit(onSubmitSignUp)}>
          <FormLabelWithInput
            type="text"
            name="name"
            label="이름"
            placeholder="이름을 입력해주세요."
            isExpanded={!!signUpForm.getFieldState('name')?.error?.message}
          />
          <FormLabelWithInput
            containerStyle={{ marginBottom: 12 }}
            label="이메일"
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요."
            disabled={isVerifying}
            successMessage={emailState}
            isExpanded={
              !!emailState || !!signUpForm.getFieldState('email')?.error?.message || isEmailVerificationRequested
            }
            icon={
              <Button.Ghost onClick={onRequestEmailVerification} disabled={!!emailState}>
                <Typography.B1 fontWeight="medium" color="blue">
                  인증하기
                </Typography.B1>
              </Button.Ghost>
            }
            iconTop={46}
          />
          <CodeContainer isVisible={isEmailVerificationRequested} isExpanded={!!emailAuthState}>
            <Container.FlexCol style={{ position: 'relative', flex: 1 }}>
              <Container.Container>
                <TextInput
                  name={'code'}
                  placeholder={'인증코드 입력'}
                  onChange={onChangeAuthCode}
                  value={emailAuthCode}
                  disabled={isCheckVerificationEmail}
                  option={emailAuthState ? 'error' : 'default'}
                />
                <CodeTimer>{formatMilliseconds(codeTimer)}</CodeTimer>
              </Container.Container>
              <CodeInfoBox option={emailAuthState ? 'error' : 'default'} message={emailAuthState} />
            </Container.FlexCol>
            <Button.Fill
              style={{ width: 120, height: 48 }}
              onClick={onRequestEmailVerification}
              disabled={!!emailState}
            >
              재전송
            </Button.Fill>
          </CodeContainer>
          <FormLabelWithInput
            label="비밀번호"
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요"
            onBlur={() => {
              setPasswordTouched(true);
              signUpForm.trigger('password');
            }}
            isExpanded={!!signUpForm.getFieldState('password')?.error?.message}
            icon={
              <Button.Ghost id="password" type="button" onClick={() => togglePasswordVisibility('password')}>
                <Img src={ICON[passwordVisible ? 'eye-on' : 'eye-off']} />
              </Button.Ghost>
            }
          />
          <FormLabelWithInput
            label="비밀번호 확인"
            name="confirmPassword"
            type={confirmPasswordVisible ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요"
            successMessage={passwordState}
            isExpanded={!!passwordState || !!signUpForm.getFieldState('confirmPassword')?.error?.message}
            onBlur={() => {
              setConfirmPasswordTouched(true);
              signUpForm.trigger('confirmPassword');
            }}
            icon={
              <Button.Ghost
                id="confirmPassword"
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                <Img src={ICON[confirmPasswordVisible ? 'eye-on' : 'eye-off']} />
              </Button.Ghost>
            }
          />
          <Accordion
            title={
              <Container.FlexRow
                style={{ cursor: 'pointer' }}
                alignItems="center"
                gap="4"
                onClick={(event) => event.stopPropagation()}
              >
                <CheckBox
                  option="circle"
                  id="allChecked"
                  checked={serviceAgreement && userAgreement}
                  onClick={onClickAgreementAll}
                />
                <Typography.B1 fontWeight="semiBold" color="gray_100" onClick={onClickAgreementAll}>
                  전체 동의하기
                </Typography.B1>
              </Container.FlexRow>
            }
          >
            {AGREEMENT_OPTIONS.map((item, index) => (
              <AccordionContent
                key={item.id}
                id={item.id}
                label={item.label}
                isRequired={item.required}
                link={item.links}
                isChecked={item.id === 'service-terms' ? serviceAgreement : userAgreement}
                onClickAgreement={() => onClickAgreement(index)()}
                onClickLink={(secondIndex) => onClickAgreementDetail(index)(secondIndex)}
              />
            ))}
          </Accordion>
          <Button.Fill type="submit" disabled={preventSignUp} style={{ maxHeight: '54px', marginTop: '32px' }}>
            회원가입
          </Button.Fill>
        </FormContainer>
      </FormProvider>
      <Overlay />
      {alertContent && (
        <Alert type="confirm" confirmLabel="확인" onConfirm={handleCloseAlert}>
          {alertContent}
        </Alert>
      )}
      {signAlert && (
        <Alert
          type="cancel"
          confirmLabel="로그인 바로가기"
          cancelLabel="취소"
          onConfirm={() => {
            closeOverlay();
            navigate('/sign/in');
          }}
          onCancel={handleCloseSignAlert}
        >
          {signAlert}
        </Alert>
      )}
      {loader && (
        <LoaderWrap>
          <Loading />
        </LoaderWrap>
      )}
    </SignUpWrap>
  );
}
