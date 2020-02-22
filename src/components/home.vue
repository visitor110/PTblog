<template>
  <el-container id="el-container-home-main" >

    <el-header>
      <el-carousel :interval="4000" type="card" height="200px" >
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-header>

    <el-container id="el-container-mainAside" style="margin-top: 200px">

      <el-main style="width: 70%">
        <BlogScroll/>
      </el-main>

      <el-aside id="aside" style="width: 25%">
        <div style="margin: 10px">
          <HotBlog/>
        </div>
      </el-aside>

    </el-container>

  </el-container>
</template>

<script>
  import BlogScroll from "./blogScroll"
  import HotBlog from '@/components/hotblog'

  export default {
    name: 'Home',
    data() {
      return {
        imgs: 4,
        blogList: [],


      }
    },
    components: {BlogScroll, HotBlog},
    methods: {},
  }

</script>

<style>
  .el-header {

    height: 400px;
    text-align: center;

  }

  .el-aside {

    text-align: center;
    line-height: 200px;
  }

  .el-main {

    text-align: center;
    line-height: 160px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  #el-container-home-main{
    margin-top: 10px;
    margin-left: 100px;
    margin-right: 100px;
  }

</style>
