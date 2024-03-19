import {
    ChangeEventHandler,
    FormEventHandler,
    memo,
    useCallback,
    useRef,
    useState,
} from "react";
import {
    Alert,
    Button,
    Col,
    Form,
    FormLabel,
    Modal,
    Row,
} from "react-bootstrap";
import { createUser } from "~/apis/userAPI";
import { getCookie } from "~/utils/cookies";
import { iModalTypes, iUserDataProps, iUserModalProps } from "./types";

function UserModal(props: iUserModalProps) {
    const { show, onHide, setListData } = props;
    const [modalType, setModalType] = useState<iModalTypes>({ type: "create" });
    const managerId = getCookie("id") || 1;
    const [validated, setValidated] = useState(false);
    const initialState: iUserDataProps = {
        name: "",
        email: "",
        gender: "M",
        phone: "",
        start_date: "",
        username: "",
        password: "",
        id_created: +managerId,
        disabled: 0,
    };
    const [formData, setFormData] = useState<iUserDataProps>(initialState);

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
    const handleSelectedChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const { value } = e.target;
        if (value === "M" || value === "F" || value === "O") {
            setFormData(
                (prev) =>
                    (prev = {
                        ...prev,
                        gender: value,
                    })
            );
        }
    };

    const validateForm = () => {
        const dateInput = startDateRef.current;

        //validate startDate <= now
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
            }
        }

        return true;
    };

    const handleSubmit: FormEventHandler<HTMLButtonElement> = useCallback(
        (e) => {
            const form = formRef.current;

            //trim()
            formData.name = formData.name.trim();
            formData.email = formData.email.trim();
            formData.phone = formData.phone.trim();
            formData.username = formData.username.trim();
            formData.password = formData.password.trim();
            if (
                (form && form.checkValidity() === false) ||
                validateForm() === false
            ) {
                setValidated(true);
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            console.log(formData);

            //call API
            createUser(formData)
                .then((data) => {
                    data &&
                        setListData((prev) => [
                            ...prev,
                            {
                                ...data,
                            },
                        ]);
                })
                .then(() => handleCancel())
                .catch((error) => console.log(error.message));
        },
        []
    );

    const handleCancel = () => {
        setFormData(initialState);
        setValidated(false);
        onHide();
    };

    return (
        <Modal
            backdrop="static"
            show={show}
            onHide={onHide}
            keyboard={false}
            fullscreen={"sm-down"}
        >
            <Modal.Header>
                <Modal.Title>Thêm mới nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    noValidate
                    validated={validated}
                    ref={formRef}
                    autoComplete="off"
                    onSubmit={(e) => e.preventDefault()}
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
                            <Form.Select
                                required
                                onChange={handleSelectedChange}
                            >
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
                <Alert variant="info">
                    Các khoảng trắng trước và sau giá trị sẽ bị loại bỏ. Vui
                    lòng kiểm tra kỹ thông tin!
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="reset" onClick={handleCancel}>
                    Huỷ
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Thêm mới
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export type { iUserDataProps };
export default memo(UserModal);
