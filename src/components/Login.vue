<template>
    <div class="login">
        <div class="center">
            <el-button type="primary" @click="setToken">登录</el-button>
            <el-button type="primary" @click="setTokenTest">测试</el-button>
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
        async setToken(){
            const user ={
               username:'admin',
               password:'123456',
            }
            const {data:res} =await this.$http.post('login',user)
            if(res.meta.status!==200) return this.$message.error()
            window.sessionStorage.setItem("token",res.data.token)
            this.$router.push('/home')
        },
        async setTokenTest(){
            const user ={
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2NjkyMTQ3MjksImV4cCI6MTY2OTMwMTEyOX0.tV1wzAb7Z8ny7N31OltuKMGM99Gj3bHyexZ5zTbiBa0"
            }
          
            window.sessionStorage.setItem("token",user.token)
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