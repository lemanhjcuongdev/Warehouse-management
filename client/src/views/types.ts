//USERS
interface iUserDataProps {
    idUsers?: number;
    name: string;
    email: string;
    gender: "M" | "F" | "O" | "";
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
    exp: string;
    amount: number;
    disabled: 0 | 1;
    idUnit2?: iGoodsUnitProps;
    floor?: number;
    slot?: number;
}

// IMPORT ORDERS
interface iImportOrderProps {
    idCreated: number;
    idImportOrders: number;
    orderDate: string;
    idProvider: number;
    status: number;
    importOrderDetails: iImportOrderDetailProps[];
    idProvider2?: iProviderProps;
    reasonFailed?: string;
    idUpdated?: number;
    updatedAt?: string;
    usernameCreated?: string;
    usernameUpdated?: string;
    palletCode: number;
}
interface iImportOrderDetailProps {
    idImportOrderDetails?: number;
    idImportOrder?: number;
    idGoods: number;
    amount: number;
    exp?: string;
    checked?: boolean;
}

//IMPORT RECEIPTS
interface iImportReceiptItemProps {
    idImportReceipts: number;
    idWarehouse: number;
    idWarehouse2: iWarehouseDataProps;
    idImportOrder: number;
    importDate: string;
    status: number;
}
interface iImportReceiptProps {
    idImportReceipts: number;
    idWarehouse: number;
    idImportOrder: number;
    idProvider: number;
    idUserImport: number;
    importDate: string;
    status: number;
    idUpdated?: number;
    updatedAt?: string;
    idImportOrder2: iImportOrderProps;
    idProvider2?: iProviderProps;
    idWarehouse2?: iWarehouseDataProps;
    usernameCreated: string;
    usernameUpdated?: string;
}

//DEFECTIVE RECORDS
interface iDefectiveRecordProps {
    idDefectiveRecords: number;
    date: string;
    idWarehouse?: number;
    idUser?: number;
    idImportOrder: number;
    quality?: string;
    defectiveRating?: number;
    solution?: string;
    updatedAt?: string;
    idUpdated?: number;
    usernameUpdated?: string;
}

//EXPORT ORDER PROPS
interface iExportOrderProps {
    idExportOrders?: number;
    orderDate: string;
    provinceCode: string;
    districtCode: string;
    wardCode: string;
    address: string;
    status?: number;
    exportOrderDetails: iExportDetailProps[];
}

interface iExportDetailProps {
    idExportOrderDetails?: number;
    idExportOrder?: number;
    idGoods: number;
    amount: number;
    checked?: boolean;
}

interface iExportReceiptItemProps {
    idExportReceipts: number;
    idWarehouse: number;
    idWarehouse2: iWarehouseDataProps;
    idExportOrder2: iExportOrderProps;
    exportDate: string;
    status: number;
    reasonFailed?: string;
}
interface iExportReceiptProps {
    idExportReceipts: number;
    idWarehouse: number;
    idExportOrder: number;
    idUserExport: number;
    exportDate: string;
    palletCode: number;
    status: number;
    idUpdated?: number;
    updatedAt?: string;
    idExportOrder2: iExportOrderProps;
    idWarehouse2?: iWarehouseDataProps;
    usernameCreated: string;
    usernameUpdated?: string;
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
    iImportOrderProps,
    iImportOrderDetailProps,
    iImportReceiptProps,
    iImportReceiptItemProps,
    iDefectiveRecordProps,
    iExportOrderProps,
    iExportDetailProps,
    iExportReceiptItemProps,
    iExportReceiptProps,
};
