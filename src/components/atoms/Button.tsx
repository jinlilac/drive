import styled from 'styled-components';

const DefaultButton = styled.button`
  padding: 18px 36px;
  width: 100%;
  font-size: ${(props) => props.theme.Font.fontSize.t3};
  height: 100%;
  max-height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.Colors.gray_100};
  color: ${(props) => props.theme.Colors.gray_10};
  user-select: none;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_200};
  }
  &:disabled {
    background-color: ${(props) => props.theme.Colors.gray_50};
    &:hover {
      background-color: ${(props) => props.theme.Colors.gray_50};
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

const Button = { Stroke: StrokeButton, Fill: DefaultButton };
export default Button;
