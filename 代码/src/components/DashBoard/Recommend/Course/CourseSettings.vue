<template>
  <div id="courseSettings">
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span
        >确定要退出吗？您还未保存/发布修改信息，此时退出之前的操作将不会被保存！</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
    <div id="r-menu" class="animate__animated animate__fadeInRight">
      <div class="title">课程工作台</div>
      <div id="info">
        <el-form
          label-position="right"
          label-width="auto"
          :model="formLabelAlign"
        >
          <el-form-item label="课程名称">
            <el-input
              class="width"
              :disabled="disabled"
              placeholder="请输入课程名称"
              v-model="formLabelAlign.courseName"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程介绍">
            <el-input
              class="width"
              type="textarea"
              placeholder="请输入课程介绍"
              v-model="formLabelAlign.courseInfo"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程学分">
            <el-input-number
              class="width"
              v-model="formLabelAlign.num"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="课程学时">
            <el-input-number
              class="width"
              v-model="formLabelAlign.hour"
              :min="1"
              :max="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="课程类型">
            <el-select
              class="width"
              v-model="formLabelAlign.value"
              placeholder="请选择"
            >
              <el-option
                v-for="item in formLabelAlign.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn-box">
        <div class="box" @click="create()">
          <span class="ripple"></span>
          <div class="content">
            <div class="icon">
              <i class="bx bxs-dice-1"></i>
            </div>
            <div class="info">
              <b>新建章节</b>
              <em class="small">一个章节最多30个知识点</em>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="l-main" class="animate__animated animate__zoomIn">
      <div id="toolbar">
        <div class="left">
          <i class="bx bxs-cookie"></i>
          <span>背景颜色调节：</span>
          <el-color-picker
            v-model="color"
            size="mini"
            show-alpha
            :predefine="predefineColors"
          ></el-color-picker>
        </div>
        <div class="right">
          <el-button class="item" type="primary" plain @click="submit"
            >发布课程/保存修改</el-button
          >
          <el-button plain @click="centerDialogVisible = true"
            >退出编辑</el-button
          >
        </div>
      </div>
      <div id="wrapper" :style="{ background: this.color }">
        <transition-group>
          <div class="box" v-for="(box, i) in arr" :key="box.id">
            <el-button
              class="rubbish"
              type="danger"
              icon="el-icon-delete"
              v-if="!box.disabled"
              circle
              @click="del(i)"
            ></el-button>
            <div id="audiobox">
              <div class="left">
                <div class="top">
                  <b>章节{{ i + 1 }}</b>
                </div>
                <div class="bottom">
                  <input
                    class="item"
                    type="text"
                    v-focus
                    placeholder="请输入章节名称"
                    v-model="box.title"
                    :disabled="box.disabled"
                  />
                  <div class="choices">
                    <transition-group>
                      <div
                        class="choice"
                        v-for="(el, j) in arr[i].tags"
                        :key="el.id"
                      >
                        <span>知识点{{ j + 1 }}:</span>
                        <div class="op">
                          <el-input
                            type="input"
                            clearable
                            placeholder="请输入知识点名称"
                            v-model="el.tagName"
                          ></el-input>
                          <el-popconfirm
                            confirm-button-text="好的"
                            cancel-button-text="不用了"
                            icon="el-icon-info"
                            icon-color="red"
                            title="确定删除这个标签吗？"
                            @confirm="deltag(i, j)"
                          >
                            <el-button slot="reference" class="confirm"
                              >删除</el-button
                            >
                          </el-popconfirm>
                        </div>
                      </div>
                    </transition-group>
                    <el-button round @click="addtag(i)">添加知识点</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "courseSettings",
  created() {
    if (this.$route.params.isNew === false) {
      var username = sessionStorage.getItem("userName");
      var cname = sessionStorage.getItem("cname");
      this.disabled = true;
      this.formLabelAlign.courseName = cname;
      const url = `https://vclass.api.cheeseburgerim.space/course/chapter/api/getAllChapter?username=${username}&cname=${cname}`;
      fetch(url, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          this.formLabelAlign.courseInfo = data[0].vcourse.cdesc;
          this.formLabelAlign.value = data[0].vcourse.ctype;
          this.formLabelAlign.num = data[0].vcourse.credit;
          this.formLabelAlign.hour = data[0].vcourse.duration;
          for (let i = 0; i < data.length; i++) {
            // var chnum=data[i].chnum;
            var chapter = {};
            (chapter.disabled = true), (chapter.id = i);
            this.id = i + 1;
            chapter.title = data[i].chname;
            chapter.tags = [];
            if (data[i].chtag != ``) {
              var tags = data[i].chtag.split(",");
              for (let j = 0; j < tags.length; j++) {
                var tag = {};
                tag.id = i * 10 + j;
                tag.tagName = tags[j];
                chapter.tags.push(tag);
              }
            } else {
              chapter.tags = [];
            }
            this.arr.push(chapter);
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！",
          });
        });
    }
  },
  methods: {
    logout() {
      this.$router.go(-1);
    },
    submit() {
      var v = true;
      //基本信息检验
      if (
        this.formLabelAlign.courseName === `` ||
        this.formLabelAlign.value === `` ||
        this.formLabelAlign.courseInfo === ``
      ) {
        this.$notify.error({
          title: "错误",
          message: "❌请确保课程基本信息不为空！",
        });
        v = false;
      }
      if (v) {
        //章节信息检验(非空或重复)
        for (let i = 0; i < this.arr.length; i++) {
          if (!v) {
            this.$notify.error({
              title: "错误",
              message: "❌请确保各章节名称不为空且没有重复名称的章节！",
            });
            break;
          }
          for (let j = i; j < this.arr.length; j++) {
            if (i === j) continue;
            if (
              this.arr[i].title === `` ||
              this.arr[j].title === `` ||
              this.arr[i].title === this.arr[j].title
            ) {
              v = false;
              break;
            }
          }
        }
      }
      //标签信息检验(非空或重复)
      if (v) {
        for (let i = 0; i < this.arr.length; i++) {
          if (!v) {
            this.$notify.error({
              title: "错误",
              message: "❌请确保每一章节内标签名称不为空且没有重复名称的标签！",
            });
            break;
          }
          for (let j = 0; j < this.arr[i].tags.length; j++) {
            if (!v) {
              break;
            }
            for (let k = 0; k < this.arr[i].tags.length; k++) {
              if (j === k) continue;
              if (
                this.arr[i].tags[j].tagName === `` ||
                this.arr[i].tags[k].tagName === `` ||
                this.arr[i].tags[j].tagName === this.arr[i].tags[k].tagName
              ) {
                v = false;
                break;
              }
            }
          }
        }
      }
      if (v) {
        //发送基本信息
        let fd = new FormData();
        fd.append("username", sessionStorage.getItem("userName"));
        fd.append("cname", this.formLabelAlign.courseName);
        fd.append("ctype", this.formLabelAlign.value);
        fd.append("cdesc", this.formLabelAlign.courseInfo);
        fd.append("credit", this.formLabelAlign.num);
        fd.append("duration", this.formLabelAlign.hour);
        const courseInfoUrl = `https://vclass.api.cheeseburgerim.space/course/api/updateCourseInfo`;
        fetch(courseInfoUrl, {
          method: "post",
          credentials: "include",
          body: fd,
        })
          .then((res) => res.text())
          .then((data) => {
            console.log(data)
            if (data === `success`) {
              this.deleteAllChapter();
            } else if (data === `fail`) {
              this.$notify.error({
                title: "错误",
                message: "课程创建失败,您的用户身份已过期,3s后跳转到登录页面!",
              });
              setTimeout(() => {
                this.$router.push({ name: "login" });
              }, 3000);
            }
          })
          .catch((error) => {
            this.$notify.error({
              title: "错误",
              message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！",
            });
          });
      }
    },
    //删除数据库
    deleteAllChapter() {
      var username = sessionStorage.getItem("userName");
      var cname = this.formLabelAlign.courseName;
      const deleteUrl = `https://vclass.api.cheeseburgerim.space/course/chapter/api/deleteAllChapter?username=${username}&cname=${cname}`;
      fetch(deleteUrl, {
        method: "get",
        credentials: "include",
      })
        .then((res) => res.text())
        .then((data) => {
          if (data === `success`) {
            this.updateChapter();
          } else if (data === `fail`) {
            this.$notify.error({
              title: "错误",
              message: "数据库章节清空出现错误",
            });
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！",
          });
        });
    },
    updateChapter() {
      const url = `https://vclass.api.cheeseburgerim.space/course/chapter/api/updateChapter`;
      var username = sessionStorage.getItem("userName");
      var suc = true;
      for (let i = 0; i < this.arr.length; i++) {
        let fd = new FormData();
        let tags = [];
        fd.append("username", username);
        fd.append("cname", this.formLabelAlign.courseName);
        fd.append("chname", this.arr[i].title);
        fd.append("chnum", i + 1);
        console.log(i + 1);
        for (let j = 0; j < this.arr[i].tags.length; j++) {
          tags.push(this.arr[i].tags[j].tagName);
        }
        var chtag = tags.toString();
        fd.append("chtag", chtag);
        fetch(url, {
          method: "POST",
          body: fd,
          credentials: "include",
        })
          .then((res) => res.text())
          .then((data) => {
            if (data === `success`) {
              this.$router.push({ name: "self" });
            } else if (data === `fail`) {
              suc = false;
              this.$notify.error({
                title: "错误",
                message: "章节信息提交出现错误",
              });
            }
          })
          .catch((error) => {
            this.$notify.error({
              title: "错误",
              message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！",
            });
          });
      }
      if (suc === true) {
        this.$notify({
          title: "保存成功",
          message: "您修改的课程信息已经保存成功啦✅",
          type: "success",
        });
        this.$router.push({ name: "self" });
      }
      console.log(suc);
    },
    create() {
      this.arr.push({
        id: this.id,
        title: ``,
        tags: [],
        disabled: false,
      });
      this.id++;
    },
    addtag(i) {
      var idx = this.arr[i].tags.length + 1;
      this.arr[i].tags.push({
        id: this.id * 10 + idx,
        tagName: ``,
      });
    },
    deltag(i, j) {
      this.arr[i].tags.splice(j, 1);
    },
    del(i) {
      this.arr.splice(i, 1);
    },
  },
  mounted() {
    let box = document.querySelectorAll(".box");
    for (let i = 0; i < box.length; i++) {
      box[i].onmouseenter = function (event) {
        let ripple = box[i].querySelector(".ripple");
        ripple.classList.add("animation");
        ripple.style.width = this.offsetWidth + "px";
        ripple.style.height = this.offsetWidth + "px";
        ripple.style.top = -(this.offsetHeight - event.offsetY) + "px";
        ripple.style.left = -(this.offsetWidth / 2 - event.offsetX) + "px";
        setTimeout(function () {
          ripple.classList.remove("animation");
        }, 500);
      };
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      disabled: false,
      formLabelAlign: {
        courseName: "",
        courseInfo: "",
        num: 1,
        hour: 32,
        options: [
          {
            value: "核心专业课",
            label: "核心专业课",
          },
          {
            value: "综合实践课",
            label: "综合实践课",
          },
          {
            value: "素养选修课",
            label: "素养选修课",
          },
        ],
        value: "",
      },
      id: 1,
      arr: [],
      color: "#EAEAEF",
      predefineColors: [
        "#EAEAEF",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "#FFF",
        "#c7158577",
        "#FAF9DE",
        "#FFF2E2",
        "#FDE6E0",
        "#E3EDCD",
        "#DCE2F1",
        "#E9EBFE",
      ],
    };
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
};
</script>


