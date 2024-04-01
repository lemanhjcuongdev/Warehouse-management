import { Dispatch, SetStateAction, memo } from "react";
import { Table } from "react-bootstrap";
import {
    iGoodsItemProps,
    iImportOrderDetailProps,
    iImportOrderProps,
} from "~/views/types";
import OrderDetailTableRow from "./OrderDetailTableRow";

function OrderDetailTable(props: {
    goods: iGoodsItemProps[];
    formData: iImportOrderProps;
    listData: iImportOrderDetailProps[];
    setListData: Dispatch<SetStateAction<iImportOrderDetailProps[]>>;
    setFormData: Dispatch<React.SetStateAction<iImportOrderProps>>;
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
                    <OrderDetailTableRow
                        key={item.idGoods}
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
