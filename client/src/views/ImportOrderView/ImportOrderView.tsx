import { useCallback, useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { getAllImportOrderByStatus } from "~/apis/importOrderAPI";
import ImportOrderModal from "~/components/Layout/components/Modal/ImportOrderModal";
import { iModalTypes } from "~/components/Layout/components/Modal/types";

import { iImportOrderProps } from "~/views/types";

const initImportOrderData: iImportOrderProps = {
    idImportOrders: 1,
    orderDate: "",
    idProvider: 1,
    status: 1,
};

function ImportOrderView() {
    //SHARED PROPS
    const [key, setKey] = useState("in-process");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<iModalTypes>({ type: "create" });
    const [listData, setListData] = useState<iImportOrderProps[]>([
        initImportOrderData,
    ]);
    const [formData, setFormData] =
        useState<iImportOrderProps>(initImportOrderData);

    //HANDLER
    const handleSelected = useCallback(() => {
        let statusCode: number = 0;
        switch (key) {
            case "in-process":
                statusCode = 0;
                break;
            case "finished":
                statusCode = 1;
                break;
            case "failed":
                statusCode = 2;
                break;
        }
        getAllImportOrderByStatus(statusCode).then((data) => setListData(data));
    }, [key]);

    useEffect(() => {
        handleSelected();
    }, [handleSelected]);

    const handleToggleShowModal = () => {
        setShowModal(!showModal);
        setModalType({ type: "create" });
    };

    return (
        <>
            <h2>Danh sách đơn nhập kho</h2>
            <Tabs
                defaultActiveKey="in-process"
                activeKey={key}
                id="fill-tabs"
                className="my-3"
                variant="pills"
                fill
                justify
                onSelect={(key) => {
                    key && setKey(key);
                }}
            >
                <Tab eventKey="in-process" title="Đang xử lý">
                    {key === "in-process" && (
                        <>
                            <hr />
                            <Button
                                onClick={handleToggleShowModal}
                                className="mb-3"
                            >
                                <i className="fa-solid fa-plus"></i>
                                &nbsp; Thêm mới
                            </Button>

                            <ImportOrderModal
                                show={showModal}
                                onHide={handleToggleShowModal}
                                listData={listData}
                                setListData={setListData}
                                modalType={modalType}
                                formData={formData}
                                setFormData={setFormData}
                            />

                            {/* <GoodsGroupTable
                                l={l}
                                setListData={setListData}
                                toggleShowModal={handleToggleShowModal}
                                setModalType={setModalType}
                                setFormData={setFormData}
                            /> */}
                        </>
                    )}
                </Tab>
                <Tab eventKey="finished" title="Đã hoàn thành"></Tab>
                <Tab eventKey="failed" title="Đã huỷ bỏ"></Tab>
            </Tabs>
        </>
    );
}

export { initImportOrderData };
export default ImportOrderView;
