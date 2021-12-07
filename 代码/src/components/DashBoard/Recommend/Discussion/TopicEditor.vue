<template>
  <div id="TopicEditor">
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
        <el-button type="primary" @click="backup">确 定</el-button>
      </span>
    </el-dialog>
    <div id="l-main" class="animate__animated animate__fadeIn">
      <el-upload
        style="display: none"
        class="quill-picture-uploader"
        action="http://localhost:8080/project/uploadPic"
        :before-upload="bfUpload"
        :on-success="uploadSuccess"
      >
      </el-upload>
      <quill-editor
        class="editor"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @change="onEditorChange($event)"
      />
      <div class="output code" style="display: none">
        <code class="hljs" v-html="contentCode"></code>
      </div>
    </div>
    <div id="r-nav" class="animate__animated animate__fadeInRight">
      <div class="backup" @click="centerDialogVisible = true">
        <strong
          ><i class="fas fa-arrow-alt-left"></i>&nbsp;&nbsp;退出编辑</strong
        >
      </div>
      <div class="box">
        <strong>话题标题(必填)</strong>
        <el-input
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 4 }"
          placeholder="请输入话题标题(大约在20左右)"
          v-model="title"
        >
        </el-input>
      </div>
      <div class="box">
        <strong>话题简介(必填)</strong>
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 8 }"
          placeholder="请输入话题简介内容(大约在100字左右)"
          v-model="discription"
        >
        </el-input>
      </div>
      <div class="box">
        <strong>话题封面(选填)</strong>
        <el-upload
          class="upload"
          :show-file-list="true"
          ref="upload"
          drag
          action="a"
          :multiple="false"
          :auto-upload="false"
          :limit="1"
          :on-exceed="warn"
          :before-upload="beforeUpload"
          accept=".png,  .jpg, "
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </div>
      <div class="submit">
        <strong><i class="fad fa-paper-plane"></i>&nbsp;&nbsp;发布话题</strong>
      </div>
    </div>
  </div>
</template>


<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import hljs from "highlight.js";

// highlight.js style
import "highlight.js/styles/github-dark.css";
import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor,
  },
  name: "TopicEditor",
  data() {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image"],
    ];

    return {
      centerDialogVisible: false,
      title: ``,
      discription: ``,
      content: "", // 富文本里的内容
      editorOption: {
        // 富文本编辑器的工具栏
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value) {
                //替换原图片上传功能
                if (value) {
                  document
                    .querySelector(".quill-picture-uploader input")
                    .click(); //核心
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
        placeholder: "请输入你的内容",
      },
    };
  },
  methods: {
    backup() {
      this.$router.push({ name: "TopicList" });
    },
    onEditorChange(e) {
      // console.log(this.content);
      const _this = this;
      _this.content = e.html; // 标签以<p></p> 形式渲染 （重点）
      _this.contentTxt = e.text.substr(0, 100);
    },
    //上传图片之前校验
    bfUpload(file) {
      // console.log(file);
      if ("image/png" == file.type || "image/jpeg" == file.type) {
      } else {
        this.$message.error("图片插入失败,请检查文件格式");
        return;
      }
    },
    //正文插入图片上传成功调用
    uploadSuccess(response, file, fileList) {
      this.urlList.push(response.url);
      let quill = this.$refs.myQuillEditor.quill;
      if (response.url != null) {
        //获取光标所在位置
        let length = quill.getSelection().index;
        //插入图片
        quill.insertEmbed(length, "image", response.url);
        //移动光标到图片后
        quill.setSelection(length + 1);
      }
    },
  },
};
</script>


<style scoped>
#TopicEditor {
  width: 100%;
  min-height: 100vh;
  /* background: pink; */
}
#TopicEditor #r-nav {
  box-sizing: border-box;
  padding: 20px 0;
  color: var(--text2);
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-around; */
  right: 0;
  top: 0;
  height: 100%;
  width: 300px;
  position: fixed;
  /* background: pink; */
  /* border: 1px solid var(--background2); */
}
#TopicEditor #r-nav /deep/ .el-textarea__inner {
  margin-top: 10px;
  background: var(--background3);
  color: var(--text1);
}
#TopicEditor #r-nav .backup {
  margin-top: 10px;
  width: 90%;
  border: 1px solid #e55039;
  color: #eb2f06;
  border-radius: 4px;
  height: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
}
#TopicEditor #r-nav .backup:hover {
  color: #fff;
  background: rgba(235, 47, 6, 0.8);
}
#TopicEditor #r-nav .box {
  margin-top: 20px;
  width: 90%;
}
#TopicEditor #r-nav .box .upload {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
}
#TopicEditor #r-nav .box /deep/ .el-upload {
  transform: scale(0.76);
}
#TopicEditor #r-nav .box /deep/ .el-upload-dragger {
  background: var(--background3);
  color: var(--text1);
}

#TopicEditor #r-nav .submit {
  margin-top: 10px;
  width: 90%;
  border: 1px solid #6a89cc;
  color: #4a69bd;
  border-radius: 4px;
  height: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
}
#TopicEditor #r-nav .submit:hover {
  color: #fff;
  background: rgba(74, 105, 189, 0.8);
}
#TopicEditor #l-main {
  width: calc(100% - 300px);
}
.editor {
  height: calc(100vh - 42px);
}
.editor /deep/ .ql-container {
  font-size: 18px !important;
}
</style>