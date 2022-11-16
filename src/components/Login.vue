<template>
    <div class="login">
        <div class="center">
            <el-button type="primary" @click="setToken">登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        setToken(){
            const myToken ={
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2Njg1MjI1MTUsImV4cCI6MTY2ODYwODkxNX0._1exB8PayUfou_dQ1QeL3GKOeooVX9GlOrK4tJsYNTs"
            }
            window.sessionStorage.setItem("token",myToken.token)
            this.$router.push('/home')
        }
    },
};
</script>

<style lang="scss" scoped>
.login{
    height: 100%;
    background-color: #809dbb;
}
.center{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 30%;
    height: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>