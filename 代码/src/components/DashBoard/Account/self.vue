<template>
  <div id="self">
    <div id="avatar">
      <div id="imgBx">
        <img :src="avatar" />
        <div id="status">
          <p id="icon" :title="status">
            {{
              status === `teacher` ? `👨‍🏫` : status === `student` ? `👨‍🎓` : `🕵️‍`
            }}
          </p>
        </div>
      </div>
    </div>
    <div id="info">
      <div id="me">
        <h2>{{ name }}</h2>
        <p id="subtitle">「 {{ subtitle }} 」</p>
        <div id="other-info">
          <span class="tag">
            <i class="bx bx-building-house"></i>
            {{ address }}
          </span>
          <span class="tag">
            <i class="bx bxs-graduation"></i>
            {{ grade }}
          </span>
          <span class="tag">
            <i class="bx bx-link"></i>
            <a :href="link" target="blank">{{ link }}</a>
          </span>
        </div>
        <div id="highlight">
          <b>Achievements</b>
          <div id="ach">
            <img v-for="(item, i) in achs" :key="i" :src="item" />
          </div>
        </div>
        <el-button class="button" type="info" plain @click="edit"
          >Edit profile</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "self",
  created() {
    this.status = sessionStorage.getItem("userStatus");
    var username = sessionStorage.getItem("userName");
    var userStatus = sessionStorage.getItem("userStatus");
    if (userStatus === `visitor`) {
      this.avatar = `https://vclass.api.cheeseburgerim.space/VClass/static/defaultAvatar.jpg`;
    } else {
      // console.log(username);
      const avatarurl = `https://vclass.api.cheeseburgerim.space/user/api/getAvatar?username=${username}`;
      fetch(avatarurl, {
        method: "get",
        credentials: "include",
      })
        .then((res) => res.text())
        .then((data) => {
          // console.log(data);
          this.avatar = `http://vclass.static.cheeseburgerim.space` + data;
          if (data === `//VClass//static//defaultAvatar.jpg`) {
            this.avatar = `http://vclass.api.cheeseburgerim.space` + data;
          }
          sessionStorage.setItem("userImage", this.avatar);
        })
        .catch((error) => {
          this.$notify.error({
            title: "错误",
            message: "后台出现图片存储异常，暂时使用默认头像😑",
          });
        });
      // this.avtar=`https://vclass.api.cheeseburgerim.space/VClass/${userStatus}/${userName}/avatar.jpg`
    }
    const infourl = `https://vclass.api.cheeseburgerim.space/user/api/getInfo?username=${username}`;
    fetch(infourl, {
      method: "get",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.hasOwnProperty("result")) {
          // console.log(data);
          this.link = `未填写`;
          this.grade = `未填写`;
          this.address = `未填写`;
          this.subtitle = `未填写`;
          this.name = sessionStorage.getItem("userName");
        } else {
          // console.log(data);
          if (data.link != `` && data.link != null) {
            this.link = data.link;
            // console.log(data);
          } else {
            this.link = `未填写`;
          }
          if (data.grade != `` && data.grade != null) {
            this.grade = data.grade;
          } else {
            this.grade = `未填写`;
          }
          if (data.address != `` && data.address != null) {
            this.address = data.address;
          } else {
            this.address = `未填写`;
          }
          if (data.name != `` && data.name != null) {
            this.name = data.name;
          } else {
            this.name = sessionStorage.getItem("userName");
          }
          if (data.subtitle != `` && data.subtitle != null) {
            this.subtitle = data.subtitle;
          } else {
            this.subtitle = `未填写`;
          }
        }
      })
      .catch((error) => {
        this.$notify.error({
          title: "错误",
          message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！",
        });
      });
    // console.log("link"+this.link)
  },
  methods: {
    edit() {
      this.$router.push({
        name: "editself",
        params: {
          name: this.name,
          grade: this.grade,
          avatar: this.avatar,
          school: this.address,
          motto: this.subtitle,
          blog: this.link,
        },
      });
    },
  },
  data() {
    return {
      achs: [
        "../../static/images/ach1.png",
        "../../static/images/ach2.png",
        "../../static/images/ach3.png",
      ],
      link: "",
      grade: "",
      address: "",
      status: "",
      followers: "2.3k",
      following: "300",
      name: "",
      subtitle: "",
      avatar:
        "https://vclass.api.cheeseburgerim.space/VClass/static/defaultAvatar.jpg",
    };
  },
};
</script>

<style scoped src="../../../assets/css/bootstrap.min.css"></style>
<style scoped>
#self {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
#avatar {
  margin-top: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#imgBx {
  transition: 0.5s;
  position: relative;
  width: 280px;
  height: 280px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #e1e4e8;
  /* overflow: hidden; */
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: var(--opacity);
}

#imgBx img {
  height: 200px;
  width: 200px;
  object-fit: cover;
  border-radius: 50%;
}
#imgBx #status {
  position: absolute;
  width: 38px;
  padding: 4px;
  height: 38px;
  overflow: hidden;
  bottom: 2px;
  right: 35px;
  border-radius: 50%;
  border: 1px solid #e1e4e8;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  z-index: 2;
  transition: 0.5s;
}
#status p {
  margin: 0px;
}
#icon {
  cursor: pointer;
  font-size: 24px;
  padding-right: 15px;
}
#info {
  margin-top: 10px;
  position: sticky;
  top: 40px;
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 200px;
  /* background:red; */
  align-items: center;
}
#me {
  width: 280px;
  /* height:100px; */
  /* background:pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
#me h2 {
  font-family: "Dancing Script", cursive;
  font-weight: 700;
}
#me #subtitle {
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  color: var(--text7);
}

#other-info {
  margin-top: 10px;
  padding-bottom: 8px;
  width: 100%;
  /* height: 58px; */
  /* background: green; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
  border-top: 1px solid #e1e4e8;
  border-bottom: 1px solid #e1e4e8;
}
#me #other-info .tag {
  margin-top: 8px;
  margin-left: 8px;
  font-size: 18px;
  color: var(--text1);
  transition: 0.5s;
}
a {
  color: var(--text1);
}
a:hover {
  color: var(--text1);
}
#icon {
  padding: 0;
}
#me #highlight {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
#me #highlight b {
  margin-left: 20px;
}
#me #highlight #ach {
  margin-left: 20px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  /* justify-content: space-between */
}
#me #highlight #ach img {
  width: 40px;
  margin-left: 20px;
}
.button {
  margin-top: 20px;
  width: 90%;
  height: 32px;
  border-radius: 6px;
  padding: 0;
  background: transparent;
  transition: 0.5s;
}
.button:hover {
  background: var(--background6);
}
</style>