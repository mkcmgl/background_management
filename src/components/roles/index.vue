<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row>
                <el-col>
                    <el-button type="primary">添加角色</el-button>

                </el-col>
            </el-row>
            <el-table :data="rolesList" border stripe>
                <el-table-column type="expand">
                    <template slot-scope="scope">

                        <el-row :class="['bdbuttom', i === 0 ? 'bdtop' : '', 'vcenter']"
                            v-for="(item, i) in scope.row.children" :key="item.id">
                            <!-- 一级权限 -->

                            <el-col :span="5">
                                <el-tag closable @close="removeRightById(scope.row, item.id)"> {{ item.authName }}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>

                            <el-col :span="19">
                                <!-- 二级权限 -->
                                <el-row :class="[i === 0 ? '' : 'bdtop', 'vcenter']"
                                    v-for="( itemChildren, i) in item.children " :key="itemChildren.id">
                                    <el-col :span="6">
                                        <el-tag  closable @close="removeRightById(scope.row, itemChildren.id)" type="success">{{ itemChildren.authName }}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="15">
                                           <!--三级权限 -->
                                        <el-tag closable @close="removeRightById(scope.row, itemc.id)" type="warning"
                                            v-for="(itemc, i) in itemChildren.children" :key="itemc.id">
                                            {{ itemc.authName }}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>

                        </el-row>

                    </template>
                </el-table-column>
                <el-table-column label="索引" type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        <el-tooltip :enterable="false" content="分配角色" placement="top" class="item" effect="dark">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'roles',

    data() {
        return {
            rolesList: []
        };
    },
    created() {
        this.getRolesList()
    },
    mounted() {

    },

    methods: {
        async getRolesList() {
            const { data: res } = await this.$http.get('roles')
            if (res.meta.status !== 200) return this.$message.error('获取角色列表失败')
            this.rolesList = res.data
        },
        async removeRightById(role, id) {
            const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            if (confirmResult !== 'confirm') {
                return this.$message.info("已取消删除")
            }
            const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${id}`)
            if (res.meta.status !== 200) return this.$message.error('删除权限失败')
            this.$message.success('删除权限成功')
            role.children = res.data
        }
    },
};
</script>

<style lang="scss" scoped>
.el-tag {
    margin: 7px;
}

.bdtop {
    border-top: 1px solid #eee;

}

.bdbuttom {
    border-bottom: 1px solid #eee;
}

.vcenter {
    display: flex;
    align-items: center;
}
</style>