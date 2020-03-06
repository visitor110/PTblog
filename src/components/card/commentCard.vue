<template>
  <div id="commentCard">
    <el-card id="comment">
      <pt_comment @doSend="doSend"
                  @doChidSend="doChidSend"
                  :commentList="commentList"
                  :commentNum="commentNum"

      />
    </el-card>
  </div>
</template>

<script>
  import comment from 'hbl-comment'
  import {postRequest} from "../../utils/axiosUtils";
  import {createNamespacedHelpers} from 'vuex'

  const {mapGetters} = createNamespacedHelpers("userInfo")

  export default {
    name: "commentCard",
    data() {
      return {
        blogId: '',
        commentList: [],
        commentNum: 0,

      }
    },
    mounted() {
      this.blogId = this.$route.params.id
      this.load()
    },
    components: {
      pt_comment: comment,
    },
    methods: {
      load() {
        const url = 'discuss/loadDiscussByBlogId'
        let params = {
          blogId: this.blogId
        }
        postRequest(url, params).then(resp => {
          let result = resp.data
          if (result.code === 200) {
            let valueList = result.data
            if (valueList.length > 0) {
              this.commentNum = valueList.length;
              this.pushIntoCommentList(valueList)
            } else {
              //评论为空
            }
          } else {
            this.$alert('评论加载失败!', '失败!');
          }
        }, resp => {
          console.log(resp)
          this.$alert('服务器维护中', '加载评论失败!');
        })
      },
      //发送评论
      doSend(value) {
        let params = {
          "content": value,
          "userId": this.getUserId,
          "blogId": this.blogId,
        }
        const url = '/discuss/sendDiscuss'
        postRequest(url, params).then(resp => {
          let result = resp.data
          if (result.code === 200) {
            this.commentList.unshift({
              id: '0',
              commentUser: {
                id: this.getUserId,
                nickName: this.getUsername,
                avatar: ''
              },
              content: value,
              createDate: '刚才',
              childrenList: [],
            })
          } else {
            this.$alert('发表评论失败!', '失败!');
          }
        }, resp => {
          // this.loading = false;
          console.log(resp)
          this.$alert('服务器维护中', '失败!');
        })

      },
      //发送回复
      doChidSend(value) {
        console.log(value);

      },
      //向commentList添加
      pushIntoCommentList(list) {
        for (let values of list) {
          let item = {
            id: '',
            commentUser: {
              id: '',
              nickName: '',
              avatar: ''
            },
            content: "",
            createDate: '',
            childrenList: [],
          };
          item.id = values.discuss.id;
          item.commentUser.id = values.discuss.userId;
          item.commentUser.nickName = values.username;
          item.commentUser.avatar = values.avatar;
          item.content = values.discuss.content;
          item.createDate = values.discuss.createDate;
          item.childrenList = [];
          this.commentList.push(item)
        }
      }
    },
    props: [],
    computed: {
      ...mapGetters(['getUserId', 'getUsername']),
    }
  }
</script>

<style scoped>
  #comment {
    margin-top: 20px;
  }
</style>
