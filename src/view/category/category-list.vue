<template>
	<div class="container">
		<div class="header">
			<div class="title">分类列表</div>
			<el-button
					style="margin-left: 30px;"
					@click.prevent="handleAdd"
					type="primary"
					plain
					size="medium"
					v-permission="{ permission: '创建分类', type: 'disabled' }"
			>创建分类</el-button
			>
		</div>
		<el-table stripe v-loading="loading" :data="tableData">
			<el-table-column prop="id" label="id" width="100"></el-table-column>
			<el-table-column prop="img" label="图片" width="200">
				<template v-if="scope.row.img" slot-scope="scope">
					<el-image :src="scope.row.img" :preview-src-list="imgSrcList" style="max-height: 50px; max-width: 100px;">
					</el-image>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="名称" width="150"></el-table-column>
			<el-table-column prop="index" label="排序" width="150"></el-table-column>
			<el-table-column prop="online" label="状态" width="100">
				<template slot-scope="scope">{{ scope.row.online | onlineFormat }}</template>
			</el-table-column>
			<el-table-column prop="description" label="描述" min-width="200" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column fixed="right" width="220" label="操作">
				<template slot-scope="scope">
					<el-button @click.prevent="handleSubList(scope.row)" type="primary" plain size="mini">子分类</el-button>
					<el-button @click.prevent="handleEdit(scope.row)" type="primary" plain size="mini">编辑</el-button>
					<el-button
							@click.prevent="handleDelete(scope.row)"
							type="danger"
							plain
							size="mini"
							v-permission="{ permission: '删除分类', type: 'disabled' }"
					>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination
					@current-change="handleCurrentChange"
					:background="true"
					:page-size="pageCount"
					:current-page="currentPage"
					v-if="refreshPagination"
					layout="prev, pager, next, jumper"
					:total="totalNums"
			></el-pagination>
		</div>
		<!--  创建/编辑分类弹窗  -->
		<category-edit
				v-if="dialogFormVisible"
				:isCreate="isCreate"
				:dialogFormVisible="dialogFormVisible"
				:categoryId="categoryId"
				@dialogClose="dialogClose"
		></category-edit>
	</div>
</template>

<script>
    import Category from '../../model/Category'
    import CategoryEdit from './category-edit'

    export default {
        name: 'category-list',
		components: {
            CategoryEdit
		},
        data() {
            return {
                display: true,
                tableData: [],
                categoryId: 0,
                imgSrcList: [], // 用于大图预览
                totalNums: 0,
                currentPage: 1,
                pageCount: 10,
                refreshPagination: true,
                dialogFormVisible: false, // 展示弹窗
                isCreate: false,
                root: 1, // 是否是父分类,
                form: {
                    name: '',
                    is_root: 0,
                    parent_id: null,
                    description: '',
                    online: 1,
                    index: null,
                },
            }
        },
        filters: {
            onlineFormat(val) {
                return val === 1 ? '显示' : '不显示'
            },
        },
        async created() {
            this.loading = true
            await this.getCategories()
        },
		methods: {
            async getCategories() {
                const page = this.currentPage - 1
                const count = this.pageCount
                const categories = await Category.getCategories(page, count, this.root)
                this.loading = false
                this.tableData = categories.items
                this.totalNums = categories.total
				this.initImgSrcList()
			},
            handleAdd() {
                this.dialogFormVisible = true
                this.isCreate = true
			},
            handleSubList(row) {},
            handleEdit(row) {},
            handleDelete(row) {},
            handleCurrentChange() {},
            initImgSrcList() {
                this.tableData.forEach(item => {
                    if (!item.img) {
                        return
                    }
                    this.imgSrcList.push(item.img)
                })
            },
            dialogClose() {
                this.dialogFormVisible = false
                this.loading = true
                this.getCategories()
                this.loading = false
			}
		}
    }
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 30px;

		.header {
			display: flex;
			align-items: center;

			.title {
				height: 59px;
				line-height: 59px;
				color: $parent-title-color;
				font-size: 16px;
				font-weight: 500;
			}
		}

		.pagination {
			display: flex;
			justify-content: flex-end;
			margin: 20px;
		}
	}
</style>
