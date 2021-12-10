<template>
  <div id="Dashboard">
    <div id="top" @click="toTop">
      <img src="../../../static/images/icon9.png" width="22px" />
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>{{ dialogMessage }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
    <div id="l-list" class="sidebar animate__animated animate__fadeInLeft">
      <div class="logo_content">
        <div class="logo">
          <i class="bx bx-message-edit"></i>
          <div class="logo_name">VirtualClass</div>
        </div>
        <i class="bx bx-menu" id="btn"></i>
      </div>
      <ul class="nav_list">
        <li>
          <i class="bx bx-search" @click="searchCourse"></i>
          <input type="text" placeholder="Search Class..." v-model="search" />
          <span class="tooltip">搜索</span>
        </li>
        <li>
          <div @click="goto(1)">
            <i class="bx bx-like"></i>
            <span class="links_name">全部课程</span>
          </div>
          <span class="tooltip">课程</span>
        </li>
        <li v-if="status != `visitor`">
          <div @click="goto(2)">
            <i class="bx bx-user-circle"></i>
            <span class="links_name">我的账号</span>
          </div>
          <span class="tooltip">账号</span>
        </li>
        <li>
          <div>
            <i class="bx bx-message-square-dots"></i>
            <span class="links_name">消息提示</span>
          </div>
          <span class="tooltip">消息</span>
        </li>
        <li>
          <div>
            <i class="bx bx-cloud-download"></i>
            <span class="links_name">我的下载</span>
          </div>
          <span class="tooltip">下载</span>
        </li>
        <li>
          <div>
            <i class="bx bx-pen"></i>
            <span class="links_name">调查问卷</span>
          </div>
          <span class="tooltip">问卷</span>
        </li>
        <li>
          <div>
            <i class="bx bx-cog"></i>
            <span class="links_name">我的设置</span>
          </div>
          <span class="tooltip">设置</span>
        </li>
        <li @click="night">
          <div>
            <i class="bx bxs-adjust-alt"></i>
            <span class="links_name">开/关灯</span>
          </div>
          <span class="tooltip">开/关灯</span>
        </li>
      </ul>
      <div class="profile_content">
        <div class="profile">
          <div class="profile_details">
            <img :src="avatar" alt />
            <div class="name_job">
              <div class="name">{{ name }}</div>
              <div class="job">{{ status }}</div>
            </div>
          </div>
          <i
            class="bx bx-log-out"
            id="log_out"
            @click="centerDialogVisible = true"
          ></i>
        </div>
      </div>
    </div>
    <div id="r-main" class="r-main">
      <router-view></router-view>
    </div>
  </div>
</template>



<script>
export default {
  created() {
    var username = sessionStorage.getItem("userName");
    this.status = sessionStorage.getItem("userStatus");
    if (username == `visitor`) {
      this.avatar = `https://vclass.api.cheeseburgerim.space/VClass/static/defaultAvatar.jpg`;
    } else {
      const avatarurl = `https://vclass.api.cheeseburgerim.space/user/api/getAvatar?username=${username}`;
      fetch(avatarurl, {
        method: "get",
        credentials: "include",
      })
        .then((res) => res.text())
        .then((data) => {
          this.avatar = `http://vclass.static.cheeseburgerim.space` + data;
          if (data === `//VClass//static//defaultAvatar.jpg`) {
            this.avatar = `https://vclass.api.cheeseburgerim.space` + data;
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: "错误",
            message: "后台出现图片存储异常，暂时使用默认头像😑",
          });
        });
    }
    const infourl = `https://vclass.api.cheeseburgerim.space/user/api/getInfo?username=${username}`;
    fetch(infourl, {
      method: "get",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.hasOwnProperty("result")) {
          this.status = sessionStorage.getItem("userStatus");
          this.name = sessionStorage.getItem("userName");
        } else {
          if (data.name != ``) {
            this.name = data.name;
          } else {
            this.name = sessionStorage.getItem("userName");
          }
        }
      })
      .catch((error) => {
        this.$notify.error({
          title: "错误",
          message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！",
        });
      });
  },
  mounted() {
    //返回顶部
    window.onscroll = function () {
      if (
        document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
      ) {
        document.getElementById("top").style.display = "flex";
      } else {
        document.getElementById("top").style.display = "none";
      }
    };
    let btn = document.querySelector("#btn");
    let sidebar = document.querySelector(".sidebar");
    let searchBtn = document.querySelector(".bx-search");
    btn.onclick = function () {
      sidebar.classList.toggle("active");
      if (btn.classList.contains("bx-menu")) {
        btn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        btn.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    };
    // searchBtn.onclick = function () {
    //   sessionStorage.setItem("search", this.search);
    //   this.$router.push({ name: "SearchResult" });
    //    sidebar.classList.toggle("active");
    // };
  },
  data() {
    return {
      search: ``,
      name: ``,
      avatar: ``,
      status: ``,
      dialogMessage: `如果要退出,当前未保存的操作将无法保留,您确定要登出账号吗❓`,
      isNight: false,
      centerDialogVisible: false,
    };
  },
  methods: {
    searchCourse() {
      let sidebar = document.querySelector(".sidebar");
      if (this.search === ``) {
        return;
      }
      sessionStorage.setItem("search", this.search);
      this.$router.push({ name: "Account" });
      this.$router.push({ name: "SearchResult" });

      sidebar.classList.toggle("active");
      this.search = ``;
    },
    logout() {
      if (
        sessionStorage.getItem("sessionId") != "" &&
        sessionStorage.getItem("sessionId") != "visitor"
      ) {
        // alert("您已经不是登录状态了");
        this.dialogMessage = `如果要退出,当前未保存的操作将无法保留,您确定要登出账号吗❓`;
        var username = sessionStorage.getItem("userName");
        var url = `https://vclass.api.cheeseburgerim.space/user/api/logout?username=${username}`;
        fetch(url, {
          method: "get",
          credentials: "include",
        })
          .then((res) => res.text())
          .then((data) => {
            if (data === `fail`) {
              this.$notify.error({
                title: "错误",
                message: "登出失败！",
              });
            }
          })
          .catch((error) => {
            this.$notify.error({
              title: "错误",
              message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！",
            });
          });
        this.$router.push({ name: "login" });
      } else {
        this.$router.push({ name: "login" });
      }
      // location.reload();
    },
    toTop() {
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    },
    goto(i) {
      if (i === 1) {
        this.$router.push({ name: "Recommend" });
      } else if (i === 2) {
        this.$router.push({ name: "self" });
      }
    },
    night() {
      let main = document.getElementById("r-main");
      this.isNight = !this.isNight;
      document.getElementById("top").classList.toggle("night");
      //修改root颜色
      if (this.isNight) {
        document.documentElement.style.setProperty("--background1", "#292a2d");
        document.documentElement.style.setProperty("--background2", "#3d3d3d");
        document.documentElement.style.setProperty("--background3", "#333");
        document.documentElement.style.setProperty(
          "--background4",
          "linear-gradient(to bottom,#333, transparent)"
        );
        document.documentElement.style.setProperty("--background6", "#333");
        document.documentElement.style.setProperty("--text1", "#eee");
        document.documentElement.style.setProperty("--text4", "#fc0");
        document.documentElement.style.setProperty("--text5", "#fd79a8");
        document.documentElement.style.setProperty("--text7", "#8b949e");
        document.documentElement.style.setProperty("--opacity", "0.7");
      } else {
        document.documentElement.style.setProperty("--background1", "#eee");
        document.documentElement.style.setProperty("--background2", "#fff");
        document.documentElement.style.setProperty("--background3", "#f8f9fb");
        document.documentElement.style.setProperty(
          "--background4",
          "linear-gradient(to bottom, #fcf8ed, #fefbf5, #fff)"
        );
        document.documentElement.style.setProperty("--background6", "#dfe4ea");
        document.documentElement.style.setProperty("--text1", "#333");
        document.documentElement.style.setProperty("--text4", "#d1802b");
        document.documentElement.style.setProperty("--text5", "#53B880");
        document.documentElement.style.setProperty("--text7", "#586069");
        document.documentElement.style.setProperty("--opacity", "1");
      }
    },
  },
  name: "DashBoard",
};
</script>

