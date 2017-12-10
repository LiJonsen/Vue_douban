import Vue from 'vue'
import Vuex from 'vuex'

import homeStoreData from './modules/homeStoreData'
import movie from './modules/movie'
import subject from './modules/subject'
import book from './modules/book'
import group from './modules/group'






Vue.use(Vuex)

export default new Vuex.Store({
    // 创建一个vuex的modules，对多个仓库进行分工处理
    modules:{
        homeStoreData,
        movie,
        subject,
        book,
        group
    }
})



