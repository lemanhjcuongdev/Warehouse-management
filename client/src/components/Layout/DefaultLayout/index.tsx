import { ReactElement } from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

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
