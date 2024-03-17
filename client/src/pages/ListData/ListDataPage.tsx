import { useEffect, useRef, useState } from "react";
import {
    Badge,
    Button,
    ButtonGroup,
    Dropdown,
    Overlay,
    Table,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getAllUser, iUserItemProps } from "~/apis/userAPI";
import RegisterModal from "~/components/Layout/components/Modal/RegisterModal";
import { getCookie } from "~/utils/cookies";

function ListData() {
    const params = useParams();
    const slug = params.category;
    let category: string = "";
    const moreActionBtnRef = useRef<HTMLButtonElement>(null);
    const [showTooltip, setShowTooltip] = useState(false);
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
            category = "người dùng/nhân viên";
            break;
        default:
    }

    useEffect(() => {
        const jwt = getCookie("jwt");
        if (jwt) {
            getAllUser({ jwt }).then((data) => setListData(data));
        }
    }, []);

    const handleToggleShowModal = () => setShowModal(!showModal);

    return (
        <>
            <h2>Danh sách {category}</h2>
            <Button onClick={handleToggleShowModal}>
                <i className="fa-solid fa-plus"></i>
                &nbsp; Thêm
            </Button>
            {slug === "users" && (
                <RegisterModal
                    show={showModal}
                    onHide={handleToggleShowModal}
                />
            )}
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
                    {listData.map((item) => (
                        <tr
                            key={item.idUsers}
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
                                        bg={
                                            item.disabled === 0
                                                ? "success"
                                                : "secondary"
                                        }
                                    >
                                        {item.disabled === 0
                                            ? "Hoạt động"
                                            : "Vô hiệu hoá"}
                                    </Badge>
                                </div>
                                &nbsp;
                                <Dropdown
                                    as={ButtonGroup}
                                    drop="start"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Dropdown.Toggle variant="outline-secondary" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                            &nbsp; Cập nhật thông tin
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <i className="fa-solid fa-ban"></i>
                                            &nbsp; Vô hiệu hoá
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default ListData;
