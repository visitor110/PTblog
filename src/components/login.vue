<template>
  <el-form class="login-form"
           v-loading="loading" element-loading-text="logining">
    <h2 class="login-title">用户登录</h2>
    <el-form-item label="">
      <el-input type="text" v-model="username" auto-complete="off" placeholder="账户"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input type="password" v-model="password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-checkbox type="checkbox" v-model="remember">记住密码</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width: 100%;" @click="doLogin()">提交</el-button>
    </el-form-item>
    <el-row style="text-align: center; margin-top: -10px;;">
      <el-link type="primary">忘记密码</el-link>
      <el-link type="primary" @click="doRegister()">用户注册</el-link>
    </el-row>
  </el-form>
</template>

<script>
  import {postRequestLogin} from '../utils/axiosUtils'

  export default {

    data() {
      return {
        username: 'test1',
        password: '123',
        remember: true,
        loading: false,
      }
    },
    methods: {
      doLogin() {

        this.loading = true;
        let params = {
          'username': this.username,
          'password': this.password,
          'remember': this.remember
        }
        postRequestLogin('/user/login', params).then(resp => {
          this.loading = false;
          console.log(resp.headers.authorization);
          console.log(resp.status);
          if (resp.status === 200) {

            let result = resp.data.result;
            console.log(result);

            if (result.code === 200) {
              //成功
              this.password = '';
              this.$store.commit('login', {
                token: resp.headers.authorization,
                username: this.username,
                userId: result.data,
              }); //token
              this.$notify({
                title: this.username,
                message: "欢迎回来",
                type: 'success',
                offset: 100
              });

              this.$router.replace({path: '/home'});
            } else {
              this.$alert(result.message, '登录失败');
            }
          } else {
            //失败
            this.$alert('登录失败!', '失败!');
          }
        }, resp => {
          this.loading = false;
          console.log(resp)
          this.$alert('服务器维护中', '失败!');
        });
      },
      doRegister() {
        this.$router.replace({path: 'register'})
      }
    }
  }
</script>

<style>
  .login-form {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }


</style>
