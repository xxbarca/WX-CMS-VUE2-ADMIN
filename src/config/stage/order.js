const orderRouter = {
    route: null,
    name: null,
    title: '订单管理',
    type: 'folder',
    icon: 'el-icon-s-grid',
    filePath: 'view/order/',
    order: null,
    inNav: true,
    children: [
        {
            title: '订单列表',
            type: 'view',
            name: 'orderList',
            route: '/order/list',
            filePath: 'view/order/order-list.vue',
            inNav: true,
            icon: '',
        },
    ],
}

export default orderRouter
