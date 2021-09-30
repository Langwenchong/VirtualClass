<template>
  <div id="log">
    <p class="note" v-if="activities.length<=0">
      <i class="fad fa-calendar-edit"></i>&nbsp;无课程事务
    </p>
    <div class="log-wrapper" v-if="activities.length>0">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          v-if="index<max"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >{{activity.content}}</el-timeline-item>
        <el-button
          class="more"
          v-if="activities.length<=0||max===activities.length?false:true"
          type="text"
          @click="load"
        >
          <i class="fad fa-books-medical"></i>&nbsp;&nbsp;加载更多
        </el-button>
        <el-button
          class="more"
          v-if="activities.length>0&&max===activities.length?true:false"
          type="text"
        >
          <i class="fad fa-narwhal"></i>&nbsp;&nbsp;没有更多了...
        </el-button>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "log",
  created() {
    var teacherUsername = sessionStorage.getItem("teacherUsername");
    var cname = sessionStorage.getItem("cname");
    const url = `/apis/log/api/getAllLog?teacherUsername=${teacherUsername}&cname=${cname}`;
    fetch(url, {
      method: `GET`
    })
      .then(res => res.json())
      .then(data => {
        var activities = [];
        if (data instanceof Array) {
          for (let i = 0; i < data.length; i++) {
            var act = {};
            if (data[i].activity != `更新了`&&data[i].activity != `编辑了`) {
              act.content =
                data[i].name +
                " " +
                data[i].activity +
                " " +
                data[i].fname +
                " 文件";
            } else if (data[i].activity === `编辑了`) {
              act.content =
                data[i].name +
                " " +
                data[i].activity +
                " " +
                data[i].fname +
                " 知识点思维导图";
            } else {
              act.content =
                data[i].name +
                " " +
                data[i].activity +
                " " +
                data[i].fname +
                " 安排课表";
            }
            act.timestamp = data[i].timestamp;
            act.size = "large";
            if (data[i].activity === `上传了`) {
              act.icon = `fad fa-arrow-alt-from-bottom`;
              act.color = `#00b894`;
            } else if (data[i].activity === `下载了`) {
              act.icon = `fad fa-arrow-to-bottom`;
              act.color = `#0984e3`;
            } else if (data[i].activity === `阅览了`) {
              act.icon = `fad fa-fan`;
              act.color = `#a29bfe`;
            } else if (data[i].activity === `删除了`) {
              act.icon = `fad fa-map-marker-times`;
              act.color = `#d63031`;
            }else if (data[i].activity === `编辑了`) {
              act.icon = `fad fa-globe-stand`;
              act.color = `#e83e8c`;
            } else if (data[i].activity === `更新了`) {
              act.icon = `fad fa-award`;
              act.color = `#f1c40f`;
            }
            activities.push(act);
          }
          this.activities = activities;
        } else {
          this.$notify.error({
            title: "错误",
            message: "❌日志加载失败！"
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
  data() {
    return {
      max: 5,
      count: 0,
      activities: []
    };
  },
  methods: {
    load() {
      if (this.max + 5 > this.activities.length) {
        this.max = this.activities.length;
      } else {
        this.max += 5;
      }
    }
  }
};
</script>


<style scoped>
#log {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #000; */
  /* overflow: scroll; */
}
#log .log-wrapper {
  width: 95%;
  height: 400px;
  overflow-y: scroll;
  /* background: #000; */
}
#log .more {
  margin: 0 auto;
}
#log /deep/ .el-timeline-item__content {
  color: var(--text1) !important;
}
.note {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-left: 20px;
  width: 80%;
  height: 400px;
  font-size: 42px;
  color: var(--text2);
  text-align: center;
  border: 1px dashed var(--text2);
  font-family: "FangSong";
}
</style>