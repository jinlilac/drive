import Button from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import { useState } from 'react';
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
        <Input.Default disabled />
      </Wrapper>
    </TestLayoutContainer>
  );
}
