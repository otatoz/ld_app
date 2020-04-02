<template>
  <div class="home">
    <!-- 吸顶效果 -->
    <van-sticky :offset-top="0">
      <!-- 首页的头部 -->
      <div class="header">看点资讯精选</div>
      <!-- 一级栏目 -->
      <van-tabs class="firstCategory">
        <van-tab v-for="item in categories" :key="item.id">
          <!-- 将item.name通过插槽放入到van-tab的title属性里面去 -->
          <div slot="title" @click="toChildCategory(item.id)">{{item.name}}</div>
        </van-tab>
      </van-tabs>
      <!-- 二级栏目 -->
      <van-tabs class="secondCategory">
        <van-tab v-for="item in childCategory" :key="item.id">
          <div slot="title" @click="toArticle(item.id)">{{item.name}}</div>
        </van-tab>
      </van-tabs>
    </van-sticky>
    
    <!-- 文章区域 -->
    <!-- {{article}} -->
    <div class="articleItem" v-for="(item,index) in article.list" :key="item.id" @click="toArticleDetail(item.id)">
      <!-- {{item}} -->
      <div class="articlePicture">
        <!-- 文章背景图片 -->
        <img :src="item.video" alt="">
        <!-- 左上角文章排行 -->
        <div class="articleTag" v-if="index == 0" style="background-color:red">No.1</div>
        <div class="articleTag" v-else-if="index == 1" style="background-color:teal">No.2</div>
        <div class="articleTag" v-else-if="index == 2" style="background-color:lightblue">No.3</div>
        <div class="articleTag" v-else style="background-color:#333">No.{{index+1}}</div>
        <!-- 文章标题 -->
        <div class="articleTitle">{{item.title}}</div>
        <!-- 文章作者 -->
        <!-- v-if是为了防止控制台报错 -->
        <div class="articleAuthor" v-if="item.author">{{item.author.nickname}}</div>
        <!-- 文章发布时间 -->
        <div class="articlePublishTime">{{item.publishtime}}</div>
      </div>
      <!-- 文章简介 -->
      <div class="articleIntroduction">
        <!-- 文章内容 -->
        <div class="articleContent">{{item.content}}</div>
        <!-- 热帖 -->
        <div class="hotTag">热帖</div>
      </div>
    </div>


  </div>
</template>
<script>
// 从vuex中导入辅助函数    源码
import {mapActions,mapState,mapGetters,mapMutations} from 'vuex';

import {get} from '../../http/axios'
export default {
  data(){
    return {
      
    }
  },
  computed:{
    // mapState('命名空间',['state中的变量'])
    ...mapState('home',['categories','childCategory','article']),
  },
  // 数据加载完成
  mounted(){
    // 由于不知道查询一级栏目与查询二级栏目接口执行顺序，所以可以通过定时器来操作
    // 定时器
    // setTimeout(箭头函数,时间)  时间默认单位是毫秒
    
    // setTimeout( ()=>{
    //   console.log(this.categories[0],'---')
    //   this.findChildCategory(this.categories[0].id)
    // },1000 )
  },
  created(){
    this.test()
    // 直接去查询二级栏目
    // 获取一级栏目查询出来的第一个栏目的id，作为参数传递给查询二级栏目的接口
    // this.findChildCategory(this.categories[0].id)
  },
  methods:{
    // 跳转到文章详情页面
    toArticleDetail(id){
      this.$router.push({
        path:'/manager/article_detail',
        query:{id:id}
      })
    },
    // 查询文章
    toArticle(id){
      this.findArticle(id)
    },
    // 查询二级栏目
    toChildCategory(id){
      // 将当前点击的栏目id作为参数传递给findChildCategory
      this.findChildCategory(id)
    },
    // test(){
    //   this.$store.dispatch('findAllCategory')
    // }
    // 使用辅助函数mapActions将vuex中actions中的方法拿到
    // mapActions('命名空间',['actions中方法'])
    // 命名空间:指定的文件的名字
    ...mapActions('home',['findAllCategory','findChildCategory','findArticle']),
    test(){
      this.findAllCategory()
    }
  }
}
</script>
<style scoped>
  /* >>>表示深度选择器 */
  /* 一级栏目圆角 */
  .home .firstCategory >>> .van-tabs__line{
    height: 5px;
    width: 5px !important;
    /* 圆角为100%，也就是一个圆 */
    border-radius: 100%;
    /* 去掉组件原来的背景色 */
    background-color: #fff;
    border:2px solid red;
    left: 20px;
    bottom: 40px;
  }
  /* 二级栏目圆角 */
  .home .secondCategory >>> .van-tabs__line{
    height: 5px;
    width: 5px !important;
    /* 圆角为100%，也就是一个圆 */
    border-radius: 100%;
    /* 去掉组件原来的背景色 */
    background-color: #fff;
    border:2px solid red;
    left: 34px;
    bottom: 41px;
  }
  /* 文章热帖标签 */
  .hotTag{
    position: absolute;
    top:10%;
    left: 1%;
    font-size: 10px;
    /* 边框样式 */
    border: 1px solid #333;
    /* 边框圆角 */
    border-radius: 5px;
  }
  /* 文章发布时间 */
  .articlePublishTime{
    position: absolute;
    bottom: 10%;
    left: 15%;
    font-size: 10px;
    color: #fff;
  }
  /* 文章作者 */
  .articleAuthor{
    position: absolute;
    bottom: 10%;
    left: 5%;
    font-size: 10px;
    color: #fff;
  }
  /* 文章标题 */
  .articleTitle{
    position: absolute;
    bottom: 25%;
    left:5%;
    font-size: 22px;
    color:#fff;
  }
  /* 文章排行 */
  /* 选择器权重 */
  .articleTag{
    /* 透明度 */
    opacity: 0.8;
    /* 绝对定位 */
    position: absolute;
    height: 30px;
    width: 40px;
    /* background-color: red !important; */
    background-color: red;
    /* 相对与使用了相对定位的父级元素 */
    top: 0;
    left: 0;
    /* 文字居中 */
    text-align: center;
    line-height: 30px;
    color: #fff;
  }
  .articleIntroduction{
    position: relative;
  }
  /* 文章简介 */
  .articleContent{
    /* 首行缩进 */
    text-indent: 2em;
    height: 38.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* 行数 */
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .articleItem {
    /* 内边距 */
    padding: 10px;
  }
  .articlePicture{
    /* 相对定位 */
    position: relative;
  }
  .articlePicture img{
    height:150px;
    width: 100%;
  }


  /* 头部样式 */
  .header{
    /*背景色*/
    background-color: red;
    /*div高度*/
    height: 60px;
    /*字体颜色*/
    color: white;
    /*字体大小*/
    font-size: 20px;
    /*字体粗细*/
    font-weight: 700;
    /*水平居中*/
    text-align: center;
    /*垂直居中，取值跟当前div的高度一致*/
    line-height: 60px;
  }

</style>