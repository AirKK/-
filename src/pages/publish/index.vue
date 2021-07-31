// 发布文章模块
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ mode }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="form" :model="publish" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="publish.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="publish.content"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="publish.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="publish.channel_id" placeholder="请选择频道">
          <el-option
            v-for="(channel, index) in channels"
            :key="index"
            :label="channels[index].name"
            :value="channels[index].id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="searchButton"
          type="primary"
          @click.native="onPublish(false)"
          >发表</el-button
        >
        <el-button class="searchButton" @click.native="onPublish(true)"
          >存为草稿</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  getArticleChannels,
  addArticle,
  editArticle,
  getTargetArticle,
} from "@/api/article";
export default {
  name: "PublishIndex",
  data() {
    return {
      publish: {
        title: "",
        content: "",
        cover: {
          type: 5,
          images: [],
        },
        channel_id: null,
      },
      channels: null,
    };
  },
  methods: {
    //加载文章频道
    loadArticleChannels() {
      getArticleChannels().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    //发布文章||修改文章
    onPublish(draft) {
      if (this.queryId) {
        editArticle(this.publish, this.queryId).then(() => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$router.push("/article");
        });
      } else {
        addArticle(this.publish, draft).then(() => {
          this.$message({
            message: "提交成功",
            type: "success",
          });
          this.$router.push("/article");
        });
      }
    },
    //加载指定文章数据
    loadTargetArticle(queryId) {
      getTargetArticle(queryId).then((res) => {
        const response = res.data.data;

        this.publish = response;
      });
    },
  },
  computed: {
    queryId() {
      return this.$route.query.id;
    },
    mode() {
      return this.queryId ? "编辑文章" : "发布文章";
    },
  },
  created() {
    this.loadArticleChannels();
    if (this.queryId) {
      this.loadTargetArticle(this.queryId);
    }
  },
};
</script>

<style>
</style>