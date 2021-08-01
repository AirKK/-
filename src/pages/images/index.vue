<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑模块 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
      <el-radio-button label="all" @click.native="loadImages(false)"
        >全部</el-radio-button
      >
      <el-radio-button label="collect" @click.native="loadImages(true)"
        >收藏</el-radio-button
      >

      <!-- 上传图片模块 -->

      <span style="position: absolute; right: 100px">
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
          :xs="8"
          :sm="6"
          :md="6"
          :lg="4"
          v-for="(image, index) in images"
          :key="index"
        >
          <div>
            <el-image style="height: 200px" :src="image.url" fit="fit">
              <div slot="error" class="image-slot">
                <img src="./暂无封面.jpg" alt="" />
              </div>
            </el-image>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 列表分页 -->
    <el-pagination
      layout="prev, pager, next"
      background
      :total="total_count"
      :page-size="24"
      @current-change="onCurrenChange"
      class="pagination"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { getImages } from "@/api/material";
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
    loadImages(collect = false) {
      getImages({
        per_page: 24,
        page: this.page,
        collect,
      }).then((res) => {
        console.log(res);
        this.images = res.data.data.results;
        this.total_count = res.data.data.total_count;
      });
    },
    onCurrenChange(page) {
      this.page = page;
      this.loadImages();
    },
    onUpLoadSuccess() {
      //关闭上传框
      this.dialogTableVisible = false;
      this.loadImages();
    },
  },
  created() {
    this.loadImages(false);
  },
};
</script>

<style>
</style>