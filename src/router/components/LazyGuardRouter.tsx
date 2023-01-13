import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";

type props = {
  children: ReactNode;
};

export const LazyGuardRouter = ({ children }: props) => {
  const location = useLocation();
  console.log(location.pathname + "测试路由守卫");

  return <React.Suspense fallback={<></>}>{children}</React.Suspense>;
};
