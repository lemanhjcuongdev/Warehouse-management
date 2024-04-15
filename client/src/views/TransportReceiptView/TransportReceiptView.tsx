import { ReactNode, useCallback, useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { getAllTransportReceiptByStatus } from "~/apis/transportReceiptAPI";
import { iModalTypes } from "~/components/Layout/components/Modal/types";

import TransportReceiptModal from "~/components/Layout/components/Modal/TransportReceiptModal";
import TransportReceiptTable from "~/components/Layout/components/Table/TransportReceiptsTable/TransportReceiptTable";
import {
    iTransportReceiptItemProps,
    iTransportReceiptProps,
} from "~/views/types";

const initTransportReceipt: iTransportReceiptProps = {
    idUserSend: 0,
    idUserReceive: 0,
    transportFromDate: "",
    transportToDate: "",
    idWarehouseFrom: 0,
    idWarehouseTo: 0,
    plateNumber: "",
    transportDetails: [],
    status: 0,
};
const initTransportReceiptItem: iTransportReceiptItemProps = {
    idTransportReceipts: 0,
    transportFromDate: "",
    transportToDate: "",
    idWarehouseTo: 0,
    idWarehouseFrom: 0,
    status: 0,
};

interface iTabProps {
    eventKey: string;
    title: ReactNode;
}

function TransportReceiptView() {
    //SHARED PROPS
    const [key, setKey] = useState("on_the_way");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<iModalTypes>({ type: "create" });
    const [listData, setListData] = useState<iTransportReceiptItemProps[]>([
        initTransportReceiptItem,
    ]);
    const [formData, setFormData] =
        useState<iTransportReceiptProps>(initTransportReceipt);

    const tabs: iTabProps[] = [
        {
            eventKey: "on_the_way",
            title: "Đang điều chuyển",
        },
        {
            eventKey: "finished",
            title: "Đã điều chuyển",
        },
    ];

    //HANDLER
    const handleSelected = useCallback(() => {
        let statusCode: number = 0;
        switch (key) {
            case "on_the_way":
                statusCode = 3;
                break;
            case "finished":
                statusCode = 4;
                break;
        }
        getAllTransportReceiptByStatus(statusCode).then((data) =>
            setListData(data)
        );
    }, [key]);

    useEffect(() => {
        handleSelected();
    }, [handleSelected]);

    const handleToggleShowModal = () => {
        setShowModal(!showModal);
        setModalType({ type: "create" });
    };

    console.log("RECEIPT DATA: ", formData);
    return (
        <>
            <h2>Danh sách phiếu điều chuyển kho</h2>
            <Tabs
                defaultActiveKey="on_the_way"
                activeKey={key}
                id="fill-tabs"
                className="my-3"
                variant="pills"
                fill
                justify
                style={{
                    fontWeight: "bold",
                }}
                onSelect={(key) => {
                    key && setKey(key);
                }}
            >
                {tabs.map((tab) => (
                    <Tab
                        key={tab.eventKey}
                        eventKey={tab.eventKey}
                        title={tab.title}
                    >
                        {key === tab.eventKey && (
                            <>
                                <hr />
                                {key === "on_the_way" && (
                                    <Button
                                        onClick={handleToggleShowModal}
                                        className="mb-3"
                                        variant="outline-primary"
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                        &nbsp; Thêm mới
                                    </Button>
                                )}

                                <TransportReceiptModal
                                    show={showModal}
                                    onHide={handleToggleShowModal}
                                    listData={listData}
                                    setListData={setListData}
                                    modalType={modalType}
                                    formData={formData}
                                    setFormData={setFormData}
                                />

                                <TransportReceiptTable
                                    tabKey={key}
                                    listData={listData}
                                    setListData={setListData}
                                    toggleShowModal={handleToggleShowModal}
                                    setModalType={setModalType}
                                    setFormData={setFormData}
                                />
                            </>
                        )}
                    </Tab>
                ))}
            </Tabs>
        </>
    );
}

export { initTransportReceipt, initTransportReceiptItem };
export default TransportReceiptView;
