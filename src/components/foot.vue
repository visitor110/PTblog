<template>
  <div id="foot">
    <div class="line"></div>
    <p id="txt">
      <el-link :underline="false" type="info">PTblog&nbsp;&nbsp;</el-link>
    </p>

    <p class="mail">
      有任何问题请发邮件至
      <el-link :underline="false" href="mailto:1187038691@qq.com">1187038691@qq.com</el-link>
      或 联系站长
    </p>
    <div class="line"/>
  </div>
</template>


<script>
  export default {
    name: 'Foot'
  }

</script>
<style scoped>
  .line {
    width: 100%;
    height: 4px;
  }

  #foot {
    color: #303133;
    background: #F2F6FC;
    margin-top: 0px;
  }

  .mail {
    color: #8c939d;
  }

</style>
