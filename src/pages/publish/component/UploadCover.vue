<template>
  <div class="avatar-uploader" @click="dialogVisible = true">
    <img
      ref="cover-image"
      :src="coverImg ? coverImg : require('./上传图片.png')"
      style="width: 100%; height: 100%"
    />
    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
      style="margin-top: -120px"
    >
      <!-- 导航栏 -->
      <el-tabs v-model="activeName" type="card" style="margin-top: 20px">
        <!-- 上传素材库图片模块 -->
        <el-tab-pane label="素材库" name="first">
          <ImgList :isShowUpLoad="false" :isShowStar="false" ref="img-list" />
        </el-tab-pane>

        <!-- 上传图片模块 -->
        <el-tab-pane label="上传图片" name="second">
          <input type="file" @change="onFileChange" ref="file" />
          <img
            ref="previewImg"
            src=""
            style="width: 300px; display: block; margin-top: 20px"
          />
        </el-tab-pane>
      </el-tabs>

      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSummit"> 上 传 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImgList from "@/pages/images/components/ImgList.vue";
import { uploadImages } from "@/api/material";
export default {
  name: "cover",
  components: { ImgList },
  props: ["coverImg"],
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
      isLoad: false,
    };
  },
  methods: {
    onFileChange() {
      console.log(this.$refs.file.files);
      //获取文件对象
      const file = this.$refs.file.files[0];
      //创建预览图
      const blob = window.URL.createObjectURL(file);
      this.$refs.previewImg.src = blob;
    },
    onSummit() {
      console.log(this.activeName);
      //判断是否为上传图片操作
      if (this.activeName == "second") {
        const file = this.$refs.file.files[0];
        //判断是否选择了图片
        if (!file) {
          this.$message({
            showClose: true,
            message: "请选择图片",
            type: "error",
          });
          return;
        }
        const fd = new FormData();
        fd.append("image", file);
        //上传图片
        uploadImages(fd).then((res) => {
          this.dialogVisible = false;
          //  显示图片
          this.$refs["cover-image"].src = res.data.data.url;
          //把图片地址通过自定义事件传给父组件
          this.$emit("coverImgUrl", res.data.data.url);
        });
      } else if (this.activeName === "first") {
        const imgList = this.$refs["img-list"];
        const selected = imgList.selected;
        //如果没有选取图片
        if (selected === null) {
          this.$message({
            showClose: true,
            message: "请选择图片",
            type: "error",
          });
          return;
        }
        //关闭对话框
        this.dialogVisible = false;
        //将图片传给父组件显示
        this.$emit("coverImgUrl", imgList.images[selected].url);
      }
    },
  },
};
</script>

<style>
.avatar-uploader {
  width: 170px;
  height: 170px;
  line-height: 170px;
  font-size: 28px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
</style>