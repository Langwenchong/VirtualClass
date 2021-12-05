<template>
  <div id="TopicList">
    <div id="l-main"></div>
    <div id="r-nav">
      <div class="menu">
        <p class="title"><i class="fad fa-map"></i>导航栏</p>
        <div class="info">
          <div class="l-box">
            <strong>开启你的话题讨论</strong>
            <p class="content">
              有疑惑？有想法？创建自己的话题与同学畅言所想、所惑！
            </p>
          </div>
          <div class="r-box">
            <img
              src="https://static.zhihu.com/heifetz/assets/kanshan.7de41a9a.png"
              alt=""
            />
          </div>
        </div>
        <div class="create">
          <strong>+&nbsp;&nbsp;发起话题</strong>
        </div>
        <div class="backup">
          <strong
            ><i class="fas fa-arrow-alt-left"></i>&nbsp;&nbsp;返回列表</strong
          >
        </div>
      </div>
      <div class="filter">
        <p class="title"><i class="fad fa-search"></i>搜索栏</p>
        <div class="search">
          <el-input placeholder="请输入要搜索的话题" v-model="searchTxt">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-switch
          v-model="teacherApply"
          active-text="优先显示老师已答复话题"
          inactive-text="默认排序"
        >
        </el-switch>
        <div class="category">
          <div class="classification">
            <div class="item" @click="choose(0)">
              <i class="fad fa-calendar-alt"></i>时间排序
            </div>
            <div class="item" @click="choose(1)">
              <i class="fad fa-campfire"></i>热度排序
            </div>
          </div>
        </div>
      </div>
      <div class="regulation">
        <b><i class="fad fa-bullhorn"></i>&nbsp;&nbsp;注意事项</b>
        <ul>
          <li>话题区请保持文明，禁止辱骂，争吵</li>
          <li>被多次举报的话题与评论将进行删除</li>
          <li>话题禁止含有任何淫秽信息</li>
          <li>其他具体规定请查看《虚拟教研室话题事项规定》</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopicList",
  data() {
    return {
      searchTxt: ``,
      teacherApply: false,
    };
  },
  methods: {
    choose(i) {
      var items = document.getElementsByClassName("item");
      for (let i = 0; i < items.length; i++) {
        items[i].style.background = `var(--background1)`;
        items[i].style.color = `var(--text1)`;
      }
      items[i].style.background = `#d1453c`;
      items[i].style.color = `#fff`;
    },
  },
};
</script>

<style scoped>
#TopicList {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px 0 35px;
  min-height: 100vh;
  /* background: pink; */
  display: flex;
  justify-content: space-between;
}
#l-main {
  min-height: 300px;
  /* background: var(--background2); */
  width: calc(100% - 320px);
  /* box-shadow: 0 1px 2px 0px rgb(0 0 0 / 20%) !important; */
}
#r-nav {
  position: fixed;
  right: 0px;
  width: 320px;
  min-height: 400px;
  /* box-shadow: 0 1px 2px 0px rgb(0 0 0 / 20%) !important;
  background: var(--background2); */
  display: flex;
  flex-direction: column;
  align-items: center;
}
#r-nav .menu {
  width: 100%;
  box-shadow: 0 1px 2px 0px rgb(0 0 0 / 20%) !important;
  background: var(--background3);
  height: 280px;
  box-sizing: border-box;
  padding: 15px 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#r-nav .menu .title {
  height: 32px;
  width: 100%;
  margin: 0 16px;
  display: flex;
  align-items: center;
}
#r-nav .menu .title i {
  margin-right: 10px;
}
#r-nav .menu .info {
  height: 98px;
  width: 100%;
  padding: 0 14px;
  box-sizing: border-box;
  background: rgba(133, 144, 166, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#r-nav .menu .info .l-box {
  width: 68%;
  /* background: yellow; */
  height: 70px;
}
#r-nav .menu .info .l-box .content {
  font-size: 12px;
}
#r-nav .menu .info .r-box {
  height: 70px;
  width: 30%;
  overflow: hidden;
}
#r-nav .menu .info .r-box img {
  height: 100%;
}
#r-nav .menu .create {
  margin-top: 10px;
  width: 100%;
  border: 1px solid rgba(0, 102, 255, 0.5);
  color: rgb(0, 102, 255);
  border-radius: 4px;
  height: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
}
#r-nav .menu .create:hover {
  color: #fff;
  background: rgba(0, 102, 255, 0.5);
}
#r-nav .menu .backup {
  margin-top: 10px;
  width: 100%;
  border: 1px solid #00875a;
  color: #00b894;
  border-radius: 4px;
  height: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
}
#r-nav .menu .backup:hover {
  color: #fff;
  background: #00b894;
}
#r-nav .filter {
  margin-top: 10px;
  width: 100%;
  box-shadow: 0 1px 2px 0px rgb(0 0 0 / 20%) !important;
  background: var(--background3);
  height: 250px;
  box-sizing: border-box;
  padding: 15px 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#r-nav .filter .title {
  height: 32px;
  width: 100%;
  margin: 0 16px;
  display: flex;
  align-items: center;
}
#r-nav .filter .title i {
  margin-right: 10px;
}
#r-nav .filter .category {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-switch /deep/ span {
  color: var(--text1);
}
#r-nav .filter .category .classification {
  width: 100%;
  display: flex;
  height: 78px;
  /* background: pink; */
  align-items: center;
  justify-content: space-around;
}
#r-nav .filter .category .classification .item {
  position: relative;
  height: 68px;
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: YouYuan;
  transition: 0.5s;
  border-radius: 4px;
  background: var(--background1);
}
#r-nav .filter .category .classification .item i {
  position: absolute;
  font-size: 48px;
  bottom: 5px;
  left: 7px;
  opacity: 0.5;
  z-index: 0;
}
#r-nav .filter .category .classification .item:first-child {
  /* border: 1px solid black; */
  background: #d1453c;
  color: #fff;
}
#r-nav .regulation {
  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 5px;
  /* box-shadow: 0 1px 2px 0px rgb(0 0 0 / 20%) !important; */
  color: var(--text2);
}
#r-nav .regulation ul,
#r-nav .regulation ul li {
  font-size: 14px;
  margin: 0;
  padding: 0 20px;
  margin-top: 5px;
}
</style>