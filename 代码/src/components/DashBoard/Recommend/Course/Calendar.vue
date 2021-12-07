<template>
  <div id="calendar">
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span>确定要退出吗？您还未保存修改，此时退出之前的操作将不会被保存！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
    <div id="head">
      <div class="editDate">
        <el-button @click="open">修改日期范围</el-button>
        <div class="block animate__animated animate__fadeInDown" v-show="redate">
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </div>
      <div class="intro">请保证期中考试和期末考试都只有一次！</div>
      <div class="title">课程教学表</div>
      <div>
        <el-button plain @click="centerDialogVisible=true">退出编辑</el-button>
        <el-button type="primary" @click="updateCalendar()">发布课表</el-button>
      </div>
    </div>
    <div id="main">
      <div id="calendar-wrapper">
        <div id="calendar-main">
          <div class="item center">星期一</div>
          <div class="item center">星期二</div>
          <div class="item center">星期三</div>
          <div class="item center">星期四</div>
          <div class="item center">星期五</div>
          <div class="item center">星期六</div>
          <div class="item center">星期日</div>
          <div class="item" v-for="(date,key) in dates" :key="key" v-color="date.type">
            <p class="time" v-if="date.type!=``">日期:{{date.date}}</p>
            <!-- <p class="content">{{date.content}}</p> -->
            <div class="edit-wrapper" v-if="date.type!=``">
              <el-select v-model="date.type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input type="textarea" :rows="2" placeholder="请输入课程内容" v-model="date.content"></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  created() {
    this.load();
  },
  name: "Calendar",
  data() {
    return {
      centerDialogVisible: false,
      redate: false,
      value: "",
      dateMap: [],
      dates: [],
      options: [
        {
          value: "无课",
          label: "无课"
        },
        {
          value: "课程",
          label: "上课"
        },
        {
          value: "实验",
          label: "实验"
        },
        {
          value: "考试",
          label: "考试"
        },
        {
          value: "期中考试",
          label: "期中考试"
        },
        {
          value: "期末考试",
          label: "期末考试"
        },
        {
          value: "考试周",
          label: "考试周"
        }
      ]
    };
  },
  methods: {
    logout() {
      this.$router.go(-1);
    },
    load() {
      var username = sessionStorage.getItem("teacherUsername");
      var cname = sessionStorage.getItem("cname");
      const url = `https://vclass.api.cheeseburgerim.space/course/schedule/api/getSchedule?username=${username}&cname=${cname}`;
      fetch(url, {
        method: "get",
                  credentials: "include",
      })
        .then(res => res.json())
        .then(data => {
          if (!data.hasOwnProperty("result")) {
            for (let i = 0; i < data.length; i++) {
              var date = {};
              date.date = data[i].id.date;
              date.type = data[i].type;
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
        })
        // .catch(error => {
        //   this.$notify.error({
        //     title: "错误",
        //     message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
        //   });
        // });
    },
    GetDateDiff(startDate, endDate) {
      // console.log(startDate);
      var startTime = new Date(
        Date.parse(startDate.replace(/-/g, "/"))
      ).getTime();
      var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
      var dates = (startTime - endTime) / (1000 * 60 * 60 * 24);
      return dates;
    },
    open() {
      this.$confirm(
        "重新选择日期范围可能会导致之前的部分数据丢失，确认进行此操作?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "请重新选择日期范围!"
          });
          this.redate = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "您已取消编辑日期范围！"
          });
        });
    },
    getDayAll(starDay, endDay) {
      var arr = [];
      var dates = [];

      // 设置两个日期UTC时间
      var db = new Date(starDay);
      var de = new Date(endDay);

      // 获取两个日期GTM时间
      var s = db.getTime() - 24 * 60 * 60 * 1000;
      var d = de.getTime() - 24 * 60 * 60 * 1000;

      // 获取到两个日期之间的每一天的毫秒数
      for (var i = s; i <= d; ) {
        i = i + 24 * 60 * 60 * 1000;
        arr.push(parseInt(i));
      }

      // 获取每一天的时间  YY-MM-DD
      for (var j in arr) {
        var time = new Date(arr[j]);
        var year = time.getFullYear(time);
        var mouth =
          time.getMonth() + 1 >= 10
            ? time.getMonth() + 1
            : "0" + (time.getMonth() + 1);
        var day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
        var YYMMDD = year + "-" + mouth + "-" + day;
        dates.push(YYMMDD);
      }

      return dates;
    },
    updteDates() {
      //去掉填充日
      if (this.dates.length > 0) {
        while (this.dates[0].date === ``) {
          this.dates.splice(0, 1);
        }
        // console.log(this.dates);
        // console.log(this.dateMap);
        //新的起始时间-老的结束时间
        var a = this.GetDateDiff(
          this.dateMap[0],
          this.dates[this.dates.length - 1].date
        );
        //老的起始时间-新的结束时间
        var b = this.GetDateDiff(
          this.dates[0].date,
          this.dateMap[this.dateMap.length - 1]
        );
      }
      //如果是空数组或者a>0或者b>0
      if (this.dates.length === 0 || a > 0 || b > 0) {
        this.dates = [];
        if (new Date(this.dateMap[0]).getDay() === 0) {
          for (let i = 0; i < 6; i++) {
            var obj = {};
            obj.type = ``;
            obj.content = ``;
            obj.date = ``;
            this.dates.push(obj);
          }
        } else {
          for (let i = 1; i < new Date(this.dateMap[0]).getDay(); i++) {
            var obj = {};
            obj.type = ``;
            obj.content = ``;
            obj.date = ``;
            this.dates.push(obj);
          }
        }
        for (let i = 0; i < this.dateMap.length; i++) {
          var obj = {};
          obj.type = `无课`;
          obj.content = ``;
          obj.date = this.dateMap[i];
          this.dates.push(obj);
        }
      } else {
        //不为空，时间范围有重叠
        //新的起始时间-老的起始时间
        var c = this.GetDateDiff(this.dateMap[0], this.dates[0].date);
        //新的截止时间-老的截止时间
        var d = this.GetDateDiff(
          this.dateMap[this.dateMap.length - 1],
          this.dates[this.dates.length - 1].date
        );
        //新的起始时间更晚，老数组删去之前的天
        if (c > 0) {
          for (let i = 0; i < c; i++) {
            this.dates.splice(0, 1);
          }
        } else {
          //新的其实时间更早,老数组增加天数
          for (let i = 0; i < Math.abs(c); i++) {
            var obj = {};
            obj.type = `无课`;
            obj.content = ``;
            obj.date = this.dateMap[i];
            this.dates.unshift(obj);
          }
        }
        //新的截止时间更晚，老数组增加天数
        if (d > 0) {
          for (let i = 0; i < d; i++) {
            var obj = {};
            obj.type = `无课`;
            obj.content = ``;
            obj.date = this.dateMap[this.dateMap.length - d + i];
            this.dates.push(obj);
          }
        } else {
          //新的截止时间更早，删除老数组的天数
          for (let i = 0; i < Math.abs(d); i++) {
            this.dates.pop();
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
      }
    },
    updateCalendar() {
      // var teacherUsername=sessionStorage.getItem("teacherUsername");
      // var cname=sessionStorage.getItem("cname");
      var v = true;
      var mExam = 0;
      var fExam = 0;
      for (let i = 0; i < this.dates.length; i++) {
        if (this.dates[i].type === `期中考试`) mExam++;
        if (this.dates[i].type === `期末考试`) fExam++;
        if (mExam > 1 || fExam > 1) {
          this.$notify.error({
            title: "错误",
            message: "请保证期中考试和期末考试至多只有一次！"
          });
          v = false;
          break;
        }
      }
      if (v) {
        var username = sessionStorage.getItem("userName");
        var cname = sessionStorage.getItem("cname");
        // console.log(this.dates);
        const durl = `https://vclass.api.cheeseburgerim.space/course/schedule/api/deleteSchedule?username=${username}&cname=${cname}`;
        fetch(durl, {
          method: "get",
                  credentials: "include",
        })
          .then(res => res.text())
          .then(data => {
            if (data === `success`) {
              var ok = true;
              for (let i = 0; i < this.dates.length; i++) {
                if (this.dates[i].type === ``) continue;
                let fd = new FormData();
                fd.append(
                  "username",
                  sessionStorage.getItem("teacherUsername")
                );
                fd.append("cname", sessionStorage.getItem("cname"));
                fd.append("date", this.dates[i].date);
                fd.append("type", this.dates[i].type);
                fd.append("content", this.dates[i].content);
                const url = `https://vclass.api.cheeseburgerim.space/course/schedule/api/setSchedule`;
                fetch(url, {
                  method: "POST",
                  body: fd
                })
                  .then(res => res.text())
                  .then(data => {
                    // console.log(data);
                    if (data != `fail`) {
                      ok = true;
                      var username = sessionStorage.getItem("userName");
                      var now = new Date();
                      var year = now.getFullYear(); //年
                      var month = now.getMonth() + 1; //月
                      var day = now.getDate(); //日
                      var clock = year + "-";
                      if (month < 10) clock += "0";
                      clock += month + "-";
                      if (day < 10) clock += "0";
                      clock += day;
                      const actUrl = `https://vclass.api.cheeseburgerim.space/user/api/setAct?username=${username}&date=${clock}`;
                      fetch(actUrl, {
                        method: "get",
                  credentials: "include",
                      })
                        .then(res => res.text())
                        .then(data => {});
                    } else {
                      ok = false;
                    }
                  })
                  .catch(error => {
                    this.$notify.error({
                      title: "错误",
                      message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
                    });
                  });
              }
              if (ok) {
                this.$notify({
                  title: "上传成功",
                  message: "课表发布成功啦✅",
                  type: "success"
                });
                this.updateCalendarLog();
              }
              // console.log(ok);
            } else {
              this.$notify.error({
                title: "错误",
                message: "课表删除异常！"
              });
            }
          })
          .catch(error => {
            this.$notify.error({
              title: "错误",
              message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
            });
          });
      }
    },
    updateCalendarLog() {
      // console.log("hhh");
      var username = sessionStorage.getItem("userName");
      var activity = "更新了";
      var teacherUsername = sessionStorage.getItem("userName");
      var cname = sessionStorage.getItem("cname");
      // var fname = this.file.name;
      var timestamp = this.currentTime();
      var fd = new FormData();
      fd.append("username", username);
      fd.append("activity", activity);
      fd.append("fname", cname);
      fd.append("timestamp", timestamp);
      fd.append("teacherUsername", teacherUsername);
      fd.append("cname", cname);
      const url = `https://vclass.api.cheeseburgerim.space/log/api/addLog`;
      fetch(url, {
       method: "POST",
            body: fd,
            credentials: "include",
      })
        .then(res => res.text())
        .then(data => {
          console.log("save log success");
          var username = sessionStorage.getItem("userName");
          var now = new Date();
          var year = now.getFullYear(); //年
          var month = now.getMonth() + 1; //月
          var day = now.getDate(); //日
          var clock = year + "-";
          if (month < 10) clock += "0";
          clock += month + "-";
          if (day < 10) clock += "0";
          clock += day;
          const actUrl = `https://vclass.api.cheeseburgerim.space/user/api/setAct?username=${username}&date=${clock}`;
          fetch(actUrl, {
            method: "get",
                  credentials: "include",
          })
            .then(res => res.text())
            .then(data => {
              if (data === `success`) {
                this.$router.push({ name: `self` });
              }
            });
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
          });
        });
    },
    currentTime() {
      var now = new Date();
      var year = now.getFullYear(); //年
      var month = now.getMonth() + 1; //月
      var day = now.getDate(); //日

      var hh = now.getHours(); //时
      var mm = now.getMinutes(); //分
      var ss = now.getSeconds();

      var clock = year + "-";
      if (month < 10) clock += "0";
      clock += month + "-";
      if (day < 10) clock += "0";
      clock += day + " ";
      if (hh < 10) clock += "0";
      clock += hh + ":";
      if (mm < 10) clock += "0";
      clock += mm + ":";
      if (ss < 10) clock += "0";
      clock += ss;
      return clock;
    }
  },
  directives: {
    color(el, binding) {
      if (binding.value === `无课`) {
        el.style.background = `#26de81`;
      } else if (binding.value.substring(0, 2) === `课程`) {
        el.style.background = `#74b9ff`;
      } else if (binding.value.substring(0, 2) === `实验`) {
        el.style.background = `#FDA7DF`;
      } else if (binding.value === `期中考试` || binding.value === `期末考试`) {
        el.style.background = `#fc5c65`;
      } else if (
        binding.value.substring(0, 2) === `考试` &&
        binding.value != `考试周`
      ) {
        el.style.background = `#F79F1F`;
      } else if (binding.value === `考试周`) {
        el.style.background = `#9980FA`;
      }
    }
  },
  watch: {
    value(n, o) {
      var dateRange = [];
      for (let i = 0; i < n.length; i++) {
        var date = new Date(n[i]);
        var year = date.getFullYear(); //年
        var month = date.getMonth() + 1; //月
        var day = date.getDate(); //日
        var clock = year + "-";
        if (month < 10) clock += "0";
        clock += month + "-";
        if (day < 10) clock += "0";
        clock += day;
        //   console.log(clock);
        dateRange[i] = clock;
      }
      this.dateMap = this.getDayAll(dateRange[0], dateRange[1]);
      //   console.log(this.dateMap);
      this.updteDates();
      this.redate = false;
    }
  }
};
</script>


