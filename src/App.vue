<template>
  <div id="app">
    <my-header/>
    <router-view/>
    <my-foot/>
  </div>
</template>

<script>
  import myHeader from '@/views/header'
  import myFoot from '@/views/foot'

  export default {
    name: 'App',
    components: {
      myHeader,myFoot
    }
  }
</script>

<style>

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
