// 导入axios，{}中表示axios中具体的方法
import {get,post} from '../../http/axios'
export default {
	// 设置命名空间方法为true,即可以使用命名空间这个方法
	namespaced:true,
	state:{
		videos:[],
		videoDetail:{}
	},
	getters:{},
	mutations:{
		refreshVideos(state,videos){
            state.videos = videos
		},
		refreshVideoDetail(state,videoDetail){
			state.videoDetail = videoDetail
		}
	},
	actions:{
        // 查找所有视频
		async findVideos(context){
            let res = await get('http://139.224.221.31:11000/up_site_res/videos/?page=1&page_size=10')
            context.commit('refreshVideos',res.data.results)
		},
		// 根据视频id查询视频详情(视频播放地址、视频的评论...)
		async findVideoDetail(context,params){
			let res = await get('http://139.224.221.31:11000/up_site_res/videoListDetail/',params)
			context.commit('refreshVideoDetail',res.data.results[0])
		}
	}
}