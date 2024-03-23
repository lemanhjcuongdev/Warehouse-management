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

export type { iUserItemProps, iWarehouseItemProps };
