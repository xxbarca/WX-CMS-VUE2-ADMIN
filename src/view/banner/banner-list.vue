<template>
	<div>
		<div class="container" v-if="!showDetail">
			<div class="header">
				<div class="title">Banner列表</div>
			</div>
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="id" label="id" width="100" />
				<el-table-column prop="img" label="图片" width="200">
					<el-image style="max-width: 120px; max-height: 50px;" slot-scope="scope" :src="scope.row.img" />
				</el-table-column>
				<el-table-column width="120" prop="name" label="名称" />
				<el-table-column width="150" prop="title" label="标题" />
				<el-table-column :show-overflow-tooltip="true" prop="description" label="描述" />
				<el-table-column fixed="right" label="操作" prop="address" width="180">
					<template slot-scope="scope">
						<el-button plain @click="handleDetail(scope.row)" type="primary" size="mini">查看</el-button>
						<el-button plain @click="handleOnDelete(scope.row)"type="danger" size="mini">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<BannerDetail v-else @handleOnClose="handleOnClose" :banner-id="bannerId" />
	</div>
</template>

<script>
	import Banner from '../../model/banner'
	import BannerDetail from './banner-detail'
    export default {
        name: 'banner-list',
		components: {
            BannerDetail
		},
		data() {
            return {
                tableData: [],
                showDetail: false,
				bannerId: null
			}
		},
		created() {
            this.getBanners()
        },
		methods: {
            async getBanners() {
                const res = await Banner.getBanners()
				this.tableData = res.items
			},
            async handleDetail(data) {
                this.showDetail = true
				this.bannerId = data.id

			},
            handleOnClose() {
                this.showDetail = false
			},
            handleOnDelete(data) {}
		}
    }
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 30px;

		.header {
			display: flex;
			justify-content: space-between;
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

