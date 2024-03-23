import { useParams } from "react-router-dom";
import UserView from "~/views/UserView/UserView";
import WarehouseView from "~/views/WarehouseView/WarehouseView";

function ListData() {
    const params = useParams();
    const slug = params.category;
    switch (slug) {
        case "users":
            return <UserView />;
        case "warehouses":
            return <WarehouseView />;
        default:
            return <></>;
    }
}

export default ListData;
