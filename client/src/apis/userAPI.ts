import { API_ROOT } from "~/constants";

interface iUserItemProps {
    idUsers: number;
    name: string;
    username: string;
    email: string;
    disabled: 0 | 1;
}

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

        return data;
    } catch (error) {
        throw new Error();
    }
};

export { getAllUser, getUserById };
export type { iUserItemProps };
