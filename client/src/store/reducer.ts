import { SET_AUTHENTICATION, SET_UNAUTHENTICATION } from "~/constants";
import { iActionProps, iStateProps } from "./types";
import { removeCookie } from "~/utils/cookies";

const initialState: iStateProps = {
    isAuthentication: false,
    userId: -1,
    username: "",
    role: 0,
};

const reducer = (state: iStateProps, action: iActionProps): iStateProps => {
    switch (action.type) {
        case SET_AUTHENTICATION:
            return (state = {
                ...action.payload,
                isAuthentication: true,
            });
        case SET_UNAUTHENTICATION:
            removeCookie("id");
            removeCookie("jwt");
            return (state = initialState);
        default:
            throw new Error("Invalid action!");
    }
};

export { initialState };
export default reducer;
