import { Dispatch, SetStateAction, memo } from "react";
import { Table } from "react-bootstrap";
import { iUserItemProps } from "~/pages/ListData/types";
import { iModalTypes, iUserDataProps } from "../../Modal/types";
import UserTableRow from "./UserTableRow";

function UserTable(props: {
    listData: iUserItemProps[];
    setListData: Dispatch<SetStateAction<iUserItemProps[]>>;
    toggleShowModal: () => void;
    setModalType: Dispatch<SetStateAction<iModalTypes>>;
    setFormData: Dispatch<React.SetStateAction<iUserDataProps>>;
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
                    <th>Họ và tên</th>
                    <th>Username</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                {listData.map((item, index) => (
                    <UserTableRow
                        key={item.idUsers}
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
