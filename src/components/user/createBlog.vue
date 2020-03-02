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

    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      effect="dark"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>

    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

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
  import {createNamespacedHelpers} from 'vuex'

  const {mapGetters} = createNamespacedHelpers("userInfo")


  export default {
    components: {
      mavonEditor,//mavon-editor组件
    },
    data() {
      return {
        content: '', // 输入的markdown
        html: '',    // 转成的html
        title: '',

        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    computed:{
      ...mapGetters(['getUsername','getUserId'])
    },
    methods: {
      change(value, render) {
        //实时获取转成html的数据
        this.html = render
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
          username: this.getUsername,
          userId: this.getUserId,
          title: this.title,
          tagList: this.dynamicTags,
        }
        postRequest('/blog/createBlog', params).then(resp => {
          console.log(resp.status);
          if (resp.status === 200) {

            let result = resp.data;
            console.log(result);

            if (result.code === 200) {
              this.$notify({
                title: '成功',
                message: result.message,
                type: 'success',
                offset: 100
              });
            }
          }
        }, resp => {
          console.log(resp)
          this.$alert('服务器维护中', '失败!');
        });
      },
      handleClose(tag) {

        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue && this.validate(inputValue)) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      validate(inputValue) {
        if (this.dynamicTags.length === 5) {
          this.$notify({
            title: "错误",
            message: "最多5个标签",
            type: 'error',
            offset: 100
          });
          return false;
        }
        for (let tag of this.dynamicTags) {
          if (tag === inputValue) {
            this.$notify({
              title: "错误",
              message: "已存在标签",
              type: 'error',
              offset: 100
            });
            return false;
          }

        }
        return true;
      }
    }

  }

</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
