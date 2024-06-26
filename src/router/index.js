import Vue from 'vue'
import Router from 'vue-router'
import mobile from '@/views/mobile'
import pc from '@/views/pc'
import file from '@/views/file'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mobile',
      name: 'mobile',
      component: mobile,
      children: [

      ]
    },
    {
      path: '/file',
      name: 'file',
      component: file
    },
    {
      path: '/pc',
      name: 'pc',
      component: pc
    }
  ],

})
