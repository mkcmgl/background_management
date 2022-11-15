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
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
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