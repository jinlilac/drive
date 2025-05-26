import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import DropdownButton from '@/components/molecules/DropdownButton';
import { ICON } from '@/constants/icon';
import { MENU_ITEMS } from '@/constants/workspace';
import { useAuthStore } from '@/stores/useAuthStore';
import { SOCIAL_LABELS } from '@/types/auth.type';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProfileCardWrap = styled(Container.FlexRow)`
  gap: 8px;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
`;
const ContentWrap = styled(Container.FlexCol)`
  width: 100%;
`;
export const DropBoxItem = styled(Button.Ghost)<{ padding?: number }>`
  flex: 1;
  width: 100%;
  padding: ${(props) => (props.padding ? `${props.padding}` : 16)}px;
  cursor: pointer;
  font-size: ${(props) => props.theme.Font.fontSize.b2};
  font-weight: ${(props) => props.theme.Font.fontWeight.medium};
  text-align: start;

  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_20};
    border-radius: 4px;
  }
`;

export default function ProfileCard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const handleMenuClick = (path: string) => {
    navigate(`${path}`);
  };
  const handleSignOut = () => {
    logout();
    navigate('/sign/in');
  };
  return (
    <ProfileCardWrap>
      <Container.FlexRow gap="8" alignItems="center">
        <Avatar size={42} />
        <ContentWrap gap="8">
          <Typography.B1
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '162px' }}
            fontWeight="semiBold"
            color="gray_100"
          >
            {user?.name}
          </Typography.B1>
          {user?.social !== undefined && (
            <Typography.B2 fontWeight="medium" color="gray_60">
              {SOCIAL_LABELS[user.social]} 로그인
            </Typography.B2>
          )}
        </ContentWrap>
      </Container.FlexRow>
      <DropdownButton isHover icon={<Img src={ICON.hamburger} />}>
        {MENU_ITEMS.slice(0, 3).map((items) => (
          <DropBoxItem onClick={() => handleMenuClick(items.path)} key={items.path}>
            {items.label}
          </DropBoxItem>
        ))}
        <Divider.Row style={{ margin: '16px 0' }} />
        <DropBoxItem onClick={handleSignOut}>로그아웃</DropBoxItem>
      </DropdownButton>
    </ProfileCardWrap>
  );
}
