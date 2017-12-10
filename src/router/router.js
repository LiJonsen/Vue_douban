import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router)

// 1.导入视图组件
import homeViewList from '../view/homeView.vue'
import movieView from '../view/movieView.vue'
import bookView from '../view/bookView.vue'
import statusView from '../view/statusView.vue'
import groupView from '../view/groupView.vue'
import detailView from '../view/detailView.vue'
import subjectView from '../view/subjectView.vue'



// 2.创建路由对象
const router = new Router({
    routes:[
      // 默认路由重定向
        {path:'/',redirect:'/home'},
        
        {path:'/home',component:homeViewList},
        {path:'/movie',component:movieView},
        {path:'/:classify/subjectView/:id',component:subjectView},
        {path:'/book',component:bookView},
        {path:'/statusView',component:statusView},
        {path:'/groupView',component:groupView},
        {path:'/detailView/:id',component:detailView}
        
        
        
    ]
})

export default router