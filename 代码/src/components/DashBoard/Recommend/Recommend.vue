<template>
  <div id="Recommend">
    <div class="head animate__animated animate__fadeInDown">
      <div class="gallery">
        <el-carousel :interval="4000" type="card" height="260px" indicator-position="none">
          <el-carousel-item v-for="img in imgs" :key="img">
            <img class="gallery-img" :src="img" @click="goto"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="main animate__animated animate__fadeIn">
      <p class="wall">
        <img src="../../../../static/images/icon1.png" height="30px" />强烈推荐&nbsp;
        <i class="fad fa-angle-double-right"></i>
      </p>
      <div class="info-gallery">
        <el-carousel :interval="5000" arrow="auto" indicator-position="none">
          <el-carousel-item v-for="item in rmdClasses" :key="item.group">
            <div class="wrapper">
              <div class="card" v-for="card in item.data" :key="card.id">
                <div class="headimg">
                  <img :src="card.img" />
                </div>
                <div class="content">
                  <div class="top-c">
                    <p class="title">{{card.title}}</p>
                    <p class="teacher">{{card.teacher}}</p>
                  </div>
                  <div class="bottom-c">
                    <p class="snum">{{card.snum}}人参加</p>
                    <p class="info">{{card.info}}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="column-gallery">
        <el-carousel :interval="5000" arrow="auto" height="108px" indicator-position="none">
          <el-carousel-item v-for="col in columns" :key="col.group">
            <div class="wrapper">
              <img v-for="pic in col.data" :key="pic" :src="pic" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <p class="wall">
        <img src="../../../../static/images/icon2.png" height="30px" />课程排名&nbsp;
        <i class="fad fa-angle-double-right"></i>
      </p>
      <div class="rate-gallery">
        <div class="gallery">
          <div class="head">
            <img src="../../../../static/images/icon3.png" height="20px" />
            <b>热门排行</b>
            <p class="top">top10</p>
            <em>POPULAR COURSES</em>
          </div>
          <div class="main">
            <el-carousel :interval="5000" arrow="auto" height="430px" indicator-position="none">
              <el-carousel-item v-for="(rate,k) in rates1" :key="rate.group">
                <div class="wrapper">
                  <div class="card" v-for="(rt,i) in rate.data" :key="rt.id">
                    <p class="rate">{{k*5+i+1}}</p>
                    <img :src="rt.img" />
                    <p class="title">{{rt.title}}</p>
                    <p class="teacher">{{rt.teacher}}</p>
                    <p class="snum">{{rt.snum}}人参加</p>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="gallery">
          <div class="head">
            <img src="../../../../static/images/icon3.png" height="20px" />
            <b>新课排行</b>
            <p class="top">top10</p>
            <em>NEW COURSES</em>
          </div>
          <div class="main">
            <el-carousel :interval="5000" arrow="auto" height="430px" indicator-position="none">
              <el-carousel-item v-for="(rate,k) in rates2" :key="rate.group">
                <div class="wrapper">
                  <div class="card" v-for="(rt,i) in rate.data" :key="rt.id">
                    <p class="rate">{{k*5+i+1}}</p>
                    <img :src="rt.img" />
                    <p class="title">{{rt.title}}</p>
                    <p class="teacher">{{rt.teacher}}</p>
                    <p class="snum">{{rt.snum}}人参加</p>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="gallery">
          <div class="head">
            <img src="../../../../static/images/icon3.png" height="20px" />
            <b>五星好评</b>
            <p class="top">top10</p>
            <em>FIVE STARTS</em>
          </div>
          <div class="main">
            <el-carousel :interval="5000" arrow="auto" height="430px" indicator-position="none">
              <el-carousel-item v-for="(rate,k) in rates3" :key="rate.group">
                <div class="wrapper">
                  <div class="card" v-for="(rt,i) in rate.data" :key="rt.id">
                    <p class="rate">{{k*5+i+1}}</p>
                    <img :src="rt.img" />
                    <p class="title">{{rt.title}}</p>
                    <p class="teacher">{{rt.teacher}}</p>
                    <p class="snum">{{rt.snum}}人参加</p>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <p class="wall">
        <img src="../../../../static/images/icon4.png" height="30px" />名师推荐&nbsp;
        <i class="fad fa-angle-double-right"></i>
      </p>
      <div class="teacher-gallery">
        <div class="card" v-for="el in teachers" :key="el.name">
          <div class="avatar">
            <img :src="el.avatar" />
          </div>
          <p class="name">{{el.name}}</p>
          <p class="intro">{{el.intro}}</p>
          <p class="class">指导《{{el.class}}》</p>
        </div>
      </div>
      <div class="course-gallery">
        <transition-group>
          <div class="course" v-for="(course,idx) in courses" :key="course.title">
            <p class="wall">
              <img :src="course.icon" height="30px" />
              {{course.title}}&nbsp;
              <i class="fad fa-angle-double-right"></i>
            </p>
            <div class="gallery">
              <div class="head">
                <div class="refresh" @click="refresh(idx)">
                  <i class="fad fa-redo"></i>
                  <span>换一换</span>
                </div>
                <div class="more">
                  <span>更多</span>
                  <i class="fad fa-angle-right"></i>
                </div>
              </div>
              <gallery :data="course.data"></gallery>
            </div>
          </div>
        </transition-group>
      </div>
      <p class="wall">
        <img src="../../../../static/images/icon5.png" height="30px" />用户故事&nbsp;
        <i class="fad fa-angle-double-right"></i>
      </p>
      <div class="user-gallery">
        <img
          class="bg"
          src="https://edu-image.nosdn.127.net/007fec8fd79a452ab6b6cc2bd46a575e.png?imageView&quality=100"
          alt="bg"
        />
        <div class="left-p">
          <div class="box">
            <div class="avatar">
              <img :src="users[0].avatar" />
            </div>
            <div class="user">
              <p class="name">{{users[0].name}}</p>
              <p class="status">{{users[0].status}}</p>
            </div>
            <p class="comment">{{users[0].comment}}</p>
          </div>
          <div class="box">
            <div class="avatar">
              <img :src="users[1].avatar" />
            </div>
            <div class="user">
              <p class="name">{{users[1].name}}</p>
              <p class="status">{{users[1].status}}</p>
            </div>
            <p class="comment">{{users[1].comment}}</p>
          </div>
        </div>
        <div class="right-p">
          <div class="box">
            <div class="avatar">
              <img :src="users[2].avatar" />
            </div>
            <div class="user">
              <p class="name">{{users[2].name}}</p>
              <p class="status">{{users[2].status}}</p>
            </div>
            <p class="comment">{{users[2].comment}}</p>
          </div>
          <div class="box">
            <div class="avatar">
              <img :src="users[3].avatar" />
            </div>
            <div class="user">
              <p class="name">{{users[3].name}}</p>
              <p class="status">{{users[3].status}}</p>
            </div>
            <p class="comment">{{users[3].comment}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="logo">
        <img
          src="https://edu-image.nosdn.127.net/6531D913BDB804B34ABF22325EC2305E.png?imageView&thumbnail=1200y160&quality=100"
        />
        <img id="logo" src="../../../../static/images/logo.png" />
      </div>
      <div class="start">
        <p class="intro">VClass,让学习变得更简单！VClass,Easy Learning!</p>
        <img
          src="https://edu-image.nosdn.127.net/0d4ef20d23f2493da83c26f68e9f1ce3.png?imageView&quality=100"
        />
        <el-button type="success" class="button" round>开启学习之旅</el-button>
      </div>
    </div>
  </div>
</template>


<script>
import gallery from "@/components/DashBoard/Recommend/gallery.vue";
export default {
  components: {
    gallery
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
    goto() {
      this.$router.push({ name: "chart" });
      // console.log("goto!");
    }
  },
  name: "Recommend",
  data() {
    return {
      imgs: [
        "http://edu-image.nosdn.127.net/1aec4e08767e4fc682802e30050094c1.png?imageView&quality=100&thumbnail=776y360",
        "http://edu-image.nosdn.127.net/2a602c9451e44cd4b81127ae9005019c.png?imageView&quality=100&thumbnail=1552y720",
        "http://edu-image.nosdn.127.net/52191bb5e19e442fb1e2c6c4d8b398fa.png?imageView&quality=100",
        "http://edu-image.nosdn.127.net/3dea76e6c82547d8b67c04f25cfd17e4.png?imageView&quality=100"
      ],
      rmdClasses: [
        {
          group: 1,
          data: [
            {
              id: "1",
              teacher: "郎文翀",
              snum: 999,
              img:
                "https://edu-image.nosdn.127.net/F3CE2156FD745D85B908B094D4BAD3AD.jpg?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "积淀之美-考古学的艺术",
              info: "hhhhaaaaaa"
            },
            {
              id: "2",
              teacher: "潘祎哲",
              snum: 999,
              img:
                "https://edu-image.nosdn.127.net/C400754FE41D7D8F77F4B5AA60C55E2E.jpg?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "大学物理",
              info: "hhhhaaaaaa"
            },
            {
              id: "3",
              teacher: "李华",
              snum: 999,
              img:
                "https://edu-image.nosdn.127.net/dff0b1b3ac45467f88551df695fa7526.PNG?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "大学英语",
              info: "hhhhaaaaaa"
            },
            {
              id: "4",
              teacher: "白杨",
              snum: 999,
              img:
                "https://edu-image.nosdn.127.net/2099D4127E3C68D32543377472FFBC57.jpg?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "商务与经济",
              info: "hhhhaaaaaa"
            },
            {
              id: "6",
              teacher: "黄硕",
              snum: 999,
              img:
                "https://edu-image.nosdn.127.net/d3ea414ce7bf4b5897d4c3c4aa4e2779.JPG?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "香花食草辩药材",
              info: "hhhhaaaaaa"
            }
          ]
        },
        {
          group: 2,
          data: [
            {
              id: "7",
              teacher: "吴老师",
              snum: 999,
              img:
                "https://edu-image.nosdn.127.net/F3CE2156FD745D85B908B094D4BAD3AD.jpg?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "操作系统",
              info: "hhhhaaaaaa"
            },
            {
              id: "8",
              teacher: "李老师",
              snum: 999,
              img:
                "https://edu-image.nosdn.127.net/56CBF136458494DA8CC559F28CB92FBA.jpg?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "机组原理",
              info: "hhhhaaaaaa"
            },
            {
              id: "9",
              teacher: "Java面向对象变成",
              snum: 999,
              img:
                "https://edu-image.nosdn.127.net/2cb6817b3e944faba2bdb404417ed15c.jpg?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "陈先生",
              info: "hhhhaaaaaa"
            },
            {
              id: "10",
              teacher: "张宇",
              snum: 999,
              img:
                "https://edu-image.nosdn.127.net/d3ea414ce7bf4b5897d4c3c4aa4e2779.JPG?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "高等数学(上)",
              info: "hhhhaaaaaa"
            },
            {
              id: "11",
              teacher: "啦啦啦",
              snum: 999,
              img:
                "https://edu-image.nosdn.127.net/dff0b1b3ac45467f88551df695fa7526.PNG?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "科目二点位精讲",
              info: "hhhhaaaaaa"
            }
          ]
        }
      ],
      columns: [
        {
          group: 1,
          data: [
            "https://edu-image.nosdn.127.net/4a5d048cc09e406fa9763ca15ef4d6a5.jpg?imageView&quality=100",
            "https://edu-image.nosdn.127.net/282f6efb52214dc79c4b9add694f2fb7.png?imageView&quality=100",
            "https://edu-image.nosdn.127.net/6e017bb4313746608c399a52bfd1f77e.png?imageView&quality=100"
          ]
        },
        {
          group: 2,
          data: [
            "https://edu-image.nosdn.127.net/5dec4a7d0fa343bab54db391be82275f.png?imageView&quality=100",
            "https://edu-image.nosdn.127.net/19f882914a4f4ec4b388a5e91e22ff76.png?imageView&quality=100",
            "https://edu-image.nosdn.127.net/3181bc0278be45d0822fe5b107a119ae.png?imageView&quality=100"
          ]
        }
      ],
      rates1: [
        {
          group: 1,
          data: [
            {
              id: 1,
              img:
                "https://edu-image.nosdn.127.net/7F0ED3BC27136DFB4851589CB6D8F395.jpg?imageView&quality=100&thumbnail=230y130",
              title: "投资学",
              teacher: "lwc",
              snum: 51
            },
            {
              id: 2,
              img:
                "https://edu-image.nosdn.127.net/5f4fd114e34a4198b8249cd2987c3269.png?imageView&quality=100&thumbnail=230y130",
              title: "英语语法与写作",
              teacher: "lwc",
              snum: 908
            },
            {
              id: 3,
              img:
                "https://img-ph-mirror.nosdn.127.net/tYhzuDVilzlDOo2bEyH_Qg==/6608226511143817333.jpg?imageView&quality=100&thumbnail=230y130",
              title: "C语言入门课程",
              teacher: "lwc",
              snum: 908
            },
            {
              id: 4,
              img:
                "https://edu-image.nosdn.127.net/848bbd80d8254457a8825ee8410bbedc.png?imageView&quality=100&thumbnail=230y130",
              title: "英语核心单词2000词汇",
              teacher: "lwc",
              snum: 106
            },
            {
              id: 5,
              img:
                "https://edu-image.nosdn.127.net/1de6247cb61743a2ab6aa2b75cad77b1.jpg?imageView&quality=100&thumbnail=230y130",
              title: "形势与政策",
              teacher: "lwc",
              snum: 8
            }
          ]
        },
        {
          group: 2,
          data: [
            {
              id: 6,
              img:
                "https://edu-image.nosdn.127.net/485C64A7504CECA2F8FF346AC6DE1D71.jpg?imageView&quality=100&thumbnail=230y130",
              title: "python进阶培训",
              teacher: "lwc",
              snum: 51
            },
            {
              id: 7,
              img:
                "https://img-ph-mirror.nosdn.127.net/q2XczeV8sM39-JeEUUzBmw==/765330461776469721.jpg?imageView&quality=100&thumbnail=230y130",
              title: "马克思主义理论",
              teacher: "lwc",
              snum: 908
            },
            {
              id: 8,
              img:
                "https://edu-image.nosdn.127.net/a92f55010478434c82787347c0e88312.png?imageView&quality=100&thumbnail=230y130",
              title: "抑郁症的心力教导",
              teacher: "lwc",
              snum: 908
            },
            {
              id: 9,
              img:
                "https://img-ph-mirror.nosdn.127.net/464exAr0XsMtsR5GwxV1qg==/6630522407932534183.jpg?imageView&quality=100&thumbnail=230y130",
              title: "通信原理",
              teacher: "lwc",
              snum: 106
            },
            {
              id: 5,
              img:
                "https://edu-image.nosdn.127.net/793EADDE7EC362DA3DCDFDD0F67A6C1C.jpg?imageView&quality=100&thumbnail=230y130",
              title: "古代汉文学",
              teacher: "lwc",
              snum: 8
            }
          ]
        }
      ],
      rates2: [
        {
          group: 1,
          data: [
            {
              id: 1,
              img:
                "https://edu-image.nosdn.127.net/89A1B1D3E8C699D656DA3622635128A1.png?imageView&quality=100&thumbnail=230y130",
              title: "心理学与生活",
              teacher: "lwc",
              snum: 51
            },
            {
              id: 2,
              img:
                "https://edu-image.nosdn.127.net/79d75625456f4fb187169456c780cf57.JPG?imageView&quality=100&thumbnail=230y130",
              title: "项目管理",
              teacher: "lwc",
              snum: 908
            },
            {
              id: 3,
              img:
                "https://edu-image.nosdn.127.net/B2356C462244CC6CDB468A48C6B38C79.png?imageView&quality=100&thumbnail=230y130",
              title: "人人爱设计",
              teacher: "lwc",
              snum: 908
            },
            {
              id: 4,
              img:
                "https://edu-image.nosdn.127.net/df6153b258e647118447179de30501a8.png?imageView&quality=100&thumbnail=230y130",
              title: "猴老师教恋爱",
              teacher: "lwc",
              snum: 106
            },
            {
              id: 5,
              img:
                "https://edu-image.nosdn.127.net/AF4160F78F86122F42EE129993ECF535.jpg?imageView&quality=100&thumbnail=230y130",
              title: "广告学",
              teacher: "lwc",
              snum: 8
            }
          ]
        },
        {
          group: 2,
          data: [
            {
              id: 6,
              img:
                "https://edu-image.nosdn.127.net/386fc33f9258441aa3b38daab53e78b5.png?imageView&quality=100&thumbnail=230y130",
              title: "证券投资学",
              teacher: "lwc",
              snum: 51
            },
            {
              id: 7,
              img:
                "https://img-ph-mirror.nosdn.127.net/bl66nuertVhdJSV22OrJVw==/6619386554165104317.jpg?imageView&quality=100&thumbnail=230y130",
              title: "医学统计学",
              teacher: "lwc",
              snum: 908
            },
            {
              id: 8,
              img:
                "https://img-ph-mirror.nosdn.127.net/Ove82eB-nUtuC-8mfX7EMQ==/6630543298653738028.jpg?imageView&quality=100&thumbnail=230y130",
              title: "哈工大计算机网络",
              teacher: "lwc",
              snum: 908
            },
            {
              id: 9,
              img:
                "https://edu-image.nosdn.127.net/02C38D94EAF36ADA27E76E19C82FEEDE.jpg?imageView&quality=100&thumbnail=230y130",
              title: "班主任的沟通艺术",
              teacher: "lwc",
              snum: 106
            },
            {
              id: 5,
              img:
                "https://edu-image.nosdn.127.net/2EDDA6884EDEDEF80232A2405C6EE65B.jpeg?imageView&quality=100&thumbnail=230y130",
              title: "中国近现代史纲要",
              teacher: "lwc",
              snum: 8
            }
          ]
        }
      ],
      rates3: [
        {
          group: 1,
          data: [
            {
              id: 1,
              img:
                "https://edu-image.nosdn.127.net/B3128B6136B8C5797CB78F06D74CC1F7.png?imageView&quality=100&thumbnail=230y130",
              title: "机械设计基础",
              teacher: "lwc",
              snum: 51
            },
            {
              id: 2,
              img:
                "https://edu-image.nosdn.127.net/7af627a6874b4980842715eda8505d1d.png?imageView&quality=100&thumbnail=230y130",
              title: "猴老师教高数",
              teacher: "lwc",
              snum: 908
            },
            {
              id: 3,
              img:
                "https://edu-image.nosdn.127.net/A13D931FB96F059116B4BC6C15EB1084.png?imageView&quality=100&thumbnail=230y130",
              title: "编程思维CAP",
              teacher: "lwc",
              snum: 908
            },
            {
              id: 4,
              img:
                "https://edu-image.nosdn.127.net/2ee75ea3c5b0480cac73f436152298ef.png?imageView&quality=100&thumbnail=230y130",
              title: "武忠祥高等数学",
              teacher: "lwc",
              snum: 106
            },
            {
              id: 5,
              img:
                "https://edu-image.nosdn.127.net/CB373566E832FC58205F5DB1062A199B.jpg?imageView&quality=100&thumbnail=230y130",
              title: "植物生理学",
              teacher: "lwc",
              snum: 8
            }
          ]
        },
        {
          group: 2,
          data: [
            {
              id: 6,
              img:
                "https://edu-image.nosdn.127.net/7B01E4A6FA284E74AA1B40CA96F6191F.jpg?imageView&quality=100&thumbnail=230y130",
              title: "人体解剖学",
              teacher: "lwc",
              snum: 51
            },
            {
              id: 7,
              img:
                "https://img-ph-mirror.nosdn.127.net/bl66nuertVhdJSV22OrJVw==/6619386554165104317.jpg?imageView&quality=100&thumbnail=230y130",
              title: "医学统计学",
              teacher: "lwc",
              snum: 908
            },
            {
              id: 8,
              img:
                "https://edu-image.nosdn.127.net/01D32E41E2C627925A0120E645CB5407.jpg?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "微积分",
              teacher: "lwc",
              snum: 908
            },
            {
              id: 9,
              img:
                "https://edu-image.nosdn.127.net/8FF460DF76847AF9AFF19B1574B28B7C.jpg?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "食品化学",
              teacher: "lwc",
              snum: 106
            },
            {
              id: 10,
              img:
                "https://edu-image.nosdn.127.net/543A904AFB0DD5E02D6F9A34A197FFD8.JPG?imageView&quality=100&thumbnail=230y130&type=webp",
              title: "英汉交替传译",
              teacher: "lwc",
              snum: 8
            }
          ]
        }
      ],
      teachers: [
        {
          name: "玛卡巴卡",
          avatar:
            "https://tse3-mm.cn.bing.net/th/id/OIP-C.D78Rm6BitPmfKlfW-RyNEgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7",
          intro:
            "玛卡巴卡老师精通20国语言，讲解的课程课程内容涵盖非常丰富，并且深入浅出的讲解了金融风险管理的相关知识，网络课程可以很好的满足我们自主学习的时间安排，方便灵活！",
          class: "玛卡巴卡的金融风险投资教学"
        },
        {
          name: "唔西迪西",
          avatar:
            "https://tse2-mm.cn.bing.net/th/id/OIP-C.8f1QRUE5ex6WC6ds_yARPgAAAA?w=137&h=150&c=7&r=0&o=5&dpr=1.25&pid=1.7",
          intro:
            "唔西迪西老师精通20国语言，讲解的课程课程内容涵盖非常丰富，并且深入浅出的讲解了金融风险管理的相关知识，网络课程可以很好的满足我们自主学习的时间安排，方便灵活！",
          class: "唔西迪西的金融风险投资教学"
        },
        {
          name: "汤姆波利柏",
          avatar:
            "https://tse2-mm.cn.bing.net/th/id/OIP-C.YyhGd5Mm7NnQ0H4kcCnxJAHaFt?w=233&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7",
          intro:
            "汤姆波利柏老师精通20国语言，讲解的课程课程内容涵盖非常丰富，并且深入浅出的讲解了金融风险管理的相关知识，网络课程可以很好的满足我们自主学习的时间安排，方便灵活！",
          class: "汤姆波利伯的金融风险投资教学"
        },
        {
          name: "依古比古",
          avatar:
            "https://tse3-mm.cn.bing.net/th/id/OIP-C.7Oswo2ZthNXhUMI1C343ygAAAA?w=141&h=150&c=7&r=0&o=5&dpr=1.25&pid=1.7",
          intro:
            "依古比古老师精通20国语言，讲解的课程课程内容涵盖非常丰富，并且深入浅出的讲解了金融风险管理的相关知识，网络课程可以很好的满足我们自主学习的时间安排，方便灵活！",
          class: "依古比古的金融风险投资教学"
        }
      ],
      courses: [
        {
          title: "国家精品课",
          icon: "../../../../static/images/icon6.png",
          data: [
            {
              id: 1,
              title: "外国文学史(一)",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://edu-image.nosdn.127.net/415E95A3AE202FE70355AEB512897728.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 2,
              title: "学术交流英语",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://edu-image.nosdn.127.net/70B4370822EDE4713F767D5081EFCA99.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 3,
              title: "信号与系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 4,
              title: "Python数据分析与展示",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://edu-image.nosdn.127.net/485C64A7504CECA2F8FF346AC6DE1D71.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 5,
              title: "巧克毕业论文",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://edu-image.nosdn.127.net/5C90D278C5AE1CDE6A15D2B279F68D0F.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 6,
              title: "3D工程图学",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://edu-image.nosdn.127.net/121B5395FC0F8F724B7649D5C23F8AB6.png?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 7,
              title: "信息素养与实践",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://edu-image.nosdn.127.net/948C32728D21739C45D0BD2A7A218893.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 8,
              title: "基于JAVA面向对象的编程范式",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://edu-image.nosdn.127.net/59FA97F2B603AE77A5358E8754133D84.png?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 9,
              title: "教师如何做研究",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/5ybpa37RTQyqnEkGweFWwQ==/6631208503186898977.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 10,
              title: "flash动画设计与制作",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://edu-image.nosdn.127.net/3A0426D60E72A4FE8426D78BFBF9C07E.png?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 11,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 12,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 13,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 14,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 15,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 16,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 17,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 18,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 19,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 20,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            }
          ]
        },
        {
          title: "考研必备",
          icon: "../../../../static/images/icon7.png",
          data: [
            {
              id: 1,
              title: "23考研计算机拔尖课程",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://edu-image.nosdn.127.net/0428bc6a8a5f4695a1dffce0b8eca404.png?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 2,
              title: "4小时学完C语言",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://edu-image.nosdn.127.net/5303562bded64d1d85542faa9adfdb0d.png?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 3,
              title: "3天记忆力全面提升",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://edu-image.nosdn.127.net/7B362A56EF59F97498589C12689C34FB.png?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 4,
              title: "中国近现代史纲要",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://edu-image.nosdn.127.net/2EDDA6884EDEDEF80232A2405C6EE65B.jpeg?imageView&quality=100&thumbnail=230y130"
            },
            {
              id: 5,
              title: "古建筑艺术",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/ablecommons/demo/202010/6146067379cb4574b1369e777f37d424_s1.jpg"
            },
            {
              id: 6,
              title: "人文与艺术",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/ablecommons/demo/202010/a60c37c6c10e4dd9ab9ed88f57cdc4bd_s1.jpg"
            },
            {
              id: 7,
              title: "玩转PS",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/201811/4b5bfc20772c49e29d45da7fa52a30ef_s1.jpg"
            },
            {
              id: 8,
              title: "言语交际与人际沟通",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/201810/9d63d1186f5741bda12e9cb0dde635ff_s1.jpg"
            },
            {
              id: 9,
              title: "中级财务会计",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/201809/bbd3493bc42841ae9d19df9bc7f5da1e_s1.jpg"
            },
            {
              id: 10,
              title: "公共关系学",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/201901/260ea329635347b0ab4ca78d95ac9029_s1.jpg"
            },
            {
              id: 11,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 12,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 13,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 14,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 15,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 16,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 17,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 18,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 19,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 20,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            }
          ]
        },
        {
          title: "心理培训",
          icon: "../../../../static/images/icon8.png",
          data: [
            {
              id: 1,
              title: "爱情修炼手册",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/201808/e3a68f2a69a045f7b43c2bc0c20d3c56_s1.jpg"
            },
            {
              id: 2,
              title: "幸福在哪里",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/201811/3bce1d883f7a449db90cbe1b40ecf9ff_s1.jpg"
            },
            {
              id: 3,
              title: "心理科学与健康",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/201810/ed0410e57ebf44038da7980481a48d72_s1.jpg"
            },
            {
              id: 4,
              title: "一张图读懂内心世界",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/createcourse/course/201903/335cdcb338414b66acbb63572ca52519_s1.jpg"
            },
            {
              id: 5,
              title: "生命与幸福",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/201809/0d54a86f682647b68062e23e2f72b5f8_s1.jpg"
            },
            {
              id: 6,
              title: "现代社交与礼仪",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/201810/7af4ab78db1849d89bd7d680736715cd_s1.jpg"
            },
            {
              id: 7,
              title: "组织行为与领导力",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/201901/d983fb012d144133ae50ede0c97fea3a_s1.png"
            },
            {
              id: 8,
              title: "工作中的心理学",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/201809/a38006cadbc84b23acc60799bc053ef9_s1.jpg"
            },
            {
              id: 9,
              title: "大学生心理素质训练",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/202108/7a06c0af861b4f839623fceeb23f11a7_s1.jpg"
            },
            {
              id: 10,
              title: "跨文化沟通心理学",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://image.zhihuishu.com/zhs/zhsmanage/image/202108/25c11f36692444f08bd87b16aa7667e9_s1.jpg"
            },
            {
              id: 11,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 12,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 13,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 14,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 15,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 16,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 17,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 18,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 19,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            },
            {
              id: 20,
              title: "信号系统",
              teacher: "hs",
              snum: 908,
              time: "23课时",
              img:
                "https://img-ph-mirror.nosdn.127.net/4560JpumWWo2eOLMktvktw==/1170091478204052233.jpg?imageView&quality=100&thumbnail=230y130&type=webp"
            }
          ]
        }
      ],
      users: [
        {
          name: "夏佐",
          avatar:
            "https://edu-image.nosdn.127.net/344B88BAEE67F96BE5D7D3185873C360.png?imageView&thumbnail=200y200&quality=100",
          status: "VClass终生会员",
          comment:
            "我起初的工作是建筑施工的技术员，干了快三年了，想有所提高，成为一名管理人员。一次偶然的机会，我接触到中国大学VClass的《工程项目管理》。课程知识非常实用，在面试时，让我游刃有余。可以说，因为VClass，我开始了人生的新阶段"
        },
        {
          name: "陈睿",
          avatar:
            "https://edu-image.nosdn.127.net/03B3283015E4A7AEBA2F62705D7A6068.png?imageView&thumbnail=94y94&quality=100",
          status: "VClass终生会员",
          comment:
            "我第一次感受到故宫角楼在夕阳下震撼的美，便是在考完《中国古代建筑艺术》之后的那个下午；学完了《不朽的艺术》，再去博物馆不再是陪儿子完成任务了。学习MOOC之前和之后的对比，让我感受最深的就是鲍勃·迪伦的那句“昔日我曾苍老，如今风华正茂” 。"
        },
        {
          name: "崔常山",
          avatar:
            "https://edu-image.nosdn.127.net/D55A842CEACAF57AAB547FDCA8822470.png?imageView&thumbnail=200y200&quality=100",
          status: "VClass终生会员",
          comment:
            "我没有受到正规的大学教育，更没有听过大学老师的讲课。自己的两个本科文凭，都是自考的。因此看到有那么多自己曾经无限羡慕的大学，犹如一个从没有见过糖果的小孩子一下子见到那么多诱人的糖果，那种欣喜若狂，不知道大家能否想象得出…” 。"
        },
        {
          name: "刘瑜",
          avatar:
            "https://edu-image.nosdn.127.net/188D3CE39192F285304A2AA8AAE570D6.png?imageView&thumbnail=200y200&quality=100",
          status: "VClass终生会员",
          comment:
            "原来学习是可以上瘾的。我相信只要找对打开姿势，都会被慕课的魅力所吸引：分课程做笔记；听到精彩的地方，写两笔小感悟；有困惑的地方，在讨论区总有热心的学友们答疑解惑；偶尔还能得到老师的评语，受宠若惊啊。…” 。"
        }
      ]
    };
  }
}


</script>


<style scoped>
#Recommend {
  /* padding-left: 90px; */
  width: 100%;
  /* height: 100vh; */
  /* background: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
#Recommend p {
  margin: 0;
  padding: 0;
}
#Recommend .head {
  width: 100%;
  box-sizing: border-box;
  /* height: 400px; */
  /* background: #000; */
  padding: 20px 120px 0px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
#Recommend .head .gallery {
  width: 100%;
  height: 100%;
  /* background: green; */
}
#Recommend .head .gallery .el-carousel__item {
  border-radius: 1rem;
}

