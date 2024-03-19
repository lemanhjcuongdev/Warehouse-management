import { NavDropdown } from "react-bootstrap";
import { iNavbarItem } from "../../../../constants/navbar-items";
import { Link } from "react-router-dom";

function DropdownMenu(props: { items: iNavbarItem }): React.ReactElement {
    const items = props.items;

    return (
        <NavDropdown id="basic-navbar-nav" title={items.label}>
            {items.children &&
                items.children.map((item, index) => (
                    <NavDropdown.Item as={Link} to={item.to} key={index}>
                        {item.label}
                    </NavDropdown.Item>
                ))}
        </NavDropdown>
    );
}

export default DropdownMenu;
