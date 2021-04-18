<template>
	<div class="container">
		<div class="header">
			<el-form :inline="true" :model="formInline" class="form">
				<el-form-item label="订单号">
					<el-input v-model="formInline.order_no" placeholder="请输入订单号"></el-input>
				</el-form-item>
				<el-form-item label="订单状态">
					<el-select v-model="formInline.status" placeholder="订单状态">
						<el-option label="待支付" value="1"></el-option>
						<el-option label="已支付" value="2"></el-option>
						<el-option label="已完成" value="4"></el-option>
						<el-option label="已取消" value="5"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="订单标题">
					<el-input v-model="formInline.snap_title" placeholder="请输入订单标题"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table stripe v-loading="loading" :data="tableData">
			<el-table-column prop="id" label="id" width="100"></el-table-column>
			<el-table-column prop="snap_title" label="标题" width="150"></el-table-column>
			<el-table-column prop="order_no" label="订单编号" width="150"></el-table-column>
			<el-table-column prop="userName" label="用户" width="150"></el-table-column>
			<el-table-column prop="img" label="图片" width="200">
				<template v-if="scope.row.snap_img" slot-scope="scope">
					<el-image :src="scope.row.snap_img"  style="max-height: 50px; max-width: 100px;">
					</el-image>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="地址" width="150"></el-table-column>
			<el-table-column prop="mobile" label="电话" width="150"></el-table-column>
			<el-table-column prop="total_count" label="数量" width="150"></el-table-column>
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
			<el-table-column prop="create_time" label="创建时间" width="200"></el-table-column>
			<el-table-column prop="delete_time" label="删除时间" width="150"></el-table-column>
			<el-table-column prop="expired_time" label="过期时间" width="150"></el-table-column>
		</el-table>
	</div>
</template>

<script>
    import Order from '../../model/Order'

    export default {
        name: 'order',
		data() {
            return {
                loading: false,
                tableData: [],
                formInline: {
                    order_no: '',
                    snap_title: '',
                    status: ''
                },
			}
		},
		async created() {
            this.loading = true
			await this.getOrderList()
		},
		methods: {
            async onSubmit() {
                console.log(this.formInline)
                await this.getOrderList()
			},
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
                const order = await Order.getOrderList(this.formInline)
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

			.form {
				margin-top: 30px;
				/deep/ .el-form-item__content {
					margin-bottom: 0;
				}
			}

		}
	}
</style>

