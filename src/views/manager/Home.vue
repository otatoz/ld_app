<template>
  <div class="home">
    <!-- 吸顶效果 -->
    <van-sticky :offset-top="0">
      <!-- 首页的头部 -->
      <div class="header">看点资讯精选</div>
      <!-- 一级栏目 -->
      <van-tabs>
        <van-tab v-for="item in categories" :key="item.id">
          <!-- 将item.name通过插槽放入到van-tab的title属性里面去 -->
          <div slot="title" @click="toChildCategory(item.id)">{{item.name}}</div>
        </van-tab>
      </van-tabs>
      <!-- 二级栏目 -->
      <van-tabs>
        <van-tab v-for="item in childCategory" :key="item.id">
          <div slot="title" @click="toArticle(item.id)">{{item.name}}</div>
        </van-tab>
      </van-tabs>
    </van-sticky>
    

    <!-- 文章区域 -->
    {{article}}
  </div>
</template>
<script>
// 从vuex中导入辅助函数    源码
import {mapActions,mapState,mapGetters,mapMutations} from 'vuex';
export default {
  data(){
    return {
      
    }
  },
  computed:{
    // mapState('命名空间',['state中的变量'])
    ...mapState('home',['categories','childCategory','article']),
  },
  created(){
    this.test()
  },
  methods:{
    toArticle(id){
      this.findArticle(id)
    },
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