<template>
  <div class="subject-view has-header">
    <!-- 1.0 显示标语 -->
    <banner title="聊聊你的观影感受"></banner>
    <!-- 2.0 当showLoading为false时数据响应成功 -->
    <template v-if="!showLoading">
      <div class="subject-card">
        <!-- 2.1标题 -->
        <h1 class="title">{{subject.title}}</h1>

        <div class="subject-info">
          <div class="right">
            <a href="#">
              <img v-if="subject.images" :src="subject.images.large" alt="cover">
            </a>
          </div>
          <div class="left" v-if="subject.rating">
            <!-- 2.2评分 -->            
            <rating :rating="subject.rating">
              <span slot="ratingsCount">{{subject.ratings_count}}人评价</span>
            </rating>
            <!-- 2.3 movie资料信息 -->
            <template v-if="subject.genres && subjectMeta">
              <p class="meta">{{subjectMeta}}</p>
              <a href="#" class="open-app">用App查看影人资料</a>
            </template>

            <!-- 2.3 book资料信息-->
            <template v-if="subject.author && subjectMeta">
              <p class="meta">{{subjectMeta}}</p>
              <a href="#" class="buy">在豆瓣购买</a>
            </template>

          </div>
        </div>
        <!-- 2.3.1 book详情页面才会显示-->
        <div v-if="subject.author" class="vendors-link">
          <a class="link">
            在哪儿买这本书？
            <span class="info">
              豆瓣阅读电子书 66.00元起
            </span>
          </a>
        </div>
       
        <!-- 2.4标志模块  -->
        <marking>
          
          <template slot="book" v-if="subject.author">
            <router-link to="/home">想读</router-link>
            <router-link to="/home">在读</router-link>
            <router-link to="/home">读过</router-link>
          </template>

          <template slot="movie" v-else>
            <router-link to="/home">想看</router-link>
            <router-link to="/home">看过</router-link>
          </template>

        </marking>
        
        <!-- 2.5摘要模块 -->
        <div class="subject-intro">
          <h2>{{subject.title}}的简介</h2>
          <p>
            
            <template v-if="summary && subject.summary">
              {{isExpand ? summary : subject.summary}}
            </template>
            <!-- 点击展开显示剩余摘要内容 -->
            <a href="javascript:;" v-show="isExpand" v-on:click="expand">
              (展开)
            </a>
          </p>
        </div>
      
        <!-- 2.6标签分类 -->
        <div class="genres">
          <h2>查看更多相关分类</h2>
          <template v-if="genres">
            <tags :items="genres"></tags>
          </template>
        </div>
       
        <!-- 2.7详情图片信息 -->
        <div class="subject-pics">
          <h2>{{subject.title}}的图片</h2>
          <ul v-if="subject.images">
            <li class="pic">
              <a href="#">
                <img :src="subject.images.large" alt="poster">
              </a>
            </li>
            <li class="pic">
              <a href="#">
                <img :src="subject.images.large" alt="poster">
              </a>
            </li>
            <li class="pic">
              <a href="#">
                <img :src="subject.images.large" alt="poster">
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 2.8短评 -->
      <div class="subject-comments">
        <h2>{{subject.title}}的短评</h2>
        <div class="content-list">
          <card mold="comment" v-for="item in items" :key="item"></card>
          <a class="list-link" href="javascript:;">显示更多评论</a>
        </div>
      </div>
      
      <!-- 2.9banner图片 -->
      <div class="ad">
        <banner :adImg="adImgUrl"></banner>
      </div>
      
      <!-- 2.10详情内容问答 -->
      <div class="subject-question">
        <h2>关于{{subject.title}}的问答</h2>
        <list :items="questions"></list>
        <a class="list-link" href="javascript:;">显示更多问答</a>
      </div>
     
      <!-- 2.11推荐豆列 -->
      <scroller title="推荐的豆列" type="onlyString" :items="movieTags"></scroller>
     
      <!-- 2.12下载app -->
      <download-app></download-app>
    </template>


    <loading v-show="showLoading"></loading>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import Banner from '../components/banner'
