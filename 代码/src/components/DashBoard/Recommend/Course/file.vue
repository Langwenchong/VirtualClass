<template>
  <div id="file">
    <h2>《{{file.name}}》</h2>
    <div class="book-wrapper">
      <a
        :href="read"
        target="_blank"
        rel="noreferrer noopener"
        class="book-container"
        @click="watchFileLog"
      >
        <div class="book" :title="file.name">
          <img :src="link" :alt="file.name" height="100%" />
        </div>
      </a>
    </div>
    <p class="info">游客仅能在线阅览文件，只有同学和教师身份可以下载文件!同时您的阅览文件和下载文件的操作都将增加活跃度值可在个人主页进行查看！</p>
    <a :href="read" target="_blank" @click="watchFileLog">
      <el-button type="warning" plain v-if="show">阅览该文件</el-button>
    </a>
    <a :href="download" download target="_blank">
      <!-- 下载该文件 -->
      <el-button type="primary" plain v-if="show" @click="downloadFileLog">下载该文件</el-button>
    </a>
    <el-button type="danger" plain @click="discussion">前往讨论区</el-button>
  </div>
</template>

<script>
export default {
  props: ["file"],
  created() {
    this.getFile();
  },
  updated() {
    this.getFile();
  },
  methods: {
    watchFileLog() {
      var username = sessionStorage.getItem("userName");
      var activity = "阅览了";
      var teacherUsername = sessionStorage.getItem("teacherUsername");
      var cname = sessionStorage.getItem("cname");
      var fname = this.file.name;
      var timestamp = this.currentTime();
      var fd = new FormData();
      fd.append("username", username);
      fd.append("activity", activity);
      fd.append("fname", fname);
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
          if (data === `success`) {
            // console.log("save log success");
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
          } else if (data === `fail`) {
            this.$notify.error({
              title: "错误",
              message: "日志存储失败🛠️！"
            });
          } else {
            console.log(data);
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
          });
        });
      // alert(`hhhh`);
    },
    downloadFileLog() {
      var username = sessionStorage.getItem("userName");
      var activity = "下载了";
      var teacherUsername = sessionStorage.getItem("teacherUsername");
      var cname = sessionStorage.getItem("cname");
      var fname = this.file.name;
      var timestamp = this.currentTime();
      var fd = new FormData();
      fd.append("username", username);
      fd.append("activity", activity);
      fd.append("fname", fname);
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
          // console.log("save log success");
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
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
          });
        });
      // alert(`hhhh`);
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
    },
    discussion() {
      this.$router.push({ name: "TopicList" });
    },
    getFile() {
      var username = sessionStorage.getItem("userName");
      var uploader = this.file.uploader;
      var ftype = this.file.type;
      var fname = this.file.name;
      const url = `https://vclass.api.cheeseburgerim.space/file/api/downloadFile?username=${username}&uploaderUsername=${uploader}&ftype=${ftype}&fname=${fname}`;
      fetch(url, {
        method: `GET`,
        credentials: "include",
      })
        .then(res => res.text())
        .then(data => {
          console.log(data);
          if (data != `fail`) {
            // console.log(data);
            this.download = `http://vclass.image.cheeseburgerim.space` + data;
          } 
          // else {
          //   this.$notify.error({
          //     title: "错误",
          //     message: "❌下载文件失败！"
          //   });
          // }
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
          });
        });
    }
  },
  data() {
    return {
      download: ``
    };
  },
  computed: {
    show() {
      if (sessionStorage.getItem("userStatus") === `visitor`) return false;
      else return true;
    },
    read() {
      var uploader = this.file.uploader;
      var ftype = this.file.type;
      var fname = this.file.name;
      return `https://vclass.api.cheeseburgerim.space/file/api/OnlineBrowsing/?uploaderUsername=${uploader}&ftype=${ftype}&fname=${fname}`;
    },
    link() {
      if (this.file.type === `word`) {
        return "../../../../../static/images/word.png";
      } else if (this.file.type === `ppt`) {
        return "../../../../../static/images/PPT.png";
      } else if (this.file.type === `excel`) {
        return "../../../../../static/images/excel.png";
      } else if (this.file.type === `md`) {
        return "../../../../../static/images/md.png";
      } else if (this.file.type === `pdf`) {
        return "../../../../../static/images/pdf.png";
      } else if (this.file.type === `img`) {
        return "../../../../../static/images/png.png";
      } else if (this.file.type === `txt`) {
        return "../../../../../static/images/txt.png";
      } else {
        return "../../../../../static/images/file.png";
      }
    }
  }
};
</script>

