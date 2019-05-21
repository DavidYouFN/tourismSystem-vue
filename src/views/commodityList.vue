<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品名称">
                                <span>{{ props.row.commodityName }}</span>
                            </el-form-item>
                            <el-form-item label="库存">
                                <span>{{ props.row.stock }}</span>
                            </el-form-item>
                            <el-form-item label="商品id">
                                <span>{{ props.row.commodityId }}</span>
                            </el-form-item>
                            <el-form-item label="商品价格">
                                <span>￥{{ props.row.commodityPrice }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <span>{{ props.row.commodityDescribe }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="商品名称"
                        prop="commodityName">
                </el-table-column>
                <el-table-column
                        label="商品描述"
                        prop="commodityDescribe">
                </el-table-column>
                <el-table-column
                        label="库存"
                        prop="stock">
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                @click="showModal(scope.row.commodityId)">编辑</el-button>
                        <el-button
                                size="small"
                                type="danger"
                                @click="handleDelete(scope.row.commodityId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="20"
                        layout="total, prev, pager, next"
                        :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
                <el-form v-model="form1" >
                    <el-form-item label="商品名称" >
                        <el-input v-model="form1.commodityName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="form1.commodityPrice" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述" >
                        <el-input v-model="form1.commodityDescribe" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="库存">
                        <el-input v-model="form1.stock" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="modifyCommodity">确 定</el-button>
                </div>
            </el-dialog>


        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getFoods, getFoodsCount, getMenu, updateFood, deleteFood, getResturantDetail, getMenuById} from '@/api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                form1: {
                    commodityName: '',
                    commodityPrice: '',
                    commodityDescribe: '',
                    stock: '',
                    commodityId:'',
                },
                offset: 0,
                limit: 20,
                count: 0,
                tableData:[{
                    commodityId:'',
                    commodityName:'',
                    commodityDescribe:'',
                    supplier:'',
                }],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                menuOptions: [],
                selectMenu: {},
                selectIndex: null,
                specsForm: {
                    specs: '',
                    packing_fee: 0,
                    price: 20,
                },
                specsFormrules: {
                    specs: [
                        { required: true, message: '请输入规格', trigger: 'blur' },
                    ],
                },
                specsFormVisible: false,
                expendRow: [],

            }
        },
        created(){
            this.restaurant_id = this.$route.query.restaurant_id;
            this.initData();
        },
        computed: {
            specs: function (){
                let specs = [];
                if (this.selectTable.specfoods) {
                    this.selectTable.specfoods.forEach(item => {
                        specs.push({
                            specs: item.specs_name,
                            packing_fee: item.packing_fee,
                            price: item.price,
                        })
                    })
                }
                return specs
            }
        },
        components: {
            headTop,
        },
        methods: {
            showModal(commodityId){
                this.dialogFormVisible = true;
                this.form1.commodityId = commodityId;
            },
            async modifyCommodity(){console.log(this.form1);console.log(this.tableData);
            var data = {commodityId:this.form1.commodityId,commodityName:this.form1.commodityName,commodityDescribe:this.form1.commodityDescribe,commodityPrice:this.form1.commodityPrice,stock:this.form1.stock};
                let param = new URLSearchParams();
                param.append('commodityId', this.form1.commodityId);
                param.append('commodityName', this.form1.commodityName);
                param.append('commodityDescribe', this.form1.commodityDescribe);
                param.append('commodityPrice', this.form1.commodityPrice);
                param.append('stock', this.form1.stock);
                this.dialogFormVisible = false;
                this.$axios.post("commodity/updateCommodityToStock",param)
                    .then(res=>{
                        console.log('res')
                        console.log(res);
                        if (res.data.state==200){
                            this.$message({
                                type: 'success',
                                message: '更新食品信息成功'
                            });
                            this.initData();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        }
                    })
            },
            async initData(){
                this.$axios.get("commodity/getAllCommodityToStock")
                    .then(res=>{
                        if (res.data.state==200){
                           this.tableData=res.data.data;
                        }
                    })
            },
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },
            deleteSpecs(index){
                this.specs.splice(index, 1);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getFoods()
            },
            expand(row, status){
                if (status) {
                    this.getSelectItemData(row)
                }else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },
            dialogFormVisible(row) {
                this.getSelectItemData(row, 'edit')
                this.dialogFormVisible = true;
            },
            handleSelect(index){
                this.selectIndex = index;
                this.selectMenu = this.menuOptions[index];
            },
            handleDelete(index, row) {
                this.$axios.post("commodity/delCommodityToStock?commodityId="+this.tableData[0].commodityId)
                    .then(res=>{
                        if (res.data.state==200){
                            this.$message({
                                type: 'success',
                                message: '删除食品成功'
                            });
                            this.tableData.splice(index, 1);
                        }else{
                            throw new Error(res.message)
                            console.log('删除食品失败')
                        }
                    })
                }
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.image_path = res.image_path;
                }else{
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

    }
</script>

<style lang="less">
    @import '../assets/less/main.less';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
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
</style>
