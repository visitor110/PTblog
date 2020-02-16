<template>
  <div id="app">
    <my-header/>
    <router-view/>
    <my-foot/>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import myFoot from '@/components/foot'

  export default {
    name: 'App',
    components: {
      myHeader,myFoot
    }
  }
</script>

<style>
  /*#main {*/
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
    /*margin-left: 100px;*/
    /*margin-right: 100px;*/
  /*}*/

  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    text-align: center;
    background-color: rgba(242, 245, 252, 0.3);

  }

  * {
    margin: 0px;
    padding: 0px;
  }

</style>
