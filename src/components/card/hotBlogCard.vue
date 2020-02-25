<template>
  <el-card id="hotBlog">
    <p>
      <span style="color:#67C23A" class="el-icon-document">热门文章</span>
    </p>
    <hr/>
    <div v-for="blog in hotBlog" id="hotBlogList">
      <el-link type="info" style="margin: 5px 0" :underline="false">
        《{{blog.title}}》&nbsp;浏览数:&nbsp;{{blog.blogViews}}
      </el-link>
    </div>
    <br/>
  </el-card>
</template>

<script>
  export default {
    name: "hotblog",
    data() {
      return {
        hotBlog: [{
          title: 'testfdsa',
          blogViews: 111,
        },
          {
            title: 'aefwaf',
            blogViews: 11,
          }]
      }
    },
  }
</script>

<style scoped>
  #hotBlog{
    line-height: 30px;
  }

  #hotBlogList{
    margin-top: 10px;
    text-align: left;
    line-height: 10px;
  }


</style>
