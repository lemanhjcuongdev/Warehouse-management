import { iUserDataProps } from "~/components/Layout/components/Modal/UserModal";
import { API_ROOT } from "~/constants";
import { iUserItemProps } from "~/pages/ListData/types";
import { getCookie } from "~/utils/cookies";

const getAllUser = async (userInfo: { jwt: string }) => {
    const init: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: userInfo.jwt,
        },
    };
    try {
        const res = await fetch(`${API_ROOT}/users`, init);
        const data: iUserItemProps[] = await res.json();

        return data;
    } catch (error) {
        throw new Error();
    }
};

const getUserById = async (userInfo: { id: number; jwt: string }) => {
    try {
        const init: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: userInfo.jwt,
            },
        };
        const res = await fetch(`${API_ROOT}/users/${userInfo.id}`, init);
        const data = await res.json();

        if (!data.error) {
            return data;
        } else throw new Error(data.error);
    } catch (error) {
        return error;
    }
};

const createUser = async (userInfo: iUserDataProps) => {
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
            body: JSON.stringify(userInfo),
        };
        const res = await fetch(`${API_ROOT}/users/create-user`, init);

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

const softDeleteUser = async (id: number) => {
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
        const res = await fetch(`${API_ROOT}/users/${id}`, init);

        const data = await res.json();
        if (data && data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

export { getAllUser, getUserById, createUser, softDeleteUser };
