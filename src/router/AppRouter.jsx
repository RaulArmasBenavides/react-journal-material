import { Navigate, Route, Routes } from 'react-router-dom';
import { CheckingAuth } from '../ui/';
import { useCheckAuth } from '../hooks';
import { Suspense, lazy } from 'react';
//import { AuthRoutes } from '../auth/routes/AuthRoutes';
//import { JournalRoutes } from '../journal/routes/JournalRoutes';
// Lazy loading de los módulos
const JournalRoutes = lazy(() => import('../journal/routes/JournalRoutes').then(module => ({ default: module.JournalRoutes })));
const AuthRoutes = lazy(() => import('../auth/routes/AuthRoutes').then(module => ({ default: module.AuthRoutes })));
const routes = [
  {
    path: '/*',
    element: <JournalRoutes />,
    private: true, // Ruta protegida
  },
  {
    path: '/auth/*',
    element: <AuthRoutes />,
    private: false, // Ruta pública
  },
];

export const AppRouter = () => {

  const status = useCheckAuth();

   if ( status === 'checking' ) {
     return <CheckingAuth />
   }

   return (
    <Suspense fallback={<CheckingAuth />}>
      <Routes>
        {routes.map(({ path, element, private: isPrivate }, index) => 
          (status === 'authenticated' && isPrivate) || (status !== 'authenticated' && !isPrivate) ? (
            <Route key={index} path={path} element={element} />
          ) : null
        )}
        <Route path='/*' element={<Navigate to='/auth/login' />} />
      </Routes>
    </Suspense>
  )
}
