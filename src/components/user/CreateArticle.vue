<template>
  <div>
    <el-row>
      <el-col :span="4">
        标题：
      </el-col>
      <el-col :span="16">
        <el-input type="textarea" placeholder="请输入内容"
                  v-model="title" maxlength="30" show-word-limit>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" round @click="push">发布文章</el-button>
      </el-col>
    </el-row>
    <div style="margin: 20px 0;"></div>
    <div>
      <mavon-editor v-model="content" ref="md" @change="change"
                    @imgAdd="$imgAdd" style="min-height: 600px"/>
    </div>
  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import {postRequest} from "../../utils/axiosUtils";

  export default {
    components: {
      mavonEditor,//mavon-editor组件
    },
    data() {
      return {
        content: '', // 输入的markdown
        html: '',    // 转成的html
        title: '' //
      }
    },
    methods: {
      change(value, render) {
        //实时获取转成html的数据
        this.html = render
        console.log(this.html)
      },
      // 将图片上传到服务器，返回地址替换到md中
      $imgAdd(pos, $file) {
        // let formdata = new FormData();
        // formdata.append('image', $file);
        // this.$ajax({
        //   url: 'http://local.basic.com/index.php?r=markdown/upload',
        //   method: 'post',
        //   data: formdata,
        // }).then((data) => {
        //   //将返回的url替换到文本原位置
        //   if (data.data.success == 1) {
        //     this.$refs.md.$img2Url(pos, data.data.url);
        //     console.log(data.data.url)
        //   }
        //
        // })
      },

      push() {
        let params = {
          blog: this.html,
          username: this.$store.state.username,
          userId: this.$store.state.userId,
          title: this.title,
        }
        postRequest('/user/createBlog', params).then(resp => {
          console.log(resp.status);
          if (resp.status === 200) {

            let result = resp.data;
            console.log(result);

            if (result.code === 200) {
              this.$alert(result.message)
            }
          }
        }, resp => {
          console.log(resp)
          this.$alert('服务器维护中', '失败!');
        });
      }
    },
  }

</script>

<style>

</style>
