import Home from "~/pages/Home/HomePage";
import Detail from "~/pages/Detail/DetailPage";
import ListData from "~/pages/ListData/ListDataPage";
import Login from "~/pages/Login/LoginPage";
import Empty from "~/pages/Empty/Empty";

interface iRoute {
    path: string;
    component: () => JSX.Element;
    layout?: string | null;
}

const publicRoutes: Array<iRoute> = [
    { path: "/", component: Home },
    { path: "/detail", component: Detail },
    { path: "/list/:category", component: ListData },
    { path: "/list/:category/:action", component: ListData },
    { path: "*", component: Home },
];

const privateRoutes: Array<iRoute> = [
    { path: "/login", component: Login, layout: null },
    { path: "*", component: Empty, layout: null },
];

export { publicRoutes, privateRoutes };
