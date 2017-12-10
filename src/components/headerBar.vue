<template>
  <div>
      <div class="head">
        <div class="title-img">
          <router-link to="/home">

          <img src="../../statics/image/douban_logo.png" alt="">
          </router-link>
          
        </div>
          <div class="nav">
            <ul>
            <li >
              <router-link style="color: rgb(35, 132, 232);" to="/movie">
                电影
              </router-link>
            </li>

            <li >
              <router-link style="color: rgb(159, 120, 96);" to="/book">
              
              图书
              </router-link>
            </li>

            <li >
              <router-link style="color: rgb(228, 168, 19);" to="/statusView">
              
              广播
              </router-link>
              
            </li>

            <li>
              <router-link style="color: rgb(42, 184, 204);" to="/groupView">
              
              小组
              </router-link>
              
            </li>
          </ul>
          </div>
      </div>
  </div>
</template>
<style scoped>
.head{
    width: 100%;
    border-bottom: .1rem solid #f3f3f3;
    height: 4.8rem;
    position: fixed;
    top: 0;
    left: 0;
    padding:0 1.8rem;
    display: flex;
    justify-content:space-around;
    align-items: center;
    box-shadow: 0 0 15px #f3f3f3;
    z-index: 99;
    background: #fff;
  }
  .nav ul{
    list-style: none;
    white-space: nowrap;
  }
  .nav ul li{
    display: inline-block;
    margin-right:15px;
    font-size: 1.6rem;
  }

  .title-img img{
    height: 2.2rem;
    width:4.6rem;
    
  }
</style>

