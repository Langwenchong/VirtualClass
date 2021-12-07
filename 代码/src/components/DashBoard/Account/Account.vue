<template>
  <div id="account">
    <remote-css href="https://fonts.font.im/css?family=Dancing+Script"></remote-css>
    <div id="l-main">
      <div id="contributions" class="animate__animated animate__fadeIn">
        <div id="calendar"></div>
      </div>
      <!-- <div id="progress">
        <div class="box">
          <p id="Minute_Num">课程参与度:</p>
          <div id="first" class="bar orange active"></div>
        </div>
        <div class="box">
          <p id="Hour_Num">课程贡献值:</p>
          <div id="second" class="bar red active" data-percent></div>
        </div>
        <div class="box">
          <p id="Day_Num">话题活跃度:</p>
          <div id="third" class="bar mint active" data-percent></div>
        </div>
        <div class="box">
          <p id="Date_Num">回答正确率:</p>
          <div id="fourth" class="bar lila active" data-percent></div>
        </div>
      </div>-->
      <div id="pin">
        <div class="console">
          <h4>{{status===`teacher`?`我创建的课程`:`我订阅的课程`}}</h4>
          <el-button type="success" v-if="status===`teacher`" @click="createCourse">创建课程</el-button>
        </div>
        <div id="pin-container">
          <div class="start" v-if="arr.length>0?false:true">
            <p class="notice">
              <i class="fad fa-exclamation-square"></i>
              &nbsp;您还没有{{status===`teacher`?`创建`:`订阅`}}任何一个课程哦!
            </p>
          </div>
          <div
            class="pin-box animate__animated animate__flipInX"
            v-for="(box,idx) in arr"
            :key="box.id"
            v-if="arr.length>0?true:false"
          >
            <div class="title">
              <span @click="goto(idx)">
                <i class="bx bxs-book-bookmark"></i>
                <b>{{box.cname}}</b>
              </span>
              <div class="icon" v-if="status===`teacher`?true:false">
                <el-tooltip class="item" effect="light" content="编辑课程章节信息" placement="top">
                  <i class="fad fa-edit" @click="updateCourse(idx)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="编辑课程教学日历" placement="top">
                  <i class="fad fa-calendar-edit" @click="updateCalendar(idx)"></i>
                </el-tooltip>
                 <el-tooltip class="item" effect="light" content="绘制课程思维导图" placement="top">
                  <i class='fad fa-globe-stand' @click="updateMind(idx)"></i>
                </el-tooltip>
              </div>
            </div>
            <p class="info">{{box.cdesc}}</p>
            <div id="status">
              <div class="point" v-state="box.ctype"></div>
              <span>{{box.ctype}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="r-bar" class="animate__animated animate__fadeInRight">
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
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
  name: "account",
  methods: {
    load_calendar() {
      let myChart = echarts.init(document.getElementById("calendar"));
      let option = {
        title: {
          top: 0,
          text: "",
          left: "left",
          textStyle: {
            color: "#3C4858"
          }
        },
        tooltip: {
          padding: 10,
          // backgroundColor: "#555",
          borderColor: "#777",
          borderWidth: 1,
          formatter: function(obj) {
            var value = obj.value;
            return (
              '<div style="font-size: 14px;">' +
              value[0] +
              "：" +
              value[1] +
              "</div>"
            );
          }
        },
        visualMap: {
          show: true,
          showLabel: true,
          categories: [0, 1, 2, 3, 4],
          calculable: true,
          inRange: {
            symbol: "rect",
            color: ["#ebedf0", "#d6e685", "#8cc665", "#44a340", "#1e6823"]
          },
          itemWidth: 12,
          itemHeight: 12,
          orient: "horizontal",
          left: "center",
          bottom: 0
        },
        calendar: [
          {
            left: "center",
            range: [
              this.dateMap[0][0],
              this.dateMap[this.dateMap.length - 1][0]
            ],
            cellSize: [13, 13],
            splitLine: {
              show: false
            },
            itemStyle: {
              width: "1.88679%",
              height: "15px",
              // color: "#8b949e",
              borderColor: "#FFF",
              borderWidth: 2
            },
            yearLabel: {
              show: false
            },
            monthLabel: {
              nameMap: "cn",
              fontWeight: "lighter",
              fontSize: 12,
              color: "#8b949e"
            },
            dayLabel: {
              show: true,
              formatter: "{start}  1st",
              fontWeight: "lighter",
              nameMap: ["日", " ", " ", "三", " ", " ", "六"],
              fontSize: 12,
              color: "#8b949e"
            }
          }
        ],
        series: [
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            calendarIndex: 0,
            data: this.dateMap
          }
        ]
      };
      myChart.setOption(option);
    },
    createCourse() {
      this.$router.push({
        name: "CourseSettings",
        params: {
          isNew: true
        }
      });
    },
    goto(i) {
      sessionStorage.setItem("teacherUsername", this.arr[i].username);
      sessionStorage.setItem("cname", this.arr[i].cname);
      this.$router.push({
        name: "log"
      });
    },
    updateCalendar(idx) {
      this.$router.push({
        name: "Calendar",
      });
      sessionStorage.setItem("teacherUsername", this.arr[idx].username);
      sessionStorage.setItem("cname", this.arr[idx].cname);
    },
    updateCourse(idx) {
      this.$router.push({
        name: "CourseSettings",
        params: {
          isNew: false
        }
      });
      sessionStorage.setItem("teacherUsername", this.arr[idx].username);
      sessionStorage.setItem("cname", this.arr[idx].cname);
    },
    updateMind(idx){
       this.$router.push({
        name: "Mind",
      });
      sessionStorage.setItem("teacherUsername", this.arr[idx].username);
      sessionStorage.setItem("cname", this.arr[idx].cname);
    }
  },
  directives: {
    state: function(el, binding) {
      if (binding.value === "核心专业课") {
        el.style.backgroundColor = "#f34b7d";
      } else if (binding.value === "综合实践课") {
        el.style.backgroundColor = "#41b883";
      } else if (binding.value === "素养选修课") {
        el.style.backgroundColor = "#f1e05a";
      }
    }
  },
  created() {
    //1,3,5,7,8,10,12
    const days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var now = new Date();
    var year = now.getFullYear() - 1; //去年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日
    var twice = false;
    for (var i = month; !twice || i < month + 1; i++) {
      if (i > 12) {
        i -= 12;
        twice = true;
        year += 1;
      }
      for (let j = 1; j <= days[i]; j++) {
        // if (i === month && !twice) {
        //   j = day;
        //   continue;
        // }
        if (i === month && twice && j === day + 1) {
          break;
        }
        var date = year + "-";
        if (i < 10) date += "0";
        date += i + "-";
        if (j < 10) date += "0";
        date += j;
        this.dateMap.push([date, 0]);
        if (
          ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) &&
          i == 2 &&
          j === 28
        ) {
          //闰年
          this.dateMap.push([year + "-02-28", 0]);
        }
      }
    }
    var username = sessionStorage.getItem("userName");
    var actMap = [];
    const url = `https://vclass.api.cheeseburgerim.space/user/api/getAct?username=${username}`;
    fetch(url, {
      method: "get",
                  credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < this.dateMap.length; i++) {
          for (let k = 0; k < data.length; k++) {
            // console.log(this.dateMap[i][0]);
            if (this.dateMap[i][0] === data[k].id.date) {
              // console.log(data[k].times);
              if (0 < data[k].times && data[k].times <= 3)
                this.dateMap[i][1] = 1;
              else if (3 < data[k].times && data[k].times <= 6)
                this.dateMap[i][1] = 2;
              else if (6 < data[k].times && data[k].times <= 9)
                this.dateMap[i][1] = 3;
              else this.dateMap[i][1] = 4;
            }
          }
        }
        this.load_calendar();
      });
    // console.log(this.dateMap);
    var username = sessionStorage.getItem("userName");
    if (sessionStorage.getItem("userStatus") === `teacher`) {
      const url1 = `https://vclass.api.cheeseburgerim.space/course/api/getAllCourseByTeacherusername?username=${username}`;
      fetch(url1, {
        method: "get",
                  credentials: "include",
      })
        .then(res => res.json())
        .then(data => {
          this.arr = data;
          // console.log(this.arr);
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
          });
        });
    } else {
      const url2 = `https://vclass.api.cheeseburgerim.space/course/api/getAllCourseByStudentusername?username=${username}`;
      fetch(url2, {
        method: "get",
                  credentials: "include",
      })
        .then(res => res.json())
        .then(data => {
          this.arr = data;
          // console.log(this.arr);
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
          });
        });
    }
  },
  mounted() {
    this.status = sessionStorage.getItem("userStatus");
    // setTimeout(function() {
    //   var temp1 = document.getElementById("first");
    //   temp1.style.width = "63%";
    //   var temp2 = document.getElementById("second");
    //   temp2.style.width = "42%";
    //   var temp3 = document.getElementById("third");
    //   temp3.style.width = "51%";
    //   var temp4 = document.getElementById("fourth");
    //   temp4.style.width = "53%";
    // }, 100);
    setTimeout(function() {
      $("#account").css("overflow-x", "visible");
    }, 2000);
  },
  data() {
    return {
      status: "",
      arr: [],
      dateMap: []
    };
  }
};
</script>

