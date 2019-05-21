<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="店铺名称" prop="shopName">
						<el-input v-model="formData.shopName"></el-input>
					</el-form-item>
					<el-form-item label="详细地址" prop="shopArea">
						<el-input v-model="formData.shopArea"></el-input>
					</el-form-item>
					<el-form-item label="店铺咨询号码" prop="shopPhone">
						<el-input v-model.number="formData.shopPhone" maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="店铺类型" prop="shopType">
						<el-input v-model="formData.shopType"></el-input>
					</el-form-item>
					<el-form-item label="商家姓名" prop="sellerName">
						<el-input v-model="formData.sellerName"></el-input>
					</el-form-item>
					<el-form-item label="商家联系电话" prop="phone">
						<el-input v-model.number="formData.phone" maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="商家邮箱" prop="email">
						<el-input v-model.email="formData.email"></el-input>
					</el-form-item>
					<el-form-item label="商家资产">
						<el-input v-model="formData.assets"></el-input>
					</el-form-item>
					<el-form-item label="服务类型">
						<el-input v-model="formData.serviceType"></el-input>
					</el-form-item>

				<!--	<el-form-item label="上传店铺头像">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/upload/uploadFile'"
						  :show-file-list="false"
						  :on-success="handleShopAvatarScucess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="formData.uploadUrl" :src="baseImgPath + formData.uploadUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="上传营业执照">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/shop'"
						  :show-file-list="false"
						  :on-success="handleBusinessAvatarScucess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="formData.business_license_image" :src="baseImgPath + formData.business_license_image" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>-->
					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
	import {validatePhone,validateEMail} from '../config/validator';
    export default {
        data() {
            return {
                city: {},
                formData: {
                    shopName: '', //店铺名称
                    shopArea: '', //地址
                    shopPhone: '',
                    shopType: '',
					sellerId:'',
                    sellerName:'',
					phone:'',
                    email:'',
                    assets:'',
                    serviceType:'',
                /*    uploadUrl: '',
                    business_license_image: '',*/

                },
                rules: {
                    shopName: [
                        {required: true, message: '请输入店铺名称', trigger: 'blur'},
                    ],
                    shopArea: [
                        {required: true, message: '请输入详细地址', trigger: 'blur'}
                    ],
                    shopPhone: [
                        {required: true, message: '请输入联系电话'},
                        {type: 'number', message: '电话号码必须是数字'},
                        {validator:validatePhone,trigger: 'blur'}
                    ],
					phone:[
                        {required: true, message: '请输入联系电话'},
                        {type: 'number', message: '电话号码必须是数字'},
						{validator:validatePhone,trigger: 'blur'}
					],
                    email:[
                        {required: true, message: '请输入邮箱'},
                        {type: 'email', message: '请输入正确邮箱'},
                        {validator:validateEMail,trigger: 'blur'}
                    ],
                },
                baseUrl,
                baseImgPath,
            }
        },
        components: {
            headTop,

        },
        mounted() {
            this.initData();
        },
        methods: {
            async initData() {
            },
            async querySearchAsync(queryString, cb) {
                if (queryString) {
                    try {
                        const cityList = await searchplace(this.city.id, queryString);
                        if (cityList instanceof Array) {
                            cityList.map(item => {
                                item.value = item.address;
                                return item;
                            })
                            cb(cityList)
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
            },
            addressSelect(address) {
                this.formData.latitude = address.latitude;
                this.formData.longitude = address.longitude;
                console.log(this.formData.latitude, this.formData.longitude)
            },
            handleShopAvatarScucess(res, file) {
                this.$axios.post("upload/uploadFile")
					.then(res=>{
                        if (res.data.state == 200) {
                            this.formData.image_path = res.image_path;
                        } else {
                            this.$message.error('上传图片失败！');
                        }
					})
            },
            handleBusinessAvatarScucess(res, file) {
                if (res.data.state == 200) {
                    this.formData.business_license_image = res.image_path;
                } else {
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
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
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },
            handleDelete(index) {
                this.activities.splice(index, 1)
            },
            submitForm(formName) {
                let param = new URLSearchParams();
                param.append('shopName', this.formData.shopName);
                param.append('shopArea', this.formData.shopArea);
                param.append('shopPhone', this.formData.shopPhone);
                param.append('shopType', this.formData.shopType);
                param.append('sellerId', this.formData.sellerId);
                param.append('sellerName', this.formData.sellerName);
                param.append('phone', this.formData.phone);
                param.append('email', this.formData.email);
                param.append('assets', this.formData.assets);
                param.append('serviceType', this.formData.serviceType);
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.$axios.post("user/addShop",param)
                            .then(res => {
                                if (res.data.state == 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '添加成功',
                                    });
                                    this.formData = {
                                        shopName: '', //店铺名称
                                        shopArea: '', //地址
                                        phone: '',
                                        shopType: '',
										sellerId:'',
                                        sellerName:'',
                                        phone:'',
                                        email:'',
                                        assets:'',
                                        serviceType:'',
                                     /*   image_path: '',
                                        business_license_image: '',*/
                                    };
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: result.message
                                    });
                                }
                            })
                    }
                })
            },
        }
    }
</script>

<style lang="less">
	@import '../assets/less/main.less';
	.button_submit{
		text-align: center;
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
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
