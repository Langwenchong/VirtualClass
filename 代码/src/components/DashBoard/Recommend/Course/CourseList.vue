<template>
  <div id="courseList">
    <el-drawer :visible.sync="drawer" :with-header="false" size="50%">
      <div class="form-wrapper">
        <el-upload
          class="upload-demo"
          :show-file-list="true"
          ref="upload"
          drag
          action="a"
          :multiple="false"
          :auto-upload="false"
          :limit="1"
          :on-exceed="warn"
          :before-upload="beforeUpload"
          accept=".png, .txt, .md, .jpg, .ppt, .pptx, .pdf, .doc, .docx, .xls, .xlsx"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传一个文件且不能超过30M！</div>
        </el-upload>
        <el-input placeholder="请输入文件名称(不需要加文件后缀)" v-model="filename" clearable></el-input>
        <el-transfer
          v-model="filetags"
          :data="list"
          :titles="['可选标签', '已选标签']"
          :button-texts="['移除', '附加']"
        ></el-transfer>
        <el-button type="success" plain @click="submit">上传文件</el-button>
      </div>
    </el-drawer>
    <div class="triangle"></div>
    <div class="tags-list">
      <div
        @click="operate(l)"
        class="tag"
        v-for="(tag,l) in chapters[idx].tags"
        :key="tag"
        v-color="{tag:tag,tags:tags}"
      >
        <i class="fal fa-tags"></i>
        {{tag}}
      </div>
    </div>
    <remote-css href="https://fonts.font.im/css?family=Dancing+Script"></remote-css>
    <div id="t-nav" class="animate__animated animate__fadeInDown">
      <div class="backup" @click="backup">
        <i class="fad fa-reply"></i>
      </div>
      <div class="upload" @click="drawer = true">
        <i class="fad fa-plus"></i>
      </div>
      <div class="tags" @click="tagsList">
        <i class="fad fa-tags"></i>
      </div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
      <el-input placeholder="请输入文件名称" prefix-icon="el-icon-search" v-model="searchTxt" clearable></el-input>
    </div>
    <div id="l-nav" class="animate__animated animate__fadeInLeft">
      <div class="title">
        <i class="fad fa-books"></i>资源列表
      </div>
      <div
        class="box"
        v-for="(chapter,i) in chapters"
        :key="chapter.title"
        :title="chapter.title"
        @click="activeChapters(i)"
      >
        <p class="index">- Chapter {{i+1}} -</p>
        <p class="subtitle">
          <i class="fad fa-folder-open"></i>
          {{chapter.title}}
        </p>
      </div>
    </div>
    <div id="m-main" class="animate__animated animate__fadeInUp">
      <transition-group>
        <div
          class="item"
          v-for="(item,j) in files"
          :key="item.name+item.type"
          @click="activeFiles(j)"
        >
          <p class="name">{{item.name}}</p>
          <p class="type">
            <span class="circle" v-type="item.type"></span>
            {{item.type}}
          </p>
          <p class="uploader">上传者:{{item.uploader}}</p>
          <div class="tags">
            <div
              class="tag"
              v-color="{tag:filetag,tags:tags}"
              v-for="filetag in chapters[idx].files[j].tags"
              :key="filetag"
            >
              <i class="fal fa-tags"></i>
              {{filetag}}
            </div>
          </div>
          <el-popconfirm
            confirm-button-text="是的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="您确定要删除此文件吗？"
            @confirm="del(j)"
          >
            <el-button slot="reference" class="confirm" v-if="status===`老师`?true:false">删除</el-button>
          </el-popconfirm>
        </div>
      </transition-group>
    </div>
    <div id="r-info" class="animate__animated animate__fadeInRight">
      <file :file="files[key]" v-if="chapters.length>0&&files.length>0"></file>
    </div>
  </div>
</template>

