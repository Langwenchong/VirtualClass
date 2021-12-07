<template>
  <div id="editself">
    <div id="avatar">
      <div id="imgBx">
        <el-upload
          class="avatar-uploader"
          with-credentials="true"
          :action="url"
          name="avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div id="info">
      <div class="wrapper">
        <el-form
          label-position="right"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item label="昵称" prop="name">
            <el-input
              type="text"
              v-model="ruleForm.name"
              autocomplete="off"
              placeholder="请输入用户昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="座右铭" prop="motto">
            <el-input
              type="text"
              v-model="ruleForm.motto"
              autocomplete="off"
              placeholder="请输入座右铭"
            ></el-input>
          </el-form-item>
          <el-form-item label="学校" prop="school">
            <el-input
              type="text"
              v-model="ruleForm.school"
              autocomplete="off"
              placeholder="请输入学校"
            ></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-input
              type="text"
              v-model="ruleForm.grade"
              autocomplete="off"
              placeholder="请输入年级"
            ></el-input>
          </el-form-item>
          <el-form-item label="博客" prop="blog">
            <el-input
              type="text"
              v-model="ruleForm.blog"
              autocomplete="off"
              placeholder="请输入博客地址"
            ></el-input>
          </el-form-item>
          <el-form-item class="submit">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >保存</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="warning" @click="cancle">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var username = sessionStorage.getItem("userName");
    var status = sessionStorage.getItem("userStatus");
    this.url = `https://vclass.api.cheeseburgerim.space/user/api/setAvatar?username=${username}&status=${status}`;
    this.imageUrl = this.$route.params.avatar;
    this.ruleForm.motto = this.$route.params.motto;
    this.ruleForm.grade = this.$route.params.grade;
    this.ruleForm.name = this.$route.params.name;
    this.ruleForm.school = this.$route.params.school;
    this.ruleForm.blog = this.$route.params.blog;
  },
  name: "editself",
  data() {
    var validateMotto = (rule, value, callback) => {
      if (value.length > 30) {
        callback(new Error("座右铭最长为30个字符"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户昵称"));
      }
      if (value.length > 20) {
        callback(new Error("用户昵称最长为20个字符"));
      } else {
        callback();
      }
    };
    var validateBlog = (rule, value, callback) => {
      if (value === `` || value === `未填写`) callback();
      else {
        if (value.substring(0, 4) != `http` || value.length < 4) {
          callback(new Error("请加上http头部"));
        } else {
          callback();
        }
      }
    };
    return {
      imageUrl: "",
      url: ``,
      ruleForm: {
        grade: "",
        name: "",
        motto: "",
        school: "",
        blog: "",
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        motto: [{ validator: validateMotto, trigger: "blur" }],
        blog: [{ validator: validateBlog, trigger: "blur" }],
      },
    };
  },
  methods: {
    cancle() {
      this.$router.push({ name: "self" });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let fd = new FormData();
        fd.append("username", sessionStorage.getItem("userName"));
        fd.append("link", this.ruleForm.blog);
        fd.append("grade", this.ruleForm.grade);
        fd.append("address", this.ruleForm.school);
        fd.append("status", sessionStorage.getItem("userStatus"));
        fd.append("name", this.ruleForm.name);
        fd.append("subtitle", this.ruleForm.motto);
        if (valid) {
          // this.$router.push({ name: "self" });
          const url = `https://vclass.api.cheeseburgerim.space/user/api/updateInfo`;
          // const url=`https://vclass.api.cheeseburgerim.space/user/api/updateInfo?username=panyizhe&link=cheeseburgerim.space&grade=2019&address=天津大学&status=同学&name=潘&subtitle=123`
          fetch(url, {
            method: "POST",
            body: fd,
            credentials: "include",
          })
            .then((res) => res.text())
            .then((data) => {
              if (data === `success`) {
                this.$notify({
                  title: "保存成功",
                  message: "您的个人信息已经保存成功啦✅",
                  type: "success",
                });

                this.$router.push({ name: "self" });
              } else if (data === `fail`) {
                this.$notify.error({
                  title: "错误",
                  message:
                    "您现在是游客身份或者登录身份信息已过期，无权限编辑个人信息哦😶，3s后将跳转到登录界面！",
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.imageUrl = "";
    },
    handleAvatarSuccess(res, file) {
      if (res === `fail`) {
        this.$notify.error({
          title: "错误",
          message:
            "您现在是游客身份或者登录身份信息已过期，无权限编辑个人信息哦😶，3s后将跳转到登录界面！",
        });
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 3000);
      }
      // alert(`success`);
      else {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$notify({
          title: "保存成功",
          message: "您的头像已经保存成功啦✅",
          type: "success",
        });
        // var username = sessionStorage.getItem("userName");
        // // var status = sessionStorage.getItem("userStatus");
        // sessionStorage.setItem(
        //   "userImage",
        //   `https://vclass.api.cheeseburgerim.space/user/api/getAvatar/${username}`
        // );
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped src="../../../assets/css/bootstrap.min.css"></style>
<style scoped>
#editself {
  /* background: pink; */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
#avatar {
  margin-top: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#imgBx {
  transition: 0.5s;
  position: relative;
  width: 200px;
  height: 200px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #e1e4e8;
  /* overflow: hidden; */
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: var(--opacity);
}

#imgBx img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}
#info {
  margin-top: 40px;
  position: sticky;
  top: 40px;
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 200px;
  /* background:red; */
  align-items: center;
}
#info .wrapper {
  opacity: var(--opacity);
  width: 80%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-button {
  border-radius: 12px;
  width: 30%;
  padding: 0;
  text-align: center;
  height: 40px;
}
</style>