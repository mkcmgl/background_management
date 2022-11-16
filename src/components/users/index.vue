<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="9">

                    <el-input placeholder="请输入内容" clearable>
                        <!-- 为搜索button绑定getUserList()事件 -->

                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>

                </el-col>

                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>
        </el-card>

        <!-- //用户列表 -->
        <el-table :data="userList" style="width: 100%" border stripe>
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column prop="username" label="姓名" >
            </el-table-column>
            <el-table-column prop="email" label="油箱" >
            </el-table-column>
            <el-table-column prop="mobile" label="电话" >
            </el-table-column>
            <el-table-column prop="role_name" label="角色" >
            </el-table-column>
            <el-table-column prop="mg_state" label="状态" >
                <template slot-scope="scope">
                    
                    <el-switch v-model="scope.row.mg_state" @change="roleChange(scope.row)"
                    >
                    
                    </el-switch>
                </template>


            </el-table-column>
            <el-table-column label="操作" width="200" >
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit"  size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                    <el-tooltip :enterable="false" content="分配角色" placement="top" class="item" effect="dark">
                        <el-button type="warning" icon="el-icon-setting"  size="mini"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 5]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'users',

    data() {
        return {
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 2,
            },
            userList: [],
            pagenum: 1,
            total: 0,
        };
    },
    created() {
        this.getUserList()
    },
    mounted() {

    },

    methods: {
        async getUserList() {
            const { data: res } = await this.$http.get('users', { params: this.queryInfo })
            if (res.meta.status !== 200) {
                return this.$message.error('获取失败')
            }
            this.userList = res.data.users
            this.total = res.data.total
        },
        handleSizeChange(newSize){
            this.queryInfo.pagesize=newSize
            this.getUserList()
        },
        handleCurrentChange(newPage){
            this.queryInfo.pagenum=newPage
            this.getUserList()
        },
        async roleChange(val){
         const {data:res}=await   this.$http.put(`users/${val.id}/state/${val.mg_state}`)
         if (res.meta.status !== 200) {
            val.mg_state=!val.mg_state
                return this.$message.error('更新用户状态失败')
            }
            this.$message.success('更新用户状态成功')
        }
    },
};
</script>

<style lang="scss" scoped>

</style>