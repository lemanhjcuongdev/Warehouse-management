import Home from '~/pages/Home/HomePage';
import Detail from '~/pages/Detail/DetailPage';
import ListData from '~/pages/ListData/ListDataPage';

interface iRoute {
    path: string,
    component: () => JSX.Element,
    layout?: string | null
}

const publicRoutes: Array<iRoute> = [
    {path: "/", component: Home},
    {path: "/detail", component: Detail},
    {path: "/list-data", component: ListData},

]

const privateRoutes: Array<iRoute> = []

export {publicRoutes, privateRoutes}