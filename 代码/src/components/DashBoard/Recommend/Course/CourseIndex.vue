<template>
  <div id="courseIndex">
    <el-drawer
      size="100%"
      title="我是标题"
      direction="ttb"
      :visible.sync="drawer"
      :with-header="false"
      ref="drawer"
    >
      <div id="drawer-inner">
        <button
          aria-label="close 我是标题"
          type="button"
          class="el-drawer__close-btn close"
          @click="closeDrawer"
        >
          <i class="fal fa-window-close"></i>
        </button>
        <div id="calendar">
          <div id="calendar-main">
            <div class="item center">星期一</div>
            <div class="item center">星期二</div>
            <div class="item center">星期三</div>
            <div class="item center">星期四</div>
            <div class="item center">星期五</div>
            <div class="item center">星期六</div>
            <div class="item center">星期日</div>
            <div class="item" v-for="(date,key) in dates" :key="key" v-color="date.type">
              <p class="time">{{date.date}}&nbsp;&nbsp;{{date.type}}</p>
              <p class="content">{{date.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
    <el-drawer
      size="100%"
      title="我是标题"
      direction="ttb"
      :visible.sync="mind"
      :with-header="false"
      ref="mind"
    >
      <div id="drawer-inner">
        <button
          aria-label="close 我是标题"
          type="button"
          class="el-drawer__close-btn close"
          @click="closeMind"
        >
          <i class="fal fa-window-close"></i>
        </button>
        <div class="mind-wrapper">
          <div id="menu">
            <el-tooltip content="放大视图" placement="bottom" effect="light">
              <div class="box" id="zoom-in-button" @click="zoomIn">
                <i class="fal fa-arrow-alt-to-top"></i>
              </div>
            </el-tooltip>
            <el-tooltip content="缩小视图" placement="bottom" effect="light">
              <div class="box" id="zoom-out-button" @click="zoomOut">
                <i class="fal fa-arrow-alt-from-top"></i>
              </div>
            </el-tooltip>
            <el-tooltip content="截屏" placement="bottom" effect="light">
              <div class="box" @click="screenShot">
                <i class="fal fa-camera-alt"></i>
              </div>
            </el-tooltip>
            <el-select v-model="theme" placeholder="请选择颜色主题">
              <el-option
                v-for="item in themes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </div>
          <div id="jsmind_container"></div>
          <div style="display:none">
            <input class="file" type="file" id="image-chooser" accept="image/*" />
          </div>
        </div>
      </div>
    </el-drawer>
    <remote-css href="https://fonts.font.im/css?family=Dancing+Script"></remote-css>
    <div id="head" class="animate__animated animate__fadeIn">
      <div class="head">
        <div id="schedule" @click="drawer = true">
          <p>
            Course Schedule&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fad fa-book-open"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;教学课程安排表
          </p>
        </div>
        <div id="schedule" @click="mindMap">
          <p>
            Mind Map&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i
              class="fad fa-book-open"
            ></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;课程思维导图
          </p>
        </div>
      </div>
      <div class="bottom">
        <div class="l-wrapper">
          <div class="imgBx">
            <img src="../../../../../static/images/course.jpg" />
          </div>
          <span id="title">{{cname}}</span>
          <span id="stars">
            <i class="fal fa-star"></i>
            <i class="fal fa-star"></i>
            <i class="fal fa-star"></i>
            <i class="fal fa-star"></i>
            <i class="fal fa-star"></i>
          </span>
        </div>
        <div class="r-wrapper">
          <div class="myzone" v-if="status===`同学`?true:false" @click="subscribe">
            <div class="button">订阅课堂</div>
          </div>
          <div class="myzone">
            <div class="button" @click="intoCourse">进入课堂</div>
          </div>
        </div>
      </div>
    </div>
    <div id="main" class="animate__animated animate__fadeIn">
      <div class="l-main">
        <div class="top-info">
          <span>
            <i class="fad fa-file-certificate"></i>
            课堂学分：{{credit}}学分
          </span>
          <span>
            <i class="fad fa-graduation-cap"></i>
            课堂学时：{{duration}}学时
          </span>
          <span>
            <i class="fad fa-pencil-paintbrush"></i>
            授课教师：{{teacher}}老师
          </span>
        </div>
        <div class="main-info">
          <p>{{info}}</p>
        </div>
        <div class="footer-info">
          <p class="contributors">•Subscribers:</p>
          <div class="person">
            <div class="avatar" v-for="item in subscribers" :key="item.id">
              <img :src="item.avatar" alt />
              <h2>{{item.avatar}}</h2>
            </div>
            <span>+{{tot}} subscribers</span>
          </div>
        </div>
      </div>
      <div class="r-main">
        <div class="log">
          <transition mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var jm = null;
var zoomInButton = null;
var zoomOutButton = null;
var imageChooser = null;
export default {
  directives: {
    color(el, binding) {
      if (binding.value === `无课`) {
        el.style.background = `#ccffcc`;
      } else if (binding.value.substring(0, 2) === `课程`) {
        el.style.background = `#ffffaa`;
      } else if (binding.value.substring(0, 2) === `实验`) {
        el.style.background = `#ffddcc`;
      } else if (binding.value === `期中考试` || binding.value === `期末考试`) {
        el.style.background = `#fc5c65`;
      } else if (
        binding.value.substring(0, 2) === `考试` &&
        binding.value != `考试周`
      ) {
        el.style.background = `#ff9900`;
      } else if (binding.value === `考试周`) {
        el.style.background = `#aaaaff`;
      }
    }
  },
  created() {
    this.load();
    this.status = sessionStorage.getItem("userStatus");
    this.teacherUsername = sessionStorage.getItem("teacherUsername");
    this.cname = sessionStorage.getItem("cname");
    // alert(this.teacherUsername + " " + this.cname);
    const url = `/apis/course/api/getCourseInfo?username=${this.teacherUsername}&cname=${this.cname}`;
    fetch(url, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        if (!data.hasOwnProperty("result")) {
          this.info = data.cdesc;
          this.credit = data.credit;
          this.duration = data.duration;
          this.teacher = data.teacher;
        } else {
          this.$notify.error({
            title: "错误",
            message: "❌课程信息加载失败！"
          });
        }
        // alert(data);
      })
      .catch(error => {
        this.$notify.error({
          title: "错误",
          message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
        });
      });
    const subscriberUrl = `/apis/course/api/getAllSubscriber?username=${this.teacherUsername}&cname=${this.cname}`;
    fetch(subscriberUrl, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        this.tot = data.length;
        for (var i = 0; i < data.length && i < 5; i++) {
          var avatar = ``;
          var avatarurl = `/apis/user/api/getAvatar?username=${data[i].id.username}`;
          fetch(avatarurl, {
            method: "GET"
          })
            .then(res => res.text())
            .then(data => {
              var obj = {};
              obj.id = i;
              obj.avatar = `/apis` + data;
              // console.log(obj.avatar);
              this.subscribers.push(obj);
            })
            .catch(error => {
              this.$notify.error({
                title: "错误",
                message: "后台出现图片存储异常，暂时使用默认头像😑"
              });
            });
        }
      });
  },
  components: {
    "remote-css": {
      render(createElement) {
        return createElement("link", {
          attrs: { rel: "stylesheet", href: this.href }
        });
      },
      props: {
        href: { type: String, required: true }
      }
    }
  },
  name: "CourseIndex",
  data() {
    return {
      nodes: [],
      dates: [],
      tot: 0,
      subscribers: [],
      drawer: false,
      mind: false,
      value: false,
      status: "",
      info: ``,
      cname: ``,
      credit: 1,
      duration: 1,
      teacher: ``,
      teacherUsername: ``,
      lec: 1,
      lab: 1,
      exam: 1,
      themes: [
        {
          value: "belizehole",
          label: "共享蓝"
        },
        {
          value: "pumpkin",
          label: "醒目橙"
        },
        {
          value: "pomegranate",
          label: "佩奇红"
        },
        {
          value: "nephrite",
          label: "辣眼绿"
        },
        {
          value: "wisteria",
          label: "基佬紫"
        },
        {
          value: "asphalt",
          label: "尊贵黑"
        },
        {
          value: "clouds",
          label: "简云白"
        }
      ],
      theme: "belizehole"
    };
  },
  methods: {
    mindMap() {
      this.mind = true;
      this.loadMind();
    },
    zoomIn() {
      // console.log(jm.view.zoomIn());
      if (jm.view.zoomIn()) {
        zoomOutButton.disabled = false;
      } else {
        zoomInButton.disabled = true;
      }
    },
    zoomOut() {
      if (jm.view.zoomOut()) {
        zoomInButton.disabled = false;
      } else {
        zoomOutButton.disabled = true;
      }
    },
    screenShot() {
      jm.screenshot.shootDownload();
    },
    loadMind() {
      var teacherUsername = sessionStorage.getItem("teacherUsername");
      var cname = sessionStorage.getItem("cname");
      const url = `/apis/course/mindMap/api/getMindMap?teacherUsername=${teacherUsername}&cname=${cname}`;
      fetch(url, {
        method: "GET"
      })
        .then(res => res.json())
        .then(data => {
          if (!data.hasOwnProperty("result")) {
            for (let i = 0; i < data.length; i++) {
              let node = {};
              if (data[i].isRoot != ``) node.isroot = data[i].isRoot;
              if (data[i].nodeId != ``) node.id = data[i].id.nodeId;
              if (data[i].parentId != ``) node.parentid = data[i].parentId;
              if (data[i].topic != ``) node.topic = data[i].topic;
              if (data[i].direction != ``) node.direction = data[i].direction;
              if (data[i].expanded != ``) node.expanded = data[i].expanded;
              this.nodes.push(node);
            }
            // console.log(this.nodes);
            if (this.nodes.length === 0) {
              this.nodes.push({
                id: "root",
                isroot: true,
                topic: sessionStorage.getItem("cname")
              });
            }
            var mind = {
              // 3 data format supported ...
              // see Documents for more information
              meta: {
                name: "example",
                author: "Langwenchong",
                version: "0.2"
              },
              /* 数据格式声明 */
              format: "node_array",
              /* 数据内容 */
              data: this.nodes
            };

            var options = {
              container: "jsmind_container",
              editable: true,
              editable: false,
              theme: this.value,
              shortcut: {
                enable: true, // 是否启用快捷键
                handles: {}, // 命名的快捷键事件处理器
                mapping: {
                  // 快捷键映射
                  addchild: 45, // <Insert>
                  delnode: 8 // <Delete>
                }
              }
            };
            jm = new jsMind(options);
            jm.show(mind);

            zoomInButton = document.getElementById("zoom-in-button");
            zoomOutButton = document.getElementById("zoom-out-button");
            imageChooser = document.getElementById("image-chooser");
            imageChooser.addEventListener(
              "change",
              function(event) {
                // Read file here.
                var reader = new FileReader();
                reader.onloadend = function() {
                  var selected_node = jm.get_selected_node();
                  var nodeid = jsMind.util.uuid.newid();
                  var topic = undefined;
                  var data = {
                    "background-image": reader.result,
                    width: "100",
                    height: "100"
                  };
                  var node = jm.add_node(selected_node, nodeid, topic, data);
                  //var node = _jm.add_image_node(selected_node, nodeid, reader.result, 100, 100);
                  //add_image_node:function(parent_node, nodeid, image, width, height, data, idx, direction, expanded){
                };

                var file = imageChooser.files[0];
                if (file) {
                  reader.readAsDataURL(file);
                }
              },
              false
            );
            // console.log(nodes);
            // return nodes;
          } else {
            this.$notify.error({
              title: "错误",
              message: "思维导图加载失败！"
            });
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
          });
        });
    },
    load() {
      var username = sessionStorage.getItem("teacherUsername");
      var cname = sessionStorage.getItem("cname");
      const url = `/apis/course/schedule/api/getSchedule?username=${username}&cname=${cname}`;
      fetch(url, {
        method: "GET"
      })
        .then(res => res.json())
        .then(data => {
          if (!data.hasOwnProperty("result")) {
            for (let i = 0; i < data.length; i++) {
              var date = {};
              date.date = data[i].id.date;
              if (data[i].type === `课程`) {
                date.type = data[i].type + this.lec;
                this.lec++;
              } else if (data[i].type === `实验`) {
                date.type = data[i].type + this.lab;
                this.lab++;
              } else if (data[i].type === `考试`) {
                date.type = data[i].type + this.exam;
                this.exam++;
              } else {
                date.type = data[i].type;
              }
              date.content = data[i].content;
              this.dates.push(date);
            }
          }
          var ans = new Date(this.dates[0].date).getDay();
          if (ans === 0) {
            for (let i = 0; i < 6; i++) {
              var obj = {};
              obj.type = ``;
              obj.content = ``;
              obj.date = ``;
              this.dates.unshift(obj);
            }
          } else {
            for (let i = 1; i < ans; i++) {
              var obj = {};
              obj.type = ``;
              obj.content = ``;
              obj.date = ``;
              this.dates.unshift(obj);
            }
          }
        });
      // .catch(error => {
      //   this.$notify.error({
      //     title: "错误",
      //     message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
      //   });
      // });
    },
    subscribe() {
      var username = sessionStorage.getItem("userName");
      // console.log(username + this.teacherUsername + this.cname);
      const url = `/apis/course/api/subscribe?studentUsername=${username}&teacherUsername=${this.teacherUsername}&cname=${this.cname}`;
      fetch(url, {
        method: "GET"
      })
        .then(res => res.text())
        .then(data => {
          if (data === `success`) {
            this.$notify({
              title: "订阅成功",
              message: "您已经成功订阅本课程✅",
              type: "success"
            });
          } else if (data === `done`) {
            this.$notify({
              title: "订阅成功",
              message: "您已经订阅过本课程啦✅",
              type: "success"
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "❌订阅课程失败！"
            });
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
          });
        });
    },
    closeDrawer() {
      this.$refs.drawer.closeDrawer();
    },
    closeMind() {
      this.$refs.mind.closeDrawer();
    },
    // switchChart() {
    //   if (this.value === false) {
    //     this.$router.push({ name: "radar" });
    //   } else if (this.value === true) {
    //     this.$router.push({ name: "chart" });
    //   }
    //   this.value = !this.value;
    // },
    intoCourse() {
      this.$router.push({
        name: "CourseList"
      });
    }
  },
  watch: {
    theme(n, o) {
      jm.set_theme(n);
    }
  }
};
</script>


