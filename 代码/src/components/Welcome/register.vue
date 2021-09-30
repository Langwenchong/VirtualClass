<template>
  <div id="register">
    <div class="header">
      <span>注册</span>
      <router-link :to="{name:'login'}" class="link">已有账号！现在登录</router-link>
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
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号类型">
          <el-select class="select" v-model="value" placeholder="请选择注册账号类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "register",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if(value.length<6){
          callback(new Error("密码长度至少为6位"));
        }
        if (value != ""&&value.length>=6) {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      options: [
        {
          value: "同学",
          label: "学生"
        },
        {
          value: "老师",
          label: "教师"
        }
      ],
      value: "同学"
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var username = this.ruleForm.username;
          var password = this.ruleForm.pass;
          var status = this.value;
          const url = `/apis/user/api/add?username=${username}&password=${password}&status=${status}`;
          fetch(url, {
            method: "get"
          })
            .then(res => res.text())
            .then(data => {
              if (data != `fail`) {
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
                      status +
                      "欢迎登陆VClass虚拟教研室资源共享云平台，现在是北京时间" +
                      date.getHours() +
                      ":" +
                      date.getMinutes() +
                      " 星期" +
                      s[date.getDay()] +
                      "。"
                  )
                });
                sessionStorage.setItem("sessionId", data);
                sessionStorage.setItem("userName", username);
                sessionStorage.setItem("userStatus", status);
                var now = new Date();
                var year = now.getFullYear(); //年
                var month = now.getMonth() + 1; //月
                var day = now.getDate(); //日
                var clock = year + "-";
                if (month < 10) clock += "0";
                clock += month + "-";
                if (day < 10) clock += "0";
                clock += day;
                const actUrl = `/apis/user/api/setAct?username=${this.ruleForm.username}&date=${clock}`;
                fetch(actUrl, {
                  method: "GET"
                })
                  .then(res => res.text())
                  .then(data => {
                    if (data === `success`) {
                      this.$router.push("/Dashboard/Index");
                    } else {
                      alert(data);
                    }
                  });
              } else if (data.status === `fail`) {
                this.$notify.error({
                  title: "错误",
                  message: "创建失败！用户已存在❌！"
                });
              }
            })
            .catch(error => {
              this.$notify.error({
                title: "错误",
                message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
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
    }
  }
};
</script>

<style scoped>
#register {
  width: 100%;
  height: 100%;
  /* background: red; */
  padding: 64px 70px 48px;
  box-sizing: border-box;
  overflow: hidden;
}
#register .header {
  width: 100%;
  height: 40px;
  /* background:teal; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
#register .header span:first-child {
  font-size: 1.514rem;
  color: #40485b;
  font-weight: bold;
}
#register .header .link {
  color: #40485b;
  transition: 0.5s;
  font-size: 14px;
  text-decoration: none;
}
#register .header .link:hover {
  color: #ff7675;
}
.form-control {
  padding: 10px;
}
#register .wrapper .select {
  width: 100%;
  margin-bottom: 30px;
}
</style>