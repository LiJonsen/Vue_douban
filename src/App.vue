<template>
  <div id="app">
      <headerBar></headerBar>
      <div @click="goBack()" v-show="isShowBack" class="backstyle">&lt;返回</div>
      <transition :name="transitionName" mode="out-in">
      <router-view class="content"></router-view>
      </transition>
  </div>
</template>

<script>
import headerBar from "./components/headerBar.vue";
export default {
  name: "app",
  data() {
    return {
      isShowBack: false,
      transitionName:''
    };
  },
  created() {
    this.ShowBack(this.$route.path);
  },
  components: {
    headerBar
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    ShowBack(path) {
      if (path.includes("detailView") || path.includes("subjectView")) {
        this.isShowBack = true;
      } else {
        this.isShowBack = false;
      }
    }
  },
  watch: {
    $route: function(newVal, oldVal) {
      let newPath = newVal.path;

      this.ShowBack(newPath);
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html {
  font-size: 62.5%;
}
#app {
  max-width: 41.2rem;
  margin: 0 auto;
}
body {
  font-size: 16px;
}

.content {
  padding-top: 5rem;
}

h2 {
  font-size: 1.68rem;
  font-weight: normal;
  color: #111;
}

ul,
li,
a,
h2 {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

// Common style
.header-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 998;
  display: flex;
  align-items: center;
  height: 4.8rem;
  padding: 0 1.8rem;
  background: #fff;
  border-bottom: 0.1rem solid #f3f3f3;
}
.backstyle {
  color: #09ba39;
  font-size: 14px;
  font-weight: 900;
  position: fixed;
  left: 1rem;
  top: 1.5rem;
  z-index: 999;
}
</style>
