import { Container } from "react-bootstrap";
import Header from "./Header/Header";
import { Fragment, ReactElement } from "react";
import Footer from "./Footer/Footer";
import ToastNotification from "../components/Toast/Toast";

interface iDefaultLayout {
    children: ReactElement;
}

function DefaultLayout({ children }: iDefaultLayout) {
    return (
        <>
            <Container>
                <Header />
                <ToastNotification />
                <Container className="container-fluid">{children}</Container>
            </Container>
            <Footer />
        </>
    );
}

export default DefaultLayout;