<style scoped>
#calendar {
  height: 95%;
  width: 95%;
  /* background: purple; */
}
#jsmind_container {
  float: left;
  width: 100%;
  height: calc(100% - 50px);
  border: solid 1px #ccc;
  /* background: #f4f4f4; */
}
#courseIndex #drawer-inner .mind-wrapper {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
#courseIndex #drawer-inner .mind-wrapper #menu {
  width: 100%;
  display: flex;
  align-items: center;
}
#courseIndex #drawer-inner .mind-wrapper #menu .box {
  font-size: 24px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 26px;
  width: 32px;
  height: 32px;
  /* background: #bdc3c7; */
}
#calendar p {
  margin: 0;
  padding: 0;
}

#calendar #calendar-main {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  /* border: 2px solid #333; */
  /* border-top: none; */
  width: 100%;
  align-items: stretch;
  /* background: #000; */
  /* height: calc(100% - 40px); */
}
#calendar #calendar-main .item {
  opacity: var(--opacity);
  /* background: #badc58; */
  border: 2px solid #333;
  margin: 0 0 -2px -2px;
  width: 14.285%;
  /* height: 40%; */
  /* background: green; */
  /* overflow-y: scroll; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  box-sizing: border-box;
  padding: 10px 8px;
  /* background: #ccffcc; */
}
#calendar #calendar-main .center {
  background: #444444;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
