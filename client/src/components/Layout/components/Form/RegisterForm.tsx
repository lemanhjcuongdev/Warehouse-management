import { Dispatch, SetStateAction } from "react";
import { Col, Form, FormLabel, Row } from "react-bootstrap";

interface iRegisterFormProps {
    setFormData: Dispatch<SetStateAction<null>>;
}

function RegisterForm(props: iRegisterFormProps) {
    const { setFormData } = props;

    const handlePostNewUser = () => {};

    return (
        <Form>
            <Row>
                <Form.Group as={Col}>
                    <FormLabel>Họ và tên</FormLabel>
                    <Form.Control placeholder="Lê Mạnh Cường" />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control placeholder="Hai Bà Trưng, Hà Nội" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Tên đăng nhập</Form.Label>
                <Form.Control placeholder="cuonglm" />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Thành phố</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Quận</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Phường</Form.Label>
                    <Form.Control />
                </Form.Group>
            </Row>
        </Form>
    );
}

export default RegisterForm;
