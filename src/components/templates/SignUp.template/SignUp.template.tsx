import Button from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import Accordion from '@/components/molecles/Accordion';
import { BasicAlert } from '@/components/molecles/Alert';
import LabelWithInput from '@/components/molecles/LabelWithInput';
import { AGREEMENT_OPTIONS } from '@/constants/agreements';
import { ICON } from '@/constants/icon';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type LinkItem = {
  text: string;
  href: string;
};
type AccordionContentProps = {
  id: string;
  isRequired: boolean;
  label: string;
  link: LinkItem[];
};
const AgreementLink = styled(Link)`
  font-size: ${(props) => props.theme.Font.fontSize.b3};
  font-weight: ${(props) => props.theme.Font.fontWeight.regular};
  color: ${(props) => props.theme.Colors.gray_70};
  display: flex;
  align-items: center;
  padding: 6px 28px;
`;
const AccordionContent = (props: AccordionContentProps) => {
  const { id, isRequired, link, label } = props;
  return (
    <Container.FlexCol style={{ paddingBottom: '24px' }}>
      <Container.FlexRow alignItems="center" gap="4">
        <CheckBox option="circle" id={id} />
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
      {link.map((value) => (
        <AgreementLink key={value.text} to={`/agreement/${value.href}`}>
          {value.text}
          <Img src={ICON['chevron-right']} />
        </AgreementLink>
      ))}
    </Container.FlexCol>
  );
};

const SignUpWrap = styled(Container.FlexCol)`
  height: 100%;
  min-width: 480px;
  justify-content: center;
`;
export default function SignUpTemplate() {
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
  // Confirm Alert
  const [checked, setChecked] = useState<boolean>(false);
  console.log('checked', checked);

  // testForm
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const onSubmit = async (data: Record<string, unknown>) => {
    console.log(data);
    // 성공 상황 시뮬레이션
    if (data.email === 'test@example.com' && data.password === 'password123') {
      alert('인증 성공!');
      setEmailState('이메일 인증 성공');
      setPasswordState('암호 성공');
    } else {
      // 에러 상황 시뮬레이션
      methods.setError('email', { type: 'custom', message: '잘못된 이메일입니다.' });
      methods.setError('password', { type: 'custom', message: '잘못된 비밀번호입니다.' });
    }
  };
  return (
    <SignUpWrap gap="32">
      <Typography.H1 fontWeight="bold" color="gray_200">
        회원가입
      </Typography.H1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <LabelWithInput
            type="text"
            name="name"
            label="이름"
            placeholder="이름을 입력해주세요."
            successMessage={emailState}
          />
          <LabelWithInput
            label="이메일"
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요."
            successMessage={passwordState}
            icon={
              <Button.Ghost onClick={() => setChecked(true)}>
                <Typography.B1 fontWeight="medium" color="blue">
                  인증하기
                </Typography.B1>
              </Button.Ghost>
            }
            iconTop={46}
          />
          <LabelWithInput
            label="비밀번호"
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요"
            successMessage={passwordState}
            icon={
              <Button.Ghost id="password" type="button" onClick={onClickPasswordVisible}>
                <Img src={ICON[passwordVisible ? 'eye-on' : 'eye-off']} />
              </Button.Ghost>
            }
          />
          <LabelWithInput
            label="비밀번호 확인"
            name="confirmPassword"
            type={confirmPasswordVisible ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요"
            successMessage={passwordState}
            icon={
              <Button.Ghost id="confirmPassword" type="button" onClick={onClickPasswordVisible}>
                <Img src={ICON[confirmPasswordVisible ? 'eye-on' : 'eye-off']} />
              </Button.Ghost>
            }
          />
          <Accordion
            title={
              <Container.FlexRow alignItems="center" gap="4">
                <CheckBox option="circle" id="allChecked" />
                <Typography.B1 fontWeight="semiBold" color="gray_100">
                  전체 동의하기
                </Typography.B1>
              </Container.FlexRow>
            }
          >
            {AGREEMENT_OPTIONS.map((item) => (
              <AccordionContent
                key={item.id}
                id={item.id}
                label={item.label}
                isRequired={item.required}
                link={item.links}
              />
            ))}
          </Accordion>
          <Button.Fill type="submit" style={{ maxHeight: '54px', marginTop: '32px' }}>
            회원가입
          </Button.Fill>
        </form>
      </FormProvider>
      <BasicAlert
        type="confirm"
        isOpen={checked}
        onClose={() => setChecked(false)}
        confirmLabel="확인"
        onConfirm={() => setChecked(false)}
      >
        <Container.FlexCol gap="12" alignItems="center" style={{ maxWidth: '314px', marginBottom: '12px' }}>
          <Img style={{ width: '53px' }} src={ICON.confirm} />
          <Typography.T2 fontWeight="bold">이메일 인증 번호를 발송하였습니다.</Typography.T2>
          <Container.FlexCol gap="4" alignItems="center">
            <Typography.B1 fontWeight="medium" color="gray_70">
              입력하신 메일로 수신하신 번호를 확인 후
            </Typography.B1>
            <Typography.B1 fontWeight="medium" color="gray_70">
              인증 번호를 입력하여 인증을 완료하세요.
            </Typography.B1>
          </Container.FlexCol>
        </Container.FlexCol>
      </BasicAlert>
    </SignUpWrap>
  );
}
