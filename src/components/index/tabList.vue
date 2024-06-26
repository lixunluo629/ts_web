<template>
  <div>
    <van-dialog v-model="showMessage" title="戳一下" @close="closeMessage" @confirm="sendMessage" show-cancel-button>
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="消息"
        type="textarea"
        maxlength="50"
        placeholder="请输入消息"
        show-word-limit
      />
    </van-dialog>
    <van-tabs v-model="active" swipeable animated>
      <van-tab title="频道">
        <van-collapse v-model="activeName" accordion :border='false'>
          <van-collapse-item v-for="(item,index) in data" :key="index" :name="index" :disabled="item.clients === 0 ? true : false">
            <template #title>
              <div>{{item.name}}</div>
            </template>
            <template #value>
              {{item.clients}} 人
            </template>
            <van-cell
            v-for="(item,index2) in item.client_list"
            :key="index2" :title="item.name"
            :value="item.times"
            is-link
            @click="onClick(index, index2)"
            :border='false'>
              <template #extra>
                <van-popover
                  v-model="showPopover[index2]"
                  placement="bottom-end"
                  theme="light"
                  trigger="click"
                  :actions="option"
                  @select="onSelect"
                />
              </template>
            </van-cell>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab title="服务器信息">
        <div v-if="detail != 0">
          <van-field label="端口" :value="detail.port" readonly />
          <van-field label="在线用户" :value="detail.clients" readonly />
          <van-field label="频道数量" :value="detail.channels" readonly />
          <van-field label="运行时间" :value="detail.uptime" readonly />
          <van-field label="创建日期" :value="detail.open_time" readonly />
          <van-field label="服务器平台" :value="detail.platform" readonly />
          <van-field label="服务器版本" :value="detail.version" readonly />
          <van-field label="欢迎词" :value="detail.welcome" type="textarea" autosize readonly />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Dialog } from 'vant';

export default {
  props: {
      data: Array,
      detail: {
        required: true,
        default: 0
      }
  },
  data() {
    return {
      active: '',
      activeName: [],
      showPopover: [],
      option: [],
      showMessage: false,
      message: '',
      value: {}
    };
  },
  methods:{
    onClick(index, index2){
      this.showPopover[index2] = true;
      var clid = this.data[index].client_list[index2].id;
      this.option = [{text: '戳他', value: clid, act: 'poke'}, { text: '踹他', value: clid, act: 'kick'}]
    },
    onSelect(value){
      if(value.act=='kick'){
        Dialog.confirm({
          message: '确认要踹他吗？',
        }).then(() => {
          this.$http.actUser(value).then(data =>{
            // Todo
          }).catch(error => {
            // Todo
          });
        }).catch(() => {

        });
      }else{
        this.value = value
        this.showMessage = true

      }
    },
    sendMessage(){
      this.value.msg = this.message
      this.$http.actUser(this.value).then(data =>{
        this.closeMessage()
      }).catch(error => {
        this.closeMessage()
      });
    },
    closeMessage(){
      this.value = {}
      this.message = ''
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
};
</script>

<style scoped>
  /deep/ .van-tabs__line{
    background-color: #203450;
  }
  /deep/ .van-collapse-item__content{
    padding: 12px 0px 12px 16px;
  }
  .show_client_detail{
    text-align: center;
    margin: 40px 10px;
  }
</style>
