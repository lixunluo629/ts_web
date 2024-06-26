<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {

      }
    },
    methods:{
      isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return flag
      },
    },
    mounted() {
      if(this.isMobile()){
        // this.$router.replace('/mobile');
        this.$router.replace('/mobile').catch(()=>{});
      }else{
        this.$router.replace('/file').catch(()=>{});
      }
    }
  };
</script>

<style scoped>
  /deep/ .van-sidebar-item--select::before{
    background-color: #203450;
  }
  /deep/ .van-sidebar{
    width: 130px;
  }

  #app {
    max-width: 450px;
    margin: auto;
    max-height: 100%;
    height: 100%;
    //border: 1px solid #e6e6e6;
  }
</style>