<style scoped>
#courseSrttings {
  width: 100%;
  /* min-height: 300px; */
  /* background: pink; */
}
#r-menu {
  z-index: 9;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  background: #11101d;
  /* border-left: 1px solid #e1e4e8; */
  /* background: #f5f6f7; */
}
#l-main {
  width: 70%;
  min-height: 200px;
  /* background: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
#l-main #toolbar {
  position: sticky;
  z-index: 2;
  top: 0px;
  width: 100%;
  height: 48px;
  background: #f5f6f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#l-main #toolbar .left {
  padding-left: 50px;
  width: 400px;
  height: 100%;
  /* background: green; */
  display: flex;
  align-items: center;
}
#l-main #toolbar .right {
  padding-right: 20px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 400px;
  height: 100%;
  /* background: green; */
}
#l-main #toolbar .right .item {
  margin-right: 10px;
  margin-left: 20px;
}
#l-main #wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 93vh;
  position: relative;
}
#l-main #wrapper .box {
  /* margin-bottom: 16px; */
  position: relative;
  padding: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 800px;
  min-height: 300px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0px rgb(0 0 0 / 10%);
}
#l-main #wrapper .box .rubbish {
  transform: scale(50%);
  position: absolute;
  top: 5px;
  right: 5px;
}
#r-menu #info {
  /* padding-top: 30px; */
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  /* min-height: 300px; */
  /* background: green; */
}
#r-menu #info .width {
  width: 300px;
}
#r-menu #info .head {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
#r-menu #info .head .input {
  width: 80%;
}
#r-menu .title {
  position: relative;
  font-family: "NSimSun";
  margin-top: 60px;
  margin-bottom: 30px;
  /* margin-left: 5%; */
  font-size: 1.5rem;
  font-weight: 700;
}
#r-menu .title::after {
  z-index: 0;
  content: "";
  position: absolute;
  top: 50%;
  right: 120px;
  width: 120%;
  height: 1px;
  background: #fff;
}
#r-menu .title::before {
  z-index: 0;
  content: "";
  position: absolute;
  top: 50%;
  left: 120px;
  width: 120%;
  height: 1px;
  background: #fff;
}
#r-menu .btn-box {
  margin-top: 60px;
}
#r-menu .box {
  cursor: pointer;
  position: relative;
  width: 300px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  user-select: none;
  margin: 10px;
  transition: 0.5s;
  /* box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2); */
}
#r-menu .box:hover {
  /* transform: translateX(10px); */
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
}
#r-menu .box .content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
#r-menu .box .content .icon {
  font-size: 60px;
  margin-top: 10px;
  /* font-size: 70px; */
  color: rgba(0, 0, 0, 0.1);
}
#r-menu .box .content .info {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#r-menu .box .content .info b {
  letter-spacing: 5px;
  font-size: 1.2rem;
}
#r-menu .box .content .info .small {
  opacity: 0.5;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.5);
}
#r-menu .box {
  background: linear-gradient(150deg, rgb(209, 11, 148), rgb(113, 52, 178));
}

