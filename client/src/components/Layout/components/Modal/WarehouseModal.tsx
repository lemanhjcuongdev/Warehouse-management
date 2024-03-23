import {
    ChangeEventHandler,
    Dispatch,
    FormEventHandler,
    SetStateAction,
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

import { iUserItemProps, iWarehouseItemProps } from "~/views/types";
import { getCookie } from "~/utils/cookies";
import stringToDate from "~/utils/stringToDate";
import { initialWarehouseDataState } from "~/views/WarehouseView/WarehouseView";
import { iModalTypes, iUserDataProps, iWarehouseDataProps } from "./types";
import { createWarehouse } from "~/apis/warehouseAPI";

function UserModal(props: {
    show: true | false;
    onHide: () => void;
    setListData: Dispatch<SetStateAction<iWarehouseItemProps[]>>;
    modalType: iModalTypes;
    formData: iWarehouseDataProps;
    setFormData: Dispatch<React.SetStateAction<iWarehouseDataProps>>;
}) {
    const { show, onHide, setListData, modalType, formData, setFormData } =
        props;
    const [validated, setValidated] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    let title: string;

    switch (modalType.type) {
        case "create":
            title = "Thêm mới";
            break;
        case "update":
            title = "Xem / Chỉnh sửa thông tin";
            break;
    }

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
        const form = formRef.current;

        //trim()
        formData.name = formData.name.trim();
        formData.address = formData.address.trim();
        formData.totalFloors = +formData.totalFloors;
        formData.totalSlots = +formData.totalSlots;

        if (form && form.checkValidity() === false) {
            setValidated(true);
            return false;
        }

        return true;
    };

    const handleSubmitCreate: FormEventHandler<HTMLButtonElement> = useCallback(
        (e) => {
            const isValidated = validateForm();
            e.preventDefault();
            e.stopPropagation();

            //call API
            isValidated &&
                createWarehouse(formData)
                    .then((data) => {
                        data &&
                            setListData((prev) => [
                                ...prev,
                                {
                                    ...data,
                                },
                            ]);
                        !data.error && handleCancel();
                    })
                    .catch((error) => console.log(error));
        },
        [formData, setListData]
    );

    const handleSubmitUpdate: FormEventHandler<HTMLButtonElement> = (e) => {
        const isValidated = validateForm();
        e.preventDefault();
        e.stopPropagation();
        if (!isValidated) return;
        const managerId = +getCookie("id");

        setFormData(
            (prev) =>
                (prev = {
                    ...prev,
                    idUpdated: managerId,
                })
        );

        // updateUser(formData);
    };

    const handleCancel = () => {
        setFormData(initialWarehouseDataState);
        setValidated(false);
        onHide();
    };

    return (
        <Modal
            backdrop={modalType.type === "create" ? "static" : undefined}
            show={show}
            onHide={onHide}
            keyboard={false}
            fullscreen="sm-down"
        >
            <Modal.Header>
                <Modal.Title>{`${title} kho hàng`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    noValidate
                    validated={validated}
                    ref={formRef}
                    autoComplete="off"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <Row className="mb-3">
                        <Form.Group controlId="formGridName">
                            <FormLabel>Tên kho hàng</FormLabel>
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
                        <Form.Group controlId="formGridAddress">
                            <Form.Label>Địa chỉ kho hàng</Form.Label>
                            <Form.Control
                                required
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Bắt buộc nhập
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridtotalFloors">
                            <FormLabel>Số tầng chứa</FormLabel>
                            <Form.Control
                                required
                                name="totalFloors"
                                type="number"
                                min={1}
                                value={formData.totalFloors}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <Form.Control.Feedback type="invalid">
                                Bắt buộc nhập
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridtotalSlots">
                            <Form.Label>Số kệ chứa mỗi tầng</Form.Label>
                            <Form.Control
                                required
                                name="totalSlots"
                                type="number"
                                min={1}
                                value={formData.totalSlots}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Bắt buộc nhập
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Check
                            required
                            label="Đã kiểm tra kỹ thông tin"
                            feedback="Vui lòng đánh dấu checkbox này để gửi thông tin!"
                            feedbackType="invalid"
                        />
                    </Form.Group>
                    <Alert variant="info">
                        Vui lòng kiểm tra kỹ thông tin!
                    </Alert>
                    {modalType.type === "update" && (
                        <>
                            <Form.Text>
                                {`Tạo lúc ${
                                    formData.createdAt &&
                                    stringToDate(formData.createdAt?.toString())
                                } bởi ${formData.usernameCreated}`}
                            </Form.Text>
                            <br />
                            <Form.Text>
                                {`Sửa đổi lần cuối lúc ${
                                    formData.updatedAt &&
                                    stringToDate(formData.updatedAt?.toString())
                                } bởi ${formData.usernameUpdated}`}
                            </Form.Text>
                        </>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="reset" onClick={handleCancel}>
                    {modalType.type === "update" ? "Đóng" : "Huỷ"}
                </Button>
                {modalType.type === "create" ? (
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmitCreate}
                    >
                        Thêm mới
                    </Button>
                ) : (
                    <Button
                        variant="warning"
                        type="submit"
                        onClick={handleSubmitUpdate}
                    >
                        Cập nhật chỉnh sửa
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export type { iUserDataProps };
export default memo(UserModal);
