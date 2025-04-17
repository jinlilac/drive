import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import { Chevron } from '@/components/molecles/Accordion';
import { DropBoxItem } from '@/components/molecles/ProfileCard';
import { ICON } from '@/constants/icon';
import { useEffect, useRef, useState } from 'react';
import { CSSProperties, styled } from 'styled-components';

type SelectBoxOption = {
  label: string;
  value: string | number | undefined;
};

type SelectBoxProps = {
  options: readonly SelectBoxOption[];
  value: string | number | undefined;
  onChange: (value: string | number | undefined, label: string) => void;
  style?: CSSProperties;
};
// 스타일 정의
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropButton = styled(Button.Ghost)<{ isHover?: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 4px;
  justify-content: space-between;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isHover ? '#F8f8f8' : 'transparent')};
    border-radius: 4px;
  }
`;
const DropdownMenu = styled(Container.FlexCol)`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) -1px 1px 16px;
  border-radius: 8px;
  width: 199%;
  max-width: 134px;
  max-height: 434px;
  overflow-y: scroll;
  padding: 8px;
  z-index: 999;
`;

const SelectBox = ({ options, value, onChange, style }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((opt) => opt.value === value);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContainer ref={ref} style={style}>
      <DropButton onClick={() => setIsOpen((prev) => !prev)}>
        <Typography.B2 fontWeight="medium" color="gray_100">
          {selected ? selected.label : '선택'}
        </Typography.B2>
        <Chevron direction={isOpen ? 'top' : 'bottom'}>
          <Img full src={ICON.chevron} />
        </Chevron>
      </DropButton>
      {isOpen && (
        <DropdownMenu>
          {options.map((item) => (
            <DropBoxItem
              key={item.value}
              onClick={() => {
                onChange(item.value, item.label);
                setIsOpen(false);
              }}
            >
              {item.label}
            </DropBoxItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default SelectBox;
