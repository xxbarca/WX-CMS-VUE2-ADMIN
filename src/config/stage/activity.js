const activityRouter = {
    route: null,
    name: null,
    title: '活动管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-tushuguanli',
    filePath: 'view/activity/', // 文件路径
    order: null,
    inNav: true,
    children: [
        {
            title: '活动列表',
            type: 'view',
            name: 'ActivityList',
            route: '/activity/list',
            filePath: 'view/activity/activity-list.vue',
            inNav: true,
            icon: 'iconfont icon-tushuguanli',
        },
    ],
    
}

export default activityRouter
