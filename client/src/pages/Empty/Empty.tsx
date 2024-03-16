import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Empty() {
    const navigate = useNavigate();

    useEffect(() => navigate("/login"), []);
    return <></>;
}

export default Empty;