#Recommend .head .gallery .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

#Recommend .head .gallery .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
#Recommend .head .gallery .gallery-img {
  object-fit: cover;
  width: 100%;
}
#Recommend .main {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 120px;
  /* min-height:800px; */
  /* background: pink; */
  display: flex;
  flex-direction: column;
}
#Recommend .main .wall {
  margin: 0;
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
}
#Recommend .main .wall:before {
  position: absolute;
  content: "";
  top: 50%;
  right: 0;
  width: 85%;
  height: 50%;
  border-top: 1px dashed var(--text1);
}
#Recommend .main .info-gallery {
  width: 100%;
  /* height: 400px; */
  margin-bottom: 40px;
}

#Recommend .main .info-gallery .wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  /* background:pink; */
}
#Recommend .main .info-gallery .wrapper .card {
  width: 19%;
  background: #fff;
  height: 95%;
  border-radius: 8px;
  overflow: hidden;
  transition: 0.2s;
  cursor: pointer;
  background: var(--background2);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 0 3px rgba(0, 0, 0, 0.02);
}
#Recommend .main .info-gallery .wrapper .card:hover {
  box-shadow: 0 4px 16px 0 rgb(0 0 0 / 12%);
}
#Recommend .main .info-gallery .wrapper .card .headimg {
  width: 100%;
  height: 45%;
  overflow: hidden;
}
#Recommend .main .info-gallery .wrapper .card:hover .headimg img {
  transform: scale(1.1);
  filter: brightness(70%);
}
#Recommend .main .info-gallery .wrapper .card .headimg img {
  transition: 1s;
  width: 100%;
}
#Recommend .main .info-gallery .wrapper .card .content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 55%;
  /* background:pink; */
  padding: 10px 12px;
  box-sizing: border-box;
}
#Recommend .main .info-gallery .wrapper .card .content .top-c {
  width: 100%;
  height: 40%;
  /* background:#475669; */
}
#Recommend .main .info-gallery .wrapper .card .content .top-c .title {
  font-size: 14px;
  font-weight: 700;
  font-family: "PingFangSC-Medium", "PingFangSC";
}
#Recommend .main .info-gallery .wrapper .card .content .top-c .teacher {
  margin-top: 3px;
  font-size: 12px;
  color: var(--text2);
}
#Recommend .main .info-gallery .wrapper .card .content .bottom-c {
  width: 100%;
  height: 50%;
  /* background:pink; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#Recommend .main .info-gallery .wrapper .card .content .bottom-c .snum {
  font-size: 12px;
  color: var(--text3);
}
#Recommend .main .info-gallery .wrapper .card .content .bottom-c .info {
  width: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  background: var(--background3);
  height: calc(100% - 20px);
  color: var(--text3);
  font-size: 14px;
  box-sizing: border-box;
  padding: 10px 12px;
}
#Recommend .main .column-gallery {
  height: 108px;
  margin-bottom: 20px;
  overflow: hidden;
}
#Recommend .main .column-gallery .wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
#Recommend .main .column-gallery .wrapper img {
  border-radius: 6px;
  width: 32%;
  height: 108px;
}
#Recommend .main .column-gallery .wrapper .el-carousel__item.is-animating {
  height: 108px;
}
#Recommend .main .rate-gallery {
  width: 100%;
  height: 500px;
  /* background:pink; */
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}
#Recommend .main .rate-gallery .gallery {
  width: 390px;
  height: 100%;
  /* background:orange; */
  background: var(--background2);
  box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 0 3px rgb(0 0 0 / 2%);
  border-radius: 4px;
  overflow: hidden;
}
#Recommend .main .rate-gallery .gallery .head {
  height: 68px;
  width: 100%;
  background: var(--background4);
  position: relative;
  /* 有点小烦，用绝对布局暴力定位了~ */
  padding: 0;
  margin: 0;
}
#Recommend .main .rate-gallery .gallery .head img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
}
#Recommend .main .rate-gallery .gallery .head b {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 45px;
  font-size: 18px;
  color: var(--text4);
}
#Recommend .main .rate-gallery .gallery .head .top {
  position: absolute;
  top: 40%;
  left: 125px;
  font-size: 16px;
  color: var(--text4);
}
#Recommend .main .rate-gallery .gallery .head em {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 40px;
  font-size: 16px;
  color: var(--text3);
  opacity: 0.5;
}
#Recommend .main .rate-gallery .gallery .main {
  width: 100%;
  height: calc(100% - 68px);
  /* background: pink; */
  top: 68px;
  padding: 0;
}
#Recommend .main .rate-gallery .gallery .main el-carousel {
  width: 440px;
}
#Recommend .main .rate-gallery .gallery .main .wrapper {
  width: 100%;
  height: 100%;
  /* background:yellow; */
}
#Recommend .main .rate-gallery .gallery .main .wrapper .card {
  width: 100%;
  height: 74px;
  /* background:#000; */
  margin-bottom: 10px;
  position: relative;
}
#Recommend .main .rate-gallery .gallery .main .wrapper .card .rate {
  font-size: 20px;
  color: var(--text1);
  top: 20%;
  left: 20px;
  position: absolute;
  font-weight: 600;
  opacity: 0.7;
}
#Recommend .main .rate-gallery .gallery .main .wrapper .card:first-child .rate {
  color: var(--text4);
}
#Recommend
  .main
  .rate-gallery
  .gallery
  .main
  .wrapper
  .card:nth-child(2)
  .rate {
  color: var(--text4);
  opacity: 0.7;
}
#Recommend
  .main
  .rate-gallery
  .gallery
  .main
  .wrapper
  .card:nth-child(3)
  .rate {
  color: var(--text4);
  opacity: 0.4;
}
#Recommend .main .rate-gallery .gallery .main .wrapper .card img {
  position: absolute;
  width: 112px;
  height: 63px;
  left: 50px;
  border-radius: 6px;
  top: 50%;
  transform: translateY(-50%);
}
#Recommend .main .rate-gallery .gallery .main .wrapper .card .title {
  color: var(--text1);
  font-size: 16px;
  left: 180px;
  position: absolute;
}
#Recommend .main .rate-gallery .gallery .main .wrapper .card .teacher {
  color: var(--text2);
  font-size: 14px;
  left: 180px;
  top: 25px;
  position: absolute;
}
#Recommend .main .rate-gallery .gallery .main .wrapper .card .snum {
  color: var(--text2);
  font-size: 14px;
  left: 180px;
  bottom: 10px;
  font-size: 12px;
  position: absolute;
}
#Recommend .main .teacher-gallery {
  width: 100%;
  height: 220px;
  /* background: pink; */
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#Recommend .main .teacher-gallery .card {
  width: 24%;
  height: 180px;
  /* background: #000; */
  background: var(--background2);
  border-radius: 4px;
  /* overflow: hidden; */
  position: relative;
  transition: 0.2s;
}
#Recommend .main .teacher-gallery .card:hover {
  box-shadow: 0 8px 24px 0 rgb(0 0 0 / 10%);
}
#Recommend .main .teacher-gallery .card .avatar {
  position: absolute;
  width: 56px;
  height: 56px;
  top: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 4px solid #fff;
  left: 15px;
}
#Recommend .main .teacher-gallery .card:hover .avatar {
  animation: shake 1s ease-in-out;
}
@keyframes shake {
  0% {
    transform: scale(1);
  }

  10%,
  20% {
    transform: scale(0.9) rotate(3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale(1.1) rotate(-3deg);
  }

  40%,
  60%,
  80% {
    transform: scale(1.1) rotate(3deg);
  }

  100% {
    transform: scale(1);
  }
}
#Recommend .main .teacher-gallery .card .avatar img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}
#Recommend .main .teacher-gallery .card .name {
  position: absolute;
  top: 10px;
  left: 90px;
  font-size: 14px;
  color: var(--text1);
}
#Recommend .main .teacher-gallery .card .intro {
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 18px;
  top: 50px;
  text-align: justify;
  font-size: 13px;
  color: var(--text3);
  line-height: 22px;
  /* height: 98px; */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  display: -webkit-box;
}
#Recommend .main .teacher-gallery .card .class {
  position: absolute;
  bottom: 15px;
  left: 20px;
  color: var(--text5);
  font-size: 12px;
}
#Recommend .main .course-gallery {
  width: 100%;
  min-height: 300px;
  /* background: pink; */
}
#Recommend .main .course-gallery .head {
  width: 100%;
  height: 40px;
  /* background: #000; */
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: var(--text3);
  margin-bottom: 10px;
}
#Recommend .main .course-gallery .head .refresh {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 70px;
  height: 24px;
  font-size: 14px;
  line-height: 14px;
  border: 1px var(--text6) solid;
  font-weight: 600;
  margin-right: 10px;
  /* border-radius: 8px; */
  transition: 0.5s;
}
#Recommend .main .course-gallery .head .refresh i {
  transition: 0.5s ease-in-out;
}
#Recommend .main .course-gallery .head .refresh:hover i {
  transform: rotate(900deg);
}
#Recommend .main .course-gallery .head .more {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60px;
  height: 24px;
  font-size: 14px;
  line-height: 14px;
  border: 1px var(--text6) solid;
  font-weight: 600;
  margin-right: 2px;
  /* border-radius: 8px; */
  transition: 0.5s;
}
#Recommend .main .course-gallery .head .more i {
  animation: scroll-right 1.5s infinite;
}
@keyframes scroll-right {
  0% {
    transform: translateX(-7px);
    opacity: 0.5;
  }
  50% {
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(-7px);
    opacity: 0.5;
  }
}
#Recommend .main .user-gallery {
  padding: 48px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 500px;
  background: url("https://edu-image.nosdn.127.net/007fec8fd79a452ab6b6cc2bd46a575e.png?imageView&quality=100")
      no-repeat,
    -webkit-gradient(linear, left top, right top, from(#079992), to(#38ada9));
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
}
#Recommend .main .user-gallery .bg {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: rotate(180deg);
}
#Recommend .main .user-gallery .left-p {
  box-sizing: border-box;
  padding: 18px;
  width: 50%;
  height: 100%;
  /* background: pink; */
}
#Recommend .main .user-gallery .left-p .box {
  width: 100%;
  height: 50%;
  /* background: blanchedalmond; */
  position: relative;
}
#Recommend .main .user-gallery .left-p .box .avatar {
  position: absolute;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
}
#Recommend .main .user-gallery .left-p .box .avatar img {
  height: 100%;
  width: 100%;
}
#Recommend .main .user-gallery .left-p .box .user {
  position: absolute;
  left: 60px;
  display: flex;
  align-items: center;
  color: #fff;
}
#Recommend .main .user-gallery .left-p .box .user .name {
  font-weight: 600;
}
#Recommend .main .user-gallery .left-p .box .user .status {
  margin-left: 10px;
  font-size: 12px;
}
#Recommend .main .user-gallery .left-p .box .comment {
  position: absolute;
  box-sizing: border-box;
  width: 440px;
  height: 138px;
  padding: 14px;
  background-color: rgba(255, 255, 255, 0.2);
  /* background: pink; */
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  font-size: 14px;
  left: 60px;
  top: 30px;
  border-radius: 0 12px 12px 12px;
}
#Recommend .main .user-gallery .right-p {
  padding: 18px;
  position: relative;
  box-sizing: border-box;
  width: 50%;
  height: 100%;
  /* background: pink; */
  display: flex;
  justify-content: space-between;
}
#Recommend .main .user-gallery .right-p .box {
  width: 500%;
  height: 100%;
  /* background: blanchedalmond; */
  position: relative;
}
#Recommend .main .user-gallery .right-p .box .avatar {
  position: absolute;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
}
#Recommend .main .user-gallery .right-p .box .avatar img {
  width: 100%;
  height: 100%;
}
#Recommend .main .user-gallery .right-p .box .user {
  position: absolute;
  left: 60px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  color: #fff;
}
#Recommend .main .user-gallery .right-p .box .user .name {
  font-weight: 600;
}
#Recommend .main .user-gallery .right-p .box .user .status {
  margin-top: 5px;
  font-size: 12px;
}
#Recommend .main .user-gallery .right-p .box .comment {
  position: absolute;
  box-sizing: border-box;
  width: 230px;
  height: 298px;
  padding: 14px;
  background-color: rgba(255, 255, 255, 0.2);
  /* background: pink; */
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  font-size: 14px;
  top: 60px;
  border-radius: 0 12px 12px 12px;
}
#Recommend .footer {
  padding: 0px 120px;
  box-sizing: border-box;
  width: 100%;
  min-height: 20px;
  /* background: #000; */
}
#Recommend .footer .logo {
  position: relative;
}
#Recommend .footer .logo:hover img {
  filter: brightness(20%);
}
#Recommend .footer .logo img {
  border-radius: 6px;
  filter: brightness(50%);
  transition: 0.5s;
  width: 100%;
}
#Recommend .footer .logo #logo {
  position: absolute;
  height: 70%;
  width: auto;
  left: 50%;
  top: 50%;
  filter: brightness(100%);
  transform: translate(-50%, -50%);
}
#Recommend .footer .start {
  width: 100%;
  min-height: 40px;
  /* background: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
#Recommend .footer .start .intro {
  margin-top: 80px;
  letter-spacing: 2px;
  margin-bottom: 40px;
}
#Recommend .footer .start img {
  height: 62px;
}
#Recommend .footer .start .button {
  filter: brightness(90%);
  margin-top: 40px;
  height: 48px;
  width: 320px;
  margin-bottom: 80px;
}
</style>
