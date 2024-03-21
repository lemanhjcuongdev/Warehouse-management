import { useParams } from "react-router-dom";
import UserView from "~/views/UserView/UserView";

function ListData() {
    const params = useParams();
    const slug = params.category;

    return (
        <>
            <UserView />
        </>
    );
}

export default ListData;
