import Cookies from "js-cookie";

//set cookie
const setCookie = (name: string, value: string) => {
    Cookies.set(name, value, {
        expires: 1 / 24,
        sameSite: "Strict",
        secure: true,
    });
};

const getCookie = (cookieName: string) => {
    const cookie = Cookies.get();
    return cookie[cookieName];
};

const removeCookie = (cookieName: string) => {
    Cookies.remove(cookieName);
};

export { setCookie, getCookie, removeCookie };
