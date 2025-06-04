import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import ProfileCard from '@/components/molecules/ProfileCard';
import { SideBarMenu } from '@/components/molecules/SideBarMenu';
import StorageProgressBar from '@/components/molecules/StorageProgressBar';
import SideBar from '@/components/organisms/SideBar';
import { SIDEBAR_ITEMS } from '@/constants/workspace';
import { useAuthStore } from '@/stores/useAuthStore';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainLayoutContainer = styled(Container.FlexRow)`
  width: 100%;
  height: 100dvh;
  padding-top: 8px;
`;
const SideBarContentWrap = styled(Container.FlexCol)`
  padding: 16px 0;
  height: 100%;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Storage = styled(Container.FlexCol)`
  padding: 16px;
  gap: 24px;
`;

export default function MainLayoutTemplate() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const handleMenuClick = (path: string) => {
    if (path === '/workspace/drive') {
      setUser({ currentId: user?.rootFolder, currentFolderName: '내 드라이브' });
      navigate(`${path}?page=1&path=${user?.rootFolder}&category=all&name=내 드라이브`);
    } else navigate(`${path}`);
  };
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
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
            <Container.FlexCol gap="16">
              {SIDEBAR_ITEMS.map((items) => (
                <SideBarMenu
                  key={items.label}
                  isActive={pathname.includes(items.path.split('?')[0])}
                  label={items.label}
                  icon={items.icon}
                  path={items.path}
                  onClick={() => handleMenuClick(items.path)}
                />
              ))}
            </Container.FlexCol>
            <Storage>
              <Divider.Row />
              <StorageProgressBar />
            </Storage>
          </SideBarContentWrap>
        </SideBar>
        <Outlet />
      </MainLayoutContainer>
    </>
  );
}
