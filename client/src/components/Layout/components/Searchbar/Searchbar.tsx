import { Button, Col, Form, Nav, NavDropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchBar({ props }: any) {
    return (
        <>
            <Form>
                <Row>
                    <Col xs="auto">
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm trong kho ..."
                            className=" mr-sm-2"
                        />
                    </Col>
                    <Col className="p-0">
                        <Button variant="search" type="button">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </Col>
                    <Col>
                        <Nav>
                            <NavDropdown title="Lê Mạnh Cường">
                                <NavDropdown.Item as={Link} to={"/list-data"}>
                                    Quản lý nhân viên
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to={"/"}>
                                    Đăng xuất
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default SearchBar;
