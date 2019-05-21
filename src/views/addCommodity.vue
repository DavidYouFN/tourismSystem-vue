<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
  				<header class="form_header">选择商品类型</header>
	  			<el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
		  			<el-row class="category_select">
		  				<el-form-item label="商品种类">
			  				<el-select v-model="categoryForm.categorySelect" :placeholder="selectValue.type" style="width:100%;">
							    <el-option
							      	v-for="item in categoryForm.categoryList"
							      	:key="item.type"
							      	:label="item.type"
							      	:value="item.typeId">
							    </el-option>
						  	</el-select>
						</el-form-item>
					</el-row>
					<el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
						<div class="add_category">
							<el-form-item label="商品种类" prop="type">
								<el-input v-model="categoryForm.type"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitcategoryForm('categoryForm')">提交</el-button>
							</el-form-item>
						</div>
					</el-row>
					<div class="add_category_button" @click="addCategoryFun">
						<i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
						<i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
						<span>添加商品类型</span>
					</div>
	  			</el-form>
	  			<header class="form_header">添加商品</header>
	  			<el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form">
	  				<el-form-item label="商品名称" prop="commodityName">
						<el-input v-model="foodForm.commodityName"></el-input>
					</el-form-item>
					<el-form-item label="商品价格" prop="commodityPrice">
						<el-input v-model="foodForm.commodityPrice"></el-input>
					</el-form-item>
					<el-form-item label="商品描述" prop="commodityDescribe">
						<el-input v-model="foodForm.commodityDescribe"></el-input>
					</el-form-item>
					<el-form-item label="商品有限期" prop="termOfValidity">
						<el-input v-model.number="foodForm.termOfValidity"></el-input>
					</el-form-item>
					<el-form-item label="库存" prop="stock">
						<el-input v-model="foodForm.stock"></el-input>
					</el-form-item>
					<el-form-item label="上传商品图片" enctype="multipart/form-data">
						<el-upload
								action="http://localhost:8080/upload/uploadFile"
								list-type="picture-card"
								:on-preview="handlePictureCardPreview"
								:on-remove="handleRemove"
								:before-upload="beforeImgUpload"
								:auto-upload="true"
								:on-success="getImgURL"
								:on-change="handleChange">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addCommodity('foodForm')">确认添加商品</el-button>
					</el-form-item>
	  			</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import {getCategory, addCategory, addFood} from '@/api/getData'
    export default {
    	data(){
    		return {
    			categoryForm: {
                    categoryList: [],
    				categorySelect: '',
    				type: '',
    			},
    			foodForm: {
    			    commodityId:'',
                    commodityName: '',
                    commodityPrice: '',
                    commodityDescribe:'',
                    termOfValidity:'',
                    stock:'',
    				imgURL: ''
    			},
    			foodrules: {
                    commodityName: [
						{ required: true, message: '请输入商品名称', trigger: 'blur' },
					],
                    commodityPrice: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' },
                    ],
                    commodityDescribe: [
                        { required: true, message: '请输入商品描述', trigger: 'blur' },
                    ],
                    termOfValidity: [
                        { required: true, message: '请输入商品有效期', trigger: 'blur' },
                    ],
                    stock: [
                        { required: true, message: '请输入库存数量', trigger: 'blur' },
                    ],
    			},
    			showAddCategory: false,
    			foodSpecs: 'one',
    			dialogFormVisible: false,
		        specsFormrules: {
		        	specs: [
						{ required: true, message: '请输入规格', trigger: 'blur' },
					],
		        }
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
    		if (this.$route.query.restaurant_id) {
    			this.restaurant_id = this.$route.query.restaurant_id;
    		}else{
    			this.restaurant_id = Math.ceil(Math.random()*10);
    			this.$msgbox({
		          title: '提示',
		          message: '添加食品需要选择一个商铺，先去就去选择商铺吗？',
		          showCancelButton: true,
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          beforeClose: (action, instance, done) => {
		            if (action === 'confirm') {
		              this.$router.push('/shopList');
		              done();
		            } else {
		            	this.$message({
				            type: 'info',
				            message: '取消'
				        });
		              	done();
		            }
		          }
		        })
    		}
    		this.initData();
    	},
    	computed: {
    		selectValue: function (){
    			return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
    		}
    	},
    	methods: {
            getImgURL(res,file,filelist){
				this.foodForm.imgURL = res.data;
				console.log(res.data);
			},
            handleChange(file) {
                this.foodForm.img = file.raw;
				console.log(file.raw)
			},
    		async initData(){
    			this.$axios.get("commodity/getAllServiceType")
					.then(res=>{
					    if (res.data.state==200){
					        console.log(res.data.data);
                            this.categoryForm.categoryList = res.data.data;
						}
					})
    		},
		    addCategoryFun(){
		    	this.showAddCategory = !this.showAddCategory;
		    },
		    submitcategoryForm(categoryForm) {
                let param = new URLSearchParams();
                param.append('type', this.categoryForm.type);
    		    this.$axios.post("commodity/addServiceType",param)
					.then(res=>{
					    if (res.data.state==200){
					        this.initData();
					        this.categoryForm.type='';
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
						} else {
                            this.$notify.error({
                                title: '错误',
                                message: '请检查输入是否正确',
                                offset: 100
                            });
                            return false;
						}
					})
			},
			beforeImgUpload(file) {
				const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isRightType) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isRightType && isLt2M;
			},
			handleDelete(index){
				this.foodForm.specs.splice(index, 1);
			},
			tableRowClassName(row, index) {
		        if (index === 1) {
		        	return 'info-row';
		        } else if (index === 3) {
		        	return 'positive-row';
		        }
		        return '';
		    },
            addCommodity(foodForm){
                let param = new URLSearchParams();
                param.append('commodityId', this.foodForm.commodityId);
                param.append('sellerId', sessionStorage.sellerId);
                param.append('commodityName', this.foodForm.commodityName);
                param.append('commodityPrice', this.foodForm.commodityPrice);
                param.append('commodityDescribe', this.foodForm.commodityDescribe);
                param.append('termOfValidity', this.foodForm.termOfValidity);
                param.append('stock', this.foodForm.stock);
                param.append('ImgURL', this.foodForm.imgURL);
                this.$refs[foodForm].validate(async (valid) => {
                    if (valid) {
                        this.$axios.post("commodity/addCommodityToStock", param)
                            .then(res => {
                                if (res.data.state == 200) {
                                    this.initData();
                                    this.categoryForm.type = '';
                                    this.$message({
                                        type: 'success',
                                        message: '添加成功'
                                    });
                                    this.foodForm = {
                                        commodityId: '',
                                        commodityName: '',
                                        commodityPrice: '',
                                        commodityDescribe: '',
                                        termOfValidity: '',
                                        stock: '',
                                        imgURL: '',
                                    }
                                } else {
                                    this.$notify.error({
                                        title: '错误',
                                        message: '请检查输入是否正确',
                                        offset: 100
                                    });

                                    return false;
                                }
                            })
                    }
                })
		    }
		}
    }
</script>

<style lang="less">
	@import '../assets/less/main.less';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.food_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.cell{
		text-align: center;
	}
</style>
