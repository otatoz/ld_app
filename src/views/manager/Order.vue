<template>
  <div class="video">
  {{categories}}
  </div>
</template>
<script>
import {get} from '../../http/axios'
import {mapActions,mapState,mapGetters,mapMutations} from 'vuex';
export default {
  // 代码冗余
  // 维护公共变量
  computed:{
    ...mapState('home',['categories','childCategory','article']),
  },
  created(){
    this.test()
  },
  methods:{
    ...mapActions('home',['findAllCategory','findChildCategory','findArticle']),
    test(){
      this.findAllCategory()
    }
  }
}
</script>