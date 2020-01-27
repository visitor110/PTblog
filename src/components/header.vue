<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
          <el-tab-pane label="首页" name="home">首页</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="search" name="fifth">search</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="4">
        <span v-if="this.$store.state.username === ''" class="el-dropdown-link" @click="login()">
            登录·注册
        </span>
        <el-dropdown v-else @command="handleCommand">
          <span class="el-dropdown-link">
            {{this.$store.state.username}}<i class="el-icon-arrow-down el-icon--right"></i>
           </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="createArticle">发表文章</el-dropdown-item>
            <el-dropdown-item command="loginOut" divided>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        activeName: 'home',
      };
    },
    methods: {
      //标签页
      handleClick(activeName) {
        switch (activeName) {
          case 'userManagement': {
            this.$alert('user management')
            break;
          }
        }
      },
      login() {
        this.$router.push('login');
      },
      //下拉菜单
      handleCommand(command) {
        // this.$message('click on item ' + command);
        switch (command) {

          case 'createArticle': {
            this.$router.push({path: '/createArticle'});
            break;
          }
        }
      }
    }
  }
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>
