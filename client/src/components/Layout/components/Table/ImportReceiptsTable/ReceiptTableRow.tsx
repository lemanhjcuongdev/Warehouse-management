import { Dispatch, SetStateAction, memo, useCallback } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import {
    getImportOrderById,
    softDeleteImportOrder,
} from "~/apis/importOrderAPI";
import convertUTCToVNTime from "~/utils/convertUTCToVNTime";
import stringToDate from "~/utils/stringToDate";
import { iImportReceiptItemProps, iImportReceiptProps } from "~/views/types";
import { iModalTypes } from "../../Modal/types";
import { getImportReceiptById } from "~/apis/importReceiptAPI";

function ReceiptTableRow(props: {
    tabKey: "finished" | "failed" | string;
    item: iImportReceiptItemProps;
    setListData: Dispatch<SetStateAction<iImportReceiptItemProps[]>>;
    index: number;
    toggleShowModal: () => void;
    setModalType: Dispatch<SetStateAction<iModalTypes>>;
    setFormData: Dispatch<React.SetStateAction<iImportReceiptProps>>;
}) {
    const {
        tabKey,
        item,
        setListData,
        index,
        toggleShowModal,
        setModalType,
        setFormData,
    } = props;

    const handleReadOrUpdate = async () => {
        const orderInfo: iImportReceiptProps = await getImportReceiptById(
            item.idImportReceipts
        );
        setFormData(orderInfo);

        toggleShowModal();
        setModalType({ type: "update" });
    };

    const handleDelete = useCallback(
        (id: number) => {
            const windowObject = window;
            const message = `Nhập lý do huỷ đơn nhập kho mã số "${item.idImportReceipts}":`;
            const reasonFailed = windowObject.prompt(message)?.trim();
            if (reasonFailed) {
                softDeleteImportOrder(id, reasonFailed)
                    .then(() => {
                        setListData((prev) => {
                            //deep clone
                            const data = [...prev];
                            data.splice(index, 1);
                            return data;
                        });
                    })
                    .catch((error) => console.log(error));
            }
        },
        [index, item, setListData]
    );

    return (
        <tr
            title="Click để xem thông tin"
            style={{
                cursor: "pointer",
            }}
            onClick={() => handleReadOrUpdate()}
        >
            <td>{item.idImportReceipts}</td>
            <td>{item.idImportOrder}</td>
            <td>{item.idWarehouse2.name}</td>
            <td className="d-flex justify-content-between align-items-center">
                {item.importDate &&
                    stringToDate(convertUTCToVNTime(item.importDate))}
                &nbsp;
                {tabKey === "finished" && (
                    <Dropdown
                        as={ButtonGroup}
                        drop="start"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Dropdown.Toggle
                            variant="outline-secondary"
                            className="px-3"
                        />
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleReadOrUpdate()}>
                                <i className="fa-solid fa-receipt"></i>
                                &nbsp; Xem thông tin chi tiết
                            </Dropdown.Item>
                            {/* {item.status === 0 && (
                                <Dropdown.Item
                                    onClick={() => handleReadOrUpdate()}
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    &nbsp; Cập nhật thông tin
                                </Dropdown.Item>
                            )} */}
                            <Dropdown.Item
                                onClick={() =>
                                    handleDelete(item.idImportReceipts)
                                }
                            >
                                <i className={"fa-solid fa-ban"}></i>
                                &nbsp; Huỷ phiếu nhập
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </td>
        </tr>
    );
}

export default memo(ReceiptTableRow);