<script>
import file from "@/components/DashBoard/Recommend/Course/file.vue";
export default {
  created() {
    this.teacherUsername = sessionStorage.getItem("teacherUsername");
    this.cname = sessionStorage.getItem("cname");
    this.status = sessionStorage.getItem("userStatus");
    //获取章节地图s.cname;
    var teacherUsername = this.teacherUsername;
    var cname = this.cname;
    // alert(this.teacherUsername + this.cname);
    const url = `/apis/course/chapter/api/getAllChapter?username=${teacherUsername}&cname=${cname}`;
    fetch(url, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            // var chnum=data[i].chnum;
            var chapter = {};
            chapter.files = [];
            chapter.title = data[i].chname;
            if (data[i].chtag != ``) {
              chapter.tags = data[i].chtag.split(",");
            } else {
              chapter.tags = [];
            }
            this.chapters.push(chapter);
            // console.log(this.chapters.length);
          }
          const fileUrl = `/apis/file/api/getAllFile?teacherUsername=${teacherUsername}&cname=${cname}`;
          fetch(fileUrl, {
            method: "GET"
          })
            .then(res => res.json())
            .then(data => {
              if (data instanceof Array) {
                for (let i = 0; i < data.length; i++) {
                  var file = {};
                  file.name = data[i].fname;
                  file.uploader = data[i].username;
                  file.type = data[i].ftype;
                  // console.log(file.type);
                  if (data[i].ftag != ``) {
                    file.tags = data[i].ftag.split(",");
                  } else {
                    file.tags = [];
                  }
                  this.chapters[data[i].chnum - 1].files.push(file);
                }
                console.log(this.chapters);
                setTimeout(() => {
                  this.activeChapters(0);
                  this.activeFiles(0);
                  this.tagsListInit();
                }, 1000);
              } else {
                console.log(data.length);
                this.$notify.error({
                  title: "错误",
                  message: "❌文件列表加载失败！"
                });
              }
            });
        } else {
          this.$notify.error({
            title: "错误",
            message: "❌章节列表加载失败！"
          });
        }
      })
      .catch(error => {
        this.$notify.error({
          title: "错误",
          message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
        });
      });
  },
  // mounted() {
  //   console.log(this.chapters.length);
  //   this.activeFiles();
  //   this.activeChapters();
  //   this.tagsListInit();
  // },
  components: {
    file,
    "remote-css": {
      render(createElement) {
        return createElement("link", {
          attrs: { rel: "stylesheet", href: this.href }
        });
      },
      props: {
        href: { type: String, required: true }
      }
    }
  },
  name: "courseList",
  data() {
    return {
      teacherUsername: ``,
      cname: ``,
      list: [],
      filetags: [],
      filename: ``,
      drawer: false,
      key: 0,
      confirm: false,
      options: [
        {
          value: "all",
          label: "全部文件"
        },
        {
          value: "word",
          label: "仅word"
        },
        {
          value: "ppt",
          label: "仅ppt"
        },
        {
          value: "excel",
          label: "仅EXCEL"
        },
        {
          value: "pdf",
          label: "仅pdf"
        },
        {
          value: "md",
          label: "仅md"
        },
        {
          value: "txt",
          label: "仅text"
        },
        {
          value: "img",
          label: "仅png/jpg"
        }
      ],
      value: "all",
      centerDialogVisible: false,
      searchTxt: ``,
      filtersArr: [],
      idx: 0,
      chapters: [],
      status: ``
    };
  },
  methods: {
    warn() {
      this.$notify.error({
        title: "错误",
        message: "一次只允许上传一个文件📁！"
      });
    },
    beforeUpload(file) {
      if ((this.filename != ``) & (file != null)) {
        let fd = new FormData();
        if (file.size / 1024 / 1024 > 30) {
          this.$notify.error({
            title: "错误",
            message: "文件最大不能超过30M📁！"
          });
        }
        fd.append("username", sessionStorage.getItem("userName"));
        fd.append("teacherUsername", this.teacherUsername);
        fd.append("chname", this.chapters[this.idx].title);
        fd.append("cname", this.cname);
        fd.append("fname", this.filename);
        var ftag = [];
        for (let i = 0; i < this.filetags.length; i++) {
          ftag.push(this.chapters[this.idx].tags[this.filetags[i]]);
        }
        fd.append("ftag", ftag);
        fd.append("file", file);
        fd.append("chnum", this.idx + 1);
        if (
          sessionStorage.getItem("userStatus") != `同学` &&
          sessionStorage.getItem("userStatus") != `老师`
        ) {
          this.$notify.error({
            title: "错误",
            message:
              "❌您的上传权限不足，请以同学或者教师身份登录后重新上传！3s后将跳转到登录页面。"
          });
          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 3000);
        } else {
          const url = `/apis/file/api/uploadFile`;
          fetch(url, {
            method: "POST",
            body: fd
          })
            .then(res => res.text())
            .then(data => {
              if (data === `success`) {
                this.$notify({
                  title: "上传成功",
                  message: "文件成功上传啦✅",
                  type: "success"
                });
                this.uploadFileLog();
              } else if (data === `fail`) {
                this.$notify.error({
                  title: "错误",
                  message: "❌文件上传失败，请重新尝试！"
                });
              }
            })
            .catch(error => {
              this.$notify.error({
                title: "错误",
                message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
              });
              // alert(`error`)
            });
        }
      } else {
        this.$notify.error({
          title: "错误",
          message: "❌请完整填写上传信息！"
        });
      }
    },
    uploadFileLog() {
      var username = sessionStorage.getItem("userName");
      var activity = "上传了";
      var teacherUsername = this.teacherUsername;
      var cname = this.cname;
      var fname = this.filename;
      var timestamp = this.currentTime();
      var fd = new FormData();
      fd.append("username", username);
      fd.append("activity", activity);
      fd.append("fname", fname);
      fd.append("timestamp", timestamp);
      fd.append("teacherUsername", teacherUsername);
      fd.append("cname", cname);
      const url = `/apis/log/api/addLog`;
      fetch(url, {
        method: "POST",
        body: fd
      })
        .then(res => res.text())
        .then(data => {
          var username = sessionStorage.getItem("userName");
          var now = new Date();
          var year = now.getFullYear(); //年
          var month = now.getMonth() + 1; //月
          var day = now.getDate(); //日
          var clock = year + "-";
          if (month < 10) clock += "0";
          clock += month + "-";
          if (day < 10) clock += "0";
          clock += day;
          const actUrl = `/apis/user/api/setAct?username=${username}&date=${clock}`;
          fetch(actUrl, {
            method: "GET"
          })
            .then(res => res.text())
            .then(data => {
              if (data === `success`) {
                this.$router.go(0);
              }
            });
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
          });
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
    submit() {
      this.$refs.upload.submit();
    },
    tagsListInit() {
      this.list = [];
      // console.log(this.chapters.length);
      if (this.chapters.length > 0) {
        // console.log(`hhhh`);
        var tagslist = this.chapters[this.idx].tags;
        // console.log(tagslist);
        for (let i = 0; i < tagslist.length; i++) {
          this.list.push({
            key: i,
            label: `${tagslist[i]}`
          });
        }
      }
    },
    activeFiles(j) {
      this.key = j;
      // alert(this.chapters[this.idx].files.length);
      // console.log(this.chapters[this.idx].files.length);
      // console.log(this.chapters[this.idx].files.length);
      if (
        this.chapters.length > 0 &&
        this.chapters[this.idx].files.length > 0
      ) {
        // console.log(`hhhhh`);
        var files = document
          .getElementById("m-main")
          .getElementsByClassName("item");
        // console.log(this.chapters[this.idx].files.length);
        // console.log(files.length);
        // console.log(`hhhh`);
        for (let i = 0; i < files.length; i++) {
          files[i].style.background = `var(--background2)`;
        }
        // console.log(`hhhhh`);
        files[this.key].style.background = `var(--background6)`;
        this.tagsListInit();
      }
    },
    activeChapters(i) {
      // console.log(this.chapters);
      // console.log(this.chapters.length);
      this.idx = i;
      if (this.chapters.length > 0) {
        var chapters = document
          .getElementById("l-nav")
          .getElementsByClassName("box");
        for (let i = 0; i < chapters.length; i++) {
          chapters[i].style.background = `transparent`;
        }
        chapters[this.idx].style.background = `var(--background6)`;
        // console.log(`activeChapters`);
        setTimeout(() => {
          this.activeFiles(0);
          this.tagsListInit();
        }, 1000);
      }
    },
    operate(l) {
      var index = this.filtersArr.indexOf(this.chapters[this.idx].tags[l]);
      var tags = document
        .getElementsByClassName("tags-list")[0]
        .getElementsByClassName("tag");
      if (index === -1) {
        this.filtersArr.push(this.chapters[this.idx].tags[l]);
        tags[l].classList.add("delete");
      } else {
        this.filtersArr.splice(index, 1);
        tags[l].classList.remove("delete");
      }
      // console.log(this.filtersArr);
    },
    del(j) {
      // console.log(j);
      let fd = new FormData();
      fd.append("teacherUsername", this.teacherUsername);
      fd.append("uploaderUsername", this.chapters[this.idx].files[j].uploader);
      fd.append("ftype", this.chapters[this.idx].files[j].type);
      fd.append("fname", this.chapters[this.idx].files[j].name);
      // alert(this.chapters[this.idx].files[j].uploader);
      const url = `/apis/file/api/deleteFile`;
      fetch(url, {
        method: "POST",
        body: fd
      })
        .then(res => res.text())
        .then(data => {
          if (data === `success`) {
            this.$notify({
              title: "删除成功",
              message: "文件成功删除啦✅",
              type: "success"
            });
            // this.chapters[this.idx].files.splice(j, 1);
            this.deleteFileLog(j);
          } else {
            this.$notify.error({
              title: "错误",
              message: "❌文件删除失败！"
            });
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
          });
        });
    },
    deleteFileLog(j) {
      var username = sessionStorage.getItem("userName");
      var activity = "删除了";
      var teacherUsername = this.teacherUsername;
      var cname = this.cname;
      var fname = this.chapters[this.idx].files[j].name;
      var timestamp = this.currentTime();
      var fd = new FormData();
      fd.append("username", username);
      fd.append("activity", activity);
      fd.append("fname", fname);
      fd.append("timestamp", timestamp);
      fd.append("teacherUsername", teacherUsername);
      fd.append("cname", cname);
      const url = `/apis/log/api/addLog`;
      fetch(url, {
        method: "POST",
        body: fd
      })
        .then(res => res.text())
        .then(data => {
          // console.log("save log success");
          var username = sessionStorage.getItem("userName");
          var now = new Date();
          var year = now.getFullYear(); //年
          var month = now.getMonth() + 1; //月
          var day = now.getDate(); //日
          var clock = year + "-";
          if (month < 10) clock += "0";
          clock += month + "-";
          if (day < 10) clock += "0";
          clock += day;
          const actUrl = `/apis/user/api/setAct?username=${username}&date=${clock}`;
          fetch(actUrl, {
            method: "GET"
          })
            .then(res => res.text())
            .then(data => {
              if (data === `success`) {
                this.$router.go(0);
              } else {
                alert(data);
              }
            });
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！"
          });
        });
    },
    backup() {
      this.$router.go(-1);
    },
    tagsList() {
      var tagsList = document.getElementsByClassName("tags-list")[0];
      //   console.log(List)
      var triangle = document.getElementsByClassName("triangle")[0];
      if (tagsList.style.display === "none") {
        tagsList.style.display = "flex";
        triangle.style.display = `block`;
      } else {
        tagsList.style.display = `none`;
        triangle.style.display = `none`;
      }
    },
    tags() {
      return this.chapters[this.idx].tags;
    },
    getArrDifference(arr1, arr2) {
      if (arr1.length === 0) return true;
      var ok = false;
      for (let i = 0; i < arr1.length; i++) {
        if (arr2.indexOf(arr1[i]) === -1) {
          ok = true;
          break;
        }
      }
      return ok;
    }
  },
  directives: {
    type(el, binding) {
      if (binding.value === `word`) {
        el.style.background = `#48dbfb`;
      } else if (binding.value === `ppt`) {
        el.style.background = `#ff9f43`;
      } else if (binding.value === `md`) {
        el.style.background = `#5f27cd`;
      } else if (binding.value === `pdf` || binding.value === `img`) {
        el.style.background = `#ee5253`;
      } else if (binding.value === `excel`) {
        el.style.background = `#10ac84`;
      } else {
        el.style.background = `#c8d6e5`;
      }
    },
    color(el, binding) {
      var arr = binding.value.tags();
      if (arr.indexOf(binding.value.tag) % 30 === 0) {
        el.style.background = `#cc0f35`;
        el.style.border = `3px solid transparent`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 1) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#8a51c0`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 2) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#2160c4`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 3) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#00947e`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 4) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#947600`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 5) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#ff7675`;
        el.style.color = `#333`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 6) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#a29bfe`;
        el.style.color = `#333`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 7) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#74b9ff`;
        el.style.color = `#333`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 8) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#55efc4`;
        el.style.color = `#333`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 9) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#fdcb6e`;
        el.style.color = `#333`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 10) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#b33939`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 11) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#474787`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 12) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#227093`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 13) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#218c74`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 14) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#cc8e35`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 15) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#ffb8b8`;
        el.style.color = `#333`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 16) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#cd84f1`;
        el.style.color = `#333`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 17) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#7efff5`;
        el.style.color = `#333`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 18) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#32ff7e`;
        el.style.color = `#333`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 19) {
        el.style.border = `3px solid transparent`;
        el.style.background = `#fff200`;
        el.style.color = `#333`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 20) {
        el.style.border = `3px solid #cc0f35`;
        el.style.color = `#cc0f35`;
        el.style.background = `var(--background5)`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 21) {
        el.style.border = `3px solid #8a51c0`;
        el.style.color = `#8a51c0`;
        el.style.background = `var(--background5)`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 22) {
        el.style.border = `3px solid #2160c4`;
        el.style.color = `#2160c4`;
        el.style.background = `var(--background5)`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 23) {
        el.style.border = `3px solid#00947e`;
        el.style.color = `#00947e`;
        el.style.background = `var(--background5)`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 24) {
        el.style.border = `3px solid #947600`;
        el.style.color = `#947600`;
        el.style.background = `var(--background5)`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 25) {
        el.style.border = `3px solid #ff7675`;
        el.style.color = `#ff7675`;
        el.style.background = `var(--background5)`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 26) {
        el.style.border = `3px solid #a29bfe`;
        el.style.color = `#a29bfe`;
        el.style.background = `var(--background5)`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 27) {
        el.style.border = `3px solid #74b9ff`;
        el.style.color = `#74b9ff`;
        el.style.background = `var(--background5)`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 28) {
        el.style.border = `3px solid #55efc4`;
        el.style.color = `#55efc4`;
        el.style.background = `var(--background5)`;
      } else if (arr.indexOf(binding.value.tag) % 30 === 29) {
        el.style.border = `3px solid #ff9f1a`;
        el.style.color = `#ff9f1a`;
        el.style.background = `var(--background5)`;
      } else {
        el.style.background = `var(--background6)`;
        el.style.color = `var(--text1)`;
        el.style.opacity = `0.4`;
      }
    }
  },
  computed: {
    files() {
      let origin = this.chapters[this.idx].files;
      let files = [];
      for (let i = 0; i < origin.length; i++) {
        var v = true;
        //类型判断
        if (this.value != `all` && origin[i].type != this.value) {
          // console.log(files);
          v = false;
          // files.splice(i,1);
        } else {
          let sen = origin[i].name + origin[i].uploader + origin[i].type;
          //文件名称判断
          if (this.searchTxt != `` && sen.search(this.searchTxt) === -1) {
            v = false;
            // files.splice(i,1);
          } else {
            //标签检验
            console.log(`hhh`);
            var arr1 = origin[i].tags;
            var arr2 = this.filtersArr;
            v = this.getArrDifference(arr1, arr2);
          }
        }
        //三重检测都通过放入
        if (v) {
          files.push(origin[i]);
        }
      }
      // console.log(this.filtersArr);
      // console.log(files);
      // console.log(files);
      return files;
    }
  }
  // watch: {
  //   idx: function(newVal, oldVal) {
  //     this.activeChapters();
  //     setTimeout(() => {
  //       this.activeFiles();
  //       this.tagsListInit();
  //     }, 500);
  //   },
  //   key: function(newVal, oldVal) {
  //     this.activeChapters();
  //     setTimeout(() => {
  //       this.activeFiles();
  //       this.tagsListInit();
  //     }, 500);
  //   }
  // }
};
</script>

