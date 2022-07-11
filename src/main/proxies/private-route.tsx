import { Navigate, Outlet } from 'react-router-dom';
import { useSessionAccount } from '@/presentation/contexts/session-account-context';

export function PrivateRoute() {
  const { getSessionAccount } = useSessionAccount();

  if (!getSessionAccount()?.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
