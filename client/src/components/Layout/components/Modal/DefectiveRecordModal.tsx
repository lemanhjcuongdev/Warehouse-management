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
import {
    Accordion,
    Alert,
    Button,
    CloseButton,
    Col,
    Form,
    FormLabel,
    Modal,
    Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllGoods } from "~/apis/goodsAPI";
import { createImportOrder, updateImportOrder } from "~/apis/importOrderAPI";
import { getAllProviders } from "~/apis/providerAPI";
import { initImportOrderData } from "~/views/ImportOrderView/ImportOrderView";
import {
    iGoodsItemProps,
    iImportOrderDetailProps,
    iDefectiveRecordProps,
    iProviderProps,
} from "~/views/types";
import OrderDetailTable from "../Table/ImportOrderListTable/OrderDetailTable";
import { iModalTypes } from "./types";
import { IMPORT_ORDER_DETAIL_KEY } from "~/constants/localStorage";
import { getCookie } from "~/utils/cookies";
import stringToDate from "~/utils/stringToDate";
import { initRecordData } from "~/views/DefectiveRecordView/DefectiveRecordView";

function DefectiveRecordModal(props: {
    show: true | false;
    onHide: () => void;
    listData: iDefectiveRecordProps[];
    setListData: Dispatch<SetStateAction<iDefectiveRecordProps[]>>;
    modalType: iModalTypes;
    formData: iDefectiveRecordProps;
    setFormData: Dispatch<React.SetStateAction<iDefectiveRecordProps>>;
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
    const importDateRef = useRef<HTMLInputElement>(null);
    const expRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    let title: string;
    const [goods, setGoods] = useState<iGoodsItemProps[]>([]);
    const [providers, setProviders] = useState<iProviderProps[]>([]);
    const initDetail = {
        idGoods: 1,
        amount: 1,
    };
    const [currentDetail, setCurrentDetail] =
        useState<iImportOrderDetailProps>(initDetail);

    switch (modalType.type) {
        case "create":
            title = "Thêm mới";
            break;
        case "update":
            title = "Xem / Chỉnh sửa thông tin";
            break;
    }

    useEffect(() => {
        getAllProviders().then((data) => setProviders(data));
        getAllGoods().then((data) => setGoods(data));
    }, []);

    const renderButtons = () => {
        // switch (formData.status) {
        //     case 0:
        //         return (
        //             <>
        //                 <Button
        //                     variant="warning"
        //                     type="submit"
        //                     onClick={handleSubmitUpdate}
        //                 >
        //                     Cập nhật chỉnh sửa
        //                 </Button>
        //                 <Button variant="dark">Huỷ đơn</Button>
        //                 <Button>KT duyệt</Button>
        //                 <Button variant="info">
        //                     GĐ duyệt - Gửi đơn đặt hàng cho nhà cung cấp
        //                 </Button>
        //             </>
        //         );
        //     case 1:
        //         return (
        //             <>
        //                 <Button variant="dark">Huỷ đơn</Button>
        //                 <Button variant="info">
        //                     GĐ duyệt - Gửi đơn đặt hàng cho nhà cung cấp
        //                 </Button>
        //             </>
        //         );
        //     case 2:
        //         return (
        //             <>
        //                 <Button variant="success">Hoàn thành</Button>
        //                 <Button variant="dark">Huỷ đơn</Button>
        //             </>
        //         );
        //     default:
        return <></>;
        // }
    };

    const handleChangeOrderInput: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case "idGoods":
            case "amount":
                setCurrentDetail((prev) => {
                    return {
                        ...prev,
                        [name]: +value,
                    };
                });
                break;
            default:
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                }));
        }
    };

    const customValidateDate = () => {
        const importDate = importDateRef.current;
        const exp = expRef.current;

        //validate startDate <= now
        if (importDate && importDate.value.length > 0) {
            const date = new Date(importDate.value);
            const now = new Date(Date.now());

            if (date > now) {
                importDate.setCustomValidity(
                    "Ngày nhập kho không thể trong tương lai"
                );
                importDate.reportValidity();
                return false;
            } else {
                importDate.setCustomValidity("");
                importDate.reportValidity();
            }
        }

        if (exp && exp.value.length > 0) {
            const date = new Date(exp.value);
            const now = new Date(Date.now());

            if (date <= now) {
                exp.setCustomValidity("Ngày hết hạn không thể trong quá khứ");
                exp.reportValidity();
                return false;
            } else {
                exp.setCustomValidity("");
                exp.reportValidity();
            }
        }
        return true;
    };

    const validateForm = () => {
        const form = formRef.current;
        const idCreated = getCookie("id");
        formData.date = new Date().toString();
        formData.idUser = +idCreated;
        formData.idUpdated = +idCreated;

        if (
            (form && form.checkValidity() === false) ||
            customValidateDate() === false
        ) {
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
            // isValidated &&
            //     createImportOrder(formData)
            //         .then((data) => {
            //             data && setListData((prev) => [...prev, data]);
            //             if (!data.error) {
            //                 handleCancel();
            //             }
            //         })
            //         .catch((error) => console.log(error));
        },
        [formData, setListData]
    );

    const handleSubmitUpdate: FormEventHandler<HTMLButtonElement> = (e) => {
        const isValidated = validateForm();
        e.preventDefault();
        e.stopPropagation();
        if (!isValidated) return;

        // updateImportOrder(formData).then(() => {
        //     listData.forEach((data, index) => {
        //         if (data.idImportOrders === formData.idImportOrders) {
        //             //deep clone
        //             const newData = [...listData];
        //             newData.splice(index, 1, formData);
        //             setListData(newData);
        //         }
        //     });
        // });
        handleCancel();
    };

    const handleCancel = () => {
        sessionStorage.removeItem(IMPORT_ORDER_DETAIL_KEY);
        setFormData(initRecordData);
        setValidated(false);
        onHide();
    };

    return (
        <Modal
            backdrop={modalType.type === "create" ? "static" : undefined}
            show={show}
            onHide={handleCancel}
            keyboard={false}
            fullscreen={"xl-down"}
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>{`${title} đơn nhập kho`}</Modal.Title>
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
                        <Col lg={6}></Col>

                        <Col lg={6}>
                            <h4 className="mb-3">Chi tiết đơn hàng</h4>
                            {/* <OrderDetailTable
                                goods={goods}
                                listData={formData.importOrderDetails}
                                setListData={handleAddOrderDetail}
                                setFormData={setFormData}
                                formData={formData}
                            /> */}
                        </Col>
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
                                    formData.date &&
                                    stringToDate(formData.date?.toString())
                                } bởi ${formData.idUser}`}
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
                    renderButtons()
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default memo(DefectiveRecordModal);
