import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const router = createBrowserRouter([
  { path: '/', element: <div>Home</div> },
  {
    path: '/test',
    element: <div>컴포넌트 테스트 페이지 입니다.</div>,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
