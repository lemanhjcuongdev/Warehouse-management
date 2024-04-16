import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import DropdownMenu from "../../components/Dropdown/NavDropdownMenu";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import SearchBar from "../../components/Searchbar/Searchbar";
import navbar_items from "../../../../constants/navbar-items";
import { useState } from "react";

function Header() {
    const navbarItems = navbar_items;
    const [expanded, setExpanded] = useState(true);

    return (
        <Navbar
            collapseOnSelect
            expanded={expanded}
            expand="xl"
            sticky="top"
            className="mb-3"
            style={{
                backgroundColor: "white",
                boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }}
        >
            <Container>
                <NavLink className="navbar-brand" to="/">
                    <img
                        width="75px"
                        height="30px"
                        src="https://deo.shopeemobile.com/shopee/shopee-spx-live-vn/static/media/spx-express.f3023639.svg"
                        alt="SPX Express"
                    />
                    {/* Hệ thống quản lý kho hàng */}
                </NavLink>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-between"
                >
                    <Nav navbarScroll>
                        {navbarItems.map((item, index) => (
                            <Fragment key={index}>
                                {item.children ? (
                                    <DropdownMenu
                                        items={item}
                                        setExpanded={setExpanded}
                                    />
                                ) : (
                                    <Nav.Link
                                        as={Link}
                                        to={item.to}
                                        onClick={() => setExpanded(false)}
                                    >
                                        {item.label}
                                    </Nav.Link>
                                )}
                            </Fragment>
                        ))}
                    </Nav>
                    <SearchBar />
                    <HeaderProfile />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
