<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 导航栏 -->
        <el-tabs
          v-model="activeName"
          type="card"
          style="margin-top: 20px"
        >
          <el-tab-pane label="粉丝管理" name="first">
            <FansList />
          </el-tab-pane>
          <el-tab-pane label="阅读量统计" name="second" >
            <ReadingStatistics />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import FansList from "./components/FansList.vue";
import ReadingStatistics from "./components/ReadingStatistics.vue";
export default {
  name: "fansIndex",
  components: { FansList, ReadingStatistics },
  data() {
    return {
      activeName: "first",
    };
  },
};
</script>

<style >
.fansBox {
  margin-top: 20px;
  height: 220px;
  width: 150px;
  border: 1px solid grey;
  text-align: center;
}
.fansPhoto {
  margin-top: 10px;
  margin-bottom: 15px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
</style>