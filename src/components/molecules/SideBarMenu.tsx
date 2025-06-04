import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Img from '@/components/atoms/Img';
import { DropBoxItem } from '@/components/molecules/ProfileCard';

type SideBarMenuProps = {
  label: string;
  icon?: string;
  path: string;
  isReady?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};

const MenuButton = styled(DropBoxItem)<{ active?: boolean; disabled?: boolean }>`
  display: flex;
  gap: 16px;
  align-items: center;
  background: ${({ active }) => (active ? '#F9F9F9' : 'transparent')};
  color: ${({ active, disabled }) => (disabled ? '#b0b0b0' : active ? '#4A4A4A' : '#4A4A4A')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.15s;

  & > .badge {
    margin-left: auto;
    background: #ff72621a;
    color: #ff7262;
    border-radius: 10px;
    padding: 4px 8px;
    font-size: ${(props) => props.theme.Font.fontSize.b3};
    font-weight: ${(props) => props.theme.Font.fontWeight.medium};
  }
`;

export const SideBarMenu: React.FC<SideBarMenuProps> = ({
  label,
  icon,
  path,
  isReady = true,
  isActive = false,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isReady) return;
    if (onClick) onClick();
    else navigate(path);
  };

  return (
    <MenuButton
      type="button"
      active={isActive}
      disabled={!isReady}
      onClick={handleClick}
      tabIndex={isReady ? 0 : -1}
      aria-disabled={!isReady}
    >
      {icon && <Img src={icon} />}
      {label}
      {!isReady && <span className="badge">준비중</span>}
    </MenuButton>
  );
};
