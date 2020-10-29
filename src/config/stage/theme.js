const themeRouter = {
    route: null,
    name: null,
    title: '主题管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-tushuguanli',
    filePath: 'view/theme/', // 文件路径
    order: null,
    inNav: true,
    children: [
        {
            title: '主题列表',
            type: 'view',
            name: 'ThemeList',
            route: '/theme/list',
            filePath: 'view/theme/theme-list.vue',
            inNav: true,
            icon: 'iconfont icon-tushuguanli',
        },
    ],
    
}

export default themeRouter
