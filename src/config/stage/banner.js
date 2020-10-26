const bannerRouter = {
    route: null,
    name: null,
    title: 'Banner管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-tushuguanli',
    filePath: 'view/banner/', // 文件路径
    order: null,
    inNav: true,
    children: [
        {
            title: '添加banner',
            type: 'view',
            name: 'BannerCreate',
            route: '/banner/add',
            filePath: 'view/banner/banner-create.vue',
            inNav: true,
            icon: 'iconfont icon-tushuguanli',
        },
        {
            title: 'banner列表',
            type: 'view',
            name: 'BannerList',
            route: '/banner/list',
            filePath: 'view/banner/banner-list.vue',
            inNav: true,
            icon: 'iconfont icon-tushuguanli',
        },
    ],
    
}

export default bannerRouter
