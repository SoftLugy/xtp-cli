<template>
    <section v-loading="listLoading">
        <!--工具条-->
        <el-col :span="24"  style="padding-bottom: 8px;border-bottom: 1px solid #eeeeee">
            <el-button-group>
                <el-button type="primary" :disabled="editEnabled" @click="handleEdit" icon="edit" title="编辑"></el-button>
                <el-button type="warning" :disabled="!editEnabled" @click="handleCancel" title="取消"><i class="fa fa-mail-reply"></i></el-button>
                <el-button type="success" :disabled="!editEnabled" @click="handleSave" title="保存" :loading="loading.saveLoading"><i class="fa fa-save"></i></el-button>
            </el-button-group>
        </el-col>
        <fieldset class="box" v-for="item in menuList">
            <legend>
                <el-checkbox :disabled="!editEnabled" v-model="item.checkAll" @change="handleCheckAllChange(item)">{{item.name}}</el-checkbox>
            </legend>
            <div style="display: flex;flex-flow: row wrap">
                <div v-for="subitem in item.childs" style="margin: .5rem">
                    <el-checkbox :disabled="!editEnabled" v-model="subitem.checked">{{subitem.name}}</el-checkbox>
                </div>
            </div>
        </fieldset>
    </section>
</template>
<script>
    import { getMenuList,updateRoleMenu,getRoleMenuList } from '../../api/api';
    export default{
        data() {
            return {
                selectedMenus:[],
                editEnabled:false,
                menuList: [],
                listLoading: true,
                loading:{saveLoading:false}
            }
        },
        props:{
            roleId:{
                type:Number,
                default:0
            }
        },
        methods: {
            handleEdit(){
                this.editEnabled=true;
            },
            handleCancel(){
                this.editEnabled=false;
            },
            getRoleMenus(){
                let _self=this;
                return new Promise(function(resolve,reject){
                    getRoleMenuList({pageIndex:1,pageSize:999999,roleId:_self.roleId}).then(function(res){
                        if(res.data.code===1){
                            res.data.data.data.forEach(function(item){
                                _self.selectedMenus.push(item.menuId);
                            });
                            resolve();
                        }
                    });
                });
            },
            //获取菜单列表
            getMenus() {
                let _self=this;
                return new Promise(function(resolve,reject){
                    let para = {pageIndex:1,pageSize:999999};
                    getMenuList(para).then((res) => {
                    let menuArr= res.data.data.data;
                    let count=menuArr.length;
                    menuArr.map(function (item) {
                        getMenuList({pageIndex: 1, pageSize: 999999, parentId: item.id}).then(function (res) {
                            item.isIndeterminate=true;
                            item.checkAll=false;
                            item.checkedSubMenus=[];
                            item.childs = res.data.data.data;
                            item.childs.map(function(i){
                                i.checked=false;
                                if(_self.selectedMenus.indexOf(i.id)>-1)
                                    i.checked=true;
                            })
                            count--;
                            if(count==0)
                                resolve(menuArr);
                        })
                        });
                    });
                });
            },
            handleCheckAllChange(item){
                item.childs.map(function(i){
                    i.checked= item.checkAll;
                });
            },
            handleSave(){
                let selectArr = [], _self = this;
                this.menuList.forEach(function (main) {
                    main.childs.forEach(function (sub) {
                        if (sub.checked){
                            selectArr.push(sub.id);
                            if(selectArr.indexOf(sub.parentId)<0){
                                selectArr.push(sub.parentId);
                            }
                        }
                    })
                })
                _self.loading.saveLoading=true;
                updateRoleMenu({roleId: this.roleId, menuIds: selectArr.join(',')}).then(function (res) {
                    _self.loading.saveLoading=false;
                    if (res.data.code == 1) {
                        _self.editEnabled=false;
                        _self.listLoading = false;
                        _self.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    }else{
                        _self.$message({
                            message: "保存失败，请重试！",
                            type: 'danger'
                        });
                    }
                });
            }
        },
        created() {
            let _self=this;
            this.listLoading = true;
            this.getRoleMenus().then(function(){
                _self.getMenus().then(function(obj){
                    _self.listLoading=false;
                    _self.menuList=obj;
                });
            })
        }
    }
</script>
<style scoped>
    section
    {
        display: flex;
        flex-flow:row wrap;
    }
    section .box
    {
        width: 12rem;
        border-radius: 5px;
        border:1px solid #1c8de0;
        box-shadow: 5px 5px 5px #999999;
        margin: .5rem;
        padding: 1rem;
    }

</style>