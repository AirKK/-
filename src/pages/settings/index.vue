<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-row>
        <el-col :span="15">
          <el-form ref="form" :model="user" label-width="70px">
            <el-form-item label="编号">
              {{ user.id }}
            </el-form-item>
            <el-form-item label="手机">
              {{ user.mobile }}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :loading="updateProfileLoading"
                @click="onUpdateUser"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :offset="2" :span="4">
          <!-- 点击修改头像 -->
          <label for="file">
            <el-avatar
              shape="square"
              :size="150"
              fit="cover"
              :src="user.photo"
            ></el-avatar>
            <p>点击修改头像</p>
          </label>
          <input
            id="file"
            type="file"
            ref="file"
            hidden
            @change="onFileChange"
          />
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      append-to-body
      width="450px"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="preview-image-wrap">
        <img class="preview-image" :src="previewImage" ref="preview-image" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdatePhoto">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserProfile,
  updateUserPhotos,
  updateUserProfile,
} from "@/api/user";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
// import globalBus from "@/utils/global-bus";

export default {
  name: "SettingsIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        email: "",
        id: null,
        intro: "",
        mobile: "",
        name: "",
        photo: "",
      },
      dialogVisible: false, // 控制上传图片裁切预览的显示状态
      previewImage: "", // 预览图片
      cropper: null,
      updateProfileLoading: false,
      fd: null,
      imgFile: null,
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    onUpdateUser() {
      // 验证通过，提交表单
      // 开启 loading 状态
      this.updateProfileLoading = true;
      const { name, intro, email } = this.user;
      updateUserProfile({
        name,
        intro,
        email,
      }).then(() => {
        this.$message({
          type: "success",
          message: "保存成功",
        });

        // 关闭 loading 状态
        this.updateProfileLoading = false;

        // 更新头部当前登录用户的信息
        // 发布通知，用户信息已修改
        this.$bus.$emit("update-user", this.user);
      });
    },
    loadUser() {
      getUserProfile().then((res) => {
        this.user = res.data.data;
      });
    },

    onFileChange() {
      // 处于图片预览
      const file = this.$refs.file;

      const blobData = window.URL.createObjectURL(file.files[0]);

      this.previewImage = blobData;

      // 展示弹出层
      this.dialogVisible = true;

      // 解决选择相同文件不触发事件问题
      this.$refs.file.value = "";
    },

    onDialogOpened() {
      // 要在对话框完全打开的状态初始化裁切器。
      // 获取图片 DOM 节点
      const image = this.$refs["preview-image"];
      //初始化裁切器
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: "none",
        aspectRatio: 1,
        cropBoxResizable: false,
      });
    },

    // 对话框关闭，销毁裁切器
    onDialogClosed() {
      this.cropper.destroy();
    },

    onUpdatePhoto() {
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob((file) => {
        const fd = new FormData();
        fd.append("photo", file);
        this.imgFile = file;
        // 请求更新用户头像请求提交 fd
        updateUserPhotos(fd).then((res) => {
          // 关闭对话框
          console.log(res);
          this.dialogVisible = false;
          // 直接把裁切结果的文件对象转为 blob 数据本地预览
          this.user.photo = window.URL.createObjectURL(this.imgFile);
          this.$message({
            type: "success",
            message: "更新头像成功",
          });

          // 使用全局事件总线更新顶部登录用户的信息
          this.$bus.$emit("update-user", this.user);
        });
      });
    },
  },
};
</script>

<style >
.preview-image-wrap .preview-image {
  display: block;
  max-width: 100%;
  height: 200px;
}
</style>
