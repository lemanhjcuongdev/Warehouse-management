import {
    ChangeEventHandler,
    FormEventHandler,
    memo,
    useCallback,
    useRef,
    useState,
} from "react";
import { Button, Col, Form, FormLabel, Modal, Row } from "react-bootstrap";

interface iRegisterModalProps {
    show: true | false;
    onHide: () => void;
}

interface iRegisterDataProps {
    name: string;
    email: string;
    gender: "M" | "F" | "O";
    phone: string;
    start_date: Date;
    username: string;
    password: string;
    login_status?: 0;
    id_created?: number;
    disabled: 0;
}

const initialState: iRegisterDataProps = {
    name: "",
    email: "",
    gender: "M",
    phone: "",
    start_date: new Date(),
    username: "",
    password: "",
    login_status: 0,
    id_created: 1,
    disabled: 0,
};

function RegisterModal(props: iRegisterModalProps) {
    const { show, onHide } = props;
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState<iRegisterDataProps>(initialState);

    const startDateRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value, name } = e.target;
        setFormData(
            (prev) =>
                (prev = {
                    ...prev,
                    [name]: value,
                })
        );
    };

    const validateForm = () => {
        //validate startDate <= now
        const dateInput = startDateRef.current;

        if (dateInput && dateInput.value.length > 0) {
            const date = new Date(dateInput.value);
            const now = new Date(Date.now());

            if (date > now) {
                dateInput.setCustomValidity(
                    "Ngày bắt đầu làm không thể trong tương lai"
                );
                dateInput.reportValidity();
                return false;
            } else {
                dateInput.setCustomValidity("");
                dateInput.reportValidity();
                return true;
            }
        } else return false;
    };

    const handleSubmit: FormEventHandler<HTMLButtonElement> = (e) => {
        const form = e.currentTarget;

        if (form.checkValidity() === false || validateForm() === false) {
            setValidated(true);
            return;
        }
        console.log(formData);

        e.preventDefault();
        e.stopPropagation();
    };

    const handleCancel = () => {
        setFormData(initialState);
        setValidated(false);
        onHide();
    };

    return (
        <Modal backdrop="static" show={show} onHide={onHide} keyboard={false}>
            <Modal.Header>
                <Modal.Title>Thêm mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    noValidate
                    validated={validated}
                    ref={formRef}
                    autoComplete="off"
                >
                    <Row>
                        <Form.Group as={Col}>
                            <FormLabel>Họ và tên</FormLabel>
                            <Form.Control
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <Form.Control.Feedback type="invalid">
                                Bắt buộc nhập
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Bắt buộc nhập
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridGender">
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Select required>
                                <option value="M">Nam</option>
                                <option value="F">Nữ</option>
                                <option value="O">Khác</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Bắt buộc nhập
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPhone">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="tel"
                                pattern="[0]{1}[0-9]{9}"
                                required
                                minLength={10}
                                maxLength={10}
                                aria-describedby="PhoneHelpBlock"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <Form.Text id="PhoneHelpBlock" muted>
                                Bắt đầu từ 0 và có 10 số
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Bắt buộc nhập
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridStartDate">
                            <Form.Label>Ngày vào làm</Form.Label>
                            <Form.Control
                                type="date"
                                required
                                ref={startDateRef}
                                name="start_date"
                                value={formData.start_date.toString()}
                                onChange={handleChange}
                                onBlur={() => validateForm()}
                            />
                            <Form.Control.Feedback type="invalid">
                                Bắt buộc nhập
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridUsername">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control
                            required
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Bắt buộc nhập
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridPassword">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            required
                            minLength={4}
                            aria-describedby="PasswordHelpBlock"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Form.Text id="PasswordHelpBlock" muted>
                            Tối thiểu 4 ký tự
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            Bắt buộc nhập
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Huỷ
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Thêm mới
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RegisterModal;
