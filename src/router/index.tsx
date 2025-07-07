import { createBrowserRouter, RouteObject } from "react-router-dom";
import React from "react";
import Menu from "@/page/menu";
import { LazyGuardRouter } from "@/router/components/LazyGuardRouter";

const Article = React.lazy(() => import("@/page/article"));
const About = React.lazy(() => import("@/page/about"));
const Home = React.lazy(() => import("@/page/home"));
const TinyTool = React.lazy(() => import("@/page/tinytool"));

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
        element: (
          <LazyGuardRouter>
            <Article />
          </LazyGuardRouter>
        ),
        children: [
          {
            path: "/article/:articleId",
          },
        ],
      },

      {
        path: "/tiny-tool",
        element: (
          <LazyGuardRouter>
            <TinyTool />
          </LazyGuardRouter>
        ),
        children: [
          {
            path: "/tiny-tool/:name",
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(routes);

export default router;
