<template>
  <div class="video">
    <div class="video_item">
      <div class="video_img"><img src="@/assets/home.jpg" alt=""></div>
      <div class="video_tag">No.1</div>
      <div class="video_name">视频名</div>
      <div class="video_username_time">
        <div class="video_username">视频发布者</div>
        <div class="video_publishTime">视频发布时间</div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState,mapGetters,mapMutations} from 'vuex';
export default {
  computed:{
    ...mapState('home',['']),
  },
  created(){

  },
  methods:{
    ...mapActions('home',['']),
    
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