<template>
  <div>

  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: 'pc',
    mounted(){
      Toast({
        type: 'fail',
        message: '请使用手机端打开！',
        duration: 0,
        overlay: true,
        forbidClick: true});
    }
  }
</script>

<style>
  .van-toast {
    width: 290px;
  }
</style>
