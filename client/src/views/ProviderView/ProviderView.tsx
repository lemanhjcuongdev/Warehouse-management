import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ProviderModal from "~/components/Layout/components/Modal/ProviderModal";
import { iModalTypes } from "~/components/Layout/components/Modal/types";
import { getCookie } from "~/utils/cookies";
import { iProviderProps } from "../types";
import { getAllProviders } from "~/apis/providerAPI";
import ProviderTable from "~/components/Layout/components/Table/ProviderListTable/ProviderTable";

const initProviderData: iProviderProps = {
    idProviders: 1,
    name: "",
    address: "",
    deletedAt: new Date(),
};

function ProviderView() {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<iModalTypes>({ type: "create" });
    const [listData, setListData] = useState<iProviderProps[]>([
        initProviderData,
    ]);
    const [formData, setFormData] = useState<iProviderProps>(initProviderData);

    const handleSetListData = useCallback(() => {
        const jwt = getCookie("jwt");
        if (jwt) {
            getAllProviders().then((data) => setListData(data));
        }
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
            <h2>Danh sách nhà cung cấp</h2>

            <Button onClick={handleToggleShowModal} className="my-3">
                <i className="fa-solid fa-plus"></i>
                &nbsp; Thêm mới
            </Button>

            <ProviderModal
                show={showModal}
                onHide={handleToggleShowModal}
                listData={listData}
                setListData={setListData}
                modalType={modalType}
                formData={formData}
                setFormData={setFormData}
            />

            <ProviderTable
                listData={listData}
                setListData={setListData}
                toggleShowModal={handleToggleShowModal}
                setModalType={setModalType}
                setFormData={setFormData}
            />
        </>
    );
}

export { initProviderData };
export default ProviderView;
