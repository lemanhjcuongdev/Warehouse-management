import { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

function ToastNotification() {
    const [show, setShow] = useState(false);
    return (
        <>
            <ToastContainer position="top-end">
                <Toast
                    className="d-inline-block m-1"
                    bg={"success"}
                    delay={3000}
                    autohide
                    onClose={() => setShow(false)}
                    show={show}
                >
                    <Toast.Header>
                        <i className="fa-solid fa-check"></i>
                        &nbsp;
                        <strong className="me-auto">
                            Đăng nhập thành công
                        </strong>
                    </Toast.Header>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default ToastNotification;
