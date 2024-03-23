import { Dispatch, SetStateAction, memo } from "react";
import { Table } from "react-bootstrap";
import { iUserItemProps, iWarehouseItemProps } from "~/views/types";
import { iModalTypes, iWarehouseDataProps } from "../../Modal/types";
import WarehouseTableRow from "./WarehouseTableRow";

function UserTable(props: {
    listData: iWarehouseItemProps[];
    setListData: Dispatch<SetStateAction<iWarehouseItemProps[]>>;
    toggleShowModal: () => void;
    setModalType: Dispatch<SetStateAction<iModalTypes>>;
    setFormData: Dispatch<React.SetStateAction<iWarehouseDataProps>>;
}) {
    const {
        listData,
        setListData,
        toggleShowModal,
        setModalType,
        setFormData,
    } = props;
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên kho</th>
                    <th>Địa chỉ</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                {listData.map((item, index) => (
                    <WarehouseTableRow
                        key={item.idWarehouse}
                        item={item}
                        index={index}
                        setListData={setListData}
                        toggleShowModal={toggleShowModal}
                        setModalType={setModalType}
                        setFormData={setFormData}
                    />
                ))}
            </tbody>
        </Table>
    );
}

export default memo(UserTable);
