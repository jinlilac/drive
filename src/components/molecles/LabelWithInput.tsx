import { ComponentProps, ReactNode } from 'react';
import { css, styled } from 'styled-components';
import { useFormContext } from 'react-hook-form';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import { ICON } from '@/constants/icon';
import Input from '@/components/atoms/Input';

type LabelWithInputProps = Omit<ComponentProps<'input'>, 'name'> & {
  label: string;
  icon?: ReactNode;
  name: string;
  defaultValue?: string;
  isError?: boolean;
  successMessage?: string;
};

type InfoType = 'default' | 'error' | 'success';

type InfoBoxProps = {
  type: InfoType;
  message?: string;
};

const Label = styled.label`
  display: block;
  font-size: ${(props) => props.theme.Font.fontSize.t3};
  font-weight: ${(props) => props.theme.Font.fontWeight.medium};
  color: ${(props) => props.theme.Colors.gray_60};
  padding-bottom: 12px;
`;

const TextInput = styled(Input.Default)<InfoBoxProps>`
  ${({ type }) => {
    if (type === 'error')
      return css`
        border: 1px solid;
        border-color: ${(props) => props.theme.Colors.error};
        &:focus,
        &:hover {
          border-color: ${(props) => props.theme.Colors.error};
        }
        background-color: ${(props) => props.theme.Colors.gray_10};
      `;
    else if (type === 'success')
      return css`
        border: 1px solid;
        border-color: ${(props) => props.theme.Colors.success};
        &:focus,
        &:hover {
          border-color: ${(props) => props.theme.Colors.success};
        }
        background-color: ${(props) => props.theme.Colors.gray_10};
      `;
    else return css``;
  }}
`;

const IconContainer = styled.div`
  position: absolute;
  top: 41px;
  right: 16px;
`;

const InfoBox = styled(Container.FlexRow)<InfoBoxProps>`
  ${({ type }) => {
    if (type === 'error')
      return css`
        background-color: ${(props) => props.theme.Colors.error_bg};
        color: ${(props) => props.theme.Colors.error};
      `;
    else if (type === 'success')
      return css`
        background-color: ${(props) => props.theme.Colors.success_bg};
        color: ${(props) => props.theme.Colors.success};
      `;
  }}
  gap: 4px;
  align-items: center;
  font-size: ${(props) => props.theme.Font.fontSize.b2};
  font-weight: ${(props) => props.theme.Font.fontWeight.regular};
  padding: 9px 16px;
  border-radius: 8px;
  margin-top: 4px;
`;

const InfoBoxComponent = (props: InfoBoxProps) => {
  return (
    <InfoBox type={props.type}>
      {props.type === 'error' && <Img src={ICON['mark-red']} />}
      {props.type === 'success' && <Img src={ICON['mark-green']} />}
      {props.message}
    </InfoBox>
  );
};

export default function LabelWithInput(props: LabelWithInputProps) {
  const { register, formState } = useFormContext();
  const { id, label, icon, name, successMessage, ...others } = props;
  let currentState: InfoType = 'default';
  if (formState.errors[name]?.message) currentState = 'error';
  else if (successMessage) currentState = 'success';
  return (
    <Container.FlexCol style={{ position: 'relative' }}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <TextInput
        id={id}
        {...others}
        isError={!!formState.errors[name]?.message}
        type={currentState}
        {...register(name)}
      />
      <InfoBoxComponent type={currentState} message={formState.errors[name]?.message?.toString() || successMessage} />
      <IconContainer>{icon}</IconContainer>
    </Container.FlexCol>
  );
}
