import { Dispatch, SetStateAction } from "react";
import { iUserItemProps } from "~/pages/ListData/types";

interface iUserModalProps {
    show: true | false;
    onHide: () => void;
    setListData: Dispatch<SetStateAction<iUserItemProps[]>>;
}
interface iModalTypes {
    type: "create" | "read" | "update";
}
interface iUserDataProps {
    name: string;
    email: string;
    gender: "M" | "F" | "O";
    phone: string;
    start_date: string;
    username: string;
    password: string;
    id_created?: number;
    disabled: 0;
}

export type { iModalTypes, iUserModalProps, iUserDataProps };
