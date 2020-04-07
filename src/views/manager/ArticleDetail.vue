<template>
    <div class="articleDetail">
        <!-- 头部返回 -->
        <van-nav-bar
            title="文章详情"
            left-text="返回"
            left-arrow
            @click-left="toHomeList"
            />
        
        <!-- 文章 -->
        <div class="article">
            <!-- 文章标题 -->
            <div class="articleTitle">{{article.title}}</div>
            <!-- 文章作者与发布时间 -->
            <div class="articleAuthor_publishTime">
                <div class="articleAuthor" v-if="article.author">{{article.author.username}}</div>
                <div class="articlePublishTime">{{article.publishtime}}</div>
            </div>
            <!-- 文章内容 -->
            <div class="articleContent">{{article.content}}</div>
            <!-- 文章图片 -->
            <div class="articleImg"><img :src="article.video" alt=""></div>
            <!-- 文章责任编辑 -->
            <div class="articleEditor" v-if="article.author">[责任编辑：{{article.author.username}}]</div>
            <!-- 文章收藏与点赞 -->
            <div class="articleCollection_like">
                <div class="collection">收藏{{article.thumbup}}</div>
                <div class="like">点赞{{article.thumbdown}}</div>
            </div>
        </div>

        <!-- 评论 -->
        <div class="comments">
            <div class="comments_title">热门跟贴</div>
            <div class="comments_num">评论数量</div>
            <div class="comments_item" v-for="item in comments" :key="item.id">
                <!-- 评论者头像 -->
                <div class="comments_img">
                    <img v-if="item.customer" :src="item.customer.userface" alt="">
                    <img v-else src="@/assets/home.jpg" alt="">
                </div>
                <div>
                    <!-- 评论者姓名 -->
                    <div class="comments_name" v-if="item.customer">{{item.customer.username}}</div>
                    <div class="comments_name" v-else>佚名</div>
                    <!-- 评论时间 -->
                    <div class="comments_time">{{item.commenttime}}</div>
                    <!-- 评论内容 -->
                    <div class="comments_content">{{item.content}}</div>
                </div>
            </div>
            <!-- 评论输入框 -->
            <van-cell-group>
                <van-field
                    v-model="msg"
                    center
                    clearable
                    placeholder="请输入短信验证码"
                    use-button-slot
                    >
                    <van-button slot="button" size="small" type="primary" @click="toComment">发表评论</van-button>
                </van-field>
            </van-cell-group>
        </div>

    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return {
            msg:''
        }
    },
    created(){
        this.findArticleById(this.$route.query.id)
    },
    computed:{
        ...mapState('article',['article','comments'])
    },
    methods:{
        ...mapActions('article',['findArticleById','commentHandler']),
        // 发表评论
        toComment(){
            // 封装评论接口所需要的参数
            var obj = {
                articleId:this.$route.query.id,
                customerId:7,
                content:this.msg
            }
            this.commentHandler(obj).then( (res)=>{
                // 评论完之后，再次调用查询文章详情的接口，以加载出最新评论内容
                this.findArticleById(this.$route.query.id)
                // 评论完之后，将输入框的内容清空
                this.msg = ''
            } )
        },
        // 返回上一级路由，也就是返回首页
        toHomeList(){
            this.$router.go(-1)
        },
    }    
}
</script>

<style scoped>
    /* 评论时间 */
    .comments_time{
        font-size: 12px;
        margin: 5px 0;
    }
    /* 评论者姓名 */
    .comments_name{
        color:rgb(89, 103, 228);
    }
    .comments_item{
        margin-left: 20px;
        margin-bottom: 20px;
    }
    .comments_item::after{
        content: "";
        display: block;
        clear: both;
    }
    .comments_item>div{
        float: left;
    }
    /* 评论者头像 */
    .comments_img img{
        height: 30px;
        width: 30px;
        border-radius: 100%;
        margin-right: 10px;
    }
    /* 评论数量 */
    .comments_num{
        font-size: 15px;
        margin: 1em 1.5em;
    }
    /* 热门跟帖 */
    .comments_title{
        /* 水平居中 */
        text-align: center;
        margin-top: 20px;
        font-weight: 700;
    }


    .collection{
        margin-left: 5px;
    }
    /* 清除浮动 */
    .articleCollection_like::after{
        content: "";
        display: block;
        clear: both;
    }
    /* 文章点赞收藏 */
    .articleCollection_like div{
        float: right;
    }
    /* 责任编辑 */
    .articleEditor{
        color: teal;
        font-size: 13px;
        margin-top: 10px;
    }
    /* 文章图片 */
    .articleImg img{
        height: 200px;
        width: 100%;
        margin-top: 10px;
    }
    /* 文章内容 */
    .articleContent{
        font-size: 13px;
        margin-top: 10px;
    }
    /* 文章作者与发布时间 */
    .articleAuthor_publishTime{
        font-size: 10px;
        margin-top: 10px;
        color: #ccc;
    }
    /* 清除浮动 */
    .articleAuthor_publishTime::after{
        content: "";
        display: block;
        clear: both;
    }
    .articlePublishTime{
        float: left;
    }
    .articleAuthor{
        float: left;
        margin-right: 5px;
    }
    /* 文章标题 */
    .articleTitle{
        font-size: 20px;
    }
    /* 文章内容外层div */
    .article{
        margin: 0 20px;
    }
    .articleDetail{
        /* 为了给类名为articleDetail的div宽高占满整个屏幕 */
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: #fff;
        /* z-index属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。 */
        z-index: 20;
    }
</style>