<style scoped src="../../assets/css/bootstrap.min.css"></style>
<style scoped>
#Dashboard {
  width: 100%;
  min-height: 100vh;
  /* background: pink; */
  display: flex;
  justify-content: space-between;
  background: var(--background1);
}
.sidebar > * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 78px;
  background: #11101d;
  padding: 6px 14px;
  z-index: 99;
  transition: all 0.5s ease;
}
.sidebar.active {
  width: 240px;
}
.sidebar .logo_content .logo {
  color: #fff;
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s ease;
}
.sidebar.active .logo_content .logo {
  opacity: 1;
  pointer-events: none;
}
.logo_content .logo i {
  font-size: 28px;
  margin-right: 5px;
}
.logo_content .logo .logo_name {
  font-size: 20px;
  font-weight: 400;
}
.sidebar #btn {
  position: absolute;
  color: #fff;
  top: 6px;
  left: 50%;
  font-size: 22px;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  transform: translateX(-50%);
}
.sidebar.active #btn {
  left: 90%;
}
.sidebar ul {
  margin-top: 20px;
}
.sidebar ul li {
  position: relative;
  height: 50px;
  width: 100%;
  margin: 0 5px;
  list-style: none;
  line-height: 50px;
  margin: 5px 0;
}
.sidebar ul li .tooltip {
  position: absolute;
  left: 125px;
  top: 0;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  height: 35px;
  width: 120px;
  background: #fff;
  line-height: 35px;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: 0s;
  opacity: 0;
  pointer-events: none;
  display: block;
}
.sidebar.active ul li .tooltip {
  display: none;
}
.sidebar ul li:hover .tooltip {
  transition: all 0.5s ease;
  opacity: 1;
  top: 50%;
}
.sidebar ul li input {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 12px;
  outline: none;
  border: none;
  background: #1d1b31;
  padding-left: 50px;
  font-size: 18px;
  color: #fff;
}
.sidebar ul li .bx-search {
  position: absolute;
  z-index: 99;
  color: #fff;
  font-size: 22px;
  transition: all 0.5 ease;
}
.sidebar ul li .bx-search:hover {
  background: #fff;
  color: #1d1b31;
}
.sidebar ul li div {
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 12px;
  white-space: nowrap;
  transition: all 0.4s ease;
}
.sidebar ul li div:hover {
  color: #11101d;
  background: #fff;
}
.sidebar ul li i {
  font-size: 18px;
  font-weight: 400;
  height: 50px;
  min-width: 50px;
  border-radius: 12px;
  line-height: 50px;
  text-align: center;
}
.sidebar .links_name {
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}
.sidebar.active .links_name {
  transition: 0s;
  opacity: 1;
  pointer-events: auto;
}
.sidebar .profile_content {
  position: absolute;
  color: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
}
.sidebar .profile_content .profile {
  position: relative;
  padding: 10px 6px;
  height: 60px;
  background: none;
  transition: all 0.4s ease;
}
.sidebar.active .profile_content .profile {
  background: #1d1b31;
}
.profile_content .profile .profile_details {
  display: flex;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
  transition: all 0.4s ease;
}
.sidebar.active .profile .profile_details {
  opacity: 1;
  pointer-events: auto;
}
.profile .profile_details img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 12px;
}
.profile .profile_details .name_job {
  margin-left: 10px;
}
.profile .profile_details .name {
  font-size: 15px;
  font-weight: 400;
}
.profile .profile_details .job {
  font-size: 12px;
}
.profile #log_out {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 50px;
  line-height: 50px;
  font-size: 20px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.4s ease;
  background: #1d1b31;
  cursor: pointer;
}
.sidebar.active .profile #log_out {
  left: 88%;
}
.sidebar.active .profile #log_out {
  background: none;
}
.home_content {
  position: absolute;
  height: 100%;
  width: calc(100% - 78px);
  left: 78px;
  background: #e4e9f7;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2px);
  transition: all 0.5s ease;
}
.sidebar.active ~ .home_content {
  z-index: 100;
}
.home_content .text {
  font-size: 25px;
  font-weight: 500;
  color: #1d1b31;
  margin: 12px;
}
.sidebar.active ~ .home_content {
  width: calc(100% - 240px);
  left: 240px;
}
#r-main {
  width: calc(100% - 78px);
  margin-left: 78px;
  min-height: 300px;
  background: var(--background1);
  transition: 0.5s;
  color: var(--text1);
}
#top {
  z-index: 999999;
  height: 48px;
  transition: 0.7s;
  transition-delay: 0.15;
  background: transparent;
  width: 48px;
  display: none;
  justify-content: center;
  border-radius: 50%;
  align-items: center;
  position: fixed;
  bottom: 32px;
  right: 32px;
  animation: show 0.5s forwards;
}
@keyframes show {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(00px);
  }
}
#top.night img {
  filter: brightness(100%);
}
#top img {
  filter: brightness(0%);
  transition: 0.5s;
  transition-delay: 0.15;
}
#top:hover {
  transform: scale(1.2);
  background: var(--text5);
  border-radius: 25%;
  box-shadow: 0 2px 4px 0px rgb(0 0 0 / 10%), 0 4px 8px 0px rgb(0 0 0 / 10%),
    0 8px 16px 0px rgb(0 0 0 / 10%);
}
#top:hover img {
  transform: scale(1.2);
  filter: brightness(100%);
}
</style>