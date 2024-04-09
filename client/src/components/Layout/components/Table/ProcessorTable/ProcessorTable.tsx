import { Dispatch, SetStateAction, memo } from "react";
import { Table } from "react-bootstrap";
import { iExportReceiptItemProps } from "~/views/types";
import { iModalTypes, iPrintExportReceipt } from "../../Modal/types";
import ProcessorTableRow from "./ProcessorTableRow";

function ProcessorTable(props: {
    tabKey: "packed" | "classified" | string;
    listData: iExportReceiptItemProps[];
    setListData: Dispatch<SetStateAction<iExportReceiptItemProps[]>>;
    toggleShowModal: () => void;
    setModalType: Dispatch<SetStateAction<iModalTypes>>;
    setFormData: Dispatch<React.SetStateAction<iPrintExportReceipt>>;
}) {
    const { listData, tabKey } = props;
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID phiếu xuất</th>
                    <th>ID đơn xuất</th>
                    <th>Nhà cung cấp</th>
                    <th>Ngày xuất</th>
                </tr>
            </thead>
            <tbody>
                {/* {listData.map((item, index) => (
                    <ProcessorTableRow
                        key={item.idExportReceipts}
                        item={item}
                        index={index}
                        {...props}
                    />
                ))} */}
            </tbody>
        </Table>
    );
}

export default memo(ProcessorTable);
