import { Dispatch, SetStateAction, memo } from "react";
import { Table } from "react-bootstrap";
import {
    iDefectiveRecordProps,
    iGoodsItemProps,
    iImportOrderProps,
} from "~/views/types";
import OrderDetailTableRow from "./DefectiveRecordTableRow";
import DefectiveRecordTableRow from "./DefectiveRecordTableRow";

function OrderDetailTable(props: {
    goods: iGoodsItemProps[];
    formData: iDefectiveRecordProps;
    listData: iDefectiveRecordProps[];
    setListData: Dispatch<SetStateAction<iDefectiveRecordProps[]>>;
    setFormData: Dispatch<React.SetStateAction<iDefectiveRecordProps>>;
}) {
    const { listData } = props;
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID hàng</th>
                    <th>Tên hàng</th>
                    <th>ĐVT</th>
                    <th>SL</th>
                </tr>
            </thead>
            <tbody>
                {listData.map((item, index) => (
                    <DefectiveRecordTableRow
                        key={item.idDefectiveRecords}
                        item={item}
                        index={index}
                        {...props}
                    />
                ))}
            </tbody>
        </Table>
    );
}

export default memo(OrderDetailTable);
