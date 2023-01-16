import React, { ReactNode } from "react";

type props = {
  children: ReactNode;
};

export const LazyGuardRouter = ({ children }: props) => {
  return <React.Suspense fallback={<></>}>{children}</React.Suspense>;
};
