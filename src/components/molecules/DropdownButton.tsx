import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import { Chevron } from '@/components/molecules/Accordion';
import { ICON } from '@/constants/icon';
import React, { MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
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
  cursor: ${({ isHover }) => (isHover ? 'pointer' : 'not-allowed')};

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
  disabled?: boolean;
};

const DropdownButton: React.FC<DropdownButtonProps> = ({
  icon,
  children,
  style,
  isHover,
  chevron,
  label,
  disabled,
  ...others
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 자식 요소 클릭 핸들러 주입
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<{ onClick?: MouseEventHandler; style?: CSSProperties }>(child)) {
      return React.cloneElement(child, {
        onClick: (e: React.MouseEvent) => {
          child.props.onClick?.(e);
          setIsOpen(false);
          e.stopPropagation();
        },
        style: { ...child.props.style, cursor: 'pointer' },
      });
    }
    return child;
  });

  // 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !target.closest('.overlay') // 오버레이 요소 예외 처리
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropButton
        disabled={disabled}
        isHover={isHover}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
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
      {isOpen && <DropdownMenu style={style}>{enhancedChildren}</DropdownMenu>}
    </DropdownContainer>
  );
};

export default DropdownButton;
