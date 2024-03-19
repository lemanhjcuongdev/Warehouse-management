//set cookie
const setCookie = (
    name: string,
    value: string,
    sameSite: "Lax" | "Strict",
    httpOnly: boolean
) => {
    const expireTime = new Date();
    expireTime.setHours(expireTime.getHours() + 1);
    const cookieString = `${name}=${value}, SameSite=${sameSite}, HttpOnly=${httpOnly}, expires=${expireTime.toUTCString()}`;
    document.cookie = cookieString;
};

const getCookie = (cookieName: string) => {
    const cookie = document.cookie;
    const regex = new RegExp(`${cookieName}=([^,]+)`);

    const match = cookie.match(regex);
    return match && match[1];
};

export { setCookie, getCookie };
