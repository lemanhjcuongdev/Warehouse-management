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
    Alert,
    Button,
    Col,
    Form,
    FormLabel,
    Modal,
    Row,
} from "react-bootstrap";
import { createImportOrder } from "~/apis/importOrderAPI";
import { getAllWarehouses } from "~/apis/warehouseAPI";
import { initImportOrderData } from "~/views/ImportOrderView/ImportOrderView";
import {
    iGoodsItemProps,
    iGoodsTypeProps,
    iGoodsUnitProps,
    iImportOrderProps,
    iProviderProps,
    iWarehouseItemProps,
} from "~/views/types";
import { iModalTypes } from "./types";
import { getAllProviders } from "~/apis/providerAPI";
import { Link } from "react-router-dom";
import { getAllGoods } from "~/apis/goodsAPI";

interface iWarehouseSlots {
    warehouse: {
        totalFloors: number;
        totalSlotsPerFloor: number;
    };
    goodsSlots: {
        idWarehouse: number;
        floor: number;
        slot: number;
        idGoods: number;
        name: string;
    }[];
}
interface iSlotsProp {
    floor: number;
    slot: number;
    good?: {
        floor: number;
        idGoods: number;
        idWarehouse: number;
        name: string;
        slot: number;
    };
}

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

    const handleChange: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > = (e) => {
        const { value, name } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
        //trim()
        // formData.name = formData.name.trim();
        // formData.idType = +formData.idType;
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

        // updateGoods(formData).then(() => {
        //     listData.forEach((data, index) => {
        //         if (data.idGoods === formData.idGoods) {
        //             //deep clone
        //             const newData = [...listData];
        //             newData.splice(index, 1, {
        //                 ...data,
        //                 name: formData.name,
        //                 username: formData.username,
        //                 disabled: formData.disabled,
        //             });
        //             setListData(newData);
        //         }
        //     });
        // });
        handleCancel();
    };

    const handleCancel = () => {
        setFormData(initImportOrderData);
        setValidated(false);
        onHide();
    };

    return (
        <Modal
            backdrop={modalType.type === "create" ? "static" : undefined}
            show={show}
            onHide={onHide}
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
                        <Col lg={6}>
                            <Form.Group>
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
                                    onChange={handleChange}
                                    autoComplete="off"
                                >
                                    {providers.map((provider) => (
                                        <option
                                            key={provider.idProviders}
                                            value={provider.idProviders}
                                        >
                                            {provider.name} - {provider.address}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Bắt buộc nhập
                                </Form.Control.Feedback>
                            </Form.Group>
                            <hr />
                            <h4 className="my-3">Chi tiết đơn hàng</h4>
                            <Form.Group className="my-3">
                                <FormLabel className="d-flex justify-content-between">
                                    Tên mặt hàng&nbsp;
                                    <Link to={"/list/goods"}>
                                        <Button size="sm">
                                            Thêm mặt hàng mới
                                        </Button>
                                    </Link>
                                </FormLabel>
                                <Form.Select
                                    required
                                    name="idGoods"
                                    // value={}
                                    // onChange={handleChange}
                                    autoComplete="off"
                                >
                                    {goods.map((good) => (
                                        <option>{good.name}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Bắt buộc nhập
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="my-3">
                                <FormLabel>Số lượng</FormLabel>
                                <Form.Control
                                    required
                                    name="amount"
                                    // value={formData.orderDate}
                                    // onChange={handleChange}
                                    autoComplete="off"
                                    type="number"
                                    min={1}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Bắt buộc nhập
                                </Form.Control.Feedback>
                                <Form.Text muted>
                                    Số lượng mỗi lần nhập phải lớn hơn 1
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Button
                                    className="my-3"
                                    variant="outline-success"
                                    style={{
                                        width: "100%",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Thêm chi tiết đơn hàng
                                </Button>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            
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

export type { iSlotsProp, iWarehouseSlots };
export default memo(ImportOrderModal);
