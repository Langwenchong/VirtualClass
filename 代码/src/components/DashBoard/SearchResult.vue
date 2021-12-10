<template>
  <div id="Index">
    <div class="main animate__animated animate__fadeIn">
      <p class="wall">
        <img
          src="../../../static/images/icon1.png"
          height="30px"
        />为您搜索<strong>{{courses.length}}</strong>门课程&nbsp;
        <i class="fad fa-angle-double-right"></i>
      </p>
      <div class="info-gallery">
        <div class="wrapper">
          <div
            class="card"
            v-for="(card, i) in courses"
            :key="card.title + card.teacher"
            @click="goto(i)"
          >
            <div class="headimg">
              <img src="../../../static/images/class.png" />
            </div>
            <div class="content">
              <div class="top-c">
                <p class="title">{{ card.cname }}</p>
                <p class="teacher">{{ card.teacher }}</p>
              </div>
              <div class="bottom-c">
                <p class="snum">{{ card.duration }}课时</p>
                <p class="info">{{ card.cdesc }}</p>
              </div>
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
    var url = `https://vclass.api.cheeseburgerim.space/course/api/search?keyword=${sessionStorage.getItem(
      "search"
    )}`;
    fetch(url, {
      method: `get`,
      credentials: `include`,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.courses = data;
      });
  },
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    refresh(idx) {
      var arr = this.courses[idx].data;
      for (let j = 0; j < 10; j++) {
        arr.push(arr[j]);
      }
      arr.splice(0, 10);
      // console.log(arr[0].id);
    },
    goto(i) {
      var teacherUsername = this.courses[i].username;
      var cname = this.courses[i].cname;
      sessionStorage.setItem("teacherUsername", this.courses[i].username);
      sessionStorage.setItem("cname", this.courses[i].cname);
      this.$router.push({
        name: "log",
      });
      // console.log("goto!");
    },
  },
  name: "SearchResult",
};
</script>


<style scoped>
#Index {
  /* padding-left: 90px; */
  width: 100%;
  /* height: 100vh; */
  /* background: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
#Index strong{
  color: var(--text4);
}
#Index p {
  margin: 0;
  padding: 0;
}
#Index .main {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 120px;
  /* min-height:800px; */
  /* background: pink; */
  display: flex;
  flex-direction: column;
}

#Index .main .info-gallery {
  margin-top: 40px;
  width: 100%;
  /* height: 400px; */
  margin-bottom: 40px;
}

#Index .main .info-gallery .wrapper {
  width: 100%;
  /* min-height: 100vh; */
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  /* background:pink; */
}
#Index .main .info-gallery .wrapper .card {
  margin-left: 25px;
  width: 232px;
  background: #fff;
  height: 320px;
  border-radius: 8px;
  overflow: hidden;
  transition: 0.2s;
  cursor: pointer;
  background: var(--background2);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 0 3px rgba(0, 0, 0, 0.02);
}
#Index .main .info-gallery .wrapper .card:hover {
  box-shadow: 0 4px 16px 0 rgb(0 0 0 / 12%);
}
#Index .main .info-gallery .wrapper .card .headimg {
  width: 100%;
  height: 45%;
  overflow: hidden;
}
#Index .main .info-gallery .wrapper .card:hover .headimg img {
  transform: scale(1.1);
  filter: brightness(70%);
}
#Index .main .info-gallery .wrapper .card .headimg img {
  transition: 1s;
  width: 100%;
}
#Index .main .info-gallery .wrapper .card .content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 55%;
  /* background:pink; */
  padding: 10px 12px;
  box-sizing: border-box;
}
#Index .main .info-gallery .wrapper .card .content .top-c {
  width: 100%;
  height: 40%;
  /* background:#475669; */
}
#Index .main .info-gallery .wrapper .card .content .top-c .title {
  font-size: 14px;
  font-weight: 700;
  font-family: "PingFangSC-Medium", "PingFangSC";
}
#Index .main .info-gallery .wrapper .card .content .top-c .teacher {
  margin-top: 3px;
  font-size: 12px;
  color: var(--text2);
}
#Index .main .info-gallery .wrapper .card .content .bottom-c {
  width: 100%;
  height: 50%;
  /* background:pink; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#Index .main .info-gallery .wrapper .card .content .bottom-c .snum {
  font-size: 12px;
  color: var(--text3);
}
#Index .main .info-gallery .wrapper .card .content .bottom-c .info {
  width: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  background: var(--background3);
  height: calc(100% - 10px);
  color: var(--text3);
  font-size: 14px;
  padding: 10px 12px;
  /* display: -webkit-box; */
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
#Index .main .wall {
  margin: 0;
  margin-top: 40px;
  padding: 0;
  position: relative;
  height: 36px;
  line-height: 36px;
  text-align: left;
  font-size: 24px;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: var(--text1);
  margin-bottom: 20px;
  letter-spacing: 4px;
}
/* #Index .main .wall:before {
  position: absolute;
  content: "";
  top: 50%;
  right: 0;
  width: 85%;
  height: 50%;
  border-top: 1px dashed var(--text1);
} */
@media screen and (max-width:630px) {
  #Index .main{
    padding: 0 5px;
  }
}
</style>
