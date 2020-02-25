<template>
  <el-card id="blogContentCard">
    <h2 class="title">{{blog.title}}</h2>
    <div class="content" v-html=this.blog.content></div>
  </el-card>
</template>

<script>
  export default {
    name: "blogContentCard",
    data() {
      return {

      }
    },
    props: {blog: {}},

  }
</script>

<style scoped>
  .content {
    text-align: left;
    line-height: 40px;
  }

</style>
