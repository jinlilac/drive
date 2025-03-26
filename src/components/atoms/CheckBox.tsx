import { ICON } from '@/constants/icon';
import { ComponentProps } from 'react';
import styled from 'styled-components';

type CheckBoxProps = {
  option: 'default' | 'square' | 'circle';
  checked?: boolean;
} & Omit<ComponentProps<'input'>, 'type'>;

const CheckboxContainer = styled.label`
  display: inline-block;
  position: relative;
`;

const HiddenCheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const CustomCheckBox = styled.div<CheckBoxProps>`
  width: 24px;
  height: 24px;
  padding: 2px;
  background-color: white;

  ${(props) => {
    switch (props.option) {
      case 'default':
        return `
          border: 2px solid ${props.theme.Colors.gray_70};
          border-radius: 4px;
          background-color: white;
        `;
      case 'square':
        return `
          border: none;
          background-image: url('${ICON[props.checked ? 'square-check' : 'square-check-off']}');
          background-repeat: no-repeat;
          background-position: center;
        `;
      case 'circle':
        return `
          border: none;
          background-image: url('${ICON[props.checked ? 'circle-check' : 'circle-check-off']}');
          background-repeat: no-repeat;
          background-position: center;
        `;
      default:
        return '';
    }
  }}
`;

const CheckBox = ({ option, checked, onChange, ...props }: CheckBoxProps) => {
  return (
    <CheckboxContainer>
      <HiddenCheckBox checked={checked} onChange={onChange} {...props} />
      <CustomCheckBox option={option} checked={checked} />
    </CheckboxContainer>
  );
};

export default CheckBox;
