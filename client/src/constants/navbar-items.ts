export interface iNavbarItem {
    label: string;
    to: string;
    children?: iNavbarItem[];
}

const navbar_items: iNavbarItem[] = [
    {
        label: "Danh mục kho",
        to: "/",
        children: [
            {
                label: "Danh sách kho hàng",
                to: "/list/warehouses",
            },
            {
                label: "Đặt hàng từ NCC",
                to: "/",
            },
            {
                label: "Nhập kho",
                to: "/",
            },
            {
                label: "Xuất kho",
                to: "/",
            },
            {
                label: "Xử lý hàng",
                to: "/",
            },
            {
                label: "Điều chuyển kho",
                to: "/",
            },
        ],
    },
    {
        label: "Danh mục hàng",
        to: "/",
        children: [
            {
                label: "Nhà cung cấp",
                to: "/",
            },
            {
                label: "Hàng hoá",
                to: "/list/goods",
            },
            {
                label: "Các thuộc tính hàng hoá",
                to: "/list/goods-props",
            },
        ],
    },
    {
        label: "Báo cáo / Kiểm kê",
        to: "/",
    },
    {
        label: "Quản lý nhân sự",
        to: "/list/users",
    },
];

export default navbar_items;
