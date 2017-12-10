<template>
  <div class="list">
      <template v-if="mold === 'thumbnail'">
        <ul class="home-list">
            
          <li v-for="item in items" :key="item.id">
        <router-link :to="'/detailView/'+item.id">
              
              <img :src="item.image" alt="">
              <strong>{{item.title}}</strong>
              <p class="home-content">{{item.content | subStr}}</p>
              <p class="home-copy">
                  <span>本活动来自栏目：{{item.subcategory_name}}</span>
                  <span>{{item.category_name}}</span>
                
              </p>
        </router-link>
              
          </li>
          
      </ul>
      </template>
    <template v-if="mold === 'basic'">
      <ul class="basic">
        <li v-for="item in items">
          <a href="#">
            <h3>{{item.title}}</h3>
            <div class="info">{{item.comments}}</div>
          </a>
        </li>
      </ul>
    </template>
     
  </div>
</template>
<script>
export default {
  name: "list",
  props: {
    mold: {
      type: String,
      default: "basic"
    },
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  filters: {
    subStr: function(value) {
      let newVal = value.replace(/<.*?>/g, "");
      return newVal.slice(0, 35) + ".....";
    }
  }
};
</script>
<style scoped>
.home-list {
  padding: 2rem;
}
.home-list li {
  position: relative;
  margin-bottom: 2rem;
}
.home-list img {
  width: 25.6%;
  height: 10rem;
}
.home-list strong {
  position: absolute;
  top: -0.5rem;
  width: 70%;
  letter-spacing: 0.2rem;
  font-size: 1.6rem;
  font-weight: normal;
  padding-left: 0.5rem;
  color: #494949;
  line-height: 2.3rem;
}
.home-content {
  font-size: 1.3rem;
  color: #999;
  position: absolute;
  width: 70%;
  right: 0.7rem;
  bottom: 4rem;
}
.home-copy {
  color: #999;
  font-size: 1.3rem;
  margin-top: 1.5rem;
}
.home-copy span:nth-of-type(2) {
  position: absolute;
  right: 0.8rem;
}

.basic h3 {
      padding: 0;
      line-height: 1.41;
      font-size: 1.7rem;
      font-weight: 500;
      color: #494949;
}

.basic .info{
      margin-top: 0.5rem;
      font-size: 1.4rem;
      color: #42bd56;
}
</style>
