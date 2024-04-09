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
import {
    getAllExportReceiptByStatus,
    updateExportReceipt,
} from "~/apis/exportReceiptAPI";
import { getCookie } from "~/utils/cookies";
import { initProcessingData } from "~/views/ProcessorView/ProcessorView";
import { iExportReceiptItemProps } from "~/views/types";
import QRCodeScanner from "../QRCodeScanner/QRCodeScanner";
import { iModalTypes, iPrintExportReceipt } from "./types";

function ProcessorModal(props: {
    show: true | false;
    onHide: () => void;
    tabKey: "packed" | "classified" | string;
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
        tabKey,
    } = props;
    const [validated, setValidated] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [unprocessedOrders, setUnprocessedOrders] = useState<
        iExportReceiptItemProps[]
    >([]);

    useEffect(() => {
        const statusCode = tabKey === "packed" ? 0 : 1;
        getAllExportReceiptByStatus(statusCode).then((data) =>
            setUnprocessedOrders(data)
        );
    }, [tabKey, listData]);

    let title: string;
    const process = tabKey === "packed" ? " đóng gói " : " phân loại ";
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
        const idExportOrder = unprocessedOrders.find(
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

    const handleSubmit: FormEventHandler<HTMLButtonElement> = useCallback(
        (e) => {
            const isValidated = validateForm();
            const idUpdated = +getCookie("id");
            e.preventDefault();
            e.stopPropagation();

            const submitType = tabKey === "packed" ? 1 : 2;

            //call API
            if (isValidated) {
                updateExportReceipt(
                    formData.idExportReceipts,
                    submitType,
                    idUpdated
                )
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
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                handleCancel();
                onHide();
            }}
            fullscreen={"sm-down"}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>{`${title} ${process}`}</Modal.Title>
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
                                        Mã phiếu xuất kho (chọn thủ công nếu
                                        không quét được mã QR) &nbsp;
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
                                        {unprocessedOrders.length > 0 &&
                                            unprocessedOrders.map((order) => (
                                                <option
                                                    key={order.idExportReceipts}
                                                    value={
                                                        order.idExportReceipts
                                                    }
                                                >
                                                    ID phiếu xuất:{" "}
                                                    {order?.idExportReceipts} -
                                                    ID đơn xuất:{" "}
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
                                        value={`ID phiếu xuất: ${formData.idExportReceipts} - ID đơn xuất: ${formData.idExportOrder}`}
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
                <Button
                    variant="secondary"
                    type="reset"
                    onClick={() => {
                        handleCancel();
                        onHide();
                    }}
                >
                    Đóng
                </Button>
                {modalType.type === "create" ? (
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Xác nhận {process}
                    </Button>
                ) : (
                    <></>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default memo(ProcessorModal);
