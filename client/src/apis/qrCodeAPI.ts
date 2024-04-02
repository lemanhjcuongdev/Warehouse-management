import { QR_API_ROOT } from "~/constants";
import { getCookie } from "~/utils/cookies";

const generateQR = async (value: string) => {
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

        const res = await fetch(`${QR_API_ROOT}&data=${value}`, init);
        const data: string = await res.json();

        return data;
    } catch (error) {
        throw new Error();
    }
};

export { generateQR };
