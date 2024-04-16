import { useParams } from "react-router-dom";
import DefectiveRecordView from "~/views/DefectiveRecordView/DefectiveRecordView";
import GoodsPropsView from "~/views/GoodsPropsView/GoodsPropsView";
import GoodsView from "~/views/GoodsView/GoodsView";
import ImportOrderView from "~/views/ImportOrderView/ImportOrderView";
import ImportReceiptView from "~/views/ImportReceiptView/ImportReceiptView";
import ProviderView from "~/views/ProviderView/ProviderView";
import UserView from "~/views/UserView/UserView";
import WarehouseView from "~/views/WarehouseView/WarehouseView";
import Empty from "../Empty/Empty";
import ExportReceiptView from "~/views/ExportReceiptView/ExportReceiptView";
import ProcessorView from "~/views/ProcessorView/ProcessorView";
import TransportReceiptView from "~/views/TransportReceiptView/TransportReceiptView";
import StocktakingReceiptView from "~/views/StocktakingReceiptView/StocktakingReceiptView";

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
        case "import-receipts":
            return <ImportReceiptView />;
        case "export-receipts":
            return <ExportReceiptView />;
        case "processor":
            return <ProcessorView />;
        case "transport":
            return <TransportReceiptView />;
        case "stocktaking":
            return <StocktakingReceiptView />;
        case "":
            return <ExportReceiptView />;
        default:
            return <ExportReceiptView />;
    }
}

export default ListData;