#calendar #calendar-main .item .time {
  width: 100%;
  font-size: 14px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
#calendar #calendar-main .item .content {
  widows: 100%;
  margin-top: 10px;
  /* height: calc(100% - 35px); */
  word-wrap: break-word;
  /* background: red; */
  /* overflow-y: auto; */
}

#courseIndex {
  width: 100%;
  height: 100%;
  /* background: pink; */
  overflow: hidden;
}
#courseIndex .el-icon-close {
  z-index: 9999 !important;
}
#courseIndex #drawer-inner {
  z-index: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-top: 50px;
  overflow: scroll;
  position: relative;
  background: url("../../../../../static/images/drawer.png") !important;
  /* background-image: linear-gradient(to top, transparent, url("https://gitee.com/Langwenchong/figure-bed/raw/master/20210807211215.png")); */
  /* background-color: #49b1f5; */
}
#courseIndex #drawer-inner .close {
  color: #333;
  position: absolute;
  top: 40px;
  right: 40px;
}
#courseIndex #head {
  position: relative;
  width: 100%;
  height: 30%;
  /* background: pink; */
  background: var(--background2)
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACFJREFUeNpiZGBg4GegAsBlCD8TqSYNQg2Mo6FEBAAIMACdPABtrSW/IQAAAABJRU5ErkJggg==);
}
#courseIndex #head::before {
  /* filter: blur(1px); */
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(data:image/png;base64,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);
}
#courseIndex #head .head {
  display: flex;
  /* flex-direction: column; */
  /* justify-content: space-between; */
  /* align-items: center; */
  width: 100%;
  height: 98px;
  /* padding: 10px 20px; */
  box-sizing: border-box;
  /* background: green; */
}
#courseIndex #head .head #schedule {
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Dancing Script", cursive;
  transform: translateY(-20px);
  transition: 0.5s;
  letter-spacing: 2px;
  color: #aaa69d;
  width: 50%;
  height: 28px;
  z-index: 9999;
  opacity: var(--opacity);
  font-size: 26px;
  background-color: #aaa69d;
  /* border-bottom-right-radius: 60%; */
  /* border-bottom-left-radius: 60%; */
  /* background-image: url("https://gitee.com/Langwenchong/figure-bed/raw/master/20210807211215.png");  */
  /* background-color: rgba(240, 196, 15, 0.5);  */
}
#courseIndex #head #schedule:hover {
  transform: translateY(0px);
  color: var(--background2);
}
#courseIndex #head .head #schedule:after {
  content: "";
  width: 0;
  height: 0;
  border: 20px solid #aaa69d;
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: transparent; /* 设置透明背景色 */
  border-left-color: transparent;
  border-right-color: transparent;
}
#courseIndex #head .head .right span {
  display: flex;
  align-items: center;
  font-size: 22px;
  margin-right: 20px;
}
#courseIndex #head .bottom {
  width: 100%;
  height: 200%;
  /* background: pink; */
  position: absolute;
  left: 0;
  bottom: -100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#courseIndex #head .bottom .l-wrapper {
  width: 50%;
  height: 50%;
  /* background: pink; */
  position: relative;
  display: flex;
  align-items: center;
}
#courseIndex #head .bottom .l-wrapper .imgBx {
  /* position: absolute; */
  height: 210px;
  width: 210px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 50px;
  opacity: var(--opacity);
  display: flex;
  justify-content: center;
  border: 10px solid var(--background2);
}
#courseIndex #head .bottom .l-wrapper .imgBx img {
  height: 100%;
}
#courseIndex #head .bottom .l-wrapper #title {
  font-size: 3rem;
  font-weight: 700;
  position: absolute;
  top: 30%;
  left: 280px;
  color: var(--text5);
  font-family: KaiTi;
}
#courseIndex #head .bottom .l-wrapper #stars {
  position: absolute;
  font-size: 3rem;
  color: #fc0;
  top: calc(30% + 3rem);
  left: 280px;
}
#courseIndex #head .bottom .r-wrapper {
  width: 50%;
  height: 50%;
  /* background: blue; */
  display: flex;
  align-items: center;
}
#courseIndex #head .bottom .r-wrapper .myzone {
  /* margin-left: 250px; */
  z-index: 9999;
  /* margin-top: 40px; */
  position: relative;
  width: 100%;
  padding-bottom: 30px;
}
#courseIndex #head .bottom .r-wrapper .myzone .button {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 270px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  font-size: 24px;
  text-transform: uppercase;
  text-decoration: none;
  font-family: sans-serif;
  box-sizing: border-box;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  border-radius: 30px;
  z-index: 1;
}
#courseIndex #head .bottom .r-wrapper .myzone .button:hover {
  animation: animate 8s linear infinite;
}
@keyframes animate {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 400%;
  }
}
#courseIndex #head .bottom .r-wrapper .myzone .button:before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  border-radius: 40px;
  opacity: 0;
  transition: 0.5s;
}
#courseIndex #head .bottom .r-wrapper .myzone .button:hover:before {
  filter: blur(20px);
  opacity: 1;
  animation: animate 8s linear infinite;
}
#courseIndex #main {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-between;
  /* background: yellow; */
}
#courseIndex #main .l-main {
  width: 65%;
  box-sizing: border-box;
  height: 100%;
  /* background: pink; */
  margin-left: 50px;
  padding-top: 60px;
}
#courseIndex #main .l-main .top-info {
  width: 100%;
  height: 70px;
  /* background: blue; */
  padding-left: 230px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: var(--text1);
  font-size: 18px;
}
#courseIndex #main .l-main .top-info span {
  display: flex;
  align-items: center;
  margin-right: 15px;
}
#courseIndex #main .l-main .top-info i {
  margin-right: 3px;
  font-size: 25px;
}
#courseIndex #main .l-main .main-info {
  position: relative;
  width: 100%;
  height: 200px;
  margin-top: 20px;
  /* background: blue; */
  /* padding-left: 200px; */
  box-sizing: border-box;
  /* display: flex;
  align-items: center;
  justify-content: flex-start; */
  color: var(--text2);
  font-size: 14px;
  background: var(--background2);
  border-radius: 6px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 0 3px rgb(0 0 0 / 2%);
}
#courseIndex #main .l-main .main-info:before {
  content: "";
  top: -20px;
  left: 90px;
  position: absolute;
  border-width: 0 20px 20px;
  border-style: solid;
  border-color: transparent transparent var(--background2);
}
#courseIndex #main .l-main .main-info p {
  width: 100%;
  height: 100%;
  padding: 20px 28px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  color: var(--text2);
  line-height: 24px;
  font-size: 18px;
}
#courseIndex #main .l-main .footer-info {
  width: 100%;
  height: calc(100% - 290px);
  /* background: red; */
}
#courseIndex #main .l-main .footer-info .contributors {
  margin: 0;
  margin-top: 20px;
  font-size: 30px;
  font-weight: 700;
  color: (--text5);
  font-family: "Dancing Script", cursive;
}
#courseIndex #main .l-main .footer-info .person {
  width: 100%;
  height: 90px;
  /* background: red; */
  box-sizing: border-box;
  padding-left: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
#courseIndex #main .l-main .footer-info .person .avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
  border: 1px solid var(--text7);
}
#courseIndex #main .l-main .footer-info .person .avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
#courseIndex #main .l-main .footer-info .person span {
  color: #58a6ff;
  font-weight: 400;
}
#courseIndex #main .r-main {
  width: calc(35% - 55px);
  height: 100%;
  /* background: green; */
  /* border-left: 1px solid var(--text7); */
}
#courseIndex #main .r-main .log {
  padding-top: 40px;
  width: 100%;
  /* height: calc(100% - 110px); */
  height: 100%;
  /* background: tan; */
}
/* .v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
} */
.v-leave-to,
.v-enter {
  opacity: 0;
  transform: translateY(30px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
</style>