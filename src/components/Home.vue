<template>

    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/heima.png" alt="?">
                <span>电商管理平台</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>

        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                    background-color="#333744" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>

                        <el-menu-item index="1-4-1"> 
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>

                </el-menu>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>

</template>

<script>
export default {
    name: 'home',

    data() {
        return {

        };
    },
    created() {
        this.getMenuList()
    },
    mounted() {

    },

    methods: {
        logout() {
            window.sessionStorage.removeItem('token');
            this.$router.replace('/login')
        },
        handleClose() {

        },
        handleOpen() { },
        getMenuList(){
          const res=  this.$http.get('menus')
          console.log(res)
        }
    },
};
</script>

<style lang="scss" scoped>
.el-header {
    background-color: #373d41;
    color: #FFFF;
    font-size: 1.25rem;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;

    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: .9375rem;
        }
    }
}

.el-aside {
    background-color: #333744;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #FFFF;
    color: #333;
    text-align: center;
    line-height: 160px;
}

.home-container {
    height: 100%;
}
</style>