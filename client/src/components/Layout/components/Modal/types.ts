interface iModalTypes {
    type: "create" | "update";
}
interface iUserDataProps {
    idUsers?: number;
    name: string;
    email: string;
    gender: "M" | "F" | "O";
    phone: string;
    startDate: string;
    username: string;
    password?: string;
    idCreated?: number;
    usernameCreated?: string;
    createdAt?: Date;
    disabled: 0;
    idPermissions: number[];
    idUpdated?: number;
    usernameUpdated?: string;
    updatedAt?: Date;
}

export type { iModalTypes, iUserDataProps };
