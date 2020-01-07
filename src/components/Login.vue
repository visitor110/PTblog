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
    <el-form-item>
      <el-button type="primary" style="width: 100%;" @click="doSubmit()">提交</el-button>
    </el-form-item>
    <el-row style="text-align: center; margin-top: -10px;;">
      <el-link type="primary">忘记密码</el-link>
      <el-link type="primary" @click="doRegister()">用户注册</el-link>
    </el-row>
  </el-form>
</template>

<script>
  import {postRequest} from '../utils/axiosUtils'

  export default {
    data() {
      return {
        username: 'a',
        password: '123',
        loading: false,
      }
    },
    methods: {
      doSubmit() {
        this.loading = true;
        let _this = this;
        postRequest('/login', {
          username: this.username,
          password: this.password
        }).then(resp => {
          _this.loading = false;
          if (resp.status == 200) {
            //成功
            var json = resp.data;
            if (json.status == 'success') {
              _this.$router.replace({path: '/home'});
            } else {
              _this.$alert('登录失败!', '失败!');
            }
          } else {
            //失败
            _this.$alert('登录失败!', '失败!');
          }
        }, resp => {
          _this.loading = false;
          _this.$alert('服务器不见了', '失败!');
        });
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
