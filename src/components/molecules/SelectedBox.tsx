import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import { Chevron } from '@/components/molecules/Accordion';
import DropdownMenuPortal from '@/components/molecules/DropdownMenuPortal';
import { DropBoxItem } from '@/components/molecules/ProfileCard';
import { ICON } from '@/constants/icon';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { CSSProperties, styled } from 'styled-components';

type SelectBoxOption = {
  label: string | ReactNode;
  value: string | number | undefined;
};

type SelectBoxProps = {
  options: readonly SelectBoxOption[];
  value: string | number | undefined;
  onChange: (value: string | number | undefined, label: string | ReactNode) => void;
  style?: CSSProperties;
  padding?: number;
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
  position: fixed;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) -1px 1px 16px;
  border-radius: 8px;
  max-width: 134px;
  max-height: 434px;
  overflow-y: scroll;
  padding: 8px;
  z-index: 999999;
`;

const SelectBox = ({ options, value, onChange, style, padding }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((opt) => opt.value === value);

  // const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (ref.current && !ref.current.contains(event.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  console.log('menuPos', menuPos);

  const openMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom, left: rect.left });
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <DropdownContainer style={style}>
      <DropButton ref={buttonRef} onClick={openMenu}>
        {selected ? selected.label : '선택'}
        <Chevron direction={isOpen ? 'top' : 'bottom'}>
          <Img full src={ICON.chevron} />
        </Chevron>
      </DropButton>
      {isOpen && (
        <DropdownMenuPortal>
          <DropdownMenu style={{ top: menuPos.top, left: menuPos.left }}>
            {options.map((item) => (
              <DropBoxItem
                padding={padding}
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
        </DropdownMenuPortal>
      )}
    </DropdownContainer>
  );
};

export default SelectBox;
