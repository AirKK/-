<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑模块 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-radio-group
      v-model="tabPosition"
      style="margin-bottom: 30px; width: 100%; position: relative"
    >
      <el-radio-button
        label="all"
        @click.native="
          page = 1;
          loadImages(false, 1);
        "
        >全部</el-radio-button
      >
      <el-radio-button
        label="collect"
        @click.native="
          page = 1;
          loadImages(true, 1);
        "
        >收藏</el-radio-button
      >

      <!-- 上传图片模块 -->

      <span style="position: absolute; right: 10px">
        <el-button type="primary" @click="dialogTableVisible = true">
          上传
          <i class="el-icon-upload el-icon--right"></i>
          <el-dialog
            title="上传图片"
            :visible.sync="dialogTableVisible"
            :append-to-body="true"
            width="450px"
          >
            <el-upload
              class="upload-demo"
              drag
              action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
              :headers="uploadHeader"
              name="image"
              :on-success="onUpLoadSuccess"
              :on-error="onUpLoadFail"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-dialog>
        </el-button>
      </span>
    </el-radio-group>

    <!-- 图片展示区s -->
    <div class="user-image">
      <el-row :gutter="20">
        <el-col
          :xs="12"
          :sm="8"
          :md="6"
          :lg="4"
          v-for="(image, index) in images"
          :key="index"
          style="margin-bottom: 20px"
        >
          <div style="position: relative">
            <el-image
              style="height: 200px "
              :src="image.url"
            >
              <div slot="error" class="image-slot">
                <img
                  src="./暂无封面.jpg"
                  alt=""
                  style="height: 100%; width: 100%"
                />
              </div>
            </el-image>
            <div class="sart-collect" style="">
              <i class="el-icon-delete-solid" @click="onDelete(image)"></i>
              <i
                :class="
                  image.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'
                "
                @click="onCollect(image)"
              >
              </i>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 列表分页 -->
    <el-pagination
      layout="prev, pager, next"
      background
      :total="total_count"
      :page-size="18"
      @current-change="onCurrenChange"
      class="pagination"
      :current-page.sync="page"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { getImages, collectImage, deleteImage } from "@/api/material";
export default {
  name: "imageIndex",
  data() {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    return {
      tabPosition: "all",
      images: [],
      page: 1,
      total_count: 1,
      dialogTableVisible: false,
      uploadHeader: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  },
  methods: {
    //加载图片
    loadImages(collect = false) {
      getImages({
        per_page: 18,
        page: this.page,
        collect,
      }).then((res) => {
        this.images = res.data.data.results;
        this.total_count = res.data.data.total_count;
      });
    },

    //页码发生变化刷新页码
    onCurrenChange(page) {
      this.page = page;
      this.loadImages();
    },

    // 上传图片成功关闭对话框刷新页面
    onUpLoadSuccess() {
      //关闭上传框
      this.dialogTableVisible = false;
      this.loadImages();
      this.$message({
        message: "上传成功",
        type: "success",
      });
    },

    //上传失败
    onUpLoadFail() {
      this.$message.error("上传失败，请检查文件格式并重传");
    },

    onCollect(img) {
      collectImage(img.id, !img.is_collected).then(() => {
        // 更新视图状态
        img.is_collected = !img.is_collected;
      });
    },

    onDelete(img) {
      deleteImage(img.id).then(() => {
        // 重新加载数据列表
        this.loadImages();
      });
    },
  },
  created() {
    this.loadImages(false);
  },
};
</script>

<style>
.sart-collect {
  background: rgba(67, 74, 80, 0.4);
  position: absolute;
  width: 100%;
  height: 45px;
  bottom: 4px;
  font-size: 25px;
}
.el-icon-delete-solid {
  position: absolute;
  bottom: 8px;
  left: 50px;
  color: #fff;
}
.el-icon-star-on,
.el-icon-star-off {
  position: absolute;
  bottom: 8px;
  right: 50px;
  color: #fff;
  transform: scale(1.3);
}
</style>