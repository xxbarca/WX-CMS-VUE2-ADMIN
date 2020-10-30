const specRouter = {
    route: null,
    name: null,
    title: '规格管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-tushuguanli',
    filePath: 'view/spec/', // 文件路径
    order: null,
    inNav: true,
    children: [
        {
            title: '规格列表',
            type: 'view',
            name: 'SpecList',
            route: '/spec/key/list',
            filePath: 'view/spec/spec-key-list.vue',
            inNav: true,
            icon: 'iconfont icon-tushuguanli',
        }, {
            title: '添加规格名',
            type: 'view',
            name: 'SpecAdd',
            route: '/spec/key/add',
            filePath: 'view/spec/spec-key-add.vue',
            inNav: true,
            icon: 'iconfont icon-tushuguanli',
        },
    ],
    
}

export default specRouter
