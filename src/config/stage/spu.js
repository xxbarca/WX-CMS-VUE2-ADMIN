const bannerRouter = {
    route: null,
    name: null,
    title: 'Spu管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-tushuguanli',
    filePath: 'view/spu/', // 文件路径
    order: null,
    inNav: true,
    children: [
        {
            title: 'spu列表',
            type: 'view',
            name: 'SpuList',
            route: '/spu/list',
            filePath: 'view/spu/spu-list.vue',
            inNav: true,
            icon: 'iconfont icon-tushuguanli',
        },
    ],
    
}

export default bannerRouter
