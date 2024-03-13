import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Login() {
    return (
        <Container fluid className={cx("homepage-container")}>
            <div className={cx("wrapper")}>
                <Row md="auto" className={cx("row-container")}>
                    <Col md="auto" className={cx("col-container", "mx-auto")}>
                        <Form className="p-4">
                            <h2 className="mb-4 text-center">Đăng nhập</h2>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Tên đăng nhập</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ví dụ: cuonglm"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Tối thiểu 4 ký tự"
                                />
                            </Form.Group>
                            <FormGroup className="mb-3">
                                <Link to="#">Quên mật khẩu</Link>
                            </FormGroup>
                            <Button variant="primary" type="submit">
                                Đăng nhập
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default Login;
