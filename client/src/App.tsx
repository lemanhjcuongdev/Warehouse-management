import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";
import { DefaultLayout } from "./components/Layout";
import { Fragment } from "react/jsx-runtime";

function App() {
    const isLogin = true;
    let routes = privateRoutes;
    if (isLogin) routes = publicRoutes;
    return (
        <Router>
            <div className="App">
                <Routes>
                    {routes.map((route, index) => {
                        const Layout =
                            route.layout === null ? Fragment : DefaultLayout;
                        const Page = route.component;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
