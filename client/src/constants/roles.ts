interface iRole {
    id: number;
    roleName: string;
    idPermissions: number[];
}

const ROLES: iRole[] = [
    {
        id: 1,
        roleName: "Phòng vận hành kho",
        idPermissions: [
            5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 20, 21, 22, 24, 28, 32, 40,
        ],
    },
    {
        id: 2,
        roleName: "Ban giám đốc",
        idPermissions: [
            7, 8, 11, 12, 15, 16, 20, 24, 28, 32, 33, 34, 35, 36, 40, 43, 44,
            47, 48,
        ],
    },
    {
        id: 3,
        roleName: "Phòng quản lý chất lượng",
        idPermissions: [
            12, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
            35, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 48,
        ],
    },
    {
        id: 4,
        roleName: "Phòng kế toán",
        idPermissions: [8, 12, 16, 20, 24, 28, 32, 44, 45, 46, 48],
    },
    {
        id: 5,
        roleName: "Phòng nhân sự",
        idPermissions: [1, 2, 3, 4],
    },
    {
        id: 6,
        roleName: "CEO",
        idPermissions: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
            37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
        ],
    },
];

export default ROLES;
