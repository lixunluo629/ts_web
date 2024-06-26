<template>
  <div>
    <van-nav-bar title="文件列表" @click-left="onClickLeft">
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
    <van-card>
      <template #thumb>
        <img width="88" src="../../assets/tencent.png"/>
      </template>
      <template #title>
        <h3>我的云盘</h3>
      </template>
      <template #desc>
        <p>存储容量 {{Size}} / 60 GB</p>
      </template>
    </van-card>
    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="(item,index) in result" :key="index" :name="index">
        <template #title>
          <div>{{item.Key}}</div>
        </template>
        <p>上传时间&nbsp;   <b>{{item.LastModified}}</b></p>
        <p>文件大小&nbsp;   <b>{{item.Size}}</b></p>
        <p>下载链接&nbsp;   <a :href="item.Url" target="_blank">点击下载</a></p>
      </van-collapse-item>
    </van-collapse>
  </div>

</template>

<script>
import {getCos} from "../../api";

export default {
  name: "file",
  data() {
    return {
      show: false,
      activeKey: 1,
      result: [],
      Size: '',
      activeNames: [],
      // 获取的数据列表
    }
  },
  methods:{
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
  },
  mounted() {
    this.$http.getCos().then(data =>{
      if (data.data.error === '0'){
        this.Size = data.data.result.Size;
        this.result = data.data.result.Data;
      }else{
        this.catchError()
      }
    }).catch(error => {
      this.catchError()
    });
  }
}
</script>

<style scoped>

</style>
