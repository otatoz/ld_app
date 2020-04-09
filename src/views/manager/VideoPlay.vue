<template>
    <div>
        <!-- 头部返回 -->
        <van-nav-bar
            title="视频播放"
            left-text="返回"
            left-arrow
            @click-left="toVideoList"
            />

        <!-- 视频播放标签 -->
        <video :src="videoDetail.vr_url" controls preload="auto" type='video/mp4'></video>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    computed:{
        ...mapState('video',['videoDetail'])
    },
    created(){
        this.findDetail()
    },
    methods:{
        ...mapActions('video',['findVideoDetail']),
        // 返回上一级
        toVideoList(){
            this.$router.go(-1)
        },
        // 查询视频详情
        findDetail(){
            // 封装参数
            var obj = {
                page:1,
                id:this.$route.query.id
            }
            this.findVideoDetail(obj)
        }
    },
    
}
</script>

<style scoped>
    /* video、a、img...属于行内元素,不能设置宽高 */
    video{
        display: block;
        width: 100%;
    }
</style>