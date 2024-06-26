<template>
  <div>
    <van-nav-bar title="服务器" @click-left="onClickLeft">
      <template #left>
        <van-icon name="apps-o" size="16" color="#6e6e6e"/>
      </template>
    </van-nav-bar>
    <van-popup style="height: 100%;" v-model="show" position="left">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item title="服务器" />
        <van-sidebar-item title="文件" />
      </van-sidebar>
    </van-popup>
    <van-card v-if="result.name">
      <template #thumb>
        <img width="88" src="../../assets/teamspeak_1.png"/>
      </template>
      <template #title>
        <h3>{{result.name}}</h3>
      </template>
      <template #desc>
        <p>人数 {{result.online_client}}/{{result.max_client}}</p>
      </template>
    </van-card>
    <TabList :data="result.channel_list" :detail="result.detail"/>
  </div>
</template>

<script>
  import { Notify } from 'vant';
  import TabList from '@/components/index/tabList.vue';
  export default {
      name: 'mobile',
      data() {
        return {
          show: false,
          activeKey: 0,
          result: {}  // 获取的数据列表
        }
      },
      created() {
        this.getData()
      },
      methods: {
        onChange(index){
          switch (index) {
            case 0:
              this.$router.push('/mobile');
              break;
            case 1:
              this.$router.push('/file');
              break;
          }
        },
        onClickLeft() {
          this.show = true
        },
        // 这是获取数据的函数
        getData() {
          this.$http.getInfo().then(data =>{
            if (data.data.error === '0'){
              this.result = data.data.result;
            }else{
              this.catchError()
            }
          }).catch(error => {
            this.catchError()
          });
        },
        // 这是一个定时器
        timer() {
          return setTimeout(()=>{
            this.getData()
          },3000)
        },
        // 五秒后重试
        catchError(){
          Notify({ type: 'warning', message: '服务器请求失败，请稍等一会，自动重连中...' });
          return setTimeout(()=>{
            this.getData()
          },3000)
        }
      },
      watch: {
        result() {
          this.timer()
        }
      },
      destroyed() {
        clearTimeout(this.timer)
      },
      components: {
        TabList
      }
  };
</script>

<style scoped>

</style>
