<template>
  <div id="TopicList">
    <div id="l-main">
      <transition-group appear>
        <div
          class="topicBox wow animate__animated animate__fadeInUp"
          v-for="(topic, i) in filterTopics"
          :key="topic.topicId"
        >
          <h3  @click="goToComment(i)">{{ topic.title }}</h3>
          <div class="main">
            <p class="content">
              {{ topic.description }}
            </p>
            <img :src="topic.img" alt="" v-if="topic.img != ``" />
          </div>
          <div id="tool">
            <div id="subscribe" @click="subscribe(i)">
              <i class="fad fa-heart" v-if="topic.isLike === true"></i
              ><i class="fas fa-thumbs-up" v-if="topic.isLike === false"></i
              >&nbsp;&nbsp;{{
                topic.isLike === true ? "已关注" : "好问题"
              }}&nbsp;{{ topic.subscribe }}
            </div>
            <div class="box">
              <i class="fad fa-question-circle"></i>&nbsp;话题发起者：<img
                :src="topic.avatar"
                alt="avatar"
              />&nbsp;{{ topic.questioner }}
            </div>
            <div class="box">
              <i class="fad fa-comment-alt-smile"></i>&nbsp;{{
                topic.num
              }}条评论
            </div>
            <div class="box">
              <i class="fad fa-clock"></i>&nbsp;{{ topic.time }}
            </div>
            <div class="box reply" v-if="topic.reply === true">
              <svg
                t="1638775000906"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2478"
                width="35"
                height="35"
              >
                <path
                  d="M199.528 1022.797l-28.487-167.171L3.866 827.134l301.98-301.981 195.663 195.552-301.981 302.092z m0 0"
                  fill="#F3C450"
                  p-id="2479"
                ></path>
                <path
                  d="M169.442 846.735L11.158 819.729l-7.292 7.405 167.175 28.492-1.599-8.891z m321.699-136.404l-294.688 294.688 2.963 17.778L501.51 720.704l-10.369-10.373z m0 0"
                  fill="#F7D582"
                  p-id="2480"
                ></path>
                <path
                  d="M828.45 1022.797l28.486-167.171L1024 827.134 722.014 525.152 526.353 720.704l302.097 302.093z m0 0"
                  fill="#F3C450"
                  p-id="2481"
                ></path>
                <path
                  d="M299.694 532.563L156.565 675.688l15.498 39.319c10.939 27.575 32.252 49.569 59.487 61.417l150.422 65.187 113.271-113.274-195.549-195.774z m426.653-2.964l143.129 143.128-15.497 39.315c-10.939 27.577-32.253 49.569-59.487 61.419L644.07 838.646 530.798 725.373l195.549-195.774z m0 0"
                  fill="#EF9115"
                  p-id="2482"
                ></path>
                <path
                  d="M692.045 701.102l-158.284 27.007-7.408-7.404 167.176-28.491-1.484 8.888z m314.291 129.113L718.938 542.818l3.076-17.666L1024 827.134l-17.664 3.081z m0 0"
                  fill="#F7D582"
                  p-id="2483"
                ></path>
                <path
                  d="M930.099 393.42l-89.114-225.406c-10.94-27.579-32.248-49.57-59.482-61.42l-222.33-96.293c-27.122-11.737-57.889-12.309-85.465-1.37L248.301 98.045c-27.578 10.939-49.571 32.253-61.419 59.488L90.588 379.858c-11.737 27.123-12.309 57.893-1.37 85.47l89.113 225.4c10.941 27.578 32.248 49.569 59.483 61.426l222.329 96.293c27.123 11.737 57.889 12.305 85.466 1.364l225.406-89.114c27.577-10.935 49.57-32.248 61.425-59.483l96.293-222.442c11.738-27.123 12.193-57.888 1.366-85.352z m0 0"
                  fill="#61A4DA"
                  p-id="2484"
                ></path>
                <path
                  d="M179.584 429.315c0 117.903 62.902 226.854 165.009 285.804 102.108 58.954 227.91 58.954 330.018 0 102.107-58.95 165.009-167.9 165.009-285.804s-62.901-226.85-165.009-285.804c-102.108-58.953-227.91-58.953-330.018 0-102.107 58.955-165.009 167.901-165.009 285.804z m0 0"
                  fill="#E6F3FB"
                  p-id="2485"
                ></path>
                <path
                  d="M509.49 99.416c2.279 0 4.44 0 6.719 0.113-179.138 3.648-323.175 149.853-323.175 329.899 0 180.053 144.038 326.257 323.175 329.792-2.278 0-4.439 0.112-6.719 0.112-182.219 0-330.018-147.687-330.018-330.017 0.001-182.331 147.687-329.899 330.018-329.899z m0 0"
                  fill="#BAD7F0"
                  p-id="2486"
                ></path>
                <path
                  d="M509.715 99.416c-2.279 0-4.446 0-6.725 0.113 179.024 3.53 323.18 149.853 323.18 329.787 0 179.938-144.156 326.369-323.293 329.904 2.28 0 4.446 0.112 6.725 0.112 182.213 0 330.018-147.687 330.018-330.017 0-182.331-147.686-329.899-329.905-329.899z m0 0"
                  fill="#FBFDFF"
                  p-id="2487"
                ></path>
                <path
                  d="M218.102 429.315c0 160.992 130.512 291.501 291.5 291.501 160.989 0 291.5-130.509 291.5-291.501 0-160.988-130.512-291.5-291.5-291.5s-291.5 130.512-291.5 291.5z m0 0"
                  fill="#61A4DA"
                  p-id="2488"
                ></path>
                <path
                  d="M624.924 593.415l-112.701-56.866-110.65 60.627v-15.162l19.146-109.505-91.734-86.493v-15.162l124.437-5.124 53.903-114.072L565.1 363.793l125.121 0.796v15.269l-88.771 89.569 23.474 108.714v15.274z m0 0"
                  fill="#386BB4"
                  p-id="2489"
                ></path>
                <path
                  d="M624.924 578.142l-112.701-56.749-110.65 60.621 19.146-124.666-91.734-86.494 124.437-20.28 53.903-114.069L565.1 348.637l125.121 15.952-88.771 89.569 23.474 123.984z m0 0"
                  fill="#FEF8F0"
                  p-id="2490"
                ></path>
                <path
                  d="M507.324 236.505l39.202 121.36 104.494 15.729-60.397 78.628 34.302 125.92-23.475-123.984 88.771-89.569L565.1 348.637l-57.776-112.132z m0 0"
                  fill="#E6F3FB"
                  p-id="2491"
                ></path>
                <path
                  d="M795.063 143.972s47.858 69.738 74.526 127.288c26.779 57.546 42.732 131.96 46.724 147.003 3.985 15.043 24.271 2.964 15.952-18.573-8.319-21.539-85.583-216.857-85.583-216.857s-9.003-36.812-39.539-55.728c-17.665-11.165-12.08 16.867-12.08 16.867zM528.519 28.987s64.612 16.868 115.321 35.217c50.827 18.343 106.206 52.875 117.831 59.481 11.625 6.613 15.385-12.533-2.734-20.396-18.118-7.866-183.015-78.063-183.015-78.063s-18.114-17.889-46.948-11.165c-16.637 3.762-0.455 14.926-0.455 14.926z m366.71 456.965s-18.231 59.711-39.314 110.764c-21.082 51.169-60.056 102.786-67.464 113.844-7.404 11.052 13.219 20.625 22.222 2.735 9.004-17.89 89.114-180.85 89.114-180.85s13.332-28.145 11.968-60.167c-0.916-20.056-16.526 13.674-16.526 13.674z m0 0"
                  fill="#9CC8EB"
                  p-id="2492"
                ></path>
                <path
                  d="M856.937 855.626l-9.8 2.391-28.717 154.755 10.03 10.025 28.487-167.171z m0 0"
                  fill="#FFFFFF"
                  p-id="2493"
                ></path></svg
              >&nbsp;老师回复
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div id="r-nav" class="animate__animated animate__fadeInRight">
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
        <div class="create" @click="create">
          <strong>+&nbsp;&nbsp;发起话题</strong>
        </div>
        <div class="backup" @click="backup">
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
          v-model="teacherRepply"
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
  created() {
    const url = `https://vclass.api.cheeseburgerim.space/topic/api/getAllTopics?fid=${sessionStorage.getItem(
      "fid"
    )}`;
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // this.topics = data;
        this.topics = [];
        for (let i = data.length - 1; i > -1; i--) {
          var obj = {};
          obj.isLike = false;
          obj.title = data[i].title;
          obj.num = data[i].commentNum;
          obj.description = data[i].description;
          obj.subscribe = data[i].likeNum;
          obj.time = data[i].timestamp;
          obj.img = "http://vclass.static.cheeseburgerim.space" + data[i].cover;
          obj.questioner = data[i].username;
          obj.avatar =
            "http://vclass.static.cheeseburgerim.space" + data[i].userAvatar;
          if (data[i].userAvatar === `//VClass//static//defaultAvatar.jpg`) {
            obj.avatar =
              `https://vclass.api.cheeseburgerim.space` + data[i].userAvatar;
          }
          obj.topicId = data[i].topicId;
          obj.reply = data[i].isTeacherReply === 0 ? false : true;
          // console.log(obj.isLike);
          this.topics.push(obj);
        }
        for (let i = 0; i < this.topics.length; i++) {
          var likeurl1 = `https://vclass.api.cheeseburgerim.space/topic/api/isLikeTopic?topicId=${
            this.topics[i].topicId
          }&username=${sessionStorage.getItem("userName")}`;
          fetch(likeurl1, {
            method: "get",
            credentials: "include",
          })
            .then((res) => res.text())
            .then((req) => {
              // console.log(req);
              // obj.isLike = req;
              if (req === `true`) {
                this.topics[i].isLike = true;
              } else if (req === `false`) {
                this.topics[i].isLike = false;
              } else {
                this.$notify.error({
                  title: "错误",
                  message:
                    "您现在是游客身份或者登录身份信息已过期，无权限编辑个人信息哦😶，3s后将跳转到登录界面！",
                });
                setTimeout(() => {
                  this.$router.push({ name: "login" });
                }, 3000);
              }
            });
          // console.log(this.topics[i].isLike);
        }
      })
      .catch((error) => {
        this.$notify.error({
          title: "错误",
          message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！",
        });
      });
  },
  data() {
    return {
      hotsort: false,
      searchTxt: ``,
      teacherRepply: false,
      topics: [],
    };
  },
  methods: {
    goToComment(i) {
      sessionStorage.setItem("tid", this.topics[i].topicId);
      this.$router.push({ name: "Topicbbs" });
    },
    subscribe(i) {
      if (this.topics[i].isLike === true) {
        this.topics[i].subscribe -= 1;
      } else {
        this.topics[i].subscribe += 1;
      }
      this.topics[i].isLike = !this.topics[i].isLike;
      const likeurl2 = `https://vclass.api.cheeseburgerim.space/topic/api/likeTopic?topicId=${
        this.topics[i].topicId
      }&username=${sessionStorage.getItem("userName")}`;
      fetch(likeurl2, {
        method: "get",
        credentials: "include",
      })
        .then((res) => res.text())
        .then((data) => {
          // alert(data);
          if (data === `fail`) {
            this.$notify.error({
              title: "错误",
              message:
                "您现在是游客身份或者登录身份信息已过期，无权限编辑个人信息哦😶，3s后将跳转到登录界面！",
            });
            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 3000);
          }
        });
    },
    backup() {
      this.$router.push({
        name: "CourseList",
      });
    },
    choose(i) {
      if (i === 1) this.hotsort = true;
      else this.hotsort = false;
      var items = document.getElementsByClassName("item");
      for (let i = 0; i < items.length; i++) {
        items[i].style.background = `var(--background1)`;
        items[i].style.color = `var(--text1)`;
      }
      items[i].style.background = `#d1453c`;
      items[i].style.color = `#fff`;
    },
    create() {
      this.$router.push({ name: "TopicEditor" });
    },
  },
  computed: {
    filterTopics() {
      var arr = this.topics;
      var ans = arr.concat();
      if (this.searchTxt != ``) {
        ans = [];
        //按照搜索框内容搜索
        for (let i = 0; i < arr.length; i++) {
          let sen = arr[i].title + arr[i].description + arr[i].questioner;
          if (sen.search(this.searchTxt) != -1) {
            ans.push(arr[i]);
          }
        }
      }
      if (this.hotsort === true) {
        //按热度排序
        ans.sort(function (next, current) {
          if (next.subscribe < current.subscribe) return 1;
          else if (next.subscribe === current.subscribe) return 0;
          else return -1;
        });
      }
      if (this.teacherRepply === true) {
        //优先显示老师回复
        ans.sort(function (next, current) {
          if (next.reply === true && current.reply === false) return -1;
          else if (next.reply === true && current.reply === true) return 0;
          else return 1;
        });
      }
      // console.log(`hhh`);
      return ans;
    },
  },
};
</script>

