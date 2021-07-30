<template>
  <el-container class="layout-container">
    <el-aside width="auto" class="layout-aside">
      <Aside class="asideMenu" :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div class="heaedNav">
          <i
            :class="{
              'el-icon-s-fold': !isCollapse,
              'el-icon-s-unfold': isCollapse,
            }"
            @click="Collapse"
          ></i>
          <el-dropdown class="user">
            <span>
              {{ userProfile.name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click.native="quit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>头条后台管理系统</span>
          <img :src="userProfile.photo" alt="" class="userImg" />
        </div>
      </el-header>
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "./components/aside.vue";
import { getUserProfile } from "@/api/user";
// import { getUserProfile } from "@/api/user";
export default {
  data() {
    return {
      userProfile: {},
      isCollapse: false,
    };
  },
  methods: {
    logUserProfile() {
      getUserProfile().then((res) => {
        this.userProfile = res.data.data;
      });
    },
    Collapse() {
      this.isCollapse = !this.isCollapse;
    },
    quit() {
      this.$confirm("是否确定退出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 退出登录
          // 清空本地存储
          window.localStorage.removeItem("user");
          // 跳转回登录页面
          this.$router.push({
            name: "login",
          });
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出！",
          });
        });
    },
  },
  components: { Aside },

  created() {
    this.logUserProfile();
  },
};
</script>

<style>
.layout-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.layout-header {
  background-color: #b3c0d1;
}

.layout-aside {
  background-color: #d3dce6;
}
.asideMenu {
  height: 100%;
}
.layout-main {
  background-color: #e9eef3;
}
.el-icon-s-fold,
.el-icon-s-unfold {
  margin-right: 5px;
  transform: scale(1.4);
}
.heaedNav {
  height: 60px;
  line-height: 60px;
}
.userImg {
  float: right;
  margin-top: 10px;
  padding-right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user {
  float: right;
}
.el-dropdown {
  margin-right: 20px;
}
</style>