<style scoped>
#courseList {
  overflow: hidden;
  width: 100%;
  /* height: 100%; */
  /* background: pink; */
}
#courseList .el-drawer {
  width: 50% !important;
}
#courseList .form-wrapper {
  height: 100%;
  width: 100%;
  background-color: var(--background1) !important;
  display: flex !important;
  box-sizing: border-box !important;
  padding: 50px !important;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
#courseList p {
  margin: 0;
  padding: 0;
}
#courseList #t-nav {
  transition: 0.5s;
  z-index: 999;
  background: var(--background1);
  width: calc(100% - 520px);
  position: fixed;
  top: 0;
  left: 278px;
  height: 78px;
  /* background: red; */
  border-bottom: 1px #d0d7de solid;
  display: flex;
  align-items: center;
}
#courseList #m-main {
  /* display: flex; */
  /* flex-direction: column;
  align-items: center; */
  /* background: var(--background2); */
  margin-top: 78px;
  width: calc(100% - 440px);
  margin-left: 200px;
  /* background: #00875a; */
}
#courseList #m-main span:first-child {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
}
#courseList #m-main .item {
  box-sizing: border-box;
  margin-bottom: 12px;
  border-radius: 8px;
  /* border-bottom: 1px #d0d7de solid; */
  box-shadow: 0 1px 2px 0px rgb(0 0 0 / 10%);
  background: var(--background2);
  width: 98%;
  height: 78px;
  /* background: #00875a; */
  transition: 0.5s;
  display: flex;
  align-items: center;
}
#courseList #m-main .item:hover {
  background: var(--background6) !important;
}
#courseList #m-main .item .name {
  width: 200px;
  font-weight: 700;
  font-size: 24px;
  margin-left: 20px;
  font-family: "KaiTi";
  /* background: pink; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#courseList #m-main .item .type {
  display: flex;
  align-items: center;
  width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  color: var(--text3);
  margin-right: 20px;
}
#courseList #m-main .item .type .circle {
  width: 8px;
  padding: 0;
  height: 8px;
  margin-right: 8px;
  border-radius: 50%;
  background: pink;
}
#courseList #m-main .item .tags .tag {
  margin-bottom: 0;
}
#courseList #m-main .item .uploader {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2px;
  color: var(--text3);
  margin-right: 80px;
}
#courseList #m-main .item .tags {
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  /* background: pink; */
  display: flex;
  margin-right: 20px;
}
#courseList #m-main .confirm {
  border-radius: 15px;
  transform: scale(70%);
}
#courseList #t-nav .backup {
  opacity: var(--opacity);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #c0b6f2;
  color: #5243aa;
  transition: 0.5s;
}
#courseList #t-nav .backup:hover {
  background: #5243aa;
  color: #fff;
}
#courseList #t-nav .upload {
  opacity: var(--opacity);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #abf5d1;
  color: #00875a;
  transition: 0.5s;
}
#courseList #t-nav .upload:hover {
  background: #00875a;
  color: #fff;
}
#courseList #t-nav .tags {
  position: relative;
  /* overflow: hidden; */
  /* opacity: var(--opacity); */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ffd7b0;
  color: #ef6715;
  transition: 0.5s;
}
#courseList #t-nav .tags:hover {
  background: #ef6715;
  color: #fff;
}
#courseList .tags-list {
  display: none;
  border-radius: 1rem;
  /* background: tan; */
  box-sizing: border-box;
  padding: 30px;
  /* display: flex; */
  /* justify-content: flex-start; */
  flex-wrap: wrap;
  position: fixed;
  top: 90px;
  left: 330px;
  /* height: 500px; */
  z-index: 999999;
  background: var(--background6);
  opacity: 0.96;
  width: 600px;
  animation: show 0.5s forwards;
}
#courseList .triangle {
  z-index: 999999;
  display: none;
  top: 70px;
  left: 440px;
  position: fixed;
  width: 0;
  height: 0;
  border-width: 0 20px 20px;
  border-style: solid;
  border-color: transparent transparent var(--background6);
  animation: show 0.5s forwards;
}
@keyframes show {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
#courseList .tag {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  /* min-width: 58px; */
  height: 30px;
  box-sizing: border-box;
  padding: 0 5px;
  color: #ddd;
  margin-left: 5px;
  border-radius: 2rem;
  /* background: #000; */
  transition: 0.5s;
}
.delete {
  border: 3px transparent solid !important;
  background: var(--background6) !important;
  color: var(--text1) !important;
}
#courseList .tag i {
  font-size: 14px;
  margin-right: 5px;
}
#courseList #t-nav .el-select {
  margin-left: 30%;
  margin-right: 20px;
}
#courseList #t-nav .el-input {
  width: 240px;
}
#courseList #r-info {
  box-sizing: border-box;
  width: 240px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  /* background: tan; */
  border-left: 1px #d0d7de solid;
}

#courseList #l-nav {
  width: 200px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 78px;
  /* background: green; */
  box-sizing: border-box;
  border-right: 1px #d0d7de solid;
}
#courseList #l-nav .title {
  font-size: 1.3rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 20px 25px;
  width: 100%;
  height: 78px;
  /* background: var(--background2); */
  border-bottom: 1px solid #d0d7de;
}
#courseList #l-nav .title i {
  margin-right: 5px;
}
#courseList #l-nav .box {
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 78px;
  border-bottom: 1px solid #d0d7de;
}
#courseList #l-nav .box:hover {
  background: var(--background6) !important;
}
#courseList #l-nav .box .index {
  font-size: 20px;
  font-weight: 700;
  font-family: "Dancing Script", cursive;
}
#courseList #l-nav .box .subtitle {
  margin-top: 10px;
  font-weight: 900;
  font-size: 20px;
  font-family: "Dancing Script", cursive;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
}
#courseList #l-nav .box .subtitle i {
  color: tan;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.v-move {
  transition: all 1s ease;
}
.v-leave-active {
  position: absolute;
  width: 98%;
}
</style>