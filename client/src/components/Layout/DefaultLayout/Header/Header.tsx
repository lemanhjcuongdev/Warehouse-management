import { Fragment } from "react/jsx-runtime";
import { Button, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import navbar_items from "./navbar-item";
import DropdownMenu from "../../components/Dropdown/Dropdown";

function Header() {
    const navbarItems = navbar_items;

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <NavLink className="navbar-brand" to="/">
                    <img
                        src="https://deo.shopeemobile.com/shopee/shopee-spx-live-vn/static/media/spx-express.f3023639.svg"
                        alt="SPX Express"
                    />
                    Hệ thống quản lý kho hàng
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {navbarItems.map((item, index) => (
                            <Fragment key={index}>
                                {item.children ? (
                                    <DropdownMenu items={item} />
                                ) : (
                                    <Nav.Link as={Link} to={item.to}>
                                        {item.label}
                                    </Nav.Link>
                                )}
                            </Fragment>
                        ))}
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Tìm kiếm trong kho..."
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                    <Button variant="outline-primary">
                        {/* <Image src=""/> */}
                        Tìm kiếm
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
