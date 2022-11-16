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
            <el-aside :width="isCollapse ?' 64px ': '200px'">
                <div class="toggle-button" @click="showMenu">|||</div>
                <el-menu 
                    :unique-opened="true" :collapse="isCollapse" 
                    router :collapse-transition="false"
                    :default-active="activePath"
                    background-color="#333744" text-color="#fff" active-text-color="#409BFF">
                    <el-submenu  v-for="(item,i) in menuList" :key="item.id" :index="i+''">
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>

                        <el-menu-item 
                         v-for="(subItem ,i) in item.children" :key="subItem.id"
                           :index="'/'+subItem.path"
                           @click="saveNavState('/'+subItem.path)"> 
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>

                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
export default {
    name: 'home',

    data() {
        return {
            menuList:[],
            // iconsObj绑定data的id，来决定哪个id对应哪个icon
            iconsObj:{
                '125':'iconfont icon-users',
                '103':'iconfont icon-tijikongjian',
                '101':'iconfont icon-3702mima',
                '102':'iconfont icon-danju',
                '145':'iconfont icon-baobiao'
            },
            isCollapse:false,
            activePath:''
        };
    },
    created() {
        this.getMenuList()
        this.activePath=window.sessionStorage.getItem('activePath')
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
       async getMenuList(){
          const {data:res} = await this.$http.get('menus')
          if(res.meta.status!==200) return this.$message.error()
          this.menuList= res.data
        } ,
        showMenu(){
            this.isCollapse =!this.isCollapse
        },
        saveNavState(path){
            window.sessionStorage.setItem('activePath',path)
            this.activePath=path
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
    line-height: 200px;
    .el-menu{
        border-right: none;
    }
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
.iconfont{
    margin-right: 10px;
}
.toggle-button{
    background-color: #4a5064;
    font-size: 0.625rem;
    color: #FFF;
    line-height: 1.5rem;
    text-align: center;
    letter-spacing: 0.1rem;
    cursor: pointer;
}
</style>