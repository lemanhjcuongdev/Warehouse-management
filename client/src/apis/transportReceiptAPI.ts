import { API_ROOT } from "~/constants";
import { getCookie } from "~/utils/cookies";
import {
    iTransportReceiptItemProps,
    iTransportReceiptProps,
} from "~/views/types";

const getAllTransportReceiptByStatus = async (status: number) => {
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

        const res = await fetch(`${API_ROOT}/transport/status/${status}`, init);
        const data: iTransportReceiptItemProps[] = await res.json();

        return data;
    } catch (error) {
        throw new Error();
    }
};

const getTransportReceiptById = async (id: number) => {
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
        const res = await fetch(`${API_ROOT}/transport/id/${id}`, init);
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        return error;
    }
};

const createTransportReceipt = async (values: iTransportReceiptProps) => {
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
        const res = await fetch(`${API_ROOT}/transport`, init);

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateTransportReceipt = async (value: iTransportReceiptProps) => {
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
            body: JSON.stringify(value),
        };
        const res = await fetch(
            `${API_ROOT}/transport/${value.idTransportReceipts}`,
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

const softDeleteTransportReceipt = async (id: number, idUpdated: number) => {
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
            body: JSON.stringify({
                idUpdated,
            }),
        };
        const res = await fetch(`${API_ROOT}/transport/${id}`, init);

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
    createTransportReceipt,
    getAllTransportReceiptByStatus,
    getTransportReceiptById,
    softDeleteTransportReceipt,
    updateTransportReceipt,
};
