<template>
    <section>
        <!--工具条-->
        <xt-search @click="getUsers" :addButton="true" @addClick="handleAdd">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.account" placeholder="账户名"></el-input>
                </el-form-item>
            </el-form>
            </xt-search>

        <!--列表-->
        <el-table :data="userList" highlight-current-row v-loading="listLoading"  style="width: 100%;" @selection-change="selsChange"> <!--@selection-change="selsChange"-->
            <!--<el-table-column type="expand">-->
                <!--<template scope="scope">-->
                    <!--<usermenu :userId="scope.row.id"></usermenu>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column type="index" width="60">
                <template scope="scope">
                    {{(pageInfo.pageIndex-1)*pageInfo.pageSize+scope.$index+1}}
                </template>
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="appName"-->
                    <!--align="center"-->
                    <!--label="所属应用">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="name"
                    align="center"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="account"
                    align="center"
                    label="登录账户">
            </el-table-column>
           <!-- <el-table-column
                    prop="groupId"
                    align="center"
                    label="分组号">
            </el-table-column>-->
            <el-table-column
                    prop="phone"
                    align="center"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    prop="mail"
                    align="center"
                    label="Email">
            </el-table-column>
            <el-table-column
                    prop="qq"
                    align="center"
                    label="QQ">
            </el-table-column>

            <el-table-column label="操作" minWidth="207">
                <template scope="scope">
                    <el-button size="small" type="primary" @click="handleReset(scope.$index, scope.row)">重置密码</el-button>
                    <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <el-pagination
                    style="float:right;"
                    @size-change="handledSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.pageIndex"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageInfo.pageSize"
                    layout="sizes, prev, pager, next"
                    :total="pageInfo.count">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="formRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账户名" prop="account">
                    <el-input v-model="editForm.account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="editForm.roleIds" multiple placeholder="请选择">
                        <el-option v-for="item in roles" :label="item.name" :value="item.id+''">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="分组号" prop="groupId">-->
                    <!--<el-input v-model="editForm.groupId" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="editForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="mail">
                    <el-input v-model="editForm.mail" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                    <el-input v-model="editForm.qq" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="handleCancel">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="100px" :rules="formRules" ref="addForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账户名" prop="account">
                    <el-input v-model="addForm.account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="addForm.roleIds" multiple placeholder="请选择">
                        <el-option v-for="item in roles" :label="item.name" :value="item.id+''">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="分组号" prop="groupId">-->
                    <!--<el-input v-model="addForm.groupId" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="addForm.phone" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="mail">
                    <el-input v-model="addForm.mail" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                    <el-input v-model="addForm.qq" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserList,addUserInfo,editUserInfo,deleteUserInfo,getRoleList,getUserRoleList,updateRoleUser,updateUserResetPassword } from '../../api/api';
    import {CheckExp,CodeChange,MessageBox} from '../../common/js/util'
    import usermenu from './usermenu';
    import search from '../../components/search.vue'

    export default {
        data() {
            var checkPhone = (rule, value, callback) => {
                if(CheckExp.isTel(value)){
                    callback();
                }else{
                    return callback(new Error('请填写正确的电话号码'));
                }
            }
            var checkQQ=(rule, value, callback) => {
                if(value!=''&&value!=undefined) {
                    if (CheckExp.isQQ(value)) {
                        callback();
                    } else {
                        return callback(new Error('请填写正确的QQ'));
                    }
                }else{
                    callback();
                }
            }
            var checkUser=(rule, value, callback) =>{
                let param={account:value},_this=this;
                this.getHadUser(param).then(({isEmpty,id}) => {
                    if((this.editFormVisible)&&(id==this.editForm.id))
                    callback()
                else{
                    if(!isEmpty)
                        return callback(new Error('该账户已存在，请重新输入'));
                    else  callback();
                }
            })
            }
            return {
                filters: {
                    key: '',account:'',name:''
                },
                roles:[],
                pageInfo:{pageIndex:1,pageSize:10,count:0},
                userList: [],
                listLoading: false,
                sels: [],//列表选中列
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                formRules: {
                    account: [
                        {required: true, message: '请输入账户名', trigger: 'change'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'},
                        {validator:checkUser, trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
//                    groupId: [
//                        {required: true, message: '请输入分组号', trigger: 'blur'}
//                    ],
                    phone: [
                        {minlength: 11, maxlength: 11,required: true, message: '请输入正确的手机号', trigger: 'blur'},
                        { validator:checkPhone, trigger: 'blur,change' }],
                    mail:[{ required: false, message: '', trigger: 'change' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
                    qq:[{required: false, message: '', trigger: 'blur'},{ validator:checkQQ, trigger: 'change' }]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    appId:1,
                    name: '',
                    account:'',
                    qq:'',
                    mail:'',
                    roleIds:[],
                    //groupId:'',
                    phone:''
                },
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                //新增界面数据
                addForm: {
                    id: 0,
                    appId:1,
                    name: '',
                    account:'',
                    qq:'',
                    mail:'',
                    roleIds:[],
                    //groupId:'',
                    phone:''
                }
            }
        },
        watch:{
            'addForm.code'(){
                this.addForm.code=this.addForm.code.replace(/(^\s+)|(\s+$)/g,"")
            },
            'addForm.name'(){
                this.addForm.name=this.addForm.name.replace(/(^\s+)|(\s+$)/g,"")
            },
            'editForm.code'(){
                this.editForm.code=this.editForm.code.replace(/(^\s+)|(\s+$)/g,"")
            },
            'editForm.name'(){
                this.editForm.name=this.editForm.name.replace(/(^\s+)|(\s+$)/g,"")
            }
        },
        methods: {
            handleCancel(){
                this.editFormVisible = false
                this.$refs["editForm"].resetFields();
            },
            handledSizeChange(val){
                this.pageInfo.pageSize=val;
                this.getUsers();
            },
            handleCurrentChange(val){
                this.pageInfo.pageIndex=val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let _self = this;
                let para = Object.assign({},this.pageInfo);
                para.name='%'+_self.filters.name+'%';
                para.account='%'+_self.filters.account+'%';
                this.listLoading = true;
                //NProgress.start();
                getUserList(para).then((res) => {
                    _self.pageInfo.pageIndex=res.data.data.currentPage
                _self.pageInfo.count=res.data.data.count
                _self.userList = res.data.data.data;
                _self.userList.map(element => {
                    element.account=CodeChange.specialCharacter(element.account)
                    element.name=CodeChange.specialCharacter(element.name)
                    element["QQ"]=element.qq
                })
                _self.listLoading = false;
                //NProgress.done();
            }).catch(function (error) {
                    _self.listLoading = false;
                    _self.userList=[]
                });
            },
            getHadUser(params){
                return new Promise(function(resolve, reject) {
                    let isEmpty=true,id='';
                    getUserList(params).then((res) => {
                        if(res.data.data.count!=0){
                            isEmpty=false
                            id=res.data.data.data[0].id
                        }
                    resolve({isEmpty,id})
                    })
                })
            },
            getRoles(){
                let _self=this;
                getRoleList({pageIndex:1,pageSize:999999}).then(function(res){
                    if(res.data.code==1){
                        _self.roles=res.data.data.data;
                    }
                })
            },
            handleReset(index,row){
                this.$confirm('确认重置该用户的密码吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    updateUserResetPassword({id:row.id}).then((res)=>{
                        this.$message({
                            showClose: true,
                            message: '重置密码成功!【新密码：'+res.data.data.password+'】',
                            type: 'success',
                            duration:100000
                        });
                    });
            }).catch(() => {

                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                //NProgress.start();
                let para = { id: row.id };
                deleteUserInfo(para).then((res) => {
                    this.listLoading = false;
                //NProgress.done();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.getUsers();
            });
            }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                if(!row.roleIds){
                    row.roleIds=[];
                    getUserRoleList({pageIndex:1,pageSize:999999,userId:row.id}).then(function(res){
                        if(res.data.code==1){
                            res.data.data.data.forEach(function(i){
                                row.roleIds.push(i.roleId+'');
                            });
                        }
                    })
                }
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm={id: 0,appId:1,name: '',account:'',qq:'',mail:'',roleIds:[],phone:''}
            },
            //编辑
            editSubmit: function () {
                let _this=this;
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.editForm);
                        editUserInfo(para).then((res) => {
                            this.editLoading = false;
                        updateRoleUser({userId:this.editForm.id,roleIds:this.editForm.roleIds.join(',')});
                        if(res.data.code==1) {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.getUsers();
                        }else{
                            MessageBox.codeMessage(res.data.code).then(function ({message}) {
                                _this.$message({
                                    message: message,
                                    type: 'error'
                                });
                            })
                        }
                    });
                    });
                    }
                });
            },
            //新增
            addSubmit: function () {
                let _this=this;
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.addForm);
                        addUserInfo(para).then((res) => {
                            this.addLoading = false;
                        //NProgress.done();
                        if(res.data.code==1){
                            this.$message({
                                message: '新增成功，用户【'+res.data.data.account+'】的初始密码是:'+res.data.data.password,
                                showClose: true,
                                type: 'success',
                                duration:100000
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.getUsers();
                        }else{
                            MessageBox.codeMessage(res.data.code).then(function ({message}) {
                                _this.$message({
                                    message: message,
                                    type: 'error'
                                });
                            })
                        }
                    });
                    });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                //NProgress.start();
                let para = { ids: ids };
                batchRemoveUser(para).then((res) => {
                    this.listLoading = false;
                //NProgress.done();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.getUsers();
            });
            }).catch(() => {

                });
            }
        },
        components:{usermenu,'xt-search':search},
        mounted() {
            this.getRoles();
            this.getUsers();
        }
    }

</script>