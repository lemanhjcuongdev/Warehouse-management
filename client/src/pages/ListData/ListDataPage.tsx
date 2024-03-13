import { useState } from "react";
import { Button } from "react-bootstrap";
import RegisterModal from "~/components/Layout/components/Modal/RegisterModal";

function ListData() {
    const [show, setShow] = useState(false);

    const handleToggleShow = () => setShow(!show);

    return (
        <>
            <h2>DANH SÁCH</h2>
            <Button onClick={handleToggleShow}>Thêm</Button>
            <RegisterModal show={show} onHide={handleToggleShow} />
        </>
    );
}

export default ListData;
