<template>
  <div id="blogBlock">
    <div id="blockContent">
      <el-row>
        {{blog.userId}}
      </el-row>
      <el-row>
        <h3>{{blog.title}}</h3>
      </el-row>
      <el-row>
        <div v-html="blog.content">
        </div>
      </el-row>
      <el-row>
        <h5>tags....</h5>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        contentStr: this.blog.content,
      }
    },
    props: {
      blog: {
        type: Object,
      }
    }
  }

</script>

<style>
  #blogBlock {
    background-color: snow;
    color: black;
    text-align: left;
    line-height: 15px;
  }

  #blockContent {
    padding: 35px 35px 10px 35px;
  }

  .el-row {
    margin-bottom: 5px;
  }


</style>
