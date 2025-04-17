import ComponentTest from '@/components/templates/ComponentTest.template';
import LayoutTemplate from '@/components/templates/Layout.template/Layout.template';
import ProfileTemplate from '@/components/templates/Profile.template';
import SignInTemplate from '@/components/templates/SignIn.template/SignIn.template';
import SignOutroTemplate from '@/components/templates/SignOutro.template';
import SignUpTemplate from '@/components/templates/SignUp.template/SignUp.template';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OAuth from '@/components/templates/OAuth';
import MainLayoutTemplate from '@/components/templates/Layout.template/MainLayout.template';
import WorkSheet from '@/components/pages/WorkSheet/WorkSheet';

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
    path: '/workspace',
    element: <MainLayoutTemplate />,
    children: [
      { path: 'work-sheet', element: <WorkSheet /> },
      { path: 'drive', element: <h1>드라이브</h1> },
      { path: 'starred', element: <h1>즐겨찾기</h1> },
      { path: 'trash', element: <h1>휴지통</h1> },
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
