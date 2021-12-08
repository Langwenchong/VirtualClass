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
        <div class="like">🤝 {{ comment.like }}</div>
        <small>{{ comment.comments.length }} replies</small>
      </div>
    </div>
    <div id="reply">
      <div class="box" v-for="(item, j) in comment.comments" :key="j">
        <div class="head">
          <img :src="item.avatar" alt="" />
          <strong>{{ item.name }}</strong>
          <span>{{ item.time }}</span>
          <div class="like">🤝 {{ item.like }}</div>
        </div>
        <div class="main">{{ item.content }}</div>
      </div>
    </div>
    <div id="entrance" v-show="!show">
      <img :src="me" alt="" />
      <el-input
        v-model="input"
        placeholder="Write a Reply"
        @focus="show = true"
      ></el-input>
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
            @click="show = false"
            class="button"
            style="filter: brightness(120%); opacity: 0.9"
            >Cancel</el-button
          >
          <el-button
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
    addEmotion(e) {
      this.mycomment += e;
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
  min-height: 100px;
  background: var(--background3);
  border-top: 1px solid var(--text3);
  border-bottom: 1px solid var(--text3);
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
  font-size: 0.875rem;
  border-radius: 0.25rem;
  width: 100%;
  min-height: 200px;
  background: var(--background2);
  /* border: 1px solid var(--text3); */
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