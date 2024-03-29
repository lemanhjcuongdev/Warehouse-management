//USERS
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

interface iUserItemProps {
    idUsers: number;
    name: string;
    username: string;
    disabled: 0 | 1;
}
//WAREHOUSES
interface iWarehouseDataProps {
    idWarehouse?: number;
    name: string;
    address: string;
    totalFloors: number;
    totalSlots: number;
    idCreated?: number;
    usernameCreated?: string;
    createdAt?: Date;
    disabled: 0;
    idUpdated?: number;
    usernameUpdated?: string;
    updatedAt?: Date;
}
interface iWarehouseItemProps {
    idWarehouse: number;
    name: string;
    address: string;
    totalFloors?: number;
    totalSlots?: number;
    disabled: 0 | 1;
}
//GOODS
interface iGoodsGroupProps {
    idGoodsGroups: number;
    name: string;
    deletedAt?: Date | null;
}

interface iGoodsUnitProps {
    idGoodsUnits: number;
    name: string;
    deletedAt?: Date | null;
}

interface iGoodsTypeProps {
    idGoodsTypes: number;
    idGoodsGroup: number;
    idGoodsGroup2?: iGoodsGroupProps;
    name: string;
    deletedAt?: Date | null;
}
//PROVIDERS
interface iProviderProps {
    idProviders: number;
    name: string;
    address: string;
    deletedAt?: Date | null;
}

//GOODS
interface iGoodsProps {
    idGoods: number;
    idType: number;
    idUnit: number;
    idWarehouse: number;
    name: string;
    floor: number;
    slot: number;
    importDate: string;
    exp: string;
    amount: number;
    idCreated: number;
    usernameCreated?: string;
    createdAt: Date;
    idUpdated?: number | null;
    usernameUpdated?: string;
    updatedAt?: Date | null;
    disabled: 0 | 1;
}
interface iGoodsItemProps {
    idGoods: number;
    name: string;
    exp: Date;
    amount: number;
    disabled: 0 | 1;
}

export type {
    iUserDataProps,
    iUserItemProps,
    iWarehouseDataProps,
    iWarehouseItemProps,
    iGoodsGroupProps,
    iGoodsUnitProps,
    iGoodsTypeProps,
    iProviderProps,
    iGoodsItemProps,
    iGoodsProps,
};
