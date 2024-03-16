import { useEffect, useState } from "react";
import { Modal, ModalBody, Spinner } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { getUserById } from "./apis/auth";
import { DefaultLayout } from "./components/Layout";
import useGlobalState from "./hooks/useGlobalState";
import { privateRoutes, publicRoutes } from "./routes/routes";
import { actions } from "./store";
import { getCookie } from "./utils/cookies";

function App() {
    const { state, dispatch } = useGlobalState();
    const { isAuthentication } = state;
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        //load authentic state
        if (!isAuthentication) {
            const userId = getCookie("id");
            const jwt = getCookie("jwt");
            if (userId && jwt) {
                getUserById({
                    id: +userId,
                    jwt: jwt,
                })
                    .then((data) => {
                        dispatch(
                            actions.setAuthentication({
                                userId: data.idUsers,
                                username: data.username,
                            })
                        );
                    })
                    .catch((error) => console.log(error))
                    .finally(() => setLoading(false));
            } else setLoading(false);
        }
    }, [isAuthentication]);

    const routes = isAuthentication ? publicRoutes : privateRoutes;

    return (
        <>
            <Modal fullscreen={true} show={isLoading} animation={false}>
                <ModalBody className="d-flex align-items-sm-center justify-content-center">
                    <Spinner animation="border" role="status" />
                </ModalBody>
            </Modal>

            <Router>
                <div className="App">
                    <Routes>
                        {routes.map((route, index) => {
                            const Layout =
                                route.layout === null
                                    ? Fragment
                                    : DefaultLayout;
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
        </>
    );
}

export default App;
