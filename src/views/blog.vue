<template>
  <div>
    <el-container>
      <el-main>
        <h2 class="title">{{blog.title}}</h2>
        <div class="content" v-html=this.blog.content></div>
      </el-main>
      <el-aside>

      </el-aside>

    </el-container>
    <h2></h2>

  </div>
</template>

<script>
  import {getRequest} from "../utils/axiosUtils";

  export default {
    name: "blog",
    data() {
      return {
        blog: '',
        blogId: '',
      }
    },
    created() {
      this.blogId = this.$route.params.id;
      this.loadBlog("/blog/id/" + this.blogId);
    },
    methods: {
      loadBlog(url) {
        getRequest(url).then(resp => {

          if (resp.status === 200) {
             let result = resp.data;
            if (result.code === 200) {
              //成功
              this.blog = result.data;


            } else {
              this.$alert(result.message, '文章加载失败');
            }
          } else {
            //失败
            this.$alert('文章加载失败!', '失败!');
          }
        }, resp => {
          console.log(resp)
          this.$alert('服务器维护中', '失败!');
        });
      }
    }
  }
</script>

<style scoped>
  .content {
    text-align: left;
    line-height: 40px;
  }
</style>
