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

let activeDropdownId: string | null = null;

const SelectBox = ({ options, value, onChange, style, padding, id }: SelectBoxProps & { id?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((opt) => opt.value === value);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지 로직 재활성화 및 개선
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 버튼이나 메뉴에 클릭이 발생하지 않았을 때만 닫기
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openMenu = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom, left: rect.left - 20 });
    }

    // 다른 드롭다운이 열려있다면 닫기
    if (activeDropdownId && activeDropdownId !== id) {
      // 이벤트를 발생시켜 다른 드롭다운을 닫도록 함
      const closeEvent = new CustomEvent('closeDropdown', { detail: { exceptId: id } });
      document.dispatchEvent(closeEvent);
    }

    // 현재 드롭다운 ID를 활성화된 ID로 설정
    activeDropdownId = isOpen ? null : (id as string);
    setIsOpen((prev) => !prev);
  };

  // 다른 드롭다운이 열릴 때 현재 드롭다운을 닫는 이벤트 리스너
  useEffect(() => {
    const closeDropdown = (e: CustomEvent) => {
      if (e.detail.exceptId !== id) {
        setIsOpen(false);
      }
    };
    document.addEventListener('closeDropdown', closeDropdown as EventListener);
    return () => document.removeEventListener('closeDropdown', closeDropdown as EventListener);
  }, [id]);
  return (
    <DropdownContainer ref={ref} style={style}>
      <DropButton ref={buttonRef} onClick={openMenu}>
        {selected ? selected.label : '선택'}
        <Chevron direction={isOpen ? 'top' : 'bottom'}>
          <Img full src={ICON.chevron} />
        </Chevron>
      </DropButton>
      {isOpen && (
        <DropdownMenuPortal>
          <DropdownMenu ref={menuRef} style={{ top: menuPos.top, left: menuPos.left }}>
            {options.map((item) => {
              return (
                <DropBoxItem
                  padding={padding}
                  key={item.value}
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 버블링 중지
                    onChange(item.value, item.label);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </DropBoxItem>
              );
            })}
          </DropdownMenu>
        </DropdownMenuPortal>
      )}
    </DropdownContainer>
  );
};
export default SelectBox;
