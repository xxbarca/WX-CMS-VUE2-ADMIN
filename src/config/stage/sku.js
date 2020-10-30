const skuRouter = {
    route: null,
    name: null,
    title: 'Sku管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-tushuguanli',
    filePath: 'view/sku/', // 文件路径
    order: null,
    inNav: true,
    children: [
        {
            title: 'sku列表',
            type: 'view',
            name: 'SkuList',
            route: '/sku/list',
            filePath: 'view/sku/sku-list.vue',
            inNav: true,
            icon: 'iconfont icon-tushuguanli',
        },
    ],
    
}

export default skuRouter
