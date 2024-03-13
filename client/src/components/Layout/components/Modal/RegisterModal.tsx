import { Button, Modal } from "react-bootstrap";
import RegisterForm from "../Form/RegisterForm";
import { useState } from "react";

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
    login_status: 0;
    id_created: 1;
    disabled: 0;
}

function RegisterModal(props: iRegisterModalProps) {
    const { show, onHide } = props;
    const [formData, setFormData] = useState(null);
    return (
        <Modal backdrop="static" show={show} onHide={onHide} keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RegisterForm setFormData={setFormData} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Huỷ
                </Button>
                <Button variant="primary">Thêm mới</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RegisterModal;
