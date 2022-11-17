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

                    <el-input v-model="queryInfo.query" placeholder="请输入内容" clearable @clear="getUserList">
                        <!-- 为搜索button绑定getUserList()事件 -->

                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>

                </el-col>

                <el-col :span="4">
                    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
        </el-card>

        <!-- //用户列表 -->
        <el-table :data="userList" style="width: 100%" border stripe>
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column prop="username" label="姓名">
            </el-table-column>
            <el-table-column prop="email" label="油箱">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
            <el-table-column prop="role_name" label="角色">
            </el-table-column>
            <el-table-column prop="mg_state" label="状态">
                <template slot-scope="scope">

                    <el-switch v-model="scope.row.mg_state" @change="roleChange(scope.row)">

                    </el-switch>
                </template>


            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle size="mini"
                        @click="showEditDialog(scope.row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" circle
                        @click="removeUserById(scope.row.id)"></el-button>
                    <el-tooltip :enterable="false" content="分配角色" placement="top" class="item" effect="dark">
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)">
                        </el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 3, 5]" :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <!-- 添加用户对话框 -->
        <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close="addDialogClose"
            :before-close="handleClose">

            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户的对话框 -->
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">

            <!-- 修改用户表单 -->
            <!-- 用户名的disabled是不可更改，不能改不可传数据，所以prop不需要 -->
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>


            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 分配角色的对话框 -->
        <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="50%" @close="setRoleDialogClosed">
            <div>
                <p>当前的用户：{{ userInfo.username }}</p>
                <p>当前的角色：{{ userInfo.role_name }}</p>
                <p>分配新角色：
                    <!-- 选中的值通过v-model保存在selectedRoleId中 -->
                    <el-select v-model="selectedRoleId" placeholder="请选择">
                        <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id">
                        </el-option>
                    </el-select>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
            </span>
        </el-dialog>

    </div>


</template>

<script>
export default {
    name: 'users',

    data() {
        // 自定义验证邮箱规则
        var checkEmail = (rule, value, cb) => {
            // 邮箱正则
            const regmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if (regmail.test(value)) {
                return cb()
            }
            cb(new Error('请输入合法邮箱'))

        }
        // 验证手机规则        
        var checkMobile = (rule, value, cb) => {
            // 手机正则
            const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            if (regMobile.test(value)) {
                return cb()
            }
            cb(new Error('请输入正确手机号'))
        }
        return {
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 2,
            },
            userList: [],
            pagenum: 1,
            total: 0,
            dialogVisible: false,
            editDialogVisible: false,
            setRoleDialogVisible: false,
            // 添加用户表单对象
            addForm: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            userInfo: {},
            rolesList: [],
            selectedRoleId: '',
            // 添加表单验证规则对象
            addFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '用户名长3-10个间', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '密码长6-10个间', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ],
            },

            // 查询到的用户信息对象
            editForm: {
            },

            // 修改表单验证规则对象
            editFormRules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ]

            },
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
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage
            this.getUserList()
        },
        async roleChange(val) {
            const { data: res } = await this.$http.put(`users/${val.id}/state/${val.mg_state}`)
            if (res.meta.status !== 200) {
                val.mg_state = !val.mg_state
                return this.$message.error('更新用户状态失败')
            }
            this.$message.success('更新用户状态成功')
        },
        handleClose() {

        },
        addDialogClose() {
            this.$refs.addFormRef.resetFields()
        },
        addUser() {
            this.$refs.addFormRef.validate(async (val) => {
                if (val) {

                    const { data: res } = await this.$http.post('users', this.addForm)
                    this.dialogVisible = false
                    if (res.meta.status !== 201) {
                        return this.$message.error('添加用户失败')
                    }
                    this.$message.success('添加用户成功')
                    this.dialogVisible = false
                    this.getUserList()
                }
            })
        },
        async showEditDialog(id) {
            this.editDialogVisible = true;
            const { data: res } = await this.$http.get('users/' + id)
            if (res.meta.status !== 200) {
                return this.$message.error('获取用户信息失败')
            }
            this.editForm = res.data
        },
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        editUserInfo() {
            this.$refs.editFormRef.validate(async (val) => {
                if (val) {
                    const { data: res } = await this.$http.put('users/' + this.editForm.id, { email: this.editForm.email, mobile: this.editForm.mobile })
                    if (res.meta.status !== 200) return this.$message.error("更新用户信息失败")
                    this.editDialogVisible = false
                    this.getUserList()
                    this.$message.success('更新用户信息成功')
                }
            })
        },
        async removeUserById(id) {
            const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                // .then(() => {
                //   this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                //   });
                // })
                .catch(err => err
                    // () => 
                    // {
                    // //   this.$message({
                    // //     type: 'info',
                    // //     message: '已取消删除'
                    // //   });          
                    // }
                );
            if (confirmResult !== 'confirm') {
                return this.$message.info("已取消删除")
            }
            const { data: res } = await this.$http.delete('users/' + id)
            if (res.meta.status !== 200) return this.$message.error('删除用户失败')
            this.$message.success('删除用户成功')
            this.getUserList()
        },
        async setRole(row) {
            this.userInfo = row
            const { data: res } = await this.$http.get('roles')
            if (res.meta.status !== 200) return this.$message.error('获取角色列表失败')
            this.rolesList = res.data
            this.setRoleDialogVisible = true

        },

        async saveRoleInfo() {
            if (!this.selectedRoleId) {
                return this.$message.error('请选择要分配的角色')
            }
            const { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`, { rid: this.selectedRoleId })
            if (res.meta.status !== 200) return this.$message.error('分配角色失败')
            this.getUserList()
            this.setRoleDialogVisible = false
        },
        setRoleDialogClosed(){
            this.userInfo = {}
                this.rolesList = []
                this.selectedRoleId = ''
        }

    },
};
</script>

<style lang="scss" scoped>

</style>