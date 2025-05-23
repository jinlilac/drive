import ComponentTest from '@/components/templates/ComponentTest.template';
import LayoutTemplate from '@/components/templates/Layout.template/Layout.template';
import ProfileTemplate from '@/components/templates/Profile.template';
import SignInTemplate from '@/components/templates/SignIn.template/SignIn.template';
import SignOutroTemplate from '@/components/templates/SignOutro.template';
import SignUpTemplate from '@/components/templates/SignUp.template/SignUp.template';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OAuth from '@/components/templates/OAuth';
import MainLayoutTemplate from '@/components/templates/Layout.template/MainLayout.template';
import Starred from '@/components/pages/WorkSpace/Starred';
import Trash from '@/components/pages/WorkSpace/Trash';
import WorkSheet from '@/components/pages/WorkSheet/WorkSheet';
import Drive from '@/components/pages/Drive/Drive';
import SearchLayoutTemplate from '@/components/templates/Layout.template/SearchLayout.template';
import MyPageLayoutTemplate from '@/components/templates/Layout.template/MypageLayout.template';
import MyProfileTemplate from '@/components/templates/Mypage.template/MyProfile.template';
import NoticeListTemplate from '@/components/templates/Mypage.template/NoticeList.template';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>임시문구</div>,
  },
  {
    path: 'sign',
    element: <LayoutTemplate />,
    children: [
      { path: 'up', element: <SignUpTemplate /> },
      { path: 'in', element: <SignInTemplate /> },
      { path: 'profile', element: <ProfileTemplate /> },
      { path: 'outro', element: <SignOutroTemplate /> },
      {
        path: 'oauth',
        element: <OAuth />,
        children: [{ path: 'google/callback' }, { path: 'kakao/callback' }, { path: 'naver/callback' }],
      },
    ],
  },
  {
    element: <MainLayoutTemplate />,
    children: [
      {
        path: '/workspace',
        element: <SearchLayoutTemplate />,
        children: [
          { path: 'work-sheet', element: <WorkSheet /> },
          { path: 'drive', element: <Drive /> },
          { path: 'starred', element: <Starred /> },
          { path: 'trash', element: <Trash /> },
        ],
      },
      {
        path: '/mypage',
        element: <MyPageLayoutTemplate />,
        children: [
          { path: 'profile', element: <MyProfileTemplate /> },
          { path: 'notices', element: <NoticeListTemplate /> },
          { path: 'help', element: <div>고객센터</div> },
        ],
      },
    ],
  },
  {
    path: '/test',
    element: <ComponentTest />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
