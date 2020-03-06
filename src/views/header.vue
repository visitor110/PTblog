<template>
  <div id="header">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-home"
      mode="horizontal"

      @select="handleSelect"
      background-color="#1ec0ff"
      text-color="#FBFBFC"
      active-text-color="#FBFBFC">

      <el-menu-item index="home">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">
        <el-link href="https://github.com/visitor110/PTblog" target="_blank"
                 :underline="false">代码地址
        </el-link>
      </el-menu-item>
      <el-menu-item index='login&person'>
        <span v-if="getUsername === ''" class="el-dropdown-link" @click="login()">
            登录·注册
        </span>
        <el-dropdown v-else @command="handleCommand">
          <span class="el-dropdown-link">
            {{getUsername}}<i class="el-icon-arrow-down el-icon--right"></i>
           </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="createBlog">发表文章</el-dropdown-item>
            <el-dropdown-item command="loginOut" divided>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapGetters} = createNamespacedHelpers("userInfo")
  export default {
    name: 'Header',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        switch (key) {
          case 'home': {
            this.$router.push('/home');
            break;
          }
            ;
        }
        console.log(key, keyPath);
      },
      login() {
        this.$router.push('/login');
      },
      //下拉菜单
      handleCommand(command) {
        switch (command) {

          case 'createBlog': {
            this.$router.push({path: '/createBlog'});
            break;
          }
          case 'loginOut': {
            window.clearVuexAlong()
            location.reload()
            break;
          }
        }
      }
    },
    computed: {
      ...mapGetters(['getUsername']),
    }

  }
</script>

<style>

</style>
