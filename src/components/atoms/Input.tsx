import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

type InputProps = ComponentProps<'input'> & {
  isError?: boolean;
};
type InputHiddenProps = {
  defaultValue?: string | number | readonly string[] | undefined;
  name: string;
};

const DefaultInput = styled.input<InputProps>`
  font-family: 'Pretendard', sans-serif;
  width: 100%;
  max-height: 48px;
  padding: 16px;
  background-color: ${(props) => props.theme.Colors.gray_20};
  border-radius: 8px;
  font-size: ${(props) => props.theme.Font.fontSize.b1};
  font-weight: ${(props) => props.theme.Font.fontWeight.medium};
  border: none;
  color: ${(props) => props.theme.Colors.gray_100};
  line-height: 100%;
  &::placeholder {
    font-family: 'Pretendard', sans-serif;
    color: ${(props) => props.theme.Colors.gray_70};
    font-size: ${(props) => props.theme.Font.fontSize.b1};
    font-weight: ${(props) => props.theme.Font.fontWeight.regular};
  }
  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_10};
    color: ${(props) => props.theme.Colors.gray_100};
    border: 1px solid ${(props) => props.theme.Colors.fill};
    outline: none;
  }
  &:focus {
    background-color: ${(props) => props.theme.Colors.gray_10};
    color: ${(props) => props.theme.Colors.gray_100};
    border: 1px solid ${(props) => props.theme.Colors.fill};
    outline: none;
  }
  &:disabled {
    &::placeholder {
      color: ${(props) => props.theme.Colors.gray_20};
    }
    color: ${(props) => props.theme.Colors.gray_70};
    outline: none;
    border: none;
    background-color: ${(props) => props.theme.Colors.gray_20};
  }
`;

const InputHidden = function FormItemPassword(props: InputHiddenProps) {
  const { name } = props;
  const { register } = useFormContext();
  if (name) return <input type="hidden" {...register(name)} />;
  return <span>Name 속성이 필요합니다</span>;
};

const Input = { Default: DefaultInput, Hidden: InputHidden };
export default Input;
