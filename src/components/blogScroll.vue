<template>
  <div id="blogScroll">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
         infinite-scroll-distance="50" id="blog_scroll" class="test_scroll">
      <div v-for="item in blogList" :key="item.index">
        <el-row>
          <blog-block :blog="item"></blog-block>
        </el-row>
      </div>
      <el-row>
        <div class="loading" v-if="busy">
          <span id="load-text">{{loadText}}</span>
        </div>
      </el-row>
      <el-backtop/>
    </div>


  </div>

</template>

<script>

  import blogBlock from './blogBlock'
  import axios from 'axios'

  export default {
    name: "BlogScroll",
    data() {
      return {
        blogList: [],
        busy: false,
        loadText: '加载中。。。',

        pageIndex: 0,
        blogsPerPage: 10,
      }
    },
    components: {blogBlock},
    methods: {
      loadMore() {

        let params = {
          pageIndex: this.pageIndex,
          blogsPerPage: this.blogsPerPage,
        }
        this.busy = true
        axios.get("/blog/blogList", {params}).then(resp => {
          console.log(resp);
          if (resp.status == 200) {
            let result = resp.data;
            if (result.code === 200) {

              setTimeout(() => {
                for (let i of result.data) {
                  this.blogList.push(i);
                }

                this.busy = false
              }, 100);
              this.pageIndex++;

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
      }
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 5px;
  }

  #blog_scroll {
    height: 100%;
    overflow-y: hidden;
  }
</style>
