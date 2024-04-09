import { ReactNode, useCallback, useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { getAllExportReceiptByStatus } from "~/apis/exportReceiptAPI";
// import ExportReceiptModal from "~/components/Layout/components/Modal/ExportReceiptModal";
import { iModalTypes } from "~/components/Layout/components/Modal/types";
// import ReceiptTable from "~/components/Layout/components/Table/ExportReceiptsTable/ReceiptTable";

import {
    iExportDetailProps,
    iExportOrderProps,
    iExportReceiptItemProps,
    iExportReceiptProps,
    iGoodsItemProps,
} from "~/views/types";
import { initialWarehouseDataState } from "../WarehouseView/WarehouseView";
import {
    getDistricts,
    getProvinces,
    getWards,
    iDistrictProps,
    iProvinceProps,
    iWardProps,
} from "~/apis/provinceAPI";
import { getAllGoods } from "~/apis/goodsAPI";
import { createExportOrder } from "~/apis/exportOrderAPI";
import ExportReceiptModal from "~/components/Layout/components/Modal/ExportReceiptModal";
import ExportReceiptTable from "~/components/Layout/components/Table/ExportReceiptsTable/ExportReceiptTable";

const initExportOrder: iExportOrderProps = {
    idExportOrders: 0,
    orderDate: "",
    provinceCode: "",
    districtCode: "",
    wardCode: "",
    address: "",
    status: 0,
    exportOrderDetails: [],
};
const initExportReceipt: iExportReceiptProps = {
    idExportReceipts: 0,
    idWarehouse: 0,
    idExportOrder: 0,
    idUserExport: 0,
    exportDate: "",
    status: 0,
    palletCode: 0,
    idExportOrder2: initExportOrder,
    idWarehouse2: initialWarehouseDataState,
    usernameCreated: "",
};
const initExportReceiptItem: iExportReceiptItemProps = {
    idExportReceipts: 0,
    idWarehouse: 0,
    idWarehouse2: {
        address: "",
        idWarehouse: 0,
        name: "",
        totalFloors: 0,
        totalSlots: 0,
        disabled: 0,
    },
    idExportOrder2: initExportOrder,
    exportDate: "",
    status: 0,
};

interface iTabProps {
    eventKey: string;
    title: ReactNode;
}

function ExportReceiptView() {
    //SHARED PROPS
    const [key, setKey] = useState("finished");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<iModalTypes>({ type: "create" });
    const [listData, setListData] = useState<iExportReceiptItemProps[]>([
        initExportReceiptItem,
    ]);
    const [formData, setFormData] =
        useState<iExportReceiptProps>(initExportReceipt);
    //get continuousData from session storage
    const [provinces, setProvinces] = useState<iProvinceProps[]>([]);
    const [districts, setDistricts] = useState<iDistrictProps[]>([]);
    const [wards, setWards] = useState<iWardProps[]>([]);
    const [goods, setGoods] = useState<iGoodsItemProps[]>([]);

    useEffect(() => {
        getAllGoods().then((data) => {
            setGoods(data);
        });
    }, []);

    //TOGGLE AUTO GENERATE EXPORT ORDERS
    // useEffect(() => {
    //     const orderInterval = setInterval(() => {
    //         generateRandomOrder();
    //     }, 10000);

    //     return () => clearInterval(orderInterval);
    // }, []);

    const tabs: iTabProps[] = [
        {
            eventKey: "finished",
            title: "Đã xuất kho",
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

    console.log("RECEIPT DATA: ", formData);

    //AUTO GENERATE EXPORT ORDER (SIMULATE SHOPEE ORDER API)
    const generateRandomOrder = async () => {
        //GENERATE RANDOM PROVINCE OF ORDER
        const provinceData = await getProvinces();
        if (!provinceData) return;
        setProvinces(provinceData);
        const randomProvinceIndex = Math.floor(
            Math.random() * (provinceData?.length - 1)
        );
        const provinceCode = provinceData[randomProvinceIndex].province_id;

        const districtData = await getDistricts(provinceCode);
        if (!districtData) return;
        setDistricts(districtData);
        const randomDistrictIndex = Math.floor(
            Math.random() * (districtData?.length - 1)
        );
        const districtCode = districtData[randomDistrictIndex].district_id;

        const wardData = await getWards(districtCode);
        if (!wardData) return;
        setWards(wardData);
        const randomWardIndex = Math.floor(
            Math.random() * (wardData?.length - 1)
        );
        const wardCode = wardData[randomWardIndex].ward_id;
        const address = `Số 3 ngách 121/33 tổ 3`;
        const exportOrderDetails: iExportDetailProps[] = [];
        const detailCount = Math.floor(Math.random() * (goods?.length - 1));
        for (let i = 0; i < detailCount; i++) {
            const randomGoodsIndex = Math.floor(
                Math.random() * (goods?.length - 1)
            );
            const randomGoodsId = goods[randomGoodsIndex].idGoods;
            const isExisted = exportOrderDetails.find(
                (detail) => detail.idGoods === randomGoodsId
            );
            if (isExisted) break;
            const randomAmount = Math.floor(Math.random() * 10);
            if (
                randomAmount > goods[randomGoodsIndex].amount ||
                randomAmount === 0
            )
                break;

            exportOrderDetails.push({
                idGoods: randomGoodsId,
                amount: randomAmount,
            });
        }
        const orderDate = new Date().toISOString();
        const exportOrder: iExportOrderProps = {
            orderDate,
            provinceCode,
            districtCode,
            wardCode,
            address,
            exportOrderDetails,
        };
        if (exportOrder.exportOrderDetails.length === 0) return;

        //call API
        createExportOrder(exportOrder).then(() =>
            console.log("CÓ ĐƠN HÀNG MỚI")
        );
    };

    return (
        <>
            <h2>Danh sách phiếu xuất kho</h2>
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

                                <ExportReceiptModal
                                    show={showModal}
                                    onHide={handleToggleShowModal}
                                    listData={listData}
                                    setListData={setListData}
                                    modalType={modalType}
                                    formData={formData}
                                    setFormData={setFormData}
                                />

                                <ExportReceiptTable
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

export { initExportReceipt, initExportReceiptItem, initExportOrder };
export default ExportReceiptView;
