import { Dispatch, SetStateAction, memo } from "react";
import { Table } from "react-bootstrap";
import DataRow from "./DataRow";
import { iUserItemProps } from "~/pages/ListData/types";

function DataTable(props: {
    listData: iUserItemProps[];
    setListData: Dispatch<SetStateAction<iUserItemProps[]>>;
}) {
    const { listData, setListData } = props;
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
                    <DataRow
                        key={item.idUsers}
                        item={item}
                        index={index}
                        setListData={setListData}
                    />
                ))}
            </tbody>
        </Table>
    );
}

export default memo(DataTable);
