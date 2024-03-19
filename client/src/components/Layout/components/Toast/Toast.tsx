import { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

interface iToastProps {
    title: string;
    message?: string;
}

function ToastNotification(toastData: iToastProps) {
    const [show, setShow] = useState(true);

    return (
        <>
            <ToastContainer position="bottom-start">
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
                        <strong className="me-auto">{toastData?.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{toastData?.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export type { iToastProps };
export default ToastNotification;
