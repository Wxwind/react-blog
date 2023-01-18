import { createBrowserRouter, RouteObject } from "react-router-dom";
import React from "react";
import Menu from "@/views/menu";
import Article from "@/views/article";
import { LazyGuardRouter } from "@/router/components/LazyGuardRouter";

const About = React.lazy(() => import("@/views/about"));
const Home = React.lazy(() => import("@/views/home"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Menu />,
    children: [
      {
        index: true,
        element: (
          <LazyGuardRouter>
            <Home />
          </LazyGuardRouter>
        ),
      },

      {
        path: "/home",
        element: (
          <LazyGuardRouter>
            <Home />
          </LazyGuardRouter>
        ),
      },

      {
        path: "/about",
        element: (
          <LazyGuardRouter>
            <About />
          </LazyGuardRouter>
        ),
      },

      {
        path: "/article",
        element: <Article />,
        children: [
          {
            path: "/article/:articleId",
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(routes);

export default router;
