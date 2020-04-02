// 导入axios，{}中表示axios中具体的方法
import {get,post} from '../../http/axios'
export default {
	// 设置命名空间方法为true,即可以使用命名空间这个方法
	namespaced:true,
	state:{
		categories:[],
		childCategory:[],
		article:[]
	},
	getters:{},
	mutations:{
		refreshCategory(state,categories){
			state.categories = categories
		},
		refreshChildCategory(state,childCategory){
			state.childCategory = childCategory
		},
		refreshArticle(state,article){
			state.article = article
		}
	},
	actions:{
		// 查询所有栏目
		async findAllCategory(context){
			let res = await get('/manager/category/findAllCategory')
			// console.log(res)
			context.commit('refreshCategory',res.data)
		},
		// 根据父栏目查询子栏目
		async findChildCategory(context,params){
			// params为接收vue页面传递过来的id
			// 自己将参数封装成接口所期望接收的形式
			// 接口期望接受的参数 id = 1
			var id = {
				id:params
			}
			// console.log(id,'--')
			let res = await get('/manager/category/findCategoryByParentId',id)
			// console.log(res.data)
			context.commit('refreshChildCategory',res.data)
		},
		// 根据二级栏目查询文章
		async findArticle(context,params){
			var id = {
				categoryId:params,
				page:0,
				pageSize:10
			}
			// console.log(id,'--')
			let res = await get('/manager/article/findArticle',id)
			console.log(res.data)
			context.commit('refreshArticle',res.data)
		}
	}
}