import { Dispatch, SetStateAction, memo, useCallback } from "react";
import { Badge, Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { getGoodsGroupById, softDeleteGoodsGroup } from "~/apis/goodsGroupAPI";
import { iModalTypes } from "../../Modal/types";
import {
    iGoodsItemProps,
    iImportOrderDetailProps,
    iImportOrderProps,
} from "~/views/types";

function OrderDetailTableRow(props: {
    formData: iImportOrderProps;
    goods: iGoodsItemProps[];
    item: iImportOrderDetailProps;
    setListData: Dispatch<SetStateAction<iImportOrderDetailProps[]>>;
    index: number;
    setFormData: Dispatch<React.SetStateAction<iImportOrderProps>>;
}) {
    const { item, setListData, index, setFormData, formData, goods } = props;

    const good = goods.find((good) => good.idGoods === item.idGoods);

    const handleDelete = useCallback(() => {
        const newDetails = [...formData.importOrderDetails];
        newDetails.splice(index, 1);
        setFormData((prev) => {
            return {
                ...prev,
                importOrderDetails: newDetails,
            };
        });
    }, [index, item, setListData]);

    return (
        <tr
            title="Click để xem thông tin"
            style={{
                cursor: "pointer",
            }}
        >
            <td>{item.idGoods}</td>
            <td>{good?.name}</td>
            <td>{good?.idUnit2?.name}</td>
            <td className="d-flex justify-content-between align-items-center">
                {item.amount}
                {formData.status === 0 && (
                    <>
                        &nbsp;
                        <Button size="sm" onClick={() => handleDelete()}>
                            <i className="fa-solid fa-trash"></i>
                        </Button>
                    </>
                )}
            </td>
        </tr>
    );
}

export default memo(OrderDetailTableRow);
