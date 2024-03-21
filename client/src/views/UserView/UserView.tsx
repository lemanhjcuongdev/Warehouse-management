import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getAllUser } from "~/apis/userAPI";
import UserModal from "~/components/Layout/components/Modal/UserModal";
import {
    iModalTypes,
    iUserDataProps,
} from "~/components/Layout/components/Modal/types";
import UserTable from "~/components/Layout/components/Table/ListUserTable/UserTable";
import ROLES from "~/constants/roles";
import { iUserItemProps } from "~/pages/ListData/types";
import { getCookie } from "~/utils/cookies";

const managerId = getCookie("id") || 1;
const initialUserDataState: iUserDataProps = {
    name: "",
    email: "",
    gender: "M",
    phone: "",
    startDate: "",
    username: "",
    password: "",
    idCreated: +managerId,
    disabled: 0,
    idPermissions: ROLES[0].idPermissions,
};

function UserView() {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<iModalTypes>({ type: "create" });
    const [listData, setListData] = useState<iUserItemProps[]>([
        {
            name: "",
            idUsers: -1,
            username: "",
            email: "",
            disabled: 0,
        },
    ]);

    const [formData, setFormData] =
        useState<iUserDataProps>(initialUserDataState);

    const handleSetListData = useCallback(() => {
        const jwt = getCookie("jwt");
        if (jwt) {
            getAllUser().then((data) => setListData(data));
        }
    }, []);

    useEffect(() => {
        handleSetListData();
    }, [handleSetListData]);

    const handleToggleShowModal = useCallback(() => {
        setShowModal(!showModal);
        setModalType({ type: "create" });
    }, [showModal]);
    console.log(modalType);

    return (
        <>
            <h2>Danh sách nhân viên</h2>

            <Button onClick={handleToggleShowModal} className="my-3">
                <i className="fa-solid fa-plus"></i>
                &nbsp; Thêm mới
            </Button>

            <UserModal
                show={showModal}
                onHide={handleToggleShowModal}
                setListData={setListData}
                modalType={modalType}
                formData={formData}
                setFormData={setFormData}
            />

            <UserTable
                listData={listData}
                setListData={setListData}
                toggleShowModal={handleToggleShowModal}
                setModalType={setModalType}
                setFormData={setFormData}
            />
        </>
    );
}

export { initialUserDataState };
export default UserView;
