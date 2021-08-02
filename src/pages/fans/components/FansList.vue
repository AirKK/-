<template>
  <!-- 粉丝列表 -->
  <div class="fan-list">
    <el-row>
      <el-col
        class="fansList"
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        v-for="(fan, index) in fanList"
        :key="index"
      >
        <div class="fansBox">
          <el-image :src="fan.photo" alt="" class="fansPhoto">
            <div slot="error" class="image-slot">
              <img
                src="./暂无封面.jpg"
                alt=""
                style="height: 100%; width: 100%"
              />
            </div>
          </el-image>
          <div style="margin-bottom: 15px">{{ fan.name }}</div>
          <el-button type="primary" plain @click="onFollow">+关注</el-button>
        </div>
      </el-col>
    </el-row>
    <div></div>
    <el-pagination
      layout="prev, pager, next"
      background
      :total="total_count"
      :page-size="24"
      @current-change="onCurrenChange"
      class="pagination"
      :current-page.sync="page"
    >
    </el-pagination>
  </div>

  <!-- 列表分页 -->
</template>

<script>
import { getFans } from "@/api/user";
export default {
  data() {
    return {
      fanList: [],
      total_count: 1,
      page: 1,
    };
  },
  methods: {
    loadFans() {
      getFans({
        page: this.page,
        per_page: 24,
      }).then((res) => {
        this.fanList = res.data.data.results;
        this.total_count = res.data.data.total_count;
      });
    },
    onCurrenChange(page) {
      this.page = page;
      this.loadImages();
    },
    onFollow() {
      this.$message({
        message: "关注成功",
        type: "success",
      });
    },
  },
  created() {
    this.loadFans();
  },
};
</script>

<style>
</style>