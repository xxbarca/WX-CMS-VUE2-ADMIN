<template>
	<el-dialog :append-to-body="true" :before-close="handleClose" :visible.sync="visible">
		<div style="margin-top:-25px;">
			<div class="dialog-title">
				<span>{{ isCreate ? '创建六宫格' : '更新六宫格' }}</span>
			</div>
			<el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
				<el-form-item label="标题" prop="title">
					<el-input size="medium" v-model="form.title" placeholder="请填写宫格标题"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="name">
					<el-input size="medium" v-model="form.name" placeholder="请填写宫格名"></el-input>
				</el-form-item>
				<el-form-item label="分类" prop="category_id">
					<el-autocomplete
							@focus="loadSuggestions"
							popper-class="my-autocomplete"
							class="inline-input"
							v-model="state"
							:fetch-suggestions="querySearch"
							placeholder="请填写所属分类"
							@select="handleSelect"
					>
						<template slot-scope="{ item }">
							<span class="id">{{ item.id }}</span>
							<span class="name">{{ item.name }}</span>
						</template>
					</el-autocomplete>
				</el-form-item>
				<el-form-item label="图片" prop="img">
					<upload-imgs ref="uploadEle" :max-num="maxNum" :value="initData" />
				</el-form-item>
			</el-form>
		</div>
		<div slot="footer" class="dialog-footer" style="padding-left:5px;">
			<el-button type="primary" @click="submitForm" v-permission="{ permission: '更新六宫格', type: 'disabled' }"
			>确 定</el-button
			>
			<el-button @click="resetForm('form')">重 置</el-button>
		</div>
	</el-dialog>
</template>

<script>
    import UploadImgs from '@/component/base/upload-image'
    import Category from '../../model/Category'
    import GridCategory from '../../model/GridCategory'
    export default {
        name: 'grid-category-edit',
		components: {
            UploadImgs
		},
        props: {
            dialogFormVisible: {
                type: Boolean,
                default: false,
            },
            isCreate: {
                type: Boolean,
                default: false,
            },
            gridCategoryId: {
                type: Number,
                default: 0,
            },
        },
        data() {
            return {
                state: '',
                suggestions: [],
                display: true,
                initData: [],
                maxNum: 1,
                form: {
                    name: '',
                    title: '',
                    category_id: null,
                    root_category_id: null,
                },
            }
        },
        computed: {
            visible: {
                get() {
                    return this.dialogFormVisible
                },
                set() {},
            },
        },
        watch: {
            display(val) {
                this.form.online = val ? 1 : 0
            },
        },
		async mounted() {
            if (!this.isCreate) {

			}
		},
		methods: {
            handleClose(done) {
                done()
                this.$emit('dialogClose')
			},
            async loadSuggestions() {
				try {
					this.suggestions = await Category.getList()
                    if (this.suggestions.length === 0) {
                        this.$message.error('未找到宫格建议，请先添加宫格')
                    }
                } catch (e) {
                    this.$message.error('获取宫格建议信息失败')
                    console.error(error)
                }
			},
            querySearch(queryString, cb) {
                // eslint-disable-next-line
                const suggestions = this.suggestions
                const results = queryString ? suggestions.filter(this.createFilter(queryString)) : suggestions
                cb(results)
            },
            createFilter(queryString) {
                // eslint-disable-next-line
                return suggestion => {
                    return suggestion.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                }
            },
            handleSelect(item) {
                console.log(item)
                this.state = item.name
                this.form.category_id = item.id
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
                let res
                if (this.isCreate) {
                    res = await GridCategory.addGridCategory(form)
                } else {
                    res = await GridCategory.editGridCategory(this.gridCategoryId, form)
                }
                console.log(res)
                if (res.code < window.MAX_SUCCESS_CODE) {
                    this.$message.success(`${res.message}`)
                    this.$emit('dialogClose')
                }
			},
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },


		}
    }
</script>

<style scoped>

</style>
