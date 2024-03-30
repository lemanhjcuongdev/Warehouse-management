import { API_ROOT } from "~/constants";
import { getCookie } from "~/utils/cookies";
import { iImportOrderProps } from "~/views/types";

const getAllImportOrderByStatus = async (status: number) => {
    try {
        const jwt = getCookie("jwt");
        if (!jwt) {
            throw new Error("Hết phiên đăng nhập");
        }
        const init: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: jwt,
            },
        };

        const res = await fetch(
            `${API_ROOT}/import-orders/status/${status}`,
            init
        );
        const data: iImportOrderProps[] = await res.json();

        return data;
    } catch (error) {
        throw new Error();
    }
};

const getImportOrderById = async (id: number) => {
    try {
        const jwt = getCookie("jwt");
        if (!jwt) {
            throw new Error("Hết phiên đăng nhập");
        }
        const init: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: jwt,
            },
        };
        const res = await fetch(`${API_ROOT}/import-orders/id/${id}`, init);
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        return error;
    }
};

const createImportOrder = async (values: iImportOrderProps) => {
    try {
        const jwt = getCookie("jwt");
        if (!jwt) {
            throw new Error("Hết phiên đăng nhập");
        }

        const init: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: jwt,
            },
            body: JSON.stringify(values),
        };
        const res = await fetch(`${API_ROOT}/import-orders`, init);

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateImportOrder = async (values: iImportOrderProps) => {
    try {
        const jwt = getCookie("jwt");
        if (!jwt) {
            throw new Error("Hết phiên đăng nhập");
        }

        const init: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: jwt,
            },
            body: JSON.stringify(values),
        };
        const res = await fetch(
            `${API_ROOT}/import-orders/${values.idImportOrders}`,
            init
        );

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

const softDeleteImportOrder = async (id: number) => {
    try {
        const jwt = getCookie("jwt");
        if (!jwt) {
            throw new Error("Hết phiên đăng nhập");
        }

        const init: RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: jwt,
            },
        };
        const res = await fetch(`${API_ROOT}/import-orders/${id}`, init);

        const data = await res.json();
        if (data && data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        error && console.log(error);
    }
};

export {
    createImportOrder,
    getAllImportOrderByStatus,
    getImportOrderById,
    softDeleteImportOrder,
    updateImportOrder,
};
