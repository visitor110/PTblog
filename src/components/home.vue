<template>
  <el-container id="myContainer">

    <!--<el-header>-->
      <!--<el-carousel indicator-position="outside" id="carousel">-->
        <!--<el-carousel-item v-for="item in imgs" :key="item">-->
          <!--<h3>{{ item }}</h3>-->
        <!--</el-carousel-item>-->
      <!--</el-carousel>-->
    <!--</el-header>-->

    <el-main style="width: 75%">
      <BlogScroll/>
    </el-main>

    <el-aside id="aside" style="width: 20%">
      <div style="margin: 10px">
        <el-card id="hotBlog">

          <h3>fadfs</h3>
        </el-card>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
  import BlogScroll from "./blogScroll"

  export default {
    name: 'Home',
    data() {
      return {
        imgs: 4,
        blogList: [],


      }
    },
    components: {BlogScroll},
    methods: {},
  }

</script>

<style>
  /*.el-header {*/
  /*background-color: white;*/
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 60px;*/
  /*}*/

  /*.el-footer {*/
    /*background-color: #B3C0D1;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 60px;*/
  /*}*/

  /*.el-main {*/
    /*background-color: white;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 60px;*/
    /*overflow-y: hidden;*/
  /*}*/

  /*  走马灯 */
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
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

  #carousel {
    margin-left: 50px;
    margin-right: 50px;
  }

  /*#myContainer {*/
    /*margin-top: 10px;*/
  /*}*/
</style>
