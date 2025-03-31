import { ComponentProps, ReactNode } from 'react';
import { css, CSSProperties, styled } from 'styled-components';
import { useFormContext } from 'react-hook-form';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import { ICON } from '@/constants/icon';
import Input from '@/components/atoms/Input';

export type LabelWithInputProps = Omit<ComponentProps<'input'>, 'name'> & {
  label?: string;
  icon?: ReactNode;
  name: string;
  defaultValue?: string;
  isError?: boolean;
  successMessage?: string;
  iconTop?: number;
  containerStyle?: CSSProperties;
};

type InfoType = 'default' | 'error' | 'success';

type InfoBoxProps = {
  option: InfoType;
  message?: string;
  style?: CSSProperties;
};

const Label = styled.label`
  display: block;
  font-size: ${(props) => props.theme.Font.fontSize.t3};
  font-weight: ${(props) => props.theme.Font.fontWeight.medium};
  color: ${(props) => props.theme.Colors.gray_60};
  padding-bottom: 12px;
`;

export const TextInput = styled(Input.Default)<InfoBoxProps>`
  ${({ option }) => {
    if (option === 'error')
      return css`
        border: 1px solid ${(props) => props.theme.Colors.error};
        &:focus,
        &:hover {
          border-color: ${(props) => props.theme.Colors.error};
        }
        background-color: ${(props) => props.theme.Colors.gray_10};
      `;
    else if (option === 'success')
      return css`
        border: 1px solid ${(props) => props.theme.Colors.success};
        &:focus,
        &:hover {
          border-color: ${(props) => props.theme.Colors.success};
        }
        background-color: ${(props) => props.theme.Colors.gray_10};
      `;
    else return css``;
  }}
`;
type IconContainerProps = {
  top?: number;
};

const IconContainer = styled.div<IconContainerProps>`
  position: absolute;
  top: ${(props) => (props.top !== undefined ? `${props.top}px` : '41px')};
  right: 16px;
`;

const InfoBox = styled(Container.FlexRow)<InfoBoxProps>`
  ${({ option }) => css`
    max-height: ${option === 'default' ? '14px' : '32px'};
    opacity: ${option === 'default' ? '0' : '1'};
    visibility: ${option === 'default' ? 'hidden' : 'visible'};
    transform: ${option === 'default' ? 'translateY(-60%)' : 'translateY(0)'};
    margin-bottom: ${option === 'default' ? '0' : '12px'};
    transition: all 0.3s ease;
    overflow: hidden;
    gap: 4px;
    align-items: center;
    font-size: ${(props) => props.theme.Font.fontSize.b2};
    font-weight: ${(props) => props.theme.Font.fontWeight.medium};
    padding: 6px 16px;
    border-radius: 8px;
    margin-top: 4px;

    ${option === 'error' &&
    css`
      background-color: ${(props) => props.theme.Colors.error_bg};
      color: ${(props) => props.theme.Colors.error};
    `}

    ${option === 'success' &&
    css`
      background-color: ${(props) => props.theme.Colors.success_bg};
      color: ${(props) => props.theme.Colors.success};
    `}
  `}
`;

export const InfoBoxComponent = (props: InfoBoxProps) => {
  const { option, message, ...others } = props;
  return (
    <InfoBox option={option} {...others}>
      {option === 'error' && <Img src={ICON['mark-red']} />}
      {option === 'success' && <Img src={ICON['mark-green']} />}
      {message}
    </InfoBox>
  );
};

export default function LabelWithInput(props: LabelWithInputProps) {
  const { register, formState } = useFormContext();
  const { id, label, icon, name, successMessage, iconTop, containerStyle, ...others } = props;
  let currentState: InfoType = 'default';
  if (formState.errors[name]?.message) currentState = 'error';
  else if (!formState.errors[name]?.message && successMessage) currentState = 'success';
  return (
    <Container.FlexCol style={{ position: 'relative', ...containerStyle }}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <TextInput
        id={id}
        isError={!!formState.errors[name]?.message}
        option={currentState}
        {...register(name)}
        {...others}
      />
      <InfoBoxComponent option={currentState} message={formState.errors[name]?.message?.toString() || successMessage} />
      <IconContainer top={iconTop}>{icon}</IconContainer>
    </Container.FlexCol>
  );
}
