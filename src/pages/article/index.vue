<template>
  <div class="articleContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 搜索栏 -->
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="articleStatus">
            <el-radio>全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              v-for="(channel, index) in channels"
              :key="index"
              :label="channels[index].name"
              :value="channels[index].id"
            ></el-option>
          </el-select>
        </el-form-item>

        <div class="block">
          <el-form-item label="日期">
            <el-date-picker
              type="datetimerange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="dateRange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button class="searchButton" type="primary" @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 搜索结果栏 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{ totalCount }} 条结果：
      </div>
      <!-- 数据列表 -->
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
      >
        <el-table-column prop="" label="封面">
          <template slot-scope="scope"
            ><img
              v-if="scope.row.cover.images[0]"
              class="coverImage"
              :src="scope.row.cover.images[0]"
              alt=""
            />
            <img class="coverImage" v-else src="./暂无封面.jpg" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag type="success" v-if="scope.row.status === 2">
                审核通过
              </el-tag>
              <el-tag type="" v-if="scope.row.status === 0"> 草稿 </el-tag>
              <el-tag type="warning" v-if="scope.row.status === 1">
                待审核
              </el-tag>
              <el-tag type="danger" v-if="scope.row.status === 3">
                审核失败
              </el-tag>
              <el-tag type="info" v-if="scope.row.status === 4">
                已删除
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" width="300">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="articleEdit(scope.row.id.toString())"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="articleDelete(scope.row.id.toString())"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        @current-change="onCurrenChange"
        class="pagination"
      >
      </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticle, getArticleChannels, deleteArticle } from "@/api/article";
export default {
  name: "ArticleIndex",
  data() {
    return {
      form: {
        name: "",
        region: null,
        date2: "",
        delivery: false,
        type: [],
        desc: "",
      },
      tableData: [],
      channels: [],
      totalCount: 1,
      channelId: null,
      dateRange: [],
      articleStatus: null,
      page: 1,
    };
  },
  methods: {
    loadArticle() {
      getArticle({
        page: this.page,
        status: this.articleStatus,
        channel_id: this.channelId,
        begin_pubdate: this.dateRange ? this.dateRange[0] : null,
        end_pubdate: this.dateRange ? this.dateRange[1] : null,
      }).then((res) => {
        this.tableData = res.data.data.results;
        this.totalCount = res.data.data.total_count;
      });
    },
    loadArticleChannels() {
      getArticleChannels().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    onSubmit() {
      this.loadArticle();
    },
    //编辑文章
    articleEdit(id) {
      this.$router.push(`/publish?id=${id}`);
    },

    //删除文章
    articleDelete(deleteId) {
      this.$confirm("是否确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loadArticle();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！",
          });
        });
      deleteArticle(deleteId).then((res) => {
        console.log(res);
      });
    },
    onCurrenChange(page) {
      this.page = page;
      this.loadArticle();
    },
  },
  created() {
    this.loadArticle(), this.loadArticleChannels();
  },
};
</script>

<style>
.searchButton {
  margin-top: 50px;
}
.coverImage {
  width: 100px;

  background-size: cover;
}
.pagination {
  text-align: center;
  margin-top: 20px;
}
</style>