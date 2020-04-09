<template>
  <div class="video">
    <div class="video_item" v-for="(item,index) in videos" :key="item.id" @click="toPlay(item.id)">
      <div class="video_img"><img :src="item.vr_img" alt=""></div>
      <div class="video_tag" v-if="index == 0" style="background-color:teal">No.1</div>
      <div class="video_tag" v-else-if="index == 1" style="background-color:lightblue">No.2</div>
      <div class="video_tag" v-else-if="index == 2" style="background-color:yellow">No.3</div>
      <div class="video_tag" v-else style="background-color:black">No.{{index + 1}}</div>
      <div class="video_name">{{item.vr_name}}</div>
      <div class="video_username_time">
        <div class="video_username">{{item.vr_user}}</div>
        <!-- |管道符 -->
        <div class="video_publishTime">{{item.vr_created_time | forDate}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState,mapGetters,mapMutations} from 'vuex';
// 1.导入moment插件
import moment from 'moment';
export default {
  computed:{
    ...mapState('video',['videos']),
  },
  created(){
    this.findVideos()
  },
  methods:{
    ...mapActions('video',['findVideos']),
    // 跳转到视频播放页面
    toPlay(id){
      this.$router.push({
        path:'/manager/video_play',
        // es6中对象的简写
        query:{id}
      })
    }
  },
  // 过滤器
  filters:{
      forDate(str){
        // 2.使用moment插件
        return moment(str).format('YYYY/MM/DD hh:mm:ss')
      }
  }
}
</script>


<style scoped>
  .video_username{
    margin-right: 5px;
  }
  /* 视频发布者 */
  .video_username_time div{
    float: left;
  }
  .video_username_time{
    position: absolute;
    bottom: 8%;
    font-size: 10px;
    left:10%;
  }
  /* 视频名 */
  .video_name{
    position: absolute;
    bottom: 20%;
    left: 10%;
    font-size: 20px;
    color:#fff;
  }
  /* 视频排行 */
  .video_tag{
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    background-color: red;
    color: #fff;
  }
  .video_item{
    height: 140px;
    position: relative;
    margin-bottom: 10px;
  }
  /* 视频封面 */
  .video_img img{
    height: 140px;
    width: 100%;
  }
</style>