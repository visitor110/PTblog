<template>
  <div id="register">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="registerForm"
             v-loading="loading" element-loading-text="加载中。。。">
      <h2 class="login-title" style="margin-bottom: 20px">修改密码</h2>
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
        <el-input v-model="ruleForm.mail"></el-input>
      </el-form-item>

      <el-form-item label="邮箱验证码" prop="mailVerifyCode">
        <el-input v-model="ruleForm.mailVerifyCode" @keyup.enter.native="submitForm('ruleForm')"
                  placeholder="请输入验证码" style="width: 58%"></el-input>
        <el-button @click="sendVerifyCode" style="width: 40%" type="success" :disabled="disabled=!show">
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{count}} s</span>
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          <span v-show="show">提交</span>
          <span v-show="!show" class="count">{{count}} s</span>
        </el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {validateMail} from '@/utils/validateUtil'
  import {postRequest} from '@/utils/axiosUtils'
  import {validateMailVerifyCode} from '@/utils/validateUtil'

  const TIME_COUNT = 30; //更改倒计时时间
  export default {
    name: "changePassword",
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

      return {
        show: true,  // 初始启用按钮
        count: '',   // 初始化次数
        timer: null,
        loading: false,

        ruleForm: {
          username: '',
          password: '',
          checkPassword: '',
          mail: '',
          mailVerifyCode: '',
        },
        rules: {
          username: [
            {required: true, mssage: '请输入用户名', trigger: 'blur'},
            {min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ],
          mail: [
            {required: true, validator: validateMail, trigger: 'blur'},
          ],
          mailVerifyCode: [
            {required: true, validator: validateMailVerifyCode, trigger: 'blur'},
            {min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.loading = true;
        this.$refs[formName].validate((valid) => {
          console.log(valid);
          if (valid) {
            let user = {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              mail: this.ruleForm.mail,
              verifyCode: this.ruleForm.mailVerifyCode,
            };
            postRequest('/user/changePasswordByMail', user).then(resp => {
              this.loading = false;
              console.log(resp);
              if (resp.status == 200) {
                if (resp.data.code === 200) {
                  this.$notify({
                    title: "成功",
                    message: "密码已更改",
                    type: "success",
                    offset: 100
                  });
                  this.$router.replace({path: '/login'});
                } else {
                  this.$alert(resp.data.message, resp.data.data);
                }
              } else {
                //失败
                this.$alert('邮件发送失败!', '失败!');
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
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      sendVerifyCode() {

        let clearCounter = () => {
          this.show = true;
          clearInterval(this.timer);  // 清除定时器
          this.timer = null;
        };

        this.$refs['ruleForm'].validateField('username', (valid) => {
          if (!valid) {
            this.$refs['ruleForm'].validateField('mail', (valid) => {
              if (!valid) {
                //30s cd
                if (!this.timer) {
                  this.count = TIME_COUNT;
                  this.show = false;
                  this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                      this.count--;
                    } else {
                      clearCounter();
                    }
                  }, 1000)
                }

                let param = {
                  username: this.ruleForm.username,
                  mail: this.ruleForm.mail,
                  strategy: "changePassword",
                }
                postRequest('/user/mailVerifyCode', param).then(resp => {
                  this.loading = false;
                  console.log(resp);
                  if (resp.status == 200) {
                    if (resp.data.code === 200) {
                      this.$notify({
                        title: "成功",
                        message: "验证码已发送至邮箱",
                        type: "success",
                        offset: 100
                      });
                    } else {
                      this.$alert(resp.data.message, resp.data.data);
                      clearCounter();
                    }
                  } else {
                    //失败
                    this.$alert('邮件发送失败!', '失败!');
                  }
                }, resp => {
                  this.loading = false;
                  console.log(resp)
                  this.$alert('服务器维护中', '失败!');
                });
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "请填写邮箱",
                  offset: 100
                });
                return false;
              }
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "请填写用户名",
              offset: 100
            });
            return false;
          }
        });


      },

    }
  }
</script>

<style scoped>
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
