<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input v-model="searchMsg" placeholder="请输入"></el-input>
                    <el-button slot="appen" icon="el-icon-search"></el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加商品</el-button>
                </el-col>
            </el-row>

            <el-table :data="goodsList" border stripe>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="商品名称" prop="goods_name"></el-table-column>
                <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
                <el-table-column label="商品重量" prop="goods_weight" width="80px"></el-table-column>
                <el-table-column label="创建时间" width="140px">
                    <template slot-scope="scope">
                        {{ scope.row.add_time | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="130px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini">

                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini">

                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <!-- 页码背景background -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total" background>
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'goods',

    data() {
        return {
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10,
            },
            goodsList: [],
            pagenum: 1,
            total: 0,
            searchMsg: ''
        };
    },
    created() {
        this.getGoodsList()
    },
    mounted() {

    },

    methods: {
        async getGoodsList() {
            const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
            if (res.meta.status !== 200) return this.$message.error('获取商品列表数据失败')
            this.goodsList = res.data.goods
            this.total = res.data.total
        },
        handleSizeChange(){

        },
        handleCurrentChange(){},
        
    },
};
</script>

<style lang="scss" scoped>

</style>