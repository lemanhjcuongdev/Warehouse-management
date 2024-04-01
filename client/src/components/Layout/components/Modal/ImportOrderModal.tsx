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
    iImportOrderProps,
    iProviderProps,
} from "~/views/types";
import OrderDetailTable from "../Table/ImportOrderListTable/OrderDetailTable";
import { iModalTypes } from "./types";
import { IMPORT_ORDER_DETAIL_KEY } from "~/constants/localStorage";
import { getCookie } from "~/utils/cookies";
import stringToDate from "~/utils/stringToDate";

function ImportOrderModal(props: {
    show: true | false;
    onHide: () => void;
    listData: iImportOrderProps[];
    setListData: Dispatch<SetStateAction<iImportOrderProps[]>>;
    modalType: iModalTypes;
    formData: iImportOrderProps;
    setFormData: Dispatch<React.SetStateAction<iImportOrderProps>>;
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
        switch (formData.status) {
            case 0:
                return (
                    <>
                        <Button
                            variant="warning"
                            type="submit"
                            onClick={handleSubmitUpdate}
                        >
                            Cập nhật chỉnh sửa
                        </Button>
                        <Button variant="dark">Huỷ đơn</Button>
                        <Button>KT duyệt</Button>
                        <Button variant="info">
                            GĐ duyệt - Gửi đơn đặt hàng cho nhà cung cấp
                        </Button>
                    </>
                );
            case 1:
                return (
                    <>
                        <Button variant="dark">Huỷ đơn</Button>
                        <Button variant="info">
                            GĐ duyệt - Gửi đơn đặt hàng cho nhà cung cấp
                        </Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <Button variant="success">Hoàn thành</Button>
                        <Button variant="dark">Huỷ đơn</Button>
                    </>
                );
            default:
                return <></>;
        }
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

    const handleAddOrderDetail = () => {
        const isExisted = formData.importOrderDetails.find(
            (detail) => detail.idGoods === currentDetail.idGoods
        );

        if (!isExisted) {
            setFormData((prev) => ({
                ...prev,
                importOrderDetails: [...prev.importOrderDetails, currentDetail],
            }));
            sessionStorage.setItem(
                IMPORT_ORDER_DETAIL_KEY,
                JSON.stringify({
                    ...formData,
                    importOrderDetails: [
                        ...formData.importOrderDetails,
                        currentDetail,
                    ],
                })
            );
            setCurrentDetail(initDetail);
        } else {
            alert("Hàng trùng trong danh sách, không thể thêm!");
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
        formData.orderDate = new Date().toString();
        formData.idCreated = +idCreated;
        formData.idUpdated = +idCreated;

        if (formData.importOrderDetails.length === 0) {
            alert("Vui lòng thêm chi tiết đơn nhập kho");
            return false;
        }
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
            isValidated &&
                createImportOrder(formData)
                    .then((data) => {
                        data && setListData((prev) => [...prev, data]);
                        if (!data.error) {
                            handleCancel();
                        }
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

        updateImportOrder(formData).then(() => {
            listData.forEach((data, index) => {
                if (data.idImportOrders === formData.idImportOrders) {
                    //deep clone
                    const newData = [...listData];
                    newData.splice(index, 1, formData);
                    setListData(newData);
                }
            });
        });
        handleCancel();
    };

    const handleCancel = () => {
        sessionStorage.removeItem(IMPORT_ORDER_DETAIL_KEY);
        setFormData(initImportOrderData);
        setValidated(false);
        onHide();
    };

    return (
        <Modal
            backdrop={modalType.type === "create" ? "static" : undefined}
            show={show}
            onHide={handleCancel}
            keyboard={false}
            fullscreen={formData.status < 3 ? true : undefined}
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
                        <Col lg={6}>
                            <Form.Group>
                                {formData.status === 0 ? (
                                    <>
                                        <FormLabel className="d-flex justify-content-between">
                                            Nhà cung cấp &nbsp;
                                            <Link to={"/list/providers"}>
                                                <Button size="sm">
                                                    Thêm nhà cung cấp mới
                                                </Button>
                                            </Link>
                                        </FormLabel>
                                        <Form.Select
                                            required
                                            name="idProvider"
                                            value={formData.idProvider}
                                            onChange={handleChangeOrderInput}
                                            autoComplete="off"
                                        >
                                            {providers.map((provider) => (
                                                <option
                                                    key={provider.idProviders}
                                                    value={provider.idProviders}
                                                >
                                                    {provider.name} - Đ/c:{" "}
                                                    {provider.address}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </>
                                ) : (
                                    <>
                                        <FormLabel className="d-flex justify-content-between">
                                            Nhà cung cấp
                                        </FormLabel>
                                        <Form.Control
                                            name="idProvider"
                                            value={`${formData.idProvider2?.name} - Đ/c: ${formData.idProvider2?.address}`}
                                            readOnly
                                        ></Form.Control>
                                    </>
                                )}
                                <Form.Control.Feedback type="invalid">
                                    Bắt buộc nhập
                                </Form.Control.Feedback>
                            </Form.Group>
                            <hr />
                            {formData.status === 0 && (
                                <>
                                    <Accordion
                                        defaultActiveKey={
                                            modalType.type === "create"
                                                ? "0"
                                                : ""
                                        }
                                    >
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Thêm chi tiết đơn hàng
                                                </span>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Group className="mb-3">
                                                    <FormLabel className="d-flex justify-content-between">
                                                        Tên mặt hàng&nbsp;
                                                        <Link
                                                            to={"/list/goods"}
                                                        >
                                                            <Button size="sm">
                                                                Thêm mặt hàng
                                                                mới
                                                            </Button>
                                                        </Link>
                                                    </FormLabel>
                                                    <Form.Select
                                                        required
                                                        name="idGoods"
                                                        value={
                                                            currentDetail.idGoods
                                                        }
                                                        onChange={
                                                            handleChangeOrderInput
                                                        }
                                                        autoComplete="off"
                                                    >
                                                        {goods.map((good) => (
                                                            <option
                                                                key={
                                                                    good.idGoods
                                                                }
                                                                value={
                                                                    good.idGoods
                                                                }
                                                            >
                                                                {good.name} -
                                                                ĐVT:{" "}
                                                                {
                                                                    good.idUnit2
                                                                        ?.name
                                                                }
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">
                                                        Bắt buộc nhập
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="my-3">
                                                    <FormLabel>
                                                        Số lượng
                                                    </FormLabel>
                                                    <Form.Control
                                                        required
                                                        name="amount"
                                                        value={
                                                            currentDetail.amount
                                                        }
                                                        onChange={
                                                            handleChangeOrderInput
                                                        }
                                                        autoComplete="off"
                                                        type="number"
                                                        min={1}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Bắt buộc nhập
                                                    </Form.Control.Feedback>
                                                    <Form.Text muted>
                                                        Số lượng mỗi lần nhập
                                                        phải lớn hơn 1
                                                    </Form.Text>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Button
                                                        variant="outline-success"
                                                        style={{
                                                            width: "100%",
                                                            fontWeight: "bold",
                                                        }}
                                                        onClick={
                                                            handleAddOrderDetail
                                                        }
                                                    >
                                                        Thêm chi tiết đơn hàng
                                                    </Button>
                                                </Form.Group>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <hr />
                                </>
                            )}
                        </Col>

                        <Col lg={6}>
                            <h4 className="mb-3">Chi tiết đơn hàng</h4>
                            <OrderDetailTable
                                goods={goods}
                                listData={formData.importOrderDetails}
                                setListData={handleAddOrderDetail}
                                setFormData={setFormData}
                                formData={formData}
                            />
                        </Col>
                    </Row>
                    {!(formData.status === 3 || formData.status === 4) && (
                        <>
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
                        </>
                    )}
                    {modalType.type === "update" && (
                        <>
                            <Form.Text>
                                {`Tạo lúc ${
                                    formData.orderDate &&
                                    stringToDate(formData.orderDate?.toString())
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
                    renderButtons()
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default memo(ImportOrderModal);
