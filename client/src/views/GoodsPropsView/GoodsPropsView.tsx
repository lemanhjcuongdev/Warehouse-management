import { useCallback, useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { getAllGoodsGroups } from "~/apis/goodsGroupAPI";
import { getAllGoodsUnits } from "~/apis/goodsUnitAPI";
import GoodsGroupModal from "~/components/Layout/components/Modal/GoodsGroupModal";
import GoodsUnitModal from "~/components/Layout/components/Modal/GoodsUnitModal";
import { iModalTypes } from "~/components/Layout/components/Modal/types";
import GoodsGroupTable from "~/components/Layout/components/Table/GoodsGroupListTable/GoodsGroupTable";
import GoodsUnitTable from "~/components/Layout/components/Table/GoodsUnitListTable/GoodsUnitTable";

import { getCookie } from "~/utils/cookies";
import { iGoodsGroupProps, iGoodsUnitProps } from "~/views/types";

const initGoodsGroupData: iGoodsGroupProps = {
    idGoodsGroups: -1,
    name: "",
    deletedAt: new Date(),
};

const initGoodsUnitData: iGoodsUnitProps = {
    idGoodsUnits: -1,
    name: "",
    deletedAt: new Date(),
};

function GoodsPropsView() {
    //SHARED PROPS
    const [key, setKey] = useState("goods-groups");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<iModalTypes>({ type: "create" });

    //GOODS GROUPS
    const [groupListData, setGroupListData] = useState<iGoodsGroupProps[]>([
        {
            idGoodsGroups: -1,
            name: "",
            deletedAt: new Date(),
        },
    ]);
    const [groupFormData, setGroupFormData] =
        useState<iGoodsGroupProps>(initGoodsGroupData);
    //GOODS UNITS
    const [unitListData, setUnitListData] = useState<iGoodsUnitProps[]>([
        {
            idGoodsUnits: -1,
            name: "",
            deletedAt: new Date(),
        },
    ]);
    const [unitFormData, setUnitFormData] =
        useState<iGoodsUnitProps>(initGoodsUnitData);

    //HANDLER
    const handleSetListData = useCallback(() => {
        const jwt = getCookie("jwt");
        if (jwt) {
            switch (key) {
                case "goods-groups":
                    getAllGoodsGroups().then((data) => setGroupListData(data));
                    break;
                case "goods-units":
                    getAllGoodsUnits().then((data) => setUnitListData(data));
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
            <h2>Danh sách các thuộc tính hàng hoá</h2>

            <Tabs
                defaultActiveKey="goods-groups"
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
                <Tab eventKey="goods-groups" title="Nhóm hàng">
                    {key === "goods-groups" && (
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
                <Tab eventKey="goods-types" title="Loại hàng">
                    Tab content for Loại hàng
                </Tab>
                <Tab eventKey="goods-units" title="Đơn vị tính">
                    {key === "goods-units" && (
                        <>
                            <Button
                                onClick={handleToggleShowModal}
                                className="my-3"
                            >
                                <i className="fa-solid fa-plus"></i>
                                &nbsp; Thêm mới
                            </Button>

                            <GoodsUnitModal
                                show={showModal}
                                onHide={handleToggleShowModal}
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

export { initGoodsGroupData, initGoodsUnitData };
export default GoodsPropsView;
