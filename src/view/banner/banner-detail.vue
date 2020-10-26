<template>
	<div class="container" v-if="!showEdit">
		<div class="title">
			<span>修改Banner</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
		</div>
		<el-divider></el-divider>
		<div class="wrap">
			<el-row>
				<el-col :lg="16" :md="20" :sm="24" :xs="24">
					<el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
						<el-form-item label="名称" prop="name">
							<el-input size="medium" v-model="form.name" placeholder="请填写名称"></el-input>
						</el-form-item>
						<el-form-item label="标题" prop="title">
							<el-input size="medium" v-model="form.title" placeholder="请填写标题"></el-input>
						</el-form-item>
						<el-form-item label="主图" prop="img">
							<UploadImgs ref="uploadEle" :value="initData" :max-num="mainMaxNum" />
						</el-form-item>
						<el-form-item label="描述" prop="description">
							<el-input size="medium" v-model="form.description" placeholder="请填写描述">
							</el-input>
						</el-form-item>
						<el-form-item class="submit">
							<el-button
									type="primary"
									v-permission="{ permission: '更新Banner', type: 'disabled' }"
									@click="submitForm('form')"
							>保 存</el-button
							>
							<el-button @click="resetForm('form')">重 置</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
		<div>
			<el-divider></el-divider>
			<div class="header">
				<div class="title">
					<span>Banner-Item列表</span>
					<el-button @click.prevent="addBannerItem" class="add-btn" type="primary" plain>新增Banner-Item</el-button>
				</div>
			</div>
			<el-row class="inner-container">
				<el-table stripe :data="bannerItems">
					<el-table-column prop="id" label="id" width="100"></el-table-column>
					<el-table-column prop="img" label="图片" width="200">
						<template v-if="scope.row.img" slot-scope="scope">
							<el-image :src="scope.row.img" :preview-src-list="imgSrcList" style="max-height: 50px; max-width: 100px;">
							</el-image>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="名称" width="150"></el-table-column>
					<el-table-column prop="keyword" label="关键字" min-width="200"></el-table-column>
					<el-table-column prop="type" label="类型" width="150"></el-table-column>
					<el-table-column fixed="right" width="150" label="操作">
						<template slot-scope="scope">
							<el-button @click.prevent="handleEdit(scope.row)" type="primary" plain size="mini">编辑</el-button>
							<el-button
									@click.prevent="handleDelete(scope.row)"
									type="danger"
									plain
									size="mini"
									v-permission="{ permission: '删除Banner item', type: 'disabled' }"
							>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
		</div>
<!--		<div class="form-container">-->
<!--			<el-form label-width="80px">-->
<!--				<el-form-item label="名称">-->
<!--					<el-input></el-input>-->
<!--				</el-form-item>-->
<!--				<el-form-item label="标题">-->
<!--					<el-input></el-input>-->
<!--				</el-form-item>-->
<!--			</el-form>-->
<!--		</div>-->
	</div>
	<BannerItemEdit
			v-else
			@editClose="editClose"
			:bannerId="bannerId"
			:isCreate="isCreate"
			:editID="editID"
	></BannerItemEdit>
</template>

<script>
    import Banner from '../../model/banner'
    import UploadImgs from '@/component/base/upload-image'
	import BannerItemEdit from './banner-item-edit'
    import BannerItem from '../../model/banner-item'

    export default {
        name: 'banner-modify',
        components: {
            UploadImgs,
			BannerItemEdit
        },
		props: {
            bannerId: {
                type: Number
			}
		},
		data() {
            return {
                form: {
                    name: '',
                    title: '',
                    description: '',
                },
                mainMaxNum: 1,
                initData: [],
                bannerItems: [],
                imgSrcList: [],
                showEdit: false,
                isCreate: false,
                editID: 0,
			}
		},
		methods: {
            back() {
                this.$emit('detailClose')
			},
            async getValue() {
                const val = await this.$refs.uploadEle.getValue()
                if (val && val.length > 0) {
                    this.form.img = val[0].display
                }
			},
            async submitForm() {
                await this.getValue()
                const form = { ...this.form }
                const res = await Banner.editBanner(this.bannerId, form)
				console.log(res)
                if (res.code < window.MAX_SUCCESS_CODE) {
                    this.$message.success(`${res.message}`)
                    this.$emit('detailClose')
                }
			},
            handleEdit(row) {
                this.isCreate = false
                this.editID = row.id
                this.showEdit = true
			},
            handleDelete(row) {
                this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    const res = await BannerItem.deleteBannerItem(row.id)
                    if (res.code < window.MAX_SUCCESS_CODE) {
                        await this.getDetail()
                        this.$message({
                            type: 'success',
                            message: `${res.message}`,
                        })
                    }
                })
			},
			// 添加bannerItem
            addBannerItem() {},
            editClose() {
                this.showEdit = false
                this.getDetail()
			},
			// 重置
            resetForm(formName) {
                this.$refs[formName].resetFields()
			},
            async getDetail() {
                const res = await Banner.getBannerWithItem(this.bannerId)
                this.form = res
                this.initData = [{ id: res.id, display: res.img }]
                this.bannerItems = res.items
				this.initImgSrcList()
			},
            initImgSrcList() {
                this.bannerItems.forEach(item => {
                    if (!item.img) {
                        return
                    }
                    this.imgSrcList.push(item.img)
                })
            },
		},
		async mounted() {
            await this.getDetail()
        }
    }
</script>

<style scoped lang="scss">
	.el-divider--horizontal {
		margin: 0;
	}

	.container {
		.title {
			height: 59px;
			line-height: 59px;
			color: $parent-title-color;
			font-size: 16px;
			font-weight: 500;
			text-indent: 40px;
			.add-btn {
				margin-left: 30px;
			}

			.back {
				float: right;
				margin-right: 40px;
				cursor: pointer;
			}
		}

		.wrap {
			padding: 20px;
		}

		.submit {
			float: left;
		}

		.inner-container {
			margin-bottom: 50px;
		}
	}
	.col {
		display: flex;
		justify-content: space-between;
	}
</style>
