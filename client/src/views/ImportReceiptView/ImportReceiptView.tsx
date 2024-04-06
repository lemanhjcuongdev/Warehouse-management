import { ReactNode, useCallback, useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { getAllImportReceiptByStatus } from "~/apis/importReceiptAPI";
import ImportReceiptModal from "~/components/Layout/components/Modal/ImportReceiptModal";
import { iModalTypes } from "~/components/Layout/components/Modal/types";
import ReceiptTable from "~/components/Layout/components/Table/ImportReceiptsTable/ReceiptTable";
import { IMPORT_RECEIPT_DETAIL_KEY } from "~/constants/localStorage";

import { iImportReceiptItemProps, iImportReceiptProps } from "~/views/types";
import { initImportOrderData } from "../ImportOrderView/ImportOrderView";
import { initProviderData } from "../ProviderView/ProviderView";
import { initialWarehouseDataState } from "../WarehouseView/WarehouseView";

let initImportReceipt: iImportReceiptProps = {
    idImportReceipts: 0,
    idWarehouse: 0,
    idImportOrder: 0,
    idProvider: 0,
    idUserImport: 0,
    importDate: "",
    status: 0,
    idImportOrder2: initImportOrderData,
    idProvider2: initProviderData,
    idWarehouse2: initialWarehouseDataState,
    usernameCreated: "",
};
let initImportReceiptItem: iImportReceiptItemProps = {
    idImportReceipts: 0,
    idWarehouse: 0,
    idWarehouse2: {
        address: "",
        idWarehouse: 0,
        name: "",
        totalFloors: 0,
        totalSlots: 0,
        disabled: 0,
    },
    idImportOrder: 0,
    importDate: "",
    status: 0,
};

interface iTabProps {
    eventKey: string;
    title: ReactNode;
}

function ImportReceiptView() {
    //SHARED PROPS
    const [key, setKey] = useState("finished");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<iModalTypes>({ type: "create" });
    const [listData, setListData] = useState<iImportReceiptItemProps[]>([
        initImportReceiptItem,
    ]);
    const [formData, setFormData] =
        useState<iImportReceiptProps>(initImportReceipt);
    //get continuousData from session storage
    useEffect(() => {
        const continuousReceipt = sessionStorage.getItem(
            IMPORT_RECEIPT_DETAIL_KEY
        );
        if (continuousReceipt) {
            setFormData(JSON.parse(continuousReceipt));
        }
    }, []);
    const tabs: iTabProps[] = [
        {
            eventKey: "finished",
            title: "Đã nhập kho",
        },
        {
            eventKey: "failed",
            title: "Đã huỷ bỏ",
        },
    ];

    //HANDLER
    const handleSelected = useCallback(() => {
        let statusCode: number = 0;
        switch (key) {
            case "finished":
                statusCode = 0;
                break;
            case "failed":
                statusCode = 1;
                break;
        }
        getAllImportReceiptByStatus(statusCode).then((data) =>
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

    console.log("FORM DATA: ", formData);

    return (
        <>
            <h2>Danh sách phiếu nhập kho</h2>
            <Tabs
                defaultActiveKey="finished"
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
                                {key === "finished" && (
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

                                <ImportReceiptModal
                                    show={showModal}
                                    onHide={handleToggleShowModal}
                                    listData={listData}
                                    setListData={setListData}
                                    modalType={modalType}
                                    formData={formData}
                                    setFormData={setFormData}
                                />

                                <ReceiptTable
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

export { initImportReceipt, initImportReceiptItem };
export default ImportReceiptView;
