<template>
  <div id="login">
    <div class="header">
      <span>登录</span>
      <router-link :to="{ name: 'register' }" class="link"
        >没有帐号？ 点此注册</router-link
      >
    </div>
    <div class="wrapper">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
            placeholder="请输入用户姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="请输入账号密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="success" id="visitor" @click="visitorLogin"
            >游客登录</el-button
          >
        </el-form-item>
      </el-form>
      <router-link :to="{ name: 'forget' }" class="link" id="forget"
        >已有帐号，忘记密码？</router-link
      >
    </div>
    <div class="team">
      <img
        id="team-logo"
        src="../../../static/images/team-logo.png"
        alt="team-logo"
      />
      <b>感谢以下contributors:</b>
      <div class="contributors">
        <div class="person">
          <img src="../../../static/images/lwc.jpeg" />
        </div>
        <div class="person">
          <img src="../../../static/images/pyz.jpg" />
        </div>
        <div class="person">
          <img src="../../../static/images/by.jpg" />
        </div>
        <div class="person">
          <img src="../../../static/images/hs.gif" />
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        pass: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          var username = this.ruleForm.username;
          var password = this.ruleForm.pass;
          const url = `https://vclass.api.cheeseburgerim.space/user/api/login?username=${username}&password=${password}`;
          // const url = `https://vclass.api.cheeseburgerim.space//session/setSession/username=${username}/password=${password}`;
          fetch(url, {
            method: "get",
            credentials: "include",
            // mode:"no-cors"
          })
            .then((res) => res.json()) //.json()  var=var   var=data.name  var=
            .then((data) => {
              if (data.status === `student` || data.status === `teacher`) {
                var date = new Date();
                var s = "日一二三四五六";
                const h = this.$createElement;
                this.$notify({
                  title: "登陆成功✔️",
                  message: h(
                    "b",
                    { style: "color: #333" },
                    "您好！" +
                      username +
                      "，欢迎登陆VClass虚拟教研室资源共享云平台，现在是北京时间" +
                      date.getHours() +
                      ":" +
                      date.getMinutes() +
                      " 星期" +
                      s[date.getDay()] +
                      "。"
                  ),
                });
                sessionStorage.setItem("userName", username);
                sessionStorage.setItem("userStatus", data.status);
                // console.log(sessionStorage.getItem("userStatus"));
                var now = new Date();
                var year = now.getFullYear(); //年
                var month = now.getMonth() + 1; //月
                var day = now.getDate(); //日
                var clock = year + "-";
                if (month < 10) clock += "0";
                clock += month + "-";
                if (day < 10) clock += "0";
                clock += day;
                const actUrl = `https://vclass.api.cheeseburgerim.space/user/api/setAct?username=${this.ruleForm.username}&date=${clock}`;
                fetch(actUrl, {
                  method: "get",
                  credentials: "include",
                })
                  .then((res) => res.text())
                  .then((data) => {
                    if (data === `success`) {
                      this.$router.push("/Dashboard/Recommend");
                    } else {
                      alert(data);
                    }
                  });
              } else if (data.status === `fail`) {
                // console.log(data.status);
                this.$notify.error({
                  title: "错误",
                  message: "登陆失败，请检查账号是否存在或者密码是否正确❌！",
                });
              }
            })
            .catch((error) => {
              this.$notify.error({
                title: "错误",
                message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    visitorLogin() {
      sessionStorage.setItem("userName", "visitor");
      sessionStorage.setItem("sessionId", "visitor");
      sessionStorage.setItem("userStatus", "visitor");
      var date = new Date();
      var s = "日一二三四五六";
      const h = this.$createElement;
      this.$notify({
        title: "登陆成功✔️",
        message: h(
          "b",
          { style: "color: #333" },
          "您好！" +
            "欢迎登陆VClass虚拟教研室资源共享云平台，现在是北京时间" +
            date.getHours() +
            ":" +
            date.getMinutes() +
            " 星期" +
            s[date.getDay()] +
            "。您现在正在使用游客身份！"
        ),
      });
      this.$router.push("/Dashboard/Recommend");
    },
  },
};
</script>
<style scoped>
#login {
  width: 100%;
  height: 100%;
  /* background: red; */
  padding: 64px 70px 48px;
  box-sizing: border-box;
  overflow: hidden;
}
#login .header {
  width: 100%;
  height: 40px;
  /* background:teal; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
#login .header span:first-child {
  font-size: 1.514rem;
  color: #40485b;
  font-weight: bold;
}
#login .link {
  color: #40485b;
  transition: 0.5s;
  font-size: 14px;
  text-decoration: none;
}
#login .link:hover {
  color: #ff7675;
}
#login .wrapper #forget {
  color: #40485b;
  transition: 0.5s;
  font-size: 14px;
  text-align: center;
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
}
#login .wrapper #forget:hover {
  color: #ff7675;
}
#login .team {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 200px;
  justify-content: center;
}
#login .team #team-logo {
  width: 90%;
  transition: 0.5s;
}
#login .team b {
  transition-delay: 0.3s;
  position: absolute;
  opacity: 0;
  top: 30px;
  transform: translateY(80px);
  transition: 0.5s;
}
#login .team .contributors {
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding-top: 70px;
  opacity: 0;
  transition: 0.5s;
  /* transition-delay: 0.3s; */
  transform: translateY(80px);
}
#login .team .contributors .person {
  border: 1px solid rgba(0, 0, 0, 0.3);
  height: 70px;
  width: 70px;
  border-radius: 50%;
  overflow: hidden;
}
#login .team .contributors .person img {
  height: 100%;
  width: 100%;
}
#login .team:hover #team-logo {
  opacity: 0;
  transform: translateY(-50px);
}
#login .team:hover b {
  opacity: 1;
  transform: translateY(0px);
}
#login .team:hover .contributors {
  opacity: 1;
  transform: translateY(0px);
}
</style>