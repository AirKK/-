<template>
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    style="border-right:0"
  >
   <el-menu-item class="logImg" index="/">
     
    </el-menu-item>
    <el-menu-item index="/">
      <i class="el-icon-location"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <!-- 使用iconfont图标时候要先注明iconfont再写图标名 -->
      <span slot="title">内容管理</span>
      <i class="iconfont icon-pinglun"></i>
    </el-menu-item>
    <el-menu-item index="images">
      <i class="iconfont icon-shuyi_sucaiguanli"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="publish">
      <i class="iconfont icon-fabuwenzhang"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="iconfont icon-pinglun"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="iconfont icon-fensiguanli"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="7">
      <i class="iconfont el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: ["is-collapse"],
};
</script>

<style>
.iconfont {
  margin-left: 4px;
  margin-right: 9px;
}
.el-menu-item * {
    font-size: 15px
}
.el-menu {
    border:0
}
.logImg{
  
}
</style>