<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row>
                <el-col>
                    <el-button type="primary">添加分类</el-button>
                </el-col>
            </el-row>
        </el-card>
         <tree-table border  index-text="索引" show-index :data="cateList" :columns="culumns" :expand-type="false"  :selection-type="false">
             <template slot-scope="scope" slot="isok">
                <i class=" el-icon-success" style="color:lightgreen" v-if="scope.row.cat_deleted===false"></i>
                <i class=" el-icon-error" style="color:red" v-else></i>
             </template>
             <template slot-scope="scope" slot="order">
                <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag> 
                <el-tag size="mini" type="success" v-if="scope.row.cat_level===1">二级</el-tag> 
                <el-tag size="mini" type="warning" v-if="scope.row.cat_level===2">三级</el-tag> 
             </template>
         </tree-table>
    </div>
</template>

<script>
export default {
    name: 'categories',

    data() {
        return {
            queryInfo: {
                type: 3,
                pagenum: 1,
                pagesize: 5
            },
            cateList: [],
            total:0,
            culumns:[
                {
                    label:'分类名称',
                    prop:'cat_name'
                },
                {
                    label:'是否有效',
                    type:'template',
                    template:'isok'
                },
                {
                    label:'排序',
                    type:'template',
                    template:'order'
                }
            ],

        };
    },
    created() {
        this.getCategoriesLsit()
    },
    mounted() {
    },

    methods: {
        async getCategoriesLsit() {
            const { data: res } = await this.$http.get('categories', {params:this.queryInfo} )
            if(res.meta.status!==200)  return this.$message.error('获取商品分类信息失败')
            this.cateList=res.data.result
            this.total=res.data.total

        }
    },
};
</script>

<style lang="scss" scoped>

</style>