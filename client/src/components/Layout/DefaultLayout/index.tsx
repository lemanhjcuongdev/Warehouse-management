import { Container } from "react-bootstrap";
import Header from "./Header/Header";
import { ReactElement } from "react";

interface iDefaultLayout {
    children: ReactElement;
}

function DefaultLayout({ children }: iDefaultLayout) {
    return (
        <Container>
            <Header />
            <Container className="container-fluid">{children}</Container>
        </Container>
    );
}

export default DefaultLayout;
