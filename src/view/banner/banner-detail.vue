<template>
	<div class="container">
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
</template>

<script>
    import Banner from '../../model/banner'
    import UploadImgs from '@/component/base/upload-image'

    export default {
        name: 'banner-modify',
        components: {
            UploadImgs,
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
                bannerItems: []
			}
		},
		methods: {
            back() {
                this.$emit('handleOnClose')
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
			}
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
