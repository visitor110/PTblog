<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
      <el-tab-pane label="首页" name="home">首页</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane label="search" name="fifth">search</el-tab-pane>
      <el-tab-pane label="login" name="login">login</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>


  export default {
    name: 'Header',
    data() {
      return {
        activeName: 'home',
        isLogined: false,
      };
    },
    methods: {
      handleClick(activeName) {

        if (activeName == 'login'&& !this.isLogined){
          console.log(activeName)
          this.$router.push('login')
        }
      }
    }

  }

</script>

<style>
  fifth {
    color: red;
  }

</style>
