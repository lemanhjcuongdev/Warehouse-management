import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { iModalTypes } from "~/components/Layout/components/Modal/types";
import { getCookie } from "~/utils/cookies";
import { iGoodsItemProps, iGoodsProps } from "../types";
import { getAllGoods } from "~/apis/goodsAPI";
import GoodsModal from "~/components/Layout/components/Modal/GoodsModal";
import GoodsTable from "~/components/Layout/components/Table/GoodsListTable/GoodsTable";
import { Link, useParams } from "react-router-dom";

const initGoodsItem: iGoodsItemProps = {
    idGoods: 0,
    name: "",
    exp: "",
    amount: 0,
    disabled: 0,
};
const initGoodsInfo: iGoodsProps = {
    idGoods: 0,
    idType: 0,
    idUnit: 0,
    idWarehouse: 0,
    name: "",
    floor: 0,
    slot: 0,
    importDate: "",
    exp: "",
    amount: 0,
    idCreated: 0,
    usernameCreated: "",
    createdAt: new Date(),
    disabled: 0,
};

function GoodsView() {
    const params = useParams();
    const action = params.action;
    const initShowModal = action ? true : false;
    const [showModal, setShowModal] = useState(initShowModal);
    const [modalType, setModalType] = useState<iModalTypes>({ type: "create" });
    const [listData, setListData] = useState<iGoodsItemProps[]>([
        initGoodsItem,
    ]);
    const [formData, setFormData] = useState<iGoodsProps>(initGoodsInfo);

    const handleSetListData = useCallback(() => {
        getAllGoods().then((data) => setListData(data));
    }, []);

    useEffect(() => {
        handleSetListData();
    }, [handleSetListData]);

    const handleToggleShowModal = useCallback(() => {
        setShowModal(!showModal);
        setModalType({ type: "create" });
    }, [showModal]);

    return (
        <>
            <h2>Danh sách hàng hoá</h2>
            <Button onClick={handleToggleShowModal} className="my-sm-3 me-3">
                <i className="fa-solid fa-plus"></i>
                &nbsp; Thêm mặt hàng mới
            </Button>
            <Link to={"/list/import-orders"}>
                <Button className="my-3">
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>&nbsp;
                    Đặt đơn nhập kho mới
                </Button>
            </Link>
            <GoodsModal
                show={showModal}
                onHide={handleToggleShowModal}
                listData={listData}
                setListData={setListData}
                modalType={modalType}
                formData={formData}
                setFormData={setFormData}
            />
            <GoodsTable
                listData={listData}
                setListData={setListData}
                toggleShowModal={handleToggleShowModal}
                setModalType={setModalType}
                setFormData={setFormData}
            />
        </>
    );
}

export { initGoodsItem, initGoodsInfo };
export default GoodsView;