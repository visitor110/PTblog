<template>
  <div>
    <el-container>
      <el-main id="blog_contain">
        <blog-content-card :blog="blog"/>
      </el-main>

      <el-aside id="blog_aside">
        <div id="blog_aside_content">
          <hotblog/>
        </div>
      </el-aside>

    </el-container>
    <h2></h2>

  </div>
</template>

<script>
  import {getRequest} from "../utils/axiosUtils";
  import Hotblog from "../components/card/hotBlogCard";
  import BlogContentCard from "../components/card/blogContentCard";

  export default {
    name: "blog",
    data() {
      return {
        blog: '',
        blogId: '',
      }
    },
    components: {
      BlogContentCard,
      Hotblog,
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

  #blog_contain{
  margin-left: 50px;
  }
  #blog_aside {
    width: 25%
  }
  #blog_aside_content{
    margin-top: 20px;
    margin-right: 20px;
  }
</style>
