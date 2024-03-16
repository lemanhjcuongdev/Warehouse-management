//set cookie
const setCookie = (
    name: string,
    value: string,
    sameSite: "Lax" | "Strict",
    httpOnly: boolean
) => {
    const cookieString = `${name}=${value}, SameSite=${sameSite}, HttpOnly=${httpOnly}`;
    document.cookie = cookieString;
};

const getCookie = (cookieName: string) => {
    const cookie = document.cookie;
    const regex = new RegExp(`${cookieName}=([^,]+)`);

    const match = cookie.match(regex);
    return match && match[1];
};

export { setCookie, getCookie };
