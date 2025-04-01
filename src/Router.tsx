import ComponentTest from '@/components/templates/ComponentTest.template';
import LayoutTemplate from '@/components/templates/Layout.template/Layout.template';
import ProfileTemplate from '@/components/templates/Profile.template';
import SignInTemplate from '@/components/templates/SignIn.template/SignIn.template';
import SignUpTemplate from '@/components/templates/SignUp.template/SignUp.template';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
      { path: 'outro', element: <ProfileTemplate /> },
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
