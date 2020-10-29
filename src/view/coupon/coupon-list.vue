<template>
	<div>
		<div v-if="!showEdit" class="container">
			<div class="header">
				<div class="title">优惠卷列表</div>
				<!-- <el-button @click.prevent="addCoupon" type="primary" plain size="medium">添加优惠卷</el-button> -->
			</div>
			<el-table stripe v-loading="loading" :data="tableData">
				<el-table-column prop="id" label="id" width="100"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="title" label="标题" width="250"></el-table-column>
				<el-table-column prop="full_money" label="满减额" width="150"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="minus" label="优惠额" width="150"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="rate" label="折扣" width="150">
					<template slot-scope="scope">{{ scope.row.rate ? scope.row.rate * 10 : '' }}</template>
				</el-table-column>
				<el-table-column prop="type" label="类型" width="150">
					<template slot-scope="scope">{{ scope.row.type | typeFormat }}</template>
				</el-table-column>
				<el-table-column prop="start_time" label="开始时间" width="200">
					<template slot-scope="scope">{{ scope.row.start_time | dateFormat }}</template>
				</el-table-column>
				<el-table-column prop="end_time" label="结束时间" width="200">
					<template slot-scope="scope">{{ scope.row.end_time | dateFormat }}</template>
				</el-table-column>
				<el-table-column
						:show-overflow-tooltip="true"
						prop="description"
						min-width="200"
						label="描述"
				></el-table-column>
				<el-table-column fixed="right" width="150" label="操作">
					<template slot-scope="scope">
						<el-button @click.prevent="handleEdit(scope.row)" type="primary" plain size="mini">编辑</el-button>
						<el-button
								v-permission="{ auth: ['删除优惠卷'], type: 'disabled' }"
								@click.prevent="handleDelete(scope.row)"
								type="danger"
								size="mini"
								plain
						>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
    import Coupon from '../../model/coupon'
	import dayjs from 'dayjs'

    export default {
        name: 'coupon-list',
        props: {
            activityId: {
                type: String,
                default: null,
            },
        },
		data() {
            return {
                couponId: null,
                isCreate: false,
                tableData: [],
                templates: [],
                showEdit: false,
                totalNums: 0,
                currentPage: 1,
                pageCount: 10,
                refreshPagination: true,
                templateData: null,
                loading: false,
            }
		},
		async created() {
            this.$nextTick(() => {
                this.loading = true
                this.getCoupons()
                // this.getTemplates()
            })

		},
		methods: {
            async getCoupons() {
                const coupons = await Coupon.getListByActivityId(this.activityId)
                this.tableData = coupons
                this.loading = false
            },
            handleEdit() {},
            handleDelete() {}
		},
        filters: {
            dateFormat(val) {
                return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
            },
            typeFormat(val) {
                switch (val) {
                    case 1:
                        return '满减券'
                    case 2:
                        return '折扣券'
                    case 3:
                        return '无门槛券'
                    case 4:
                        return '满金额折扣券'
                    default:
                        return val
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 30px;
		margin-bottom: 30px;

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
