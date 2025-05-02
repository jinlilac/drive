import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import ProfileCard, { DropBoxItem } from '@/components/molecules/ProfileCard';
import SearchBar from '@/components/molecules/SearchBar';
import WindowBar from '@/components/molecules/WindowBar';
import SideBar from '@/components/organisms/SideBar';
import { SIDEBAR_ITEMS } from '@/constants/workspace';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainLayoutContainer = styled(Container.FlexRow)`
  width: 100%;
  height: 100dvh;
`;
const LinkItem = styled(DropBoxItem)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  flex: 1;
`;
const SideBarContentWrap = styled(Container.FlexCol)`
  padding: 16px 0;
  gap: 16px;
`;
const WorkSpaceBar = styled(Container.FlexCol)`
  width: 100%;
  padding: 24px 16px;
`;

export default function MainLayoutTemplate() {
  const navigate = useNavigate();
  const handleMenuClick = (path: string) => {
    navigate(`${path}`);
  };
  return (
    <>
      <WindowBar />
      <MainLayoutContainer>
        <SideBar
          header={
            <>
              <ProfileCard />
              <Divider.Row size="thin" />
            </>
          }
        >
          <SideBarContentWrap>
            {SIDEBAR_ITEMS.map((items) => (
              <LinkItem onClick={() => handleMenuClick(items.path)} key={items.path}>
                <Img src={items.icon} style={{ width: '20px' }} />
                <Typography.B1 fontWeight="semiBold" color="gray_90">
                  {items.label}
                </Typography.B1>
              </LinkItem>
            ))}
          </SideBarContentWrap>
        </SideBar>
        <WorkSpaceBar gap="16" style={{ width: 'calc(100% - 300px)', flex: '1' }}>
          <Container.FlexCol gap="16" alignItems="flex-end">
            <SearchBar />
            <Divider.Row size="thin" />
          </Container.FlexCol>
          <Outlet />
        </WorkSpaceBar>
      </MainLayoutContainer>
    </>
  );
}
