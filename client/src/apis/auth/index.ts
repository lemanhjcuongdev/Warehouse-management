import { userInfo } from "os";
import { API_ROOT } from "~/constants";

const postLogin = async (loginData: { username: string; password: string }) => {
    try {
        const init: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        };
        const res = await fetch(`${API_ROOT}/auth/login`, init);
        const data: {
            userId: number;
            username: string;
            token: string;
        } = await res.json();

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

export { postLogin, getUserById };
