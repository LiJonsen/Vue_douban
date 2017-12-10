<template>
  <div class="home-view">
    <!-- 1.0 主页列表内容组件 -->
          <list mold="thumbnail" :items="events"></list>
    <!-- 2.0 使用无限滚动插件动态加载store -->
          <InfiniteLoading :on-infinite="onInfinite" ref="infiniteLoading">
            <!-- 3.0 显示加载中gif图片 -->
              <loading slot="spinner"></loading>
          </InfiniteLoading>
      
  </div>
</template>


<script>
import InfiniteLoading from "vue-infinite-loading";

import { mapActions,mapState } from "vuex";
import loading from "../components/loading.vue";
import list from "../components/list.vue";


export default {
  name: "home-view",
  components: { list , InfiniteLoading, loading },
  data() {
    return {
     
    };
  },

  computed:{
    // 通过mapState到vuex仓库中取出events的值
      ...mapState({
        events:state=>state.homeStoreData.events
      }),

  },

  methods: {
    // 使用无限加载插件调用loadMore向后台获取值
    onInfinite() {
      setTimeout(() => {
        this.loadMore();
        this.$refs.infiniteLoading.$emit("$InfiniteLoading:loaded");
      }, 2000);
    },


  //  获取vuex中的异步方法，通过...对该对象进行解构，让methods里其他函数可以使用
  ...mapActions([
    'loadMore'
  ]),


  }
};
</script>
<style scoped>

</style>