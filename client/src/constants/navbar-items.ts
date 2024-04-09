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
                label: "Nhập hàng từ NCC",
                to: "/list/import-orders",
            },
            {
                label: "Nhập kho",
                to: "/list/import-receipts",
            },
            {
                label: "Xuất kho",
                to: "/list/export-receipts",
            },
            {
                label: "Xử lý đơn hàng",
                to: "/list/processor",
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
                to: "/list/providers",
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
        children: [
            {
                label: "Biên bản hàng lỗi, hỏng",
                to: "/list/defective-records",
            },
            {
                label: "Kiểm kê kho",
                to: "/list/stock-taking",
            },
            // {
            //     label: "Báo cáo nhập - xuất - tồn",
            //     to: "/list/stock-taking",
            // },
        ],
    },
    {
        label: "Quản lý nhân sự",
        to: "/list/users",
    },
];

export default navbar_items;
