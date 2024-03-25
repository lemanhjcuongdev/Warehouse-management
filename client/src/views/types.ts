interface iUserItemProps {
    idUsers: number;
    name: string;
    username: string;
    email: string;
    disabled: 0 | 1;
}

interface iWarehouseItemProps {
    idWarehouse: number;
    name: string;
    address: string;
    disabled: 0 | 1;
}

interface iGoodsGroupProps {
    idGoodsGroups: number;
    name: string;
    deletedAt?: Date;
}

interface iGoodsUnitProps {
    idGoodsUnits: number;
    name: string;
    deletedAt?: Date;
}

export type {
    iUserItemProps,
    iWarehouseItemProps,
    iGoodsGroupProps,
    iGoodsUnitProps,
};
