import { Dispatch, SetStateAction, memo, useCallback } from "react";
import { Badge, ButtonGroup, Dropdown } from "react-bootstrap";
import { softDeleteUser } from "~/apis/userAPI";
import { iUserItemProps } from "~/pages/ListData/types";

function DataRow(props: {
    item: iUserItemProps;
    setListData: Dispatch<SetStateAction<iUserItemProps[]>>;
    index: number;
}) {
    const { item, setListData, index } = props;

    const handleDelete = useCallback(
        (id: number) => {
            const windowObject = window;
            const message = item.disabled
                ? `Bạn có chắc muốn kích hoạt lại người dùng "${item.username}"?`
                : `Bạn có chắc muốn vô hiệu hoá người dùng "${item.username}"?`;
            const confirmDialog = windowObject.confirm(message);
            if (confirmDialog) {
                softDeleteUser(id)
                    .then(() => {
                        setListData((prev) => {
                            //deep clone
                            const data = [...prev];
                            data.splice(index, 1, {
                                ...item,
                                disabled: item.disabled ? 0 : 1,
                            });

                            return data;
                        });
                    })
                    .catch((error) => console.log(error));
            }
        },
        [item]
    );
    return (
        <tr
            title="Click để xem thông tin"
            style={{
                cursor: "pointer",
            }}
            onClick={() => console.log(item.idUsers)}
        >
            <td>{item.idUsers}</td>
            <td>{item.name}</td>
            <td>{item.username}</td>
            <td className="d-flex justify-content-between align-items-center">
                <div>
                    <Badge
                        pill
                        bg={item.disabled === 0 ? "success" : "secondary"}
                    >
                        {item.disabled === 0 ? "Hoạt động" : "Vô hiệu hoá"}
                    </Badge>
                </div>
                &nbsp;
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
                        <Dropdown.Item>
                            <i className="fa-solid fa-pen-to-square"></i>
                            &nbsp; Cập nhật thông tin
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => handleDelete(item.idUsers)}
                        >
                            <i
                                className={
                                    item.disabled
                                        ? "fa-solid fa-check"
                                        : "fa-solid fa-ban"
                                }
                            ></i>
                            &nbsp;
                            {item.disabled ? "Kích hoạt lại" : "Vô hiệu hoá"}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    );
}

export default memo(DataRow);
