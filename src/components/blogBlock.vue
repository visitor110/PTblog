<template>
  <div id="blogBlock">
    <div id="blockContent">
      <el-row>
        <el-col :span="4">
          <div id="username">
            {{blog.userId}}
          </div>
        </el-col>

        <el-col :span="4">
          <div id="time">
            {{blog.createDate}}
          </div>
        </el-col>
      </el-row>

      <el-row>
        <div id="title">
          <h3>{{blog.title}}</h3>
        </div>

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
        createDateTime: this.blog.createDate,
        contentStr: this.blog.content,
      }
    },
    computed: {},
    props: {
      blog: {
        type: Object,
      }
    },
    methods: {

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
    margin-top: 5px;
  }


</style>
