import { Navigate, Route, Routes } from 'react-router-dom';
import { CheckingAuth } from '../ui/';
import { useCheckAuth } from '../hooks';
import { Suspense, lazy, ReactNode } from 'react';

const JournalRoutes = lazy(() => import('../journal/routes/JournalRoutes').then(module => ({ default: module.JournalRoutes })));
const AuthRoutes = lazy(() => import('../auth/routes/AuthRoutes').then(module => ({ default: module.AuthRoutes })));

interface RouteConfig {
  path: string;
  element: ReactNode;
  private: boolean;
}

const routes: RouteConfig[] = [
  {
    path: '/*',
    element: <JournalRoutes />,
    private: true,
  },
  {
    path: '/auth/*',
    element: <AuthRoutes />,
    private: false,
  },
];

export const AppRouter = () => {
  const status = useCheckAuth();

  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return (
    <Suspense fallback={<CheckingAuth />}>
      <Routes>
        {routes.map(({ path, element, private: isPrivate }, index) =>
          (status === 'authenticated' && isPrivate) || (status !== 'authenticated' && !isPrivate) ? (
            <Route key={index} path={path} element={element} />
          ) : null
        )}
        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Suspense>
  );
};
