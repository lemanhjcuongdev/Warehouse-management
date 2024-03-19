import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getAllUser } from "~/apis/userAPI";
import RegisterModal from "~/components/Layout/components/Modal/UserModal";
import DataTable from "~/components/Layout/components/Table/DataTable";
import { getCookie } from "~/utils/cookies";
import { iUserItemProps } from "./types";

function ListData() {
    const params = useParams();
    const slug = params.category;
    let category: string = "";
    const [showModal, setShowModal] = useState(false);
    const [listData, setListData] = useState<iUserItemProps[]>([
        {
            name: "",
            idUsers: -1,
            username: "",
            email: "",
            disabled: 0,
        },
    ]);

    switch (slug) {
        case "goods":
            category = "hàng hoá";
            break;
        case "users":
            category = "nhân viên";
            break;
        default:
    }

    useEffect(() => {
        handleSetListData();
    }, []);

    const handleSetListData = useCallback(() => {
        const jwt = getCookie("jwt");
        if (jwt) {
            getAllUser({ jwt }).then((data) => setListData(data));
        }
    }, [listData]);

    const handleToggleShowModal = useCallback(
        () => setShowModal(!showModal),
        [showModal]
    );

    return (
        <>
            <h2>Danh sách {category}</h2>

            <Button onClick={handleToggleShowModal} className="my-3">
                <i className="fa-solid fa-plus"></i>
                &nbsp; Thêm mới
            </Button>

            {slug === "users" && (
                <>
                    <RegisterModal
                        show={showModal}
                        onHide={handleToggleShowModal}
                        setListData={setListData}
                    />
                </>
            )}
            <DataTable listData={listData} setListData={setListData} />
        </>
    );
}

export default ListData;
