<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑模块 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 图片模块 -->
    <ImgList :isSelected="false" />
  </el-card>
</template>

<script>
import ImgList from "./components/ImgList.vue";
export default {
  name: "imageIndex",
  components: { ImgList },
};
</script>

<style>
</style>