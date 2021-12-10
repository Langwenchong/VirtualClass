<template>
  <div id="comment">
    <div id="floor">
      <div class="head">
        <img :src="comment.avatar" alt="" />
        <strong>{{ comment.name }}</strong>
        <span>{{ comment.time }}</span>
      </div>
      <div class="content">
        {{ comment.content }}
      </div>
      <div class="footer">
        <div class="like" @click="rootLike">
          {{ comment.isLike === false ? `👏` : `🤝` }} {{ comment.like }}
        </div>
        <small>{{ comment.comments.length }} replies</small>
      </div>
    </div>
    <div id="reply" v-if="comment.comments.length > 0">
      <div class="box" v-for="(item, j) in comment.comments" :key="j">
        <div class="head">
          <img :src="item.avatar" alt="" />
          <strong>{{ item.name }}</strong>
          <span>{{ item.time }}</span>
          <div class="like" @click="childLike(j)">{{ item.isLike === false ? `👏` : `🤝` }} {{ item.like }}</div>
        </div>
        <div class="main">{{ item.content }}</div>
      </div>
    </div>
    <div id="entrance" v-show="!show">
      <img :src="me" alt="" />
      <el-input placeholder="Write a Reply" @focus="show = true"></el-input>
    </div>
    <div id="commentEditor" v-show="show">
      <div class="menu">
        <div class="write">Write</div>
        <div class="emotions">
          <i class="far fa-smile"></i>
          <div class="emotionsBox animate__animated animate__bounceIn">
            <div
              v-for="e in emojis"
              :key="e"
              class="emoji"
              @click="addEmotion(e)"
            >
              {{ e }}
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="请输入内容"
          v-model="mycomment"
        >
        </el-input>
      </div>
      <div class="footer">
        <small>请保持文明发言哦~</small>
        <div>
          <el-button
            type="info"
            @click="
              show = false;
              mycomment = ``;
            "
            class="button"
            style="filter: brightness(120%); opacity: 0.9"
            >Cancel</el-button
          >
          <el-button
            @click="addChild"
            class="button"
            type="success"
            style="filter: brightness(90%); opacity: 0.9"
            >Reply</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "comment",
  props: {
    obj: Object,
  },
  data() {
    return {
      me: sessionStorage.getItem("userImage"),
      mycomment: ``,
      show: false,
      emojis: ["👍", "👎", "😆", "🎉", "😟", "💝", "🚀", "👀"],
      comment: this.obj,
    };
  },
  methods: {
    addChild() {
      if (this.mycomment === ``) {
        this.$notify.error({
          title: "发布错误",
          message: "❌请确保话题内容不为空!",
        });
        return;
      }
      const commenturl = `https://vclass.api.cheeseburgerim.space/comment/api/addChild`;
      let fd = new FormData();
      fd.append("username", sessionStorage.getItem("userName"));
      fd.append("topicId", sessionStorage.getItem("tid"));
      fd.append("content", this.mycomment);
      fd.append("timestamp", this.currentTime());
      fd.append("rootCommentId", this.comment.commentId);
      fetch(commenturl, {
        method: "post",
        credentials: "include",
        body: fd,
      })
        .then((res) => res.text())
        .then((data) => {
          // console.log(data);
          if (data === `success`) {
            this.$notify({
              title: "回复成功",
              message: "回复成功发布啦✅",
              type: "success",
            });
            //刷新评论
            this.mycomment = ``;
            this.$parent.getRootComments();
          } else {
            this.$notify.error({
              title: "错误",
              message:
                "您现在是游客身份或者登录身份信息已过期，无权限编辑个人信息哦😶，3s后将跳转到登录界面！",
            });
            // setTimeout(() => {
            //   this.$router.push({ name: "login" });
            // }, 3000);
          }
        });
    },
    rootLike() {
      if (this.comment.isLike === true) {
        this.comment.like -= 1;
      } else {
        this.comment.like += 1;
      }
      this.comment.isLike = !this.comment.isLike;
      var url = `https://vclass.api.cheeseburgerim.space/comment/api/likeComment?commentId=${
        this.comment.commentId
      }&username=${sessionStorage.getItem("userName")}`;
      fetch(url, {
        method: "get",
        credentials: "include",
      })
        .then((res) => res.text())
        .then((data) => {
          // alert(data);
          if (data === `fail`) {
            this.$notify.error({
              title: "错误",
              message:
                "您现在是游客身份或者登录身份信息已过期，无权限编辑个人信息哦😶，3s后将跳转到登录界面！",
            });
            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 3000);
          }
        });
    },
    childLike(j) {
      if (this.comment.comments[j].isLike === true) {
        this.comment.comments[j].like -= 1;
      } else {
        this.comment.comments[j].like += 1;
      }
      this.comment.comments[j].isLike = !this.comment.comments[j].isLike;
      var url = `https://vclass.api.cheeseburgerim.space/comment/api/likeComment?commentId=${
        this.comment.comments[j].commentId
      }&username=${sessionStorage.getItem("userName")}`;
      fetch(url, {
        method: "get",
        credentials: "include",
      })
        .then((res) => res.text())
        .then((data) => {
          // alert(data);
          if (data === `fail`) {
            this.$notify.error({
              title: "错误",
              message:
                "您现在是游客身份或者登录身份信息已过期，无权限编辑个人信息哦😶，3s后将跳转到登录界面！",
            });
            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 3000);
          }
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
    },
    addEmotion(e) {
      this.mycomment += e;
    },
  },
  watch: {
    obj(n, o) {
      this.comment = n;
    },
  },
};
</script>

