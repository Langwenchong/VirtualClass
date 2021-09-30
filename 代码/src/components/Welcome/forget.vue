<template>
  <div id="forget">
    <div class="header">
      <h2>重置密码</h2>
      <span class="note">请输入 VClass 用户绑定邮箱重置你的 VClass 帐号密码</span>
      <el-input v-model="input" placeholder="请输入 VClass 绑定邮箱以重置密码"></el-input>
      <el-button class="button" type="success" @click="submit">重置密码</el-button>
      <router-link :to="{name:'login'}" class="link">想起密码了！立即登录？</router-link>
    </div>
    <div id="cloud">
      <p>
        Forget Your
        <br />Password
        <br />Again?!
      </p>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "forget",
  data() {
    return {
      input: ""
    };
  },
  methods: {
    submit() {
      if (this.input === ``) {
        this.$notify.error({
          title: "错误",
          message: "你不会连绑定邮箱都忘记了吧？"
        });
      }
    }
  }
};
</script>
<style scoped>
#forget {
  width: 100%;
  height: 100%;
  /* background: red; */
  padding: 64px 70px 48px;
  box-sizing: border-box;
  overflow: hidden;
}
#forget .link {
  color: #40485b;
  transition: 0.5s;
  font-size: 14px;
  text-decoration: none;
}
#forget .link:hover {
  color: #ff7675;
}
#forget .header {
  width: 100%;
  height: 140px;
  /* background:teal; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin-bottom: 20px;
}
#forget .header .note {
  font-size: 14px;
  color: #8c92a4;
  margin-bottom: 20px;
}
#forget .header .button {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
#cloud {
  filter: brightness(104%);
  display: flex;
  justify-content: center;
  margin-top: 140px;
  margin-bottom: 50px;
}
#cloud p {
  position: relative;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 15px;
  color: #774f38;
  background: #ece5ce;
  padding: 20px;
  box-shadow: 20px 20px #83af9b;
  border-radius: 11px;
  width: 158px;
  animation: float 5s ease-in-out infinite;
}
#cloud p::after {
  content: ".";
  font-weight: bold;
  text-shadow: 22px 22px #83af9b;
  -webkit-text-fill-color: #ece5ce;
  text-align: left;
  font-size: 55px;
  width: 55px;
  height: 11px;
  line-height: 30px;
  border-radius: 11px;
  background: #ece5ce;
  position: absolute;
  bottom: -30px;
  left: 0;
  box-shadow: 22px 22px #83af9b;
  z-index: -2;
  animation: float2 5s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0px);
  }
}
@keyframes float2 {
  0% {
    line-height: 30px;
    transform: translateY(0px);
  }
  55% {
    transform: translateY(-20px);
  }
  60% {
    line-height: 10px;
  }
  100% {
    line-height: 30px;
    transform: translateY(0px);
  }
}
@media screen and (max-width: 500px) {
  #cloud {
    margin-top: 30px;
  }
}
</style>