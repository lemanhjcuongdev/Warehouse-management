import { Button, Col, Form, Row } from "react-bootstrap";

function SearchBar() {
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
                    <Col>
                        <Button variant="search" type="button">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default SearchBar;
