import { useCallback, useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { getAllGoodsGroups } from "~/apis/goodsGroupAPI";
import { getAllGoodsTypes } from "~/apis/goodsTypeAPI";
import { getAllGoodsUnits } from "~/apis/goodsUnitAPI";
import GoodsGroupModal from "~/components/Layout/components/Modal/GoodsGroupModal";
import GoodsTypeModal from "~/components/Layout/components/Modal/GoodsTypeModal";
import GoodsUnitModal from "~/components/Layout/components/Modal/GoodsUnitModal";
import { iModalTypes } from "~/components/Layout/components/Modal/types";
import GoodsGroupTable from "~/components/Layout/components/Table/GoodsGroupListTable/GoodsGroupTable";
import GoodsTypeTable from "~/components/Layout/components/Table/GoodsTypeListTable/GoodsTypeTable";
import GoodsUnitTable from "~/components/Layout/components/Table/GoodsUnitListTable/GoodsUnitTable";

import { getCookie } from "~/utils/cookies";
import {
    iGoodsGroupProps,
    iGoodsTypeProps,
    iGoodsUnitProps,
} from "~/views/types";

const initGoodsGroupData: iGoodsGroupProps = {
    idGoodsGroups: 1,
    name: "",
    deletedAt: new Date(),
};

const initGoodsUnitData: iGoodsUnitProps = {
    idGoodsUnits: 1,
    name: "",
    deletedAt: new Date(),
};
const initGoodsTypeData: iGoodsTypeProps = {
    idGoodsTypes: 1,
    idGoodsGroup: 1,
    idGoodsGroup2: initGoodsGroupData,
    name: "",
    deletedAt: new Date(),
};

function ImportOrderView() {
    //SHARED PROPS
    const [key, setKey] = useState("in-process");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<iModalTypes>({ type: "create" });

    //GOODS GROUPS
    const [groupListData, setGroupListData] = useState<iGoodsGroupProps[]>([
        initGoodsGroupData,
    ]);
    const [groupFormData, setGroupFormData] =
        useState<iGoodsGroupProps>(initGoodsGroupData);
    //GOODS UNITS
    const [unitListData, setUnitListData] = useState<iGoodsUnitProps[]>([
        initGoodsUnitData,
    ]);
    const [unitFormData, setUnitFormData] =
        useState<iGoodsUnitProps>(initGoodsUnitData);
    //GOODS TYPES
    const [typeListData, setTypeListData] = useState<iGoodsTypeProps[]>([
        initGoodsTypeData,
    ]);
    const [typeFormData, setTypeFormData] =
        useState<iGoodsTypeProps>(initGoodsTypeData);

    //HANDLER
    const handleSetListData = useCallback(() => {
        const jwt = getCookie("jwt");
        if (jwt) {
            switch (key) {
                case "in-process":
                    getAllGoodsGroups().then((data) => setGroupListData(data));
                    break;
                case "finished":
                    getAllGoodsTypes().then((data) => setTypeListData(data));
                    break;
                case "failed":
                    break;
            }
        }
    }, [key]);

    useEffect(() => {
        handleSetListData();
    }, [handleSetListData]);

    const handleToggleShowModal = () => {
        setShowModal(!showModal);
        setModalType({ type: "create" });
    };

    return (
        <>
            <h2>Danh sách đơn nhập hàng</h2>

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
                            <Button
                                onClick={handleToggleShowModal}
                                className="my-3"
                            >
                                <i className="fa-solid fa-plus"></i>
                                &nbsp; Thêm mới
                            </Button>

                            <GoodsGroupModal
                                show={showModal}
                                onHide={handleToggleShowModal}
                                listData={groupListData}
                                setListData={setGroupListData}
                                modalType={modalType}
                                formData={groupFormData}
                                setFormData={setGroupFormData}
                            />

                            <GoodsGroupTable
                                listData={groupListData}
                                setListData={setGroupListData}
                                toggleShowModal={handleToggleShowModal}
                                setModalType={setModalType}
                                setFormData={setGroupFormData}
                            />
                        </>
                    )}
                </Tab>
                <Tab eventKey="finished" title="Đã hoàn thành">
                    {key === "finished" && (
                        <>
                            <GoodsTypeModal
                                show={showModal}
                                onHide={handleToggleShowModal}
                                typeListData={typeListData}
                                groupListData={groupListData}
                                setListData={setTypeListData}
                                modalType={modalType}
                                formData={typeFormData}
                                setFormData={setTypeFormData}
                            />

                            <GoodsTypeTable
                                listData={typeListData}
                                setListData={setTypeListData}
                                toggleShowModal={handleToggleShowModal}
                                setModalType={setModalType}
                                setFormData={setTypeFormData}
                            />
                        </>
                    )}
                </Tab>
                <Tab eventKey="failed" title="Đơn vị tính">
                    {key === "failed" && (
                        <>
                            <GoodsUnitModal
                                show={showModal}
                                onHide={handleToggleShowModal}
                                listData={unitListData}
                                setListData={setUnitListData}
                                modalType={modalType}
                                formData={unitFormData}
                                setFormData={setUnitFormData}
                            />

                            <GoodsUnitTable
                                listData={unitListData}
                                setListData={setUnitListData}
                                toggleShowModal={handleToggleShowModal}
                                setModalType={setModalType}
                                setFormData={setUnitFormData}
                            />
                        </>
                    )}
                </Tab>
            </Tabs>
        </>
    );
}

export { initGoodsGroupData, initGoodsUnitData, initGoodsTypeData };
export default ImportOrderView;
