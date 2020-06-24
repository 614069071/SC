<template>
  <div class='welcome-page'>
    <div>WELCOME TO BMS !</div>
    <p>Copyright© 2018 | 深圳市国银证保信息技术有限公司</p>
  </div>
</template>

<script>
// import fetch from '@/fetch';

export default {
  data() {
    return {};
  },
  created() {
    // fetch.sysList({}, { pageNum: 1, pageSize: 15 }).then(res => {});
  }
};
</script>

<style lang='scss' scoped>
.welcome-page {
  display: flex;
  justify-content: center;
  text-align: center;
  div {
    font-size: 30px;
    margin-bottom: 100px;
  }
}
</style>