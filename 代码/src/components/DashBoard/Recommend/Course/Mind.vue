<template>
  <div id="Mind">
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span
        >确定要退出吗？您还未保存修改，此时退出之前的操作将不会被保存！</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>

    <div id="menu">
      <div class="left">
        <el-tooltip content="添加子节点" placement="bottom" effect="light">
          <div class="box" @click="add">
            <i class="fal fa-plus-square"></i>
          </div>
        </el-tooltip>
        <el-tooltip content="删除该节点" placement="bottom" effect="light">
          <div class="box" @click="remove">
            <i class="fal fa-minus-square"></i>
          </div>
        </el-tooltip>
        <!-- <el-tooltip content="添加图片节点" placement="bottom" effect="light">
          <div class="box" @click="addImg">
            <i class="fal fa-image-polaroid"></i>
          </div>
        </el-tooltip>-->
        <el-tooltip content="放大视图" placement="bottom" effect="light">
          <div class="box" id="zoom-in-button" @click="zoomIn">
            <i class="fal fa-arrow-alt-to-top"></i>
          </div>
        </el-tooltip>
        <el-tooltip content="缩小视图" placement="bottom" effect="light">
          <div class="box" id="zoom-out-button" @click="zoomOut">
            <i class="fal fa-arrow-alt-from-top"></i>
          </div>
        </el-tooltip>
        <el-tooltip content="截屏" placement="bottom" effect="light">
          <div class="box" @click="screenShot">
            <i class="fal fa-camera-alt"></i>
          </div>
        </el-tooltip>
      </div>
      <div class="right">
        <el-select v-model="value" placeholder="请选择颜色主题">
          <el-option
            v-for="item in themes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.value
            }}</span>
          </el-option>
        </el-select>
        <el-button plain @click="centerDialogVisible = true"
          >退出编辑</el-button
        >
        <el-button plain @click="submit">保存修改</el-button>
      </div>
    </div>
    <div id="show">
      <div id="jsmind_container"></div>
      <div style="display: none">
        <input class="file" type="file" id="image-chooser" accept="image/*" />
      </div>
    </div>
  </div>
</template>

