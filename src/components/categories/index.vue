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
                    <el-button @click="showAddCateDialog" class="treeTable" type="primary">添加分类</el-button>
                </el-col>
            </el-row>

            <tree-table border index-text="索引" show-index :data="cateList" :columns="culumns" :expand-type="false"
                :selection-type="false">
                <template slot-scope="scope" slot="isok">
                    <i class=" el-icon-success" style="color:lightgreen" v-if="scope.row.cat_deleted === false"></i>
                    <i class=" el-icon-error" style="color:red" v-else></i>
                </template>
                <template slot-scope="scope" slot="order">
                    <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
                    <el-tag size="mini" type="success" v-if="scope.row.cat_level === 1">二级</el-tag>
                    <el-tag size="mini" type="warning" v-if="scope.row.cat_level === 2">三级</el-tag>
                </template>
            </tree-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 30]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>

        </el-card>
        <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%" :close="addCateDailogClose">
            <!-- 添加分类的表单 -->
            <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
                <el-form-item label="分类名称：" prop="cat_name">
                    <el-input v-model="addCateForm.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类：">
                    <!-- options 用来指定数据源 -->
                    <!-- props 用来指定配置对象 -->
                    <!-- 级联选择器cascader -->
                    <!-- v-model绑定一个数组，决定两个父类的id -->
                    <!-- 默认只能选最后一个，change-on-select可以选任意一个 -->
                    <el-cascader expand-trigger="hover" :options="parentCateList" :props="cascaderProps"
                        v-model="selectedKeys" @change="parentCateChanged" clearable change-on-select>
                    </el-cascader>
                </el-form-item>
            </el-form>
            <span class="dailog-footer" slot="footer">
                <el-button @click="addCateDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addCate">确定</el-button>
            </span>
        </el-dialog>
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
            total: 0,
            addCateDialogVisible: false,
            parentCateList: [],
            cascaderProps: {
            value: 'cat_id',
            label: 'cat_name',
            children: 'children'
        },
            culumns: [
                {
                    label: '分类名称',
                    prop: 'cat_name'
                },
                {
                    label: '是否有效',
                    type: 'template',
                    template: 'isok'
                },
                {
                    label: '排序',
                    type: 'template',
                    template: 'order'
                }
            ],
                selectedKeys: [],
                    addCateForm: {
            // 将要添加的分类的名称
            cat_name: '',
                // 父级分类的Id
                cat_pid: 0,
                    // 分类的等级，默认要添加的是1级分类
                    cat_level: 0
        },
        // 添加分类表单的验证规则对象
        addCateFormRules: {
            cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
        },

    };
},
created() {
    this.getCategoriesLsit()
},
mounted() {
},

methods: {
        async getCategoriesLsit() {
        const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
        if (res.meta.status !== 200) return this.$message.error('获取商品分类信息失败')
        this.cateList = res.data.result
        this.total = res.data.total

    },
    handleSizeChange(val) {
        this.querInfo.pagesize = val
        this.getCateList()
    },
    handleCurrentChange(val) {
        this.querInfo.pagenum = val
        this.getCateList()
    },
    showAddCateDialog() {
        // 先获取父级分类的数据列表
        this.getParentCateList()
        // 再展示出对话框
        this.addCateDialogVisible = true
    },
        async getParentCateList() {
        const { data: res } = await this.$http.get('categories', {
            params: { type: 2 }
        })
        if (res.meta.status !== 200) return this.$message.error('获取父级分类数据失败！')
        this.parentCateList = res.data
    },
    parentCateChanged() {
        // 如果 selectedKeys 数组中的 length 大于0，证明选中的父级分类
        // 反之，就说明没有选中任何父级分类
        if (this.selectedKeys.length > 0) {
            // 父级分类的Id
            this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
            // 为当前分类的等级赋值
            // 三级，level为2，父id pid=1
            this.addCateForm.cat_level = this.selectedKeys.length
        } else {
            // 一级，重置level为0，父id pid=0
            // 父级分类的Id
            this.addCateForm.cat_pid = 0
            // 为当前分类的等级赋值
            this.addCateForm.cat_level = 0
        }
    },
    addCateDailogClose() {
        this.$refs.addCateFormRef.resetFields()
        // 重置绑定的数组
        this.selectedKeys = []
        this.addCateForm.cat_level = 0
        this.addCateForm.cat_pid = 0
    },
    addCate() {
        this.$refs.addCateFormRef.validate(async valid => {
            if (!valid) return
            const { data: res } = await this.$http.post('categories', this.addCateForm)
            if (res.meta.status !== 201) {
                return this.$message.error('添加分类失败！')
            }
            this.$message.success('添加分类成功！')
            this.getCateList()
            this.addCateDialogVisible = false
        })
    }
},
};
</script>

<style lang="scss" scoped>
.treeTable {
    margin-bottom: .9375rem;
}
</style>