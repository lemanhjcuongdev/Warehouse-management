import { API_ROOT } from "~/constants";
import { getCookie } from "~/utils/cookies";
import { iExportReceiptItemProps, iExportReceiptProps } from "~/views/types";

const getAllExportReceiptByStatus = async (status: number) => {
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
            `${API_ROOT}/export/receipts/status/${status}`,
            init
        );
        const data: iExportReceiptItemProps[] = await res.json();

        return data;
    } catch (error) {
        throw new Error();
    }
};

const getExportReceiptById = async (id: number) => {
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
        const res = await fetch(`${API_ROOT}/export/receipts/id/${id}`, init);
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        return error;
    }
};

const createExportReceipt = async (values: iExportReceiptProps) => {
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
        const res = await fetch(`${API_ROOT}/export/receipts`, init);

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateExportReceipt = async (
    id: number,
    status: number,
    idUpdated: number
) => {
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
            body: JSON.stringify({ status, idUpdated }),
        };
        const res = await fetch(`${API_ROOT}/export/receipts/${id}`, init);

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

const softDeleteExportReceipt = async (id: number, reasonFailed: string) => {
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
                reasonFailed,
            }),
        };
        const res = await fetch(`${API_ROOT}/export/receipts/${id}`, init);

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
    createExportReceipt,
    getAllExportReceiptByStatus,
    getExportReceiptById,
    softDeleteExportReceipt,
    updateExportReceipt,
};
