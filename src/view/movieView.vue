<template>
  <div class="movie-view has-header">
    <scroller title="影院热映" type="hasCover" :items="hotMovies"></scroller>
    <scroller title="免费在线观影" type="hasCover" :items="topMovies"></scroller>
    <scroller title="新片速递" type="hasCover" :items="newMovies"></scroller>
    <scroller title="发现好电影" type="onlyString" :items="movieTags"></scroller>
    <types></types>
    <download-app></download-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Scroller from '../components/scroller'
import Types from '../components/types'
import DownloadApp from '../components/downloadApp'

export default {
  name: 'movie-view',
  components: { Scroller, Types, DownloadApp },
  data () {
    return {}
  },
  computed: {
    //获取视频页面信息
    ...mapState({
      hotMovies: state => state.movie.hotMovies,
      topMovies: state => state.movie.topMovies,
      newMovies: state => state.movie.newMovies,
      movieTags: state => state.movie.movieTags
    })
  },
  methods: {
    
    getMovie: function () {
      this.$store.dispatch('getMovie')
    }
  },
  created () {
   // 触发getMovie异步事件，发送请求
    this.getMovie()
  }
}
</script>

<style scoped>

</style>
