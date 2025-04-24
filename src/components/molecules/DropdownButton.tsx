import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import { Chevron } from '@/components/molecules/Accordion';
import { ICON } from '@/constants/icon';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';

// 스타일 정의
const DropdownContainer = styled.div`
  display: inline-block;
  position: relative;
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

const IconWrapper = styled.span``;

const DropdownMenu = styled(Container.FlexCol)`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) -1px 1px 16px;
  border-radius: 8px;
  width: max-content;
  list-style-type: none;
  padding: 8px;
  z-index: 99;
  min-width: 198px;
`;

// Props 타입 정의
type DropdownButtonProps = {
  icon?: React.ReactNode;
  children: ReactNode;
  label?: string;
  chevron?: boolean;
  style?: CSSProperties;
  isHover?: boolean;
};

const DropdownButton: React.FC<DropdownButtonProps> = ({
  icon,
  children,
  style,
  isHover,
  chevron,
  label,
  ...others
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // 외부 클릭 시 닫힘
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropButton isHover={isHover} onClick={toggleDropdown}>
        {label && (
          <Typography.B2 fontWeight="medium" color="gray_100">
            {label}
          </Typography.B2>
        )}
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {chevron && (
          <Chevron direction={isOpen ? 'top' : 'bottom'}>
            <Img full src={ICON.chevron} />
          </Chevron>
        )}
      </DropButton>
      {isOpen && <DropdownMenu style={style}>{children}</DropdownMenu>}
    </DropdownContainer>
  );
};

export default DropdownButton;
