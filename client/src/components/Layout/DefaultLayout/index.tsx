import { Container } from "react-bootstrap";
import Header from "./Header/Header";
import { Fragment, ReactElement } from "react";
import Footer from "./Footer/Footer";

interface iDefaultLayout {
    children: ReactElement;
}

function DefaultLayout({ children }: iDefaultLayout) {
    return (
        <>
            <Container>
                <Header />
                <Container className="container-fluid">{children}</Container>
            </Container>
            <Footer />
        </>
    );
}

export default DefaultLayout;
