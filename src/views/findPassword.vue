<template>
  <div id="register">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="registerForm"
             v-loading="loading" element-loading-text="加载中。。。">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="ruleForm.mail"></el-input>
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

  export default {
    name: "findPassword",
    data() {
      return {
        show: true,  // 初始启用按钮
        count: '',   // 初始化次数
        timer: null,
        loading: false,

        ruleForm: {
          username: '',
          mail: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur'}
          ],
          mail: [
            {required: true, validator: validateMail, trigger: 'blur'},
          ],
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
      },

    }
  }
</script>

<style scoped>

</style>
