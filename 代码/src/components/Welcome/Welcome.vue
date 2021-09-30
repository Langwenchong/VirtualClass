<template>
  <div id="Welcome">
    <div id="container" class="animate__animated animate__zoomIn">
      <div class="l-wrapper">
        <div class="inner-box">
          <div id="logo">
            <img src="../../../static/images/logo.png" height="100%" alt="logo" />
          </div>
          <h2>云端虚拟教研室共享平台</h2>
          <div class="main">
            <div class="header">
              <span class="name">李幼萌</span>
              <span class="status">VClass 指导教师</span>
            </div>
            <div
              class="content"
            >是的，VClass 还有很多问题，远远不完美，但一直在解决。高级CV攻城狮团队是我见过的最优秀的开发团队，认真做产品，有耐心不功利，所以我相信 VClass 一定会做的很好。</div>
          </div>
          <div class="innerBox-bg">
            <img src="../../../static/images/tju.png" />
          </div>
        </div>
        <div class="footer">
          <span>
            <i class="fad fa-thumbs-up"></i>&nbsp;&nbsp;高级CV攻城狮团队荣誉出品
            <sup>®</sup>
          </span>
        </div>
      </div>
      <div class="r-wrapper">
        <transition mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {
    $("#Welcome").circleMagic({
      radius: 9,
      density: 0.05,
      color: "random",
      clearOffset: 0.3
    });
  },
  name: "Welcome"
};
</script>


<style scoped>
#Welcome {
  height: 98vh;
  width: 100%;
  overflow: hidden;
  /* background:red; */
  display: flex;
  /* align-items: center; */
  justify-content: center;
}
#Welcome #container {
  z-index: 2;
  margin-top: 40px;
  width: 1000px;
  height: 570px;
  /* background: pink; */
  display: flex;
}
#Welcome #container .l-wrapper,
#Welcome #container .r-wrapper {
  box-shadow: 0px 20px 80px 0px rgb(0 0 0 / 30%);
  background: #fff;
  width: 50%;
  height: 100%;
}
#Welcome #container .l-wrapper {
  position: relative;
  background: linear-gradient(0deg, #3a485a 0%, #607089 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#Welcome #container .l-wrapper:before {
  width: 100%;
  height: 100%;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../../static/images/welcome-left-bg.png") no-repeat 0 0;
}
#Welcome #container .l-wrapper:after {
  width: 100%;
  height: 100%;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../../static/images/welcome-right-bg.png") no-repeat right
    bottom;
}
#Welcome #container .l-wrapper .inner-box {
  width: 67%;
  height: 73%;
  /* background: pink; */
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  z-index: 2;
}

#Welcome #container .l-wrapper .inner-box #logo {
  width: 100%;
  height: 60px;
  cursor: pointer;
}
#Welcome #container .l-wrapper .inner-box h2 {
  width: 100%;
  text-align: left;
  color: #fff;
  /* font-size: 1.714rem; */
  font-weight: normal;
  margin: 0;
  margin-top: 10px;
  padding: 0;
  line-height: 1.33em;
}
#Welcome #container .l-wrapper .inner-box .main {
  width: 100%;
  height: 270px;
  /* background:gainsboro; */
  box-sizing: border-box;
  padding-top: 46px;
}
#Welcome #container .l-wrapper .inner-box .main .header {
  width: 100%;
  height: 26px;
  text-align: left;
  color: #fff;
  opacity: 0.5;
  font-size: 14px;
}
#Welcome #container .l-wrapper .inner-box .main .header .status {
  margin-left: 10px;
}
#Welcome #container .l-wrapper .inner-box .main .content {
  width: 100%;
  margin-top: 16px;
  text-align: justify;
  color: #fff;
  font-size: 14px;
  line-height: 1.71429;
}
#Welcome #container .l-wrapper .inner-box .innerBox-bg {
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
#Welcome #container .l-wrapper .inner-box .innerBox-bg img {
  width: 100%;
  opacity: 0.7;
}
#Welcome #container .l-wrapper .footer {
  width: 67%;
  height: 30px;
  box-sizing: border-box;
  padding-top: 40px;
  /* background:blue; */
  display: flex;
  align-items: center;
  justify-content: center;
}
#Welcome #container .l-wrapper .footer span {
  color: #eee;
  cursor: pointer;
}

.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.v-enter{
  opacity:0;
  transform: translateX(-30px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}

</style>