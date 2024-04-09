import {
    ChangeEventHandler,
    Dispatch,
    FormEventHandler,
    SetStateAction,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { Button, Form, FormLabel, Modal, Row } from "react-bootstrap";
import { updateExportReceipt } from "~/apis/exportReceiptAPI";
import { getCookie } from "~/utils/cookies";
import {
    initExportOrder,
    initExportReceipt,
} from "~/views/ExportReceiptView/ExportReceiptView";
import { iExportOrderProps, iExportReceiptItemProps } from "~/views/types";
import QRCodeScanner from "../QRCodeScanner/QRCodeScanner";
import { iModalTypes, iPrintExportReceipt } from "./types";
import { initProcessingData } from "~/views/ProcessorView/ProcessorView";

function ProcessorModal(props: {
    show: true | false;
    onHide: () => void;
    listData: iExportReceiptItemProps[];
    setListData: Dispatch<SetStateAction<iExportReceiptItemProps[]>>;
    modalType: iModalTypes;
    formData: iPrintExportReceipt;
    setFormData: Dispatch<React.SetStateAction<iPrintExportReceipt>>;
}) {
    const {
        show,
        onHide,
        listData,
        setListData,
        modalType,
        formData,
        setFormData,
    } = props;
    const [validated, setValidated] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    let title: string;

    switch (modalType.type) {
        case "create":
            title = "Xác nhận";
            break;
        case "update":
            title = "Xem thông tin";
            break;
    }

    const handleChangeReceiptInput: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > = (e) => {
        const { value } = e.target;
        const idExportOrder = listData.find(
            (receipt) => receipt.idExportReceipts === +value
        )?.idExportOrder2.idExportOrders;

        if (idExportOrder) {
            setFormData({
                idExportReceipts: +value,
                idExportOrder: idExportOrder,
            });
        } else setFormData(initProcessingData);
    };

    const validateForm = () => {
        const form = formRef.current;
        const idUpdated = getCookie("id");
        formData.idExportOrder = +formData.idExportOrder;
        formData.idExportReceipts = +formData.idExportReceipts;

        if (form && form.checkValidity() === false) {
            setValidated(true);
            return false;
        }

        return true;
    };

    const handleUpdateListData = (data: iPrintExportReceipt) => {
        setFormData(data);
    };

    const handleSubmitCreate: FormEventHandler<HTMLButtonElement> = useCallback(
        (e) => {
            const isValidated = validateForm();
            e.preventDefault();
            e.stopPropagation();

            //call API
            if (isValidated) {
                updateExportReceipt(formData.idExportReceipts, 1)
                    .then((data) => {
                        data && setListData((prev) => [data, ...prev]);
                        if (!data.error) {
                            handleCancel();
                        }
                    })
                    .catch((error) => console.log(error));
            }
        },
        [formData, setListData]
    );

    const handleCancel = () => {
        setFormData(initProcessingData);
        setValidated(false);
        onHide();
    };

    console.log("LIST DATA: ", listData);

    return (
        <Modal
            backdrop={modalType.type === "create" ? "static" : undefined}
            show={show}
            onHide={handleCancel}
            keyboard={false}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>{`${title} đóng gói`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    noValidate
                    validated={validated}
                    ref={formRef}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <Row className="mb-3">
                        <Form.Group>
                            <QRCodeScanner
                                handleUpdateListData={handleUpdateListData}
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            {modalType.type === "create" ? (
                                <>
                                    <FormLabel>
                                        Mã phiếu xuất chọn thủ công &nbsp;
                                    </FormLabel>
                                    <Form.Select
                                        required
                                        name="idExportReceipts"
                                        value={formData.idExportReceipts}
                                        onChange={handleChangeReceiptInput}
                                    >
                                        <option value={0}>
                                            ----Chọn phiếu xuất kho----
                                        </option>
                                        {listData.length > 0 &&
                                            listData.map((order) => (
                                                <option
                                                    key={order.idExportReceipts}
                                                    value={
                                                        formData.idExportReceipts
                                                    }
                                                >
                                                    ID phiếu:{" "}
                                                    {order?.idExportReceipts} -
                                                    ID đơn:{" "}
                                                    {
                                                        order?.idExportOrder2
                                                            .idExportOrders
                                                    }
                                                </option>
                                            ))}
                                    </Form.Select>
                                    <Form.Text muted>
                                        Chỉ những phiếu đã xuất kho mới có thể
                                        xử lý
                                    </Form.Text>
                                </>
                            ) : (
                                <>
                                    <FormLabel>Mã phiếu xuất</FormLabel>
                                    <Form.Control
                                        value={`ID: ${formData.idExportOrder}`}
                                        readOnly
                                    ></Form.Control>
                                </>
                            )}
                            <Form.Control.Feedback type="invalid">
                                Bắt buộc chọn
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
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
                        Xác nhận đóng gói
                    </Button>
                ) : (
                    <></>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default memo(ProcessorModal);
