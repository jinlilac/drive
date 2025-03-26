import Button from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import Accordion from '@/components/molecles/Accordion';
import { BasicAlert } from '@/components/molecles/Alert';
import LabelWithInput from '@/components/molecles/LabelWithInput';
import { ICON } from '@/constants/icon';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

const TestLayoutContainer = styled(Container.Grid)`
  height: 100dvh;
  padding: 32px 16px;
`;
type TestProps = {
  title: string;
  children: React.ReactNode;
};
const Wrapper = (props: TestProps) => {
  const { title, children } = props;
  return (
    <Container.FlexCol gap="8">
      <Typography.B1>{title}</Typography.B1>
      <Container.Grid gap="2" columns="4" rows="4">
        {children}
      </Container.Grid>
    </Container.FlexCol>
  );
};

export default function ComponentTest() {
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
  const [checked, setChecked] = useState(false);

  return (
    <TestLayoutContainer columns="3">
      <Wrapper title="버튼 컴포넌트">
        <Button.Fill>확인</Button.Fill>
        <Button.Fill disabled>확인</Button.Fill>
        <Button.Stroke>확인</Button.Stroke>
      </Wrapper>
      <Wrapper title="체크 박스 컴포넌트">
        <CheckBox option="default" checked={checked} onChange={() => setChecked(!checked)} />
        <CheckBox
          option="square"
          checked={checked}
          onClick={() => {
            console.log(checked);
            setChecked(!checked);
          }}
        />
        <CheckBox option="circle" checked={checked} onChange={() => setChecked(!checked)} />
      </Wrapper>
      <Wrapper title="인풋 컴포넌트">
        <Input.Default />
        {/* <Input.Default disabled /> */}
      </Wrapper>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <LabelWithInput
            type="text"
            name="email"
            label="이메일주소"
            placeholder="이메일을 입력해주세요."
            successMessage={emailState}
            icon={
              <Button.Ghost>
                <Img src={ICON['eye-off']} />
              </Button.Ghost>
            }
          />
          <LabelWithInput
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            successMessage={passwordState}
          />
          <button type="submit">제출</button>
        </form>
      </FormProvider>
      <Wrapper title="알럿 컴포넌트">
        <Button.Fill onClick={() => setChecked(true)}>Alert Dialog</Button.Fill>
        <BasicAlert
          type="cancel"
          isOpen={checked}
          onClose={() => setChecked(false)}
          confirmLabel="로그인 페이지로"
          cancelLabel="취소"
          onCancel={() => console.log('취소')}
          onConfirm={() => console.log('확인')}
        >
          <Container.FlexCol gap="12" alignItems="center" style={{ maxWidth: '314px', marginBottom: '12px' }}>
            <Img style={{ width: '53px' }} src={ICON.confirm} />
            <Typography.T2 fontWeight="bold">비밀번호 재설정 메일을 발송하였습니다.</Typography.T2>
            <Container.FlexCol gap="4" alignItems="center">
              <Typography.B1 fontWeight="medium" color="gray_70">
                입력하신 메일로 수신하신 링크를 통해
              </Typography.B1>
              <Typography.B1 fontWeight="medium" color="gray_70">
                비밀번호를 재설정할 수 있습니다.
              </Typography.B1>
            </Container.FlexCol>
          </Container.FlexCol>
        </BasicAlert>
      </Wrapper>
      <Wrapper title="아코디언 컴포넌트">
        <Accordion title={<Typography.B1>전체 동의</Typography.B1>}>서비스 이용 약관에 동의합니다.</Accordion>
      </Wrapper>
    </TestLayoutContainer>
  );
}
