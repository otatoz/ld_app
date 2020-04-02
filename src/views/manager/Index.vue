<template>
  <!-- 后台管理总页面 -->
  <div class="manager">
    <!-- 用于接受管理页面，首页，订单页，我的页面 -->
    <router-view></router-view>
    <van-tabbar route active-color="red">
      <van-tabbar-item to="/manager/home">
        <!-- slot插槽 -->
        <van-icon class="iconfont icon-wenzhang" slot="icon" />首页
      </van-tabbar-item>
      <van-tabbar-item to="/manager/order">
        <van-icon class="iconfont icon-shipin" slot="icon" />视频
      </van-tabbar-item>
      <van-tabbar-item to="/manager/user">
        <van-icon class="iconfont icon-weibiaoti2fuzhi12" slot="icon" />我的
      </van-tabbar-item>

      <!-- <van-tabbar-item icon="home-o" to="/manager/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/manager/order">订单</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/manager/user">我的</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  created(){
    
  },
  computed:{
    ...mapState('user',['info'])
  },
  methods:{
    
  }
}
</script>