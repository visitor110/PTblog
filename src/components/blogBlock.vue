<template>
  <div id="blogBlock">
    <div id="blockContent" @click="lookupBlog()">
      <el-card id="blog_list_content">

        <el-row id="blog_block_user_time">
          <div id="user_name">
            <h6>{{blog.userId}}</h6>
          </div>
          <div id="time">
            <time>{{ createDateTime }}</time>
          </div>
        </el-row>

        <el-row>
          <h3 id="blog_title">{{blog.title}}</h3>
        </el-row>

        <el-row>
          <el-tag id="blog_tags" v-for="tag in tagList" :key="tag.tagName" size="mini">
            {{tag.tagName}}
          </el-tag>
        </el-row>
      </el-card>

    </div>
  </div>
</template>

<script>
  import {redirect} from "../utils/redirectUtil";
  import {localDateTimeFormat} from "../utils/dateTimeUtil";

  export default {
    data() {
      return {
        createDateTime: localDateTimeFormat(this.blog.createDate),
        contentStr: this.blog.content,
        tagList: this.blog.tagList,
      }
    },
    computed: {},
    props: {
      blog: {
        type: Object,
      }
    },
    methods: {
      lookupBlog() {
        let path = '/blog'
        let id = this.blog.id
        redirect(this, path, id)
      },
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

  #blog_tags, #blog_title, #user_name, #time {
    margin-left: 10px;
  }

  #blog_title {
    color: deepskyblue;
  }

  #blog_list_content {
    line-height: 30px;

  }

  #user_name {
    float: left;
    font-size: 30px;

  }

  #time {
    float: left;
    font-size: 18px;
    color: #999;
  }

</style>
