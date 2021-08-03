// 发布文章模块
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ mode }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form
      ref="publishForm"
      :model="publish"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="publish.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- 富文本编辑器 -->
        <div>
          <el-tiptap
            v-model="publish.content"
            :extensions="extensions"
            lang="zh"
            placeholder="请输入文章内容"
          />
        </div>
      </el-form-item>
      <div></div>
      <el-form-item label="封面">
        <el-radio-group v-model="publish.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 自定义事件如果想传递自定义参数还想得到默认参数可以使用$event -->
      <!-- 上传封面模块 -->
      <template>
        <UploadCover
          v-for="(cover, index) in publish.cover.type"
          :key="cover"
          class="cover"
          @coverImgUrl="acceptUrl(index, $event)"
          :coverImg="publish.cover.images[index]"
        />
      </template>

      <el-form-item label="频道" prop="channel_id">
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
import UploadCover from "./component/UploadCover.vue";
import {
  getArticleChannels,
  addArticle,
  editArticle,
  getTargetArticle,
} from "@/api/article";
import { uploadImages } from "@/api/material";
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  Preview,
  Image,
  Fullscreen,
} from "element-tiptap";
// import element-tiptap 样式
import "element-tiptap/lib/index.css";
export default {
  name: "PublishIndex",
  data() {
    return {
      //表单内容
      publish: {
        title: "",
        content: "",
        cover: {
          type: 0,
          images: [],
        },
        channel_id: null,
      },
      //表单验证规则
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 5,
            max: 30,
            message: "长度在 5 到 30 个字符",
            trigger: "blur",
          },
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "change" },
          //该编辑器插件当输入过内容后content会残留p标签需要自定义规则验证
          {
            validator(rule, value, callback) {
              console.log("content validator");
              if (value === "<p></p>") {
                // 验证失败
                callback(new Error("请输入文章内容"));
              } else {
                // 验证通过
                callback();
              }
            },
          },
        ],
        channel_id: [{ required: true, message: "请选择频道" }],
      },
      //频道信息
      channels: null,
      //富文本编辑器
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline(), // 下划线
        new Image({
          uploadRequest(file) {
            // 接口要求 Content-Type 是 multipart/form-data，所以请求体必须使用 FormData
            const fd = new FormData();
            fd.append("image", file);
            return uploadImages(fd).then((res) => {
              return res.data.data.url;
            });
          },
        }),
        new Italic(), // 斜体
        new Strike(), // 删除线
        new ListItem(),
        new BulletList(), //无序列表
        new OrderedList(), //有序列表
        new TodoItem(),
        new TodoList(),
        new Preview(),
        new Fullscreen(),
      ],
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
      this.$refs["publishForm"].validate((valid) => {
        if (valid) {
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
        } else {
          return false;
        }
      });
    },
    //加载指定文章数据
    loadTargetArticle(queryId) {
      getTargetArticle(queryId).then((res) => {
        const response = res.data.data;

        this.publish = response;
      });
    },
    //接收子组件传递的图片
    acceptUrl(index, url) {
      this.publish.cover.images[index] = url;
    },
  },
  components: {
    "el-tiptap": ElementTiptap,
    UploadCover,
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
.cover {
  display: inline-block;
  margin-left: 80px;
  margin-bottom: 20px;
}
</style>