#r-menu .ripple {
  display: block;
  position: absolute;
  border-radius: 100%;
  background: rgba(255, 255, 255, 0.5);
  transform: scale(0);
}

#r-menu .animation {
  animation: ripple 0.5s ease-in;
}

@keyframes ripple {
  100% {
    transform: scale(3);
    opacity: 0;
  }
}
#audiobox {
  width: 100%;
  /* height: 200px; */
  /* background: pink; */
  display: flex;
}
#audiobox .left {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100px;
  /* background: red; */
}
#audiobox .left .top {
  font-family: "NSimSun";
  width: 100%;
  height: 48px;
  /* background: green; */
}
#audiobox .left .bottom {
  width: 100%;
  display: flex;
  flex-direction: column;
  /* height: 200px; */
  /* background: grey; */
}
#audiobox .left .bottom .item {
  opacity: 0.8;
  border-radius: 5px;
  padding: 5px;
  height: 40px;
  width: 90%;
}
#audiobox .left .bottom .choices {
  margin-top: 20px;
  position: relative;
}
#audiobox .left .bottom .choices .choice {
  margin-top: 5px;
  width: 100%;
  margin-bottom: 5px;
}
#audiobox .left .bottom .choices .choice .op {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
#audiobox .left .bottom .choices .choice .op .confirm {
  transform: scale(70%);
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
}
</style>