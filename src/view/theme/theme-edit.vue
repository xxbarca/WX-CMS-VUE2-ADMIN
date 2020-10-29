<template>
	<div>
		<sticky-top>
			<div class="title">
				<span>{{ isCreate ? '创建主题' : '更新主题' }}</span>
				<span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
				<el-divider></el-divider>
			</div>
		</sticky-top>
		<div class="container">
			<div class="wrap">
				<el-row>
					<el-col :lg="16" :md="20" :sm="24" :xs="24">
						<el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
							<el-form-item label="标题" prop="title">
								<el-input size="medium" v-model="form.title" placeholder="请填写标题"></el-input>
							</el-form-item>
							<el-form-item label="名称" prop="title">
								<el-input size="medium" v-model="form.name" placeholder="请填写名称"></el-input>
							</el-form-item>
							<el-form-item label="主题描述" prop="description">
								<el-input size="medium" v-model="form.description" placeholder="请填写主题描述"></el-input>
							</el-form-item>

							<el-form-item label="模板名" prop="tpl_name">
								<el-select v-model="form.tpl_name" placeholder="请选择模板名">
									<el-option v-for="item in tpl_options" :key="item" :label="item" :value="item"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="是否上线">
								<el-switch
										size="medium"
										v-model="onlined"
										active-color="#13ce66"
										inactive-color="#ff4949"
										active-text="上线"
										inactive-text="下线"
								></el-switch>
							</el-form-item>
							<el-form-item label="标题图" prop="title_img">
								<UploadImgs :rules="rules" :max-num="maxNum" ref="uploadImgEle" :value="initImgData" />
							</el-form-item>

							<el-form-item label="入口图" prop="entrance_img">
								<UploadImgs :rules="rules" :max-num="maxNum" ref="uploadEntranceEle" :value="initEntranceData" />
							</el-form-item>

							<el-form-item label="外部图" prop="entrance_img">
								<UploadImgs :rules="rules" :max-num="maxNum" ref="uploadInternalEle" :value="initInternalData" />
							</el-form-item>

							<el-form-item class="submit">
								<el-button
										v-permission="{ permission: ['创建主题', '更新主题'], type: 'disabled' }"
										type="primary"
										@click="submitForm('form')"
								>保 存</el-button
								>
								<el-button @click="resetForm('form')">重 置</el-button>
							</el-form-item>

						</el-form>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
    import Theme from '../../model/theme'
    import UploadImgs from '@/component/base/upload-image'

    export default {
        name: 'theme-edit',
		components: {
            UploadImgs
		},
        props: {
            isCreate: {
                type: Boolean,
                default: false,
            },
            themeId: {
                type: String,
                default: null,
            },
        },
		data() {
            return {
                form: {
                    title: '',
                    name: '',
                    tpl_name: '',
                    description: '',
                    online: 1,
                    title_img: null,
                    entrance_img: null,
                    internal_top_img: null,
                },
                rules: {
                    minWidth: 10,
                    minHeight: 10,
                    maxSize: 5,
                },
                onlined: true,
                maxNum: 1,
                initImgData: [],
                initEntranceData: [],
                initInternalData: [],
                tpl_options: ['diana', 'irelia', 'camille', 'janna', 'spu-list'],
			}
		},
		methods: {
            back() {
                this.$emit('editClose')
			},
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            async submitForm() {
                await this.getValue()
                try {
                    const postData = { ...this.form }
                    let res
                    if (this.isCreate) {
                        res = await Theme.addTheme(postData)
                    } else {
                        res = await Theme.editTheme(this.themeId, postData)
                    }
                    if (res.code < window.MAX_SUCCESS_CODE) {
                        this.$message.success(`${res.message}`)
                        this.$confirm('是否返回上一页', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                        }).then(async () => {
                            this.$emit('editClose')
                        })
                    }
                } catch (error) {
                    console.error(error)
                }
			},
            async getValue() {
                const val = await this.$refs.uploadImgEle.getValue()
                if (val && val.length > 0) {
                    this.form.title_img = val[0].display
                }
                const val1 = await this.$refs.uploadEntranceEle.getValue()
                if (val1 && val1.length > 0) {
                    this.form.entrance_img = val1[0].display
                }
                const val2 = await this.$refs.uploadInternalEle.getValue()
                if (val2 && val2.length > 0) {
                    this.form.internal_top_img = val2[0].display
                }
            },
		},
        watch: {
            onlined(val) {
                this.form.online = val ? 1 : 0
            },
        },
		async mounted() {
			if (!this.isCreate) {
                const res = await Theme.getTheme(this.themeId)
				this.form = res
				this.initImgData = [
                    {
                        id: res.id,
                        display: res.title_img,
                    },
                ]
				this.initEntranceData = [
                    {
                        id: res.id,
                        display: res.entrance_img,
                    },
                ]
				this.initInternalData = [
                    {
                        id: res.id,
                        display: res.internal_top_img,
                    },
                ]
			}
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
	}

	.display_img {
		max-width: 100px;
		max-height: 50px;
		width: auto;
		height: auto;
	}

	.plus {
		display: flex;
		justify-content: space-between;
	}

	.complete {
		margin-top: 20px;
		display: flex;
		.add {
			margin-left: 10px;
		}
	}

	.my-autocomplete {
		li {
			line-height: normal;
			padding: 7px;
			display: inline-flex;
			align-content: space-around;
			.name {
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.id {
				margin-right: 15px;
				font-size: 12px;
				color: #b4b4b4;
			}

			.highlighted .addr {
				color: #ddd;
			}
		}
	}
</style>
