<template>
	<div class="container">
		<div class="header">
			<div class="title">六宫格列表</div>
			<el-button
					style="margin-left: 30px;"
					@click.prevent="handleAdd"
					type="primary"
					plain
					size="medium"
					v-permission="{ permission: '创建六宫格', type: 'disabled' }"
			>创建六宫格</el-button>
		</div>
		<el-table stripe v-loading="loading" :data="tableData">
			<el-table-column prop="id" label="id" width="100"></el-table-column>
			<el-table-column prop="snap_title" label="标题" width="150"></el-table-column>
			<el-table-column prop="address" label="地址" width="150"></el-table-column>
			<el-table-column prop="userName" label="用户" width="150"></el-table-column>
			<el-table-column prop="mobile" label="电话" width="150"></el-table-column>
			<el-table-column prop="total_count" label="数量" width="150"></el-table-column>
			<el-table-column prop="order_no" label="订单编号" width="150"></el-table-column>
			<el-table-column prop="total_price" label="总价格" width="150"></el-table-column>
			<el-table-column prop="final_total_price" label="最终价" width="150"></el-table-column>
			<el-table-column
					prop="status"
					label="订单状态"
					width="100">
				<template #default="scope">
					<el-tag
							:type="scope.row.status === '已支付' ? 'success' : 'danger'"
							disable-transitions>{{scope.row.status}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="user_id" label="用户id" width="150"></el-table-column>
			<el-table-column prop="create_time" label="创建时间" width="200"></el-table-column>
			<el-table-column prop="delete_time" label="删除时间" width="150"></el-table-column>
			<el-table-column prop="expired_time" label="过期时间" width="150"></el-table-column>
			<el-table-column fixed="right" width="150" label="操作">
				<template slot-scope="scope">
					<el-button @click.prevent="handleEdit(scope.row)" type="primary" plain size="mini">编辑</el-button>
					<el-button
							@click.prevent="handleDelete(scope.row)"
							type="danger"
							plain
							size="mini"
							v-permission="{ permission: '删除六宫格', type: 'disabled' }"
					>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
    import Order from '../../model/Order'

    export default {
        name: 'order',
		data() {
            return {
                display: true,
                tableData: [],
                imgSrcList: [], // 用于大图预览
                dialogFormVisible: false, // 展示弹窗
                isCreate: false,
                gridCategoryId: 0,
                form: {
                    name: '',
                    title: 0,
                    parent_id: null,
                    description: '',
                    online: 1,
                    index: null,
                },
			}
		},
		async created() {
            this.loading = true
			await this.getOrderList()
		},
		methods: {
            handleAdd() {},
			computedStatus(status) {
                switch (status) {
    				case 1:
    				    return "待支付"
					case 2:
					    return "已支付"
					case 3:
					    return "已发货"
					case 4:
					    return "已完成"
					case 5:
					    return "已取消"
                }
			},
			async getOrderList() {
                const order = await Order.getOrderList()
				this.tableData = order.items.map(item => {
                    item.status = this.computedStatus(item.status)
					const address = JSON.parse(item.snap_address)
				    return {
                        ...item,
						...address,
						address: `${address.province}${address.city}${address.detail}`,
					}
				})
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
	}
</style>

