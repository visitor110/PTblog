<template>
  <div>
    <el-container>

      <el-header>
        <Header></Header>
      </el-header>

      <el-main>
        <el-carousel indicator-position="outside" id="carousel">
          <el-carousel-item v-for="item in imgs" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>


      </el-main>

      <el-footer>
        <Foot></Foot>
      </el-footer>

    </el-container>
  </div>
</template>

<script>

  import Header from "./Header";
  import Foot from "./Foot";

  export default {
    name: 'Home',
    data() {
      return {
        imgs: 4
      }
    },
    components: {Foot, Header},
  }

</script>

<style>
  .el-header {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: red;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  /*  走马灯 */
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
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
</style>