import Rating from '../components/rating'
import Marking from '../components/marking'
import Card from '../components/card'
import List from '../components/list'
import Scroller from '../components/scroller'
import Tags from '../components/tags'
import DownloadApp from '../components/downloadApp'
import Loading from '../components/loading'

export default {
  name: 'subject-view',
  components: {
    Banner,
    Rating,
    Marking,
    Card,
    List,
    Scroller,
    Tags,
    DownloadApp,
    Loading
  },
  data () {
    return {
      showLoading: true,
      isExpand: true,
      items: new Array(5)
    }
  },
  computed: {
    // 获取vuex仓库中的 store/modules/subject
    ...mapState({
      subject: state => state.subject.subject,
      adImgUrl: state => state.subject.adImgUrl,
      questions: state => state.subject.questions,
      movieTags: state => state.movie.movieTags
    }),
    // Getting Filtered Vuex State
    ...mapGetters({
      subjectMeta: 'subjectMeta',
      summary: 'summary',
      genres: 'genres'
    })
  },
  methods: {
    // Toggle summary
    expand: function (event) {
      this.isExpand = false
    }
  },
  created () {
    // 1.获取url-id值以及classify分类名称【通过classify判断book和movie】
    const id = this.$route.params.id
    const classify = this.$route.params.classify
    console.log(id+'-------'+classify);
    // 2.dispatch触发并传值到store异步方法发送请求
    this.$store.dispatch({
      type: 'getSingleSubject',
      id: id,
      classify: classify
    }).then(res => {
      // 3.成功响应
      this.showLoading = false
    })
  }
}
</script>

<style lang="scss" scoped>
.subject-card {
  padding: 0 1.8rem;

  h1 {
    margin: 2rem 0 0;
  }
}

.subject-info {
  overflow: hidden;
  margin-bottom: 3rem;

  .right {
    float: right;

    img {
      display: block;
      width: 100%;
      max-width: 10rem;
    }
  }

  .left {
    margin-right: 10rem;

    .meta {
      margin-top: 1.5rem;
      padding-right: 2.4rem;
      line-height: 1.6;
      font-size: 1.4rem;
      color: #494949;
    }

    .open-app {
      display: block;
      margin-top: 1rem;
      line-height: 1;
      font-size: 1.4rem;
      color: #42bd56;
    }

    .buy {
      display: inline-block;
      height: 2.4rem;
      padding: 0 0.6rem;
      line-height: 2.4rem;
      text-align: center;
      font-size: 1.3rem;
      color: #E76648;
      border: 0.1rem solid #E76648;
      border-radius: 0.3rem;
    }
  }
}

.vendors-link {
  position: relative;
  margin: 1.5rem 0;
  padding: 1rem 1.8rem 1rem 0;
  line-height: 2.4rem;
  font-size: 1.5rem;
  overflow: auto;
  box-sizing: border-box;

  .link {
    display: inline-block;
    width: 100%;
    position: relative;
  }

  .info {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    color: #ccc;
    font-size: 1.4rem;
  }

  &::before {
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background: #E8E8E8;
    content: '';
    position: absolute;
  }

  &::after {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #E8E8E8;
    content: '';
    position: absolute;
  }
}

.subject-intro, .genres, .subject-pics, .subject-comments,
.ad, .subject-question {
  margin-bottom: 3rem;
}

h2 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  color: #aaa;
}

.subject-intro {
  p {
    font-size: 1.5rem;
    color: #494949;
  }

  a {
    color: #42bd56;
  }
}

.subject-pics {
  ul {
    margin-right: -1.8rem;
    overflow-x: auto;
    white-space: nowrap;
  }

  li {
    height: 12rem;
    overflow: hidden;
    display: inline-block;
  }

  img {
    width: 18rem;
  }
}

.subject-comments h2, .subject-question {
  padding: 0 1.8rem;
}

.subject-comments, .subject-question {
  .list-link {
    display: block;
    padding: 1.5rem 0;
    font-size: 1.6rem;
    line-height: 1.8rem;
    text-align: center;
    color: #42bd56;
  }
}

.ad {
  margin: 3rem 1.8rem;
  margin-top: -2rem;
}
</style>