<style scoped src="../../../assets/css/bootstrap.min.css"></style>
<style scoped>
#account {
  /* min-height: 1000px; */
  /* background:pink; */
  width: 100%;
  display: flex;
  overflow-x: hidden;
}
#r-bar {
  width: 30%;
  /* min-height: 300px; */
  /* background:yellow; */
}
#l-main {
  /* background: #2188ff; */
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 70%;
  min-height: 200px;
}
#l-main #contributions {
  margin: 0 auto;
  width: 95%;
  margin-top: 70px;
  border: 1px solid #e1e4e8;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
#l-main #calendar {
  width: 100%;
  height: 230px;
  overflow: hidden;
  transition: 0.5s;
  opacity: var(--opacity);
}
#l-main #progress {
  width: 100%;
  /* display: flex; */
  display: none;
  /* flex-direction: column; */
  justify-content: space-around;
  flex-wrap: wrap;
  padding-left: 35px;
  margin-top: 20px;
}
#l-main #pin {
  margin: 20px auto;
  width: 95%;
}
#l-main #pin-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#l-main #pin-container .pin-box {
  width: 47%;
  height: 130px;
  /* background: pink; */
  border-radius: 6px;
  border: 1px solid #e1e4e8;
  box-sizing: border-box;
  padding: 16px;
  margin-bottom: 15px;
  line-height: 1.6;
}
.icon {
  margin-right: 10px;
  width: 105px;
  display: flex;
  justify-content: space-between;
}
.icon i {
  font-size: 20px !important;
}
.point {
  width: 10px;
  height: 10px;
  margin-right: 8px;
  border-radius: 50%;
  display: inline-block;
}
#l-main #pin-container .pin-box .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#l-main #pin-container .pin-box .title b {
  color: #0366d6;
  font-size: 16px;
  line-height: 20px;
  margin: 0;
  padding: 0;
}
#l-main #pin-container .pin-box .title i {
  margin-right: 5px;
  color: var(--text7);
  font-size: 18px;
}
#l-main #pin-container .pin-box .info {
  color: var(--text7);
  margin-top: 8px;
  font-size: 12px;
  margin-bottom: 5px;
}
#l-main #pin-container .pin-box .point span {
  font-size: 10px;
}
@keyframes barberpole {
  from {
    background-position: 0% 0%;
  }

  to {
    background-position: 600px 0%;
  }
}
#l-main #progress .box {
  width: 45%;
  display: flex;
  align-items: center;
}
.start {
  border: 1px dashed var(--text2);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  opacity: 0.5;
  width: 100%;
  height: 300px;
  /* background: #14c3a2; */
}
.start .notice {
  color: var(--text2);
  font-size: 40px;
  font-family: FangSong;
}
.console {
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.console .el-button {
  border-radius: 6px;
  width: 120px;
  padding: 0;
  height: 40px;
}
.box p {
  /* font-size:16px; */
  margin: 0;
  padding: 0;
}
.bar {
  height: 30px;
  width: 0;
  transition: width 1.2s ease-in-out;
  position: relative;
  margin: 0.5rem 0;
  border-radius: 8px;
  /* min-width: 0 !important; */
  margin-left: 10px;
}
.bar.mint {
  background-color: #14c3a2;
  background-image: repeating-linear-gradient(
    -45deg,
    #14c3a2,
    #14c3a2 30px,
    #22e8c3 30px,
    #22e8c3 60px
  );
  background-size: 600px 100%;
  animation: barberpole 12s linear infinite;
  border-bottom: 0.2rem solid #0d7e68;
}
.bar.red {
  background-color: #cf4647;
  background-image: repeating-linear-gradient(
    -45deg,
    #cf4647,
    #cf4647 30px,
    #da6e6f 30px,
    #da6e6f 60px
  );
  background-size: 600px 100%;
  animation: barberpole 12s linear infinite;
  border-bottom: 0.2rem solid #9f292a;
}
.bar.orange {
  background-color: #eb7b59;
  background-image: repeating-linear-gradient(
    -45deg,
    #eb7b59,
    #eb7b59 30px,
    #f09f87 30px,
    #f09f87 60px
  );
  background-size: 600px 100%;
  animation: barberpole 12s linear infinite;
  border-bottom: 0.2rem solid #dd481b;
}
.bar.lila {
  background-color: #524656;
  background-image: repeating-linear-gradient(
    -45deg,
    #524656,
    #524656 30px,
    #6d5d72 30px,
    #6d5d72 60px
  );
  background-size: 600px 100%;
  animation: barberpole 12s linear infinite;
  border-bottom: 0.2rem solid #2a242c;
}
.bar.gray {
  background-color: #595b5a;
  background-image: repeating-linear-gradient(
    -45deg,
    #595b5a,
    #595b5a 30px,
    #727574 30px,
    #727574 60px
  );
  background-size: 600px 100%;
  animation: barberpole 12s linear infinite;
  border-bottom: 0.2rem solid #333434;
}
.bar.active:after,
.bar.active:before {
  opacity: 1;
}
.bar:before {
  content: attr(data-skill);
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  height: 40px;
  font-style: italic;
  opacity: 0;
  transition: opacity 2s 0.6s;
}
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.v-enter {
  opacity: 0;
  transform: translateY(-30px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
</style>