<style scoped>
#TopicList {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px 0 15px;
  min-height: 100vh;
  /* background: pink; */
  display: flex;
  justify-content: space-between;
}
#l-main {
  min-height: 300px;
  /* padding: 0 20px;
  box-sizing: border-box; */
  /* background: var(--background2); */
  width: calc(100% - 320px);
  /* box-shadow: 0 1px 2px 0px rgb(0 0 0 / 20%) !important; */
}
#l-main .topicBox {
  width: 100%;
  /* min-height: 200px; */
  box-shadow: 0 1px 2px 0px rgb(0 0 0 / 20%) !important;
  background: var(--background3);
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 7px;
}
#l-main .topicBox h3 {
  margin: 0;
  transition: 0.4s;
}
#l-main .topicBox h3:hover {
  color: var(--text4);
}
#l-main .topicBox .main {
  justify-content: space-between;
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  margin-top: 6px;
  /* background: #00875a; */
}
#l-main .topicBox .main .content {
  /* background: rgba(133, 144, 166, 0.1); */
  box-sizing: border-box;
  /* padding: 10px 15px; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  width: auto;
  /* max-height: 100px; */
  /* min-height: 20px; */
}
#l-main .topicBox .main img {
  margin-left: 20px;
  height: 100px;
  object-fit: cover;
  max-width: 200px;
  border-radius: 4px;
}
#l-main .topicBox #tool {
  height: 52px;
  width: 100%;
  display: flex;
  align-items: center;
  /* background: #00875a; */
}
#l-main .topicBox #tool #subscribe {
  transition: 0.4s;
  height: 32px;
  padding: 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(253, 121, 168, 0.2);
  color: rgb(255, 107, 129, 0.8);
  border-radius: 3px;
  font-weight: 450;
}
#l-main .topicBox #tool #subscribe:hover {
  background: rgb(253, 121, 168, 0.5);
}
#l-main .topicBox #tool .box {
  height: 32px;
  align-items: center;
  margin-left: 15px;
  padding: 0 12px;
  color: var(--text3);
  display: flex;
  font-size: 17px;
}
#l-main .topicBox #tool .reply {
  font-size: 14px;
  color: var(--text5);
}
#l-main .topicBox #tool .reply svg {
  transform: rotate(-10deg);
}
#l-main .topicBox #tool .box img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  opacity: var(--opacity);
}
#r-nav {
  position: fixed;
  right: 5px;
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
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 30%, 0) !important;
    transform: translate3d(0, 30%, 0) !important;
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 30%, 0) !important;
    transform: translate3d(0, 30%, 0) !important;
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>