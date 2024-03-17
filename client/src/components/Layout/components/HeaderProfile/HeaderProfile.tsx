import { Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useGlobalState from "~/hooks/useGlobalState";
import { actions } from "~/store";

function HeaderProfile() {
    const { state, dispatch } = useGlobalState();

    const handleLogout = () => {
        document.cookie = "jwt=, expires=Thu, 01 Jan 1970 00:00:00 GMT";
        dispatch(actions.setUnauthentication());
    };

    return (
        <Nav>
            <NavDropdown
                style={{
                    fontWeight: "bold",
                }}
                title={state.username || "Chưa đăng nhập"}
            >
                <NavDropdown.Item onClick={handleLogout}>
                    Đăng xuất
                </NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
}

export default HeaderProfile;