<script>
var jm = null;
var zoomInButton = null;
var zoomOutButton = null;
var imageChooser = null;
export default {
  name: "Mind",
  mounted() {
    this.loadMind();
  },
  methods: {
    loadMind() {
      // var nodes = [];
      var teacherUsername = sessionStorage.getItem("teacherUsername");
      var cname = sessionStorage.getItem("cname");
      const url = `https://vclass.api.cheeseburgerim.space/course/mindMap/api/getMindMap?teacherUsername=${teacherUsername}&cname=${cname}`;
      fetch(url, {
        method: "get",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.hasOwnProperty("result")) {
            for (let i = 0; i < data.length; i++) {
              let node = {};
              if (data[i].isRoot != ``) node.isroot = data[i].isRoot;
              if (data[i].nodeId != ``) node.id = data[i].id.nodeId;
              if (data[i].parentId != ``) node.parentid = data[i].parentId;
              if (data[i].topic != ``) node.topic = data[i].topic;
              if (data[i].direction != ``) node.direction = data[i].direction;
              if (data[i].expanded != ``) node.expanded = data[i].expanded;
              this.nodes.push(node);
            }
            if (this.nodes.length === 0) {
              this.nodes.push({
                id: "root",
                isroot: true,
                topic: sessionStorage.getItem("cname"),
              });
            }
            var mind = {
              // 3 data format supported ...
              // see Documents for more information
              meta: {
                name: "example",
                author: "Langwenchong",
                version: "0.2",
              },
              /* 数据格式声明 */
              format: "node_array",
              /* 数据内容 */
              data: this.nodes,
            };

            var options = {
              container: "jsmind_container",
              editable: true,
              theme: this.value,
              shortcut: {
                enable: true, // 是否启用快捷键
                handles: {}, // 命名的快捷键事件处理器
                mapping: {
                  // 快捷键映射
                  addchild: 45, // <Insert>
                  delnode: 8, // <Delete>
                },
              },
            };
            jm = new jsMind(options);
            jm.show(mind);

            zoomInButton = document.getElementById("zoom-in-button");
            zoomOutButton = document.getElementById("zoom-out-button");
            imageChooser = document.getElementById("image-chooser");
            imageChooser.addEventListener(
              "change",
              function (event) {
                // Read file here.
                var reader = new FileReader();
                reader.onloadend = function () {
                  var selected_node = jm.get_selected_node();
                  var nodeid = jsMind.util.uuid.newid();
                  var topic = undefined;
                  var data = {
                    "background-image": reader.result,
                    width: "100",
                    height: "100",
                  };
                  var node = jm.add_node(selected_node, nodeid, topic, data);
                  //var node = _jm.add_image_node(selected_node, nodeid, reader.result, 100, 100);
                  //add_image_node:function(parent_node, nodeid, image, width, height, data, idx, direction, expanded){
                };

                var file = imageChooser.files[0];
                if (file) {
                  reader.readAsDataURL(file);
                }
              },
              false
            );
            // console.log(nodes);
            // return nodes;
          } else {
            this.$notify.error({
              title: "错误",
              message: "思维导图加载失败！",
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
    submit() {
      var teacherUsername = sessionStorage.getItem("teacherUsername");
      var cname = sessionStorage.getItem("cname");
      const delUrl = `https://vclass.api.cheeseburgerim.space/course/mindMap/api/deleteMindMap?teacherUsername=${teacherUsername}&cname=${cname}`;
      fetch(delUrl, {
        method: "get",
        credentials: "include",
      })
        .then((res) => res.text())
        .then((data) => {
          if (data === `success`) {
            const url = `https://vclass.api.cheeseburgerim.space/course/mindMap/api/addMindMapNode`;
            var mind_data = jm.get_data("node_array");
            var ok = true;
            // console.log(mind_data);
            for (let i = 0; i < mind_data.data.length; i++) {
              let fd = new FormData();
              let md = mind_data.data[i];
              if (md.hasOwnProperty("id")) {
                fd.append("nodeId", md.id);
              } else {
                fd.append("nodeId", "");
              }
              if (md.hasOwnProperty("isroot")) {
                fd.append("isRoot", md.isroot);
              } else {
                fd.append("isRoot", "");
              }
              if (md.hasOwnProperty("parentid")) {
                fd.append("parentId", md.parentid);
              } else {
                fd.append("parentId", "");
              }
              if (md.hasOwnProperty("topic")) {
                fd.append("topic", md.topic);
              } else {
                fd.append("topic", "");
              }
              if (md.hasOwnProperty("direction")) {
                fd.append("direction", md.direction);
              } else {
                fd.append("direction", "");
              }
              if (md.hasOwnProperty("expanded")) {
                fd.append("expanded", md.expanded);
              } else {
                fd.append("expended", "");
              }
              fd.append(
                "teacherUsername",
                sessionStorage.getItem("teacherUsername")
              );
              fd.append("cname", sessionStorage.getItem("cname"));

              fetch(url, {
                method: "POST",
                body: fd,
                credentials: "include",
              })
                .then((res) => res.text())
                .then((data) => {
                  if (data === `success`) {
                    ok = true;
                  } else {
                    ok = false;
                  }
                })
                .catch((error) => {
                  this.$notify.error({
                    title: "错误",
                    message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！",
                  });
                });
            }
            if (ok) {
              this.updateMindLog();
              this.$notify({
                title: "保存成功",
                message: "思维导图发布成功啦✅",
                type: "success",
              });
            }
          } else {
            this.$notify.error({
              title: "错误",
              message: "❌思维导图更新出错！",
            });
          }
        });
    },
    updateMindLog() {
      var username = sessionStorage.getItem("userName");
      var activity = "编辑了";
      var teacherUsername = sessionStorage.getItem("userName");
      var cname = sessionStorage.getItem("cname");
      // var fname = this.file.name;
      var timestamp = this.currentTime();
      var fd = new FormData();
      fd.append("username", username);
      fd.append("activity", activity);
      fd.append("fname", cname);
      fd.append("timestamp", timestamp);
      fd.append("teacherUsername", teacherUsername);
      fd.append("cname", cname);
      const url = `https://vclass.api.cheeseburgerim.space/log/api/addLog`;
      fetch(url, {
        method: "POST",
        body: fd,
        credentials: "include",
      })
        .then((res) => res.text())
        .then((data) => {
          console.log("save log success");
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
          const actUrl = `https://vclass.api.cheeseburgerim.space/user/api/setAct?username=${username}&date=${clock}`;
          fetch(actUrl, {
            method: "get",
            credentials: "include",
          })
            .then((res) => res.text())
            .then((data) => {
              if (data === `success`) {
                this.$router.push({ name: `self` });
              }
            });
        })
        .catch((error) => {
          this.$notify.error({
            title: "错误",
            message: "服务器崩溃了~后台小哥哥正在紧急修复中🛠️！",
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
    logout() {
      this.$router.go(-1);
    },
    remove() {
      var selected_node = jm.get_selected_node();
      if (!selected_node) {
        this.$notify.error({
          title: "错误",
          message: "❌请先选择一个操作节点！",
        });
        return;
      }
      var node_id = selected_node.id;
      jm.remove_node(node_id);
    },
    addImg() {
      var selected_node = jm.get_selected_node(); // as parent of new node
      if (!selected_node) {
        this.$notify.error({
          title: "错误",
          message: "❌请先选择一个操作节点！",
        });
        return;
      }

      imageChooser.focus();
      imageChooser.click();
    },
    add() {
      var selected_node = jm.get_selected_node(); // as parent of new node
      if (!selected_node) {
        this.$notify.error({
          title: "错误",
          message: "❌请先选择一个操作节点！",
        });
        return;
      }

      var nodeid = jsMind.util.uuid.newid();
      var topic = "双击编辑内容";
      var node = jm.add_node(selected_node, nodeid, topic);
    },
    screenShot() {
      jm.screenshot.shootDownload();
    },
    zoomIn() {
      // console.log(jm.view.zoomIn());
      if (jm.view.zoomIn()) {
        zoomOutButton.disabled = false;
      } else {
        zoomInButton.disabled = true;
      }
    },
    zoomOut() {
      if (jm.view.zoomOut()) {
        zoomInButton.disabled = false;
      } else {
        zoomOutButton.disabled = true;
      }
    },
  },
  data() {
    return {
      nodes: [],
      centerDialogVisible: false,
      themes: [
        {
          value: "belizehole",
          label: "共享蓝",
        },
        {
          value: "pumpkin",
          label: "醒目橙",
        },
        {
          value: "pomegranate",
          label: "佩奇红",
        },
        {
          value: "nephrite",
          label: "辣眼绿",
        },
        {
          value: "wisteria",
          label: "基佬紫",
        },
        {
          value: "asphalt",
          label: "尊贵黑",
        },
        {
          value: "clouds",
          label: "简云白",
        },
      ],
      value: "belizehole",
    };
  },
  watch: {
    value(n, o) {
      jm.set_theme(n);
    },
  },
};
</script>

<style scoped>
#jsmind_container {
  float: left;
  width: 100%;
  height: calc(100% - 20px);
  border: solid 1px #ccc;
  /* background: #f4f4f4; */
}
#Mind {
  width: 100%;
  height: 100vh;
  /* background: pink; */
  box-sizing: border-box;
  padding-top: 78px;
  padding-left: 10px;
  padding-right: 10px;
}
#Mind #menu {
  opacity: var(--opacity);
  width: calc(100% - 78px);
  height: 48px;
  right: 0;
  top: 0;
  position: fixed;
  background: #f5f5f5;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #d4d4d4;
  align-items: center;
}
#Mind #menu .left {
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  height: 100%;
  width: 60%;
  /* background: green; */
}
#Mind #menu .left .box {
  font-size: 24px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 26px;
  width: 32px;
  height: 32px;
  /* background: #bdc3c7; */
}
#Mind #menu .left .box:hover {
  background: #eee;
}
#Mind #menu .right {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 35%;
  height: 100%;
  /* background: blue; */
}
#Mind #show {
  box-sizing: border-box;
  width: 100%;
  min-height: 200px;
  /* background: red; */
  height: 100%;
}
</style>