<style scoped>
#calendar {
  width: 100%;
  /* height: 100vh; */
  /* background: pink; */
}
#calendar #head {
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  border-bottom: 2px solid #333;
}
#calendar #head .editDate {
  display: flex;
  align-items: center;
}
#calendar #head .el-button {
  margin-right: 20px;
}
#calendar #head .title {
  margin-right: 100px;
  font-family: "Dancing Script", cursive;
  font-size: 20px;
  font-weight: 600;
}
#calendar #head .intro {
  font-family: "Dancing Script", cursive;
  /* font-size: 12px; */
  font-weight: 600;
}
#calendar #main {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
#calendar-wrapper {
  height: 95%;
  margin-bottom: 40px;
  width: 95%;
  /* background: purple; */
}
#calendar p {
  margin: 0;
  padding: 0;
}

#calendar-wrapper #calendar-main {
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
#calendar-wrapper #calendar-main .item {
  opacity: var(--opacity);
  /* background: #badc58; */
  border: 2px solid #333;
  margin: 0 0 -2px -2px;
  width: 14.285%;
  /* min-height: 90px; */
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
#calendar-wrapper #calendar-main .center {
  background: #444444;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
#calendar-wrapper #calendar-main .item .time {
  width: 100%;
  font-family: "Dancing Script", cursive;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
#calendar-wrapper #calendar-main .item .content {
  widows: 100%;
  margin-top: 10px;
  /* height: calc(100% - 35px); */
  word-wrap: break-word;
  /* background: red; */
  /* overflow-y: auto; */
}
#calendar-wrapper #calendar-main .item .edit-wrapper {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#calendar-wrapper #calendar-main .item .edit-wrapper .el-textarea {
  margin-top: 20px;
  overflow: inherit;
}
</style>