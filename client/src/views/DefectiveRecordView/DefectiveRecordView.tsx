import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getAllWarehouses } from "~/apis/warehouseAPI";
import DefectiveRecordModal from "~/components/Layout/components/Modal/DefectiveRecordModal";
import WarehouseModal from "~/components/Layout/components/Modal/WarehouseModal";
import { iModalTypes } from "~/components/Layout/components/Modal/types";
import DefectiveRecordTable from "~/components/Layout/components/Table/DefectiveRecordListTable/DefectiveRecordTable";
import WarehouseTable from "~/components/Layout/components/Table/WarehouseListTable/WarehouseTable";
import { getCookie } from "~/utils/cookies";
import { iDefectiveRecordProps } from "~/views/types";

const initRecordData: iDefectiveRecordProps = {
    idDefectiveRecords: 1,
    date: "",
    idImportOrder: 1,
};

function DefectiveRecordView() {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<iModalTypes>({ type: "create" });
    const [listData, setListData] = useState<iDefectiveRecordProps[]>([
        initRecordData,
    ]);
    const [formData, setFormData] =
        useState<iDefectiveRecordProps>(initRecordData);

    const handleSetListData = useCallback(() => {
        //getAll().then((data) => setListData(data));
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
            <h2>Danh sách biên bản hàng lỗi / hỏng</h2>

            {/* <Button onClick={handleToggleShowModal} className="my-3">
                <i className="fa-solid fa-plus"></i>
                &nbsp; Thêm mới
            </Button> */}

            <DefectiveRecordModal
                show={showModal}
                onHide={handleToggleShowModal}
                listData={listData}
                setListData={setListData}
                modalType={modalType}
                formData={formData}
                setFormData={setFormData}
            />

            {/* <DefectiveRecordTable
                listData={listData}
                setListData={setListData}
                setFormData={setFormData}
            /> */}
        </>
    );
}

export { initRecordData };
export default DefectiveRecordView;
