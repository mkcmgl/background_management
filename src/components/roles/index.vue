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
                                <el-tag closable @close="removeRightById(scope.row, item.id)"> {{ item.authName }}
                                </el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>

                            <el-col :span="19">
                                <!-- 二级权限 -->
                                <el-row :class="[i === 0 ? '' : 'bdtop', 'vcenter']"
                                    v-for="( itemChildren, i) in item.children " :key="itemChildren.id">
                                    <el-col :span="6">
                                        <el-tag closable @close="removeRightById(scope.row, itemChildren.id)"
                                            type="success">{{ itemChildren.authName }}</el-tag>
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
                            <el-button @click="showSetRightDialog(scope.row)" type="warning" icon="el-icon-setting" size="mini">
                            </el-button>
                        </el-tooltip>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 分配权限的对话框 -->
        <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed">
            <!-- 树形控件 -->
            <!-- prop指定绑定的标题文本，show-checkbox选择小盒子，node-key="id"勾选盒子id唯一值
      default-expand-all，默认展开所有节点，:default-checked-keys="defKeys"，默认勾选的节点-->
            <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id" default-expand-all
                :default-checked-keys="defKeys" ref="treeRef"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotRights">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'roles',

    data() {
        return {
            rolesList: [],
            // 控制分配权限对话框的显示与隐藏
            setRightDialogVisible: false,
            // 所有权限的数据
            rightslist: [],
            // 树形控件的属性绑定对象,子节点
            treeProps: {
                label: 'authName',
                children: 'children'
            },
            // 默认选中的节点Id值数组
            defKeys: [],
            // 当前即将分配权限的角色id,弹窗时传入使用
            roleId: ''
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
        },
        // 展示分配权限的对话框
        // 接受当前角色，方便当做节点递归
        async showSetRightDialog(role) {
            // 为弹出的对话传入当前打开的role.id
            this.roleId = role.id
            // 获取所有权限的数据，tree方式
            const { data: res } = await this.$http.get('rights/tree')
            if (res.meta.status !== 200) {
                return this.$message.error('获取权限数据失败！')
            }
            // 把获取到的权限数据保存到 data 中
            this.rightslist = res.data
          
            // 递归获取三级节点的Id，只有三级才是最后被选中的
            this.getLeafKeys(role, this.defKeys)
            this.setRightDialogVisible = true
        },
        // 通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys 数组中
        getLeafKeys(node, arr) {
            // 如果当前 node 节点不包含 children 属性，则是三级节点
            if (!node.children) {
                return arr.push(node.id)
            }
            node.children.forEach(item => this.getLeafKeys(item, arr))
        },
        // 监听分配权限对话框的关闭事件，防止每次点击时存了别的角色存的数据，要清空
        setRightDialogClosed() {
            this.defKeys = []
        },
        // 点击为角色分配权限
        async allotRights() {
            const keys = [
                //   获取选中节点数组
                // ...展开运算符,将一个数组转为用逗号分隔的参数序列
                ...this.$refs.treeRef.getCheckedKeys(),
                // 获取半选中节点数组
                ...this.$refs.treeRef.getHalfCheckedKeys()
            ]

            // 形成以逗号拼接的字符串
            const idStr = keys.join(',')
            const { data: res } = await this.$http.post(
                `roles/${this.roleId}/rights`,
                { rids: idStr }
            )
            // rids: idStr，传递字符串给rids
            if (res.meta.status !== 200) {
                return this.$message.error('分配权限失败！')
            }
            this.$message.success('分配权限成功！')
            this.getRolesList()
            this.setRightDialogVisible = false
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