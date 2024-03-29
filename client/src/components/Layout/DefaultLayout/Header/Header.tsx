import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import DropdownMenu from "../../components/Dropdown/NavDropdownMenu";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import SearchBar from "../../components/Searchbar/Searchbar";
import navbar_items from "../../../../constants/navbar-items";

function Header() {
    const navbarItems = navbar_items;

    return (
        <Navbar expand="xl">
            <NavLink className="navbar-brand" to="/">
                <img
                    width="75px"
                    height="30px"
                    src="https://deo.shopeemobile.com/shopee/shopee-spx-live-vn/static/media/spx-express.f3023639.svg"
                    alt="SPX Express"
                />
                {/* Hệ thống quản lý kho hàng */}
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-between"
            >
                <Nav>
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
                <SearchBar />
                <HeaderProfile />
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