<style scoped>
#file {
  box-sizing: border-box;
  padding: 40px 20px;
  width: 100%;
  height: 100%;
  /* background: #000; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
#file h2 {
  width: 100%;
  text-align: center;
  font-family: "KaiTi";
  font-weight: 800;
}
#file .book-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-perspective: 600px;
  perspective: 600px;
}

#file .book {
  position: relative;
  width: 100px;
  height: 150px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: rotateY(-30deg);
  transform: rotateY(-30deg);
  -webkit-transition: 1s ease;
  transition: 1s ease;
  -webkit-animation: bookRotate 0s 1s ease 0s;
  animation: bookRotate 0s 1s ease 0s;
  list-style: none;
}
#file .book img {
  object-fit: cover;
}
#file .book:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 2px;
  width: 23px;
  height: 146px;
  -webkit-transform: translateX(84.5px) rotateY(90deg);
  transform: translateX(84.5px) rotateY(90deg);
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#fff),
    color-stop(5%, #f9f9f9),
    color-stop(10%, #fff),
    color-stop(15%, #f9f9f9),
    color-stop(20%, #fff),
    color-stop(25%, #f9f9f9),
    color-stop(30%, #fff),
    color-stop(35%, #f9f9f9),
    color-stop(40%, #fff),
    color-stop(45%, #f9f9f9),
    color-stop(50%, #fff),
    color-stop(55%, #f9f9f9),
    color-stop(60%, #fff),
    color-stop(65%, #f9f9f9),
    color-stop(70%, #fff),
    color-stop(75%, #f9f9f9),
    color-stop(80%, #fff),
    color-stop(85%, #f9f9f9),
    color-stop(90%, #fff),
    color-stop(95%, #f9f9f9),
    to(#fff)
  );
  background: linear-gradient(
    90deg,
    #fff,
    #f9f9f9 5%,
    #fff 10%,
    #f9f9f9 15%,
    #fff 20%,
    #f9f9f9 25%,
    #fff 30%,
    #f9f9f9 35%,
    #fff 40%,
    #f9f9f9 45%,
    #fff 50%,
    #f9f9f9 55%,
    #fff 60%,
    #f9f9f9 65%,
    #fff 70%,
    #f9f9f9 75%,
    #fff 80%,
    #f9f9f9 85%,
    #fff 90%,
    #f9f9f9 95%,
    #fff
  );
}

#file .book > :first-child {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  background: var(--background6);
  height: 150px;
  -webkit-transform: translateZ(12.5px);
  transform: translateZ(12.5px);
  border-radius: 0 2px 2px 0;
  -webkit-box-shadow: 5px 5px 20px #666;
  box-shadow: 5px 5px 20px #666;
}

#file .book:after {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 150px;
  -webkit-transform: translateZ(-12.5px);
  transform: translateZ(-12.5px);
  background-color: #555;
  border-radius: 0 2px 2px 0;
}
#file .book-wrapper:hover .book {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
}
#file .info {
  margin-top: 30px;
  width: 80%;
  color: var(--text2);
  text-align: justify;
}
#file .el-button:last-child {
  margin-top: 10px;
  margin-left: 0;
}
</style>