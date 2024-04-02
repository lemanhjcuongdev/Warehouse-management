import { useParams } from "react-router-dom";
import DefectiveRecordView from "~/views/DefectiveRecordView/DefectiveRecordView";
import GoodsPropsView from "~/views/GoodsPropsView/GoodsPropsView";
import GoodsView from "~/views/GoodsView/GoodsView";
import ImportOrderView from "~/views/ImportOrderView/ImportOrderView";
import ProviderView from "~/views/ProviderView/ProviderView";
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
        case "goods-props":
            return <GoodsPropsView />;
        case "providers":
            return <ProviderView />;
        case "goods":
            return <GoodsView />;
        case "import-orders":
            return <ImportOrderView />;
        case "defective-records":
            return <DefectiveRecordView />;
        default:
            return <></>;
    }
}

export default ListData;
