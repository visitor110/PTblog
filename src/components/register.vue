<template>
  <div id="register" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="registerForm"
             v-loading="loading" element-loading-text="加载中。。。">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="ruleForm.mail" @keyup.enter.native="submitForm('ruleForm')"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"  @click="submitForm('ruleForm')">提交</el-button>
        <el-button  @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import {postRequest} from '../utils/axiosUtils'

  export default {
    name: 'register',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPassword !== '') {
            this.$refs.ruleForm.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateMail = (rule, value, callback) => {
        var filter = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$)|(^$)/;
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if (filter.test(value)) {
          callback();
        } else {
          callback(new Error('邮箱格式不正确'));
        }
      };

      return {
        loading: false,

        ruleForm: {
          username: '',
          password: '',
          checkPassword: '',
          mail: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ],
          mail: [
            {required: true, validator: validateMail, trigger: 'blur'},
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.loading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let user = {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              mail: this.ruleForm.mail,
            };
            postRequest('/user/register', user).then(resp => {
              this.loading = false;
              console.log(resp);
              if (resp.status == 200) {
                if (resp.data.code === 200) {
                  this.$router.replace({path: '/login'});
                } else {
                  this.$alert(resp.data.message, resp.data.data);
                }
              } else {
                //失败
                this.$alert('注册失败!', '失败!');
              }
            }, resp => {
              this.loading = false;
              console.log(resp)
              this.$alert('服务器维护中', '失败!');
            });
          } else {
            this.loading = false;
            this.$alert('请按规则填写信息');
            return false;
          }
        });
      }
      ,
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

  .registerForm {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 450px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

</style>
