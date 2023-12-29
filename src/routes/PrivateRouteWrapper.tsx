import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useAuthApi from "../common/components/Auth/data/hooks/useAuth.api";

const PrivateRouteWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuthApi();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>{children}</div>;
};

export default PrivateRouteWrapper;