<style scoped>
#comment {
  overflow: hidden;
  width: 100%;
  min-height: 200px;
  margin-top: 30px;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  width: 100%;
  min-height: 200px;
  background: var(--background2);
  border: 1px solid var(--text3);
}
#comment #entrance {
  border-top: 1px solid var(--text3);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 50px;
  background: var(--background3);
}
#comment #entrance img {
  object-fit: cover;
  margin-right: 30px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
#comment #entrance /deep/ .el-input__inner {
  background: var(--background3);
}
#comment #reply {
  width: 100%;
  /* min-height: 100px; */
  background: var(--background3);
  border-top: 1px solid var(--text3);
  /* border-bottom: 1px solid var(--text3); */
  display: flex;
  flex-direction: column;
  align-items: center;
}
#comment #reply .box {
  width: 95%;
  margin-top: 10px;
  min-height: 20px;
  /* background: pink; */
}
#comment #reply .box .head .like {
  right: 0;
  transform: scale(0.8);
  position: absolute;
}
#comment #reply .box .main {
  box-sizing: border-box;
  width: calc(100%-18px);
  padding: 5px 28px;
  margin-left: 18px;
  border-left: 1.5px solid var(--text3);
}
#comment #floor {
  box-sizing: border-box;
  width: 100%;
  /* height: 100px; */
  padding: 10px;
  /* background: pink; */
}
#comment .head {
  position: relative;
  align-items: center;
  height: 40px;
  display: flex;
}
#comment .head img {
  object-fit: cover;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
#comment .head strong {
  margin-left: 6px;
}
#comment .head span {
  color: var(--text3);
  margin-left: 20px;
}
#comment #floor .content {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
#comment #floor .footer {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: space-between;
  /* margin-bottom: 10px; */
}
#comment .like {
  height: 26px;
  padding: 8px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid var(--text3);
  background: var(--background1);
}
#commentEditor {
  /* margin-top: 20px; */
  overflow: hidden;
  font-size: 0.875rem;
  /* border-radius: 0.25rem; */
  width: 100%;
  min-height: 200px;
  background: var(--background2);
  border-top: 1px solid var(--text3);
}
#commentEditor .main {
  margin: 0 auto;
  width: 98%;
  margin-top: 10px;
}

#commentEditor .footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* float: right; */
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
}
#commentEditor .footer small {
  color: var(--text3);
}
#commentEditor .menu {
  position: relative;
  display: flex;
  height: 45px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  background: var(--background3);
  border-bottom: 1px solid var(--text3);
}
#commentEditor .main /deep/ .el-textarea__inner {
  color: var(--text1);
  font-size: 18px;
  background: var(--background3);
}
#commentEditor .menu .write {
  position: absolute;
  bottom: -1px;
  left: 10px;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  background: var(--background2);
  border-top: 1px solid var(--text3);
  border-left: 1px solid var(--text3);
  border-right: 1px solid var(--text3);
  border-bottom: 1px solid var(--background2);
  height: 80%;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#commentEditor .menu .emotions {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-top: 10px;
  margin-left: 100px;
  border: 1px solid var(--text3);
}
#commentEditor .menu .emotions:hover .emotionsBox {
  display: flex;
}
#commentEditor .menu .emotions .emotionsBox {
  z-index: 999;
  display: none;
  position: absolute;
  left: -40px;
  top: calc(80% + 5px);
  width: 146px;
  height: 80px;
  border-radius: 8px;
  background: var(--background2);
  border: 1px solid var(--text3);
  /* display: flex; */
  flex-wrap: wrap;
  padding: 10px;
}
#commentEditor .menu .emotions .emotionsBox .emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 50%;
  border-radius: 4px;
}
#commentEditor .menu .emotions .emotionsBox .emoji:hover {
  font-size: 20px;
  background: var(--background6);
  transition: 0.3s;
}
</style>