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

      <button @click="loadBlogs">test</button>

      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="(item,list) in blogList" class="infinite-list-item">
          {{item}}----{{list}}}
        </li>
      </ul>

      <el-footer>
        <Foot></Foot>
      </el-footer>

    </el-container>
  </div>
</template>

<script>

  import Header from "./Header";
  import Foot from "./Foot";
  import {getRequest} from "../utils/axiosUtils";

  export default {
    name: 'Home',
    data() {
      return {
        imgs: 4,
        blogList: [],
      }
    },
    components: {Foot, Header},
    methods: {
      loadBlogs() {
        getRequest("/site/blogList").then(resp => {
          console.log(resp);
          if (resp.status == 200) {
            let result = resp.data;
            if (result.code === 200) {
              this.blogList = result.data;
            } else {
              this.$alert(resp.data.message, resp.data.data);
            }
          } else {
            //失败
            this.$alert('博客加载失败!', '失败!');
          }
        }, resp => {
          console.log(resp)
          this.$alert('服务器维护中', '失败!');
        });
      },
      load () {
        this.count += 5
      },
    }
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
