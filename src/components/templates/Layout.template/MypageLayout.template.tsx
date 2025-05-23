import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { SideBarMenu } from '@/components/molecules/SideBarMenu';
import SideBar from '@/components/organisms/SideBar';
import { MYPAGE_SIDEBAR_ITEMS } from '@/constants/mypage';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MypageLayoutWrap = styled(Container.FlexRow)`
  width: 100%;
  height: 100%;
  padding-top: 42px;
`;

const SideBarMenuWrap = styled(Container.FlexCol)`
  gap: 16px;
  padding: 8px 0;
`;

const TitleWrap = styled(Container.Container)``;

export default function MyPageLayoutTemplate() {
  const { pathname } = useLocation();
  return (
    <MypageLayoutWrap>
      <SideBar style={{ height: '100%' }}>
        {Object.entries(MYPAGE_SIDEBAR_ITEMS).map(([category, items]) => (
          <SideBarMenuWrap key={category}>
            <Typography.B2 fontWeight="semiBold" color="gray_70">
              {category}
            </Typography.B2>
            {items.map((item) => (
              <SideBarMenu
                isActive={pathname.includes(item.path)}
                key={item.path}
                label={item.label}
                icon={item.icon}
                path={item.path}
                isReady={item.isReady}
              />
            ))}
          </SideBarMenuWrap>
        ))}
      </SideBar>
      {/* <TitleWrap>
        <Typography.T1 fontWeight="semiBold" color="gray_100">
          프로필
        </Typography.T1>
      </TitleWrap> */}
      <Outlet />
    </MypageLayoutWrap>
  );
}
