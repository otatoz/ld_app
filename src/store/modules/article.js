// 导入axios，{}中表示axios中具体的方法
import {get,post} from '../../http/axios'
export default {
	// 设置命名空间方法为true,即可以使用命名空间这个方法
	namespaced:true,
	state:{
        article:{},
        comments:[]
	},
	getters:{},
	mutations:{
		refreshArticle(state,article){
            state.article = article
        },
        refreshComment(state,comments){
            state.comments = comments
        }
	},
	actions:{
		async findArticleById(context,params){
            var id = {
                id:params
            }
            let res = await get('/manager/article/findArticleById',id)
            context.commit('refreshArticle',res.data.data)
            context.commit('refreshComment',res.data.data.comments)
        },
        async commentHandler(context,params){
            let res = await post('/manager/comment/saveOrUpdateComment',params)
            // context.dispatch('findArticleById',)
        }
	}
}