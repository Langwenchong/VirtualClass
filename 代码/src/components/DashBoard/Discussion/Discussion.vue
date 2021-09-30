<template>
  <div class="allResource">
    <el-row class="head animate__animated animate__fadeInDown">
      <el-col :span="18" style="padding:20px 0;background: #33CCCC;">
        <el-col :span="8">
          <span>
            这里个个都是人才！
          </span>
         <!-- {{ totalActiveNum }}
          <br />
          <span>投稿数</span>
        </el-col>
        <el-col :span="8" style="border: none;">
          {{ auditNum }}
          <br />
          <span>待审核</span> -->
          <span>
           说话又好听！
          </span>
        </el-col>
      </el-col>

      <el-col :span="5" :offset="1" style="background:  #3091F2;padding:40px 0;">
        <span>发表你的伟论</span>
      </el-col>
    </el-row>

    <el-card class="box-card animate__animated animate__fadeInUp">
      <h3>话题列表</h3>
      <el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
        <el-col :span="5" style="width: 160px;text-align: center;">已选择{{ activeNum }}个话题</el-col>
        <el-col :span="5" style="width: 140px;">
          <el-select v-model="currentType" placeholder="请选择话题列表分类">
            <el-option v-for="type in types" :value="type" :key="type"></el-option>
          </el-select>
        </el-col>
        <el-col :span="13">
          <!--<el-button :plain="true" type="info">设置话题分类</el-button>-->
          <el-button :plain="true" @click.native="handleRemove" type="danger">删除</el-button>
          <el-button :plain="true" @click.native="handleMoveToTop" type="info">置顶</el-button>
          <el-button :plain="true" @click.native="handleCopy" type="info">分享</el-button>
        </el-col>
      </el-row>

      <el-table
        :data="filteredTableData"
        style="width: 100%"
        @cell-click="handleSelect"
        @selection-change="selectionchange"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column property="title" label="话题名称"></el-table-column>
        <el-table-column property="type" label="话题分类"></el-table-column>
        <el-table-column property="status" label="话题状态"></el-table-column>
        <el-table-column property="readNum" label="浏览数"></el-table-column>
        <el-table-column property="signUpNum" label="观看数"></el-table-column>
        <el-table-column property="auditstatus" label="待审核"></el-table-column>
        <el-table-column inline-template label="链接" align="center" property="id">
          <el-button type="text" size="mini" @click="native">查看详情</el-button>
        </el-table-column>
      </el-table>

      <el-row type="flex" justify="end" style="padding:20px 0; ">
        <el-pagination
          :current-page="5"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="1000"
        ></el-pagination>
      </el-row>
    </el-card>
  </div>

</template>
<script>
export default {
  name: "allResouce",
  data: function() {
    return {
      auditstatus: 0,
      totalActiveNum: 3,
      totalSignUp: 204,
      auditNum: 15,
      activeNum: 0,
      currentType: "全部",
      selectItems: [],
      types: ["全部", "视频", "pdf", "文章"],
      tableData: [
        {
          id: "001",
          title: "打工是不可能打工的",
          type: "文章",
          status: "正常",
          readNum: 200,
          signUpNum: 100,
          auditNum: 100
        },
        {
          id: "002",
          title: "打工是不可能打工的",
          type: "视频",
          status: "正常",
          readNum: 200,
          signUpNum: 100,
          auditNum: 100
        },
        {
          id: "003",
          title: "打工是不可能打工的",
          type: "视频",
          status: "正常",
          readNum: 200,
          signUpNum: 100,
          auditNum: 100
        },
        {
          id: "004",
          title: "打工是不可能打工的",
          type: "视频",
          status: "正常",
          readNum: 200,
          signUpNum: 100,
          auditNum: 100
        }
      ]
    };
  },
  computed: {
    filteredTableData: function() {
      var type = this.currentType;
      return this.tableData.filter(function(data) {
        if (type == "全部" || type == "") {
          return true;
        } else {
          return data.type == type;
        }
      });
    }
  },
  methods: {
    handleSelect: function(row, column, cell, event) {
      if (column.label == "链接") {
        this.$router.push("/DashBoard/Comment");
      } else if (column.type == "selection") {
        row.$info = !row.$selected;
      } else {
        row.$selected = !row.$selected;
        row.$info = row.$selected;
      }
    },
    selectionchange: function(val) {
      var arr = [];
      val.forEach(function(item) {
        arr.push(item.id);
      });
      this.selectItems = arr;
      this.activeNum = this.selectItems.length;
    },
    handleRemove: function() {
      var tableData = this.tableData;
      this.selectItems.forEach(function(id) {
        tableData.forEach(function(data) {
          if (id == data.id) {
            tableData.splice(tableData.indexOf(data), 1);
          }
        });
      });
      this.selectItems = [];
    }
  }
};
</script>

<style>
.allResource {
  overflow: hidden;
  height: 100%;
}
.allResource > .head > .el-col > .el-col {
  padding: 20px 0;
  border-right: solid 1px #fff;
}

.allResource .head {
  text-align: center;
  color: #fff;
  font-size: 30px;
  margin-bottom: 50px;
}

.allResource .head span {
  font-size: 16px;
}
.box-card {
  background: var(--background1);
  height: calc(100% - 148.8px);
}
</style>
