import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalState from "~/hooks/useGlobalState";

function Empty() {
    const navigate = useNavigate();
    const { state } = useGlobalState();
    const { isAuthentication } = state;

    useEffect(() => {
        if (!isAuthentication) {
            navigate("/login");
        } else navigate("/");
    }, [isAuthentication, navigate]);
    return <></>;
}

export default Empty;
