export interface iNavbarItem {
    label: string,
    to: string,
    children?: iNavbarItem[] 
}

const navbar_items: iNavbarItem[] = [
    {
        label: "Danh mục kho",
        to: "/",
        children: [
            {
                label: "Danh sách kho hàng",
                to: "/"
            },{
                label: "Đặt hàng từ NCC",
                to: "/"
            },{
                label: "Nhập kho",
                to: "/"
            },{
                label: "Xuất kho",
                to: "/"
            },{
                label: "Điều chuyển kho",
                to: "/"
            },{
                label: "Xử lý hàng",
                to: "/"
            },
        ]
    },
    {
        label: "Danh mục hàng",
        to: "/",
        children: [
            {
                label: "Hàng hoá",
                to: "/"
            },{
                label: "Nhà cung cấp",
                to: "/"
            },{
                label: "Nhóm hàng",
                to: "/"
            },{
                label: "Loại hàng",
                to: "/"
            },{
                label: "Đơn vị tính",
                to: "/"
            },
        ]
    },{
        label: "Báo cáo / Kiểm kê",
        to: "/"
    },
]

export default navbar_items