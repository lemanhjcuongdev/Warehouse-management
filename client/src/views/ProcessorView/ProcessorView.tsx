import { ReactNode, useCallback, useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { getAllExportReceiptByStatus } from "~/apis/exportReceiptAPI";
// import ExportReceiptModal from "~/components/Layout/components/Modal/ExportReceiptModal";
import {
    iModalTypes,
    iPrintExportReceipt,
} from "~/components/Layout/components/Modal/types";
// import ReceiptTable from "~/components/Layout/components/Table/ExportReceiptsTable/ReceiptTable";

import ProcessorModal from "~/components/Layout/components/Modal/ProcessorModal";
import ProcessorTable from "~/components/Layout/components/Table/ProcessorTable/ProcessorTable";
import { iExportReceiptItemProps } from "~/views/types";

const initProcessingData: iPrintExportReceipt = {
    idExportReceipts: 0,
    idExportOrder: 0,
};

interface iTabProps {
    eventKey: string;
    title: ReactNode;
}

function ProcessorView() {
    //SHARED PROPS
    const [key, setKey] = useState("packed");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<iModalTypes>({ type: "create" });
    const [listData, setListData] = useState<iExportReceiptItemProps[]>([]);
    const [formData, setFormData] =
        useState<iPrintExportReceipt>(initProcessingData);

    const tabs: iTabProps[] = [
        {
            eventKey: "packed",
            title: "Đã đóng gói",
        },
        {
            eventKey: "classified",
            title: "Đã phân loại",
        },
    ];

    //HANDLER
    const handleSelected = useCallback(() => {
        let statusCode: number = 0;
        switch (key) {
            case "packed":
                statusCode = 0;
                break;
            case "classified":
                statusCode = 1;
                break;
        }
        getAllExportReceiptByStatus(statusCode).then((data) =>
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

    console.log("SCAN DATA: ", formData);

    return (
        <>
            <h2>Danh sách hàng đang được xử lý</h2>
            <Tabs
                defaultActiveKey="packed"
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
                                <Button
                                    onClick={handleToggleShowModal}
                                    className="mb-3"
                                    variant="outline-primary"
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                >
                                    <i className="fa-solid fa-expand"></i>
                                    &nbsp; Xác nhận đóng gói
                                </Button>

                                <ProcessorModal
                                    show={showModal}
                                    onHide={handleToggleShowModal}
                                    listData={listData}
                                    setListData={setListData}
                                    modalType={modalType}
                                    formData={formData}
                                    setFormData={setFormData}
                                />

                                <ProcessorTable
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

export { initProcessingData };
export default ProcessorView;
