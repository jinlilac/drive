import theme from '@/styles/theme';
import { ComponentProps } from 'react';
import styled from 'styled-components';

type ButtonProps = ComponentProps<'button'> & {
  direction?: 'left' | 'right';
  gap?: string;
  strokeColor?: keyof (typeof theme)['Colors'];
};

const DefaultButton = styled.button<{ small?: boolean }>`
  padding: 18px 36px;
  width: 100%;
  font-size: ${(props) => (props.small ? props.theme.Font.fontSize.b1 : props.theme.Font.fontSize.t3)};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.Colors.gray_100};
  color: ${(props) => props.theme.Colors.gray_10};
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 8px;
  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_200};
  }
  &:disabled {
    color: ${(props) => props.theme.Colors.gray_60};
    background-color: ${(props) => props.theme.Colors.gray_30};
    &:hover {
      background-color: ${(props) => props.theme.Colors.gray_30};
    }
    cursor: not-allowed;
    outline: none;
  }
  border: none;
`;

const StrokeButton = styled(DefaultButton)`
  background-color: ${(props) => props.theme.Colors.gray_10};
  border: 1px solid ${(props) => props.theme.Colors.gray_100};
  color: ${(props) => props.theme.Colors.gray_100};
  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_10};
  }
`;
const GhostButton = styled.button.attrs<ButtonProps>((props) => ({ type: props.type || 'button' }))`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  height: 100%;
  white-space: nowrap;
`;

const Button = { Stroke: StrokeButton, Fill: DefaultButton, Ghost: GhostButton };
export default Button;
