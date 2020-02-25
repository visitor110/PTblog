<template>
  <div id="home">

    <div id="home_carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div id="home_box">

      <div id="home_blog_list">
        <BlogScroll/>
      </div>

      <div id="home_recommend_list">
        <div style="margin: 10px">
          <HotBlog/>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import BlogScroll from "./blogScroll"
  import HotBlog from '@/components/card/hotBlogCard'

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

  #home_carousel {
    margin-top: 30px;
    margin-left: 10%;
    margin-right: 10%;
  }

  #home_box {
    margin-top: 20px;
    margin-left: 10%;
    margin-right: 10%;
  }

  #home_box > div {
    display: inline-block;
  }

  #home_blog_list {
    /*float: left;*/
    width: 65%;
  }

  #home_recommend_list {
    float: right;
    width: 30%;
    margin-top: 0px;

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

</style>
