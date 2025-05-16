import { ICON } from '@/constants/icon';
import { ComponentProps } from 'react';
import styled from 'styled-components';

type CheckBoxProps = {
  option: 'default' | 'square' | 'circle' | 'minus';
  checked?: boolean;
  indeterminate?: boolean;
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
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding: 2px;
  background-color: white;

  ${({ option, checked, indeterminate, theme }) => {
    const getBackground = () => {
      if (indeterminate) return `url('${ICON['checkbox-gray']}')`;
      if (checked) return `url('${ICON['square-check']}')`;
      return 'none';
    };

    switch (option) {
      case 'default':
        return `
          border: 2px solid ${theme.Colors.gray_50};
          border-radius: 4px;
          background-color: white;
          ${
            checked
              ? `background-image: url('${ICON['square-check']}');
         background-repeat: no-repeat;
         background-position: center;
         border:none`
              : ''
          }
        `;
      case 'square':
        return `
          border: none;
          background-image: url('${ICON[checked ? 'square-check' : 'square-check-off']}');
          background-repeat: no-repeat;
          background-position: center;
        `;
      case 'circle':
        return `
          border: none;
          background-image: url('${ICON[checked ? 'circle-check' : 'circle-check-off']}');
          background-repeat: no-repeat;
          background-position: center;
        `;
      case 'minus':
        return `
        width:16px;
        height:16px;
          padding: ${indeterminate && '0'};
          border: ${!checked && !indeterminate ? `1px solid ${theme.Colors.gray_70}` : 'none'};
          border-radius: 2px;
          background: ${getBackground()} center no-repeat;
          background-size: cover;
          background-color: ${(checked || indeterminate) ?? 'transparent'};
        `;
      default:
        return '';
    }
  }}
`;

const CheckBox = ({ option, checked, onChange, ...props }: CheckBoxProps) => {
  return (
    <CheckboxContainer>
      <HiddenCheckBox checked={checked} onChange={onChange} />
      <CustomCheckBox option={option} checked={checked} {...props} />
    </CheckboxContainer>
  );
};

export default CheckBox;
