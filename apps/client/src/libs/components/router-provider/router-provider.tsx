import {
  createBrowserRouter,
  RouterProvider as LibraryRouterProvider,
  type RouteObject,
} from "react-router-dom";

type Props = {
  routes: RouteObject[];
};

const RouterProvider: React.FC<Props> = ({ routes }) => (
  <LibraryRouterProvider router={createBrowserRouter(routes)} />
);

export { RouterProvider };
