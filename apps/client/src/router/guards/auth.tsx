import { Navigate, Outlet, useLocation } from "react-router";

import { useUser } from "@/client/services/user";

export const AuthGuard = () => {
  const location = useLocation();
  const redirectTo = location.pathname + location.search;

  const { user, loading } = useUser();

  if (loading) return null;

  if (user) {
    return <Outlet />;
  }

  // For guest users, redirect to dashboard instead of login
  return <Navigate replace to={`/dashboard?redirect=${redirectTo}`} />;
};
