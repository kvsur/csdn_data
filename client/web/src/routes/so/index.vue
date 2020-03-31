<template>
  <section class="app-container">
    <div class="search-section">
      <el-form inline @submit.native.prevent>
        <el-form-item>
          <el-input @keyup.enter.native.prevent="doSo(false)" @blur="doSo(false)" v-model="soValue" class="search-input" size="mini" placeholder="输入需要搜索的值" />
        </el-form-item>
        <el-form-item>
          <el-button @click="doSo(false)" icon="el-icon-search" size="mini" type="danger" plain>搜素</el-button>
        </el-form-item>
      </el-form>
      <h4 class="current-column">
        搜索结果
        <span
          style="color: red;font-weight: normal;font-size: 14px;"
        >注⚠️：搜索结果相关性是由CSDN自身搜索算法决定的，与本平台无关</span>
      </h4>
    </div>
    <div class="column-right">
      <div class="change-for-more" >
        <el-button v-if="articles.length" type="danger" size="small" @click="batchFollow" plain>批量关注当前</el-button>
        <el-button type="primary" v-if="counts >= 20" size="small" @click="nextPage" plain>下一页</el-button>
      </div>
      <div :key="atc.url" v-for="atc in articles" class="atc-item">
        <a :href="atc.url" target="_blank" class="atc-title" :title="atc.title" v-html="atc.title"></a>
        <div class="atc-user-do">
          <span class="atc-userinfo">
            <img class="atc-avatar" src="static/avatar.gif" />
            <span>{{atc.nickname || atc.nick_name}}</span>
          </span>
          <template v-if="usernames.some(name => atc.user_name === name)">
            <el-button
              :loading="loading"
              @click="toggleFollowHandle(atc.user_name, 1)"
              size="mini"
              type="info"
              plain>取消关注</el-button>
          </template>
          <template v-else>
            <el-button
              :loading="loading"
              @click="toggleFollowHandle(atc.user_name)"
              size="mini"
              type="danger"
              plain>关注</el-button>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {
  doSearch
} from "@/services/article";
export default {
  name: "So",
  mounted() {
    // this.getFirstPage();
  },
  data() {
    return {
      articles: [],
      counts: 0,
      page: 1,
      soValue: '',
      oldValue: '',
      loading: false,
    };
  },
  computed: {
    usernames() {
      return this.$store.state.global.usernames
    },
  },
  methods: {
    async batchFollow() {
      try {
        const loading = this.$loading({
          lock: true,
          text: "",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        const ids = this.articles.map(({user_name}) => user_name).filter(item => !this.usernames.some(name => name === item));
        await this.$store.dispatch('BatchFollow', {ids: Array.from(new Set(ids))});
        loading.close()
      } catch (e) {

      }
    },
    async toggleFollowHandle(username, isUnFollow) {
      const action = isUnFollow ? 'UnFollow' : "DoFollow";
      this.loading = true;
      await this.$store.dispatch(action, {username});
      this.loading = false;
    },
    async doSo(isFromNextPage) {
      if(!isFromNextPage && (!this.soValue || this.soValue === this.oldValue)) return;
      if (!isFromNextPage) this.page = 1;
      const loading = this.$loading({
        lock: true,
        text: "",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.articles = [];
      try {
        const p = this.page;
        const q = this.soValue;
        const { code, data, data_all } = await doSearch({p, q});
        if (code === 200) {
          this.articles = data;
          this.counts = data_all;
          this.oldValue = q;
        } else {
          throw new Error('');
        }
      } catch (e) {
        console.error(e);
        this.$message({
          type: "error",
          message: "搜索失败"
        });
      } finally {
        loading.close()
      }
    },
    nextPage() {
      this.page = this.page + 1
      this.$nextTick(_ => {
        this.doSo(true);
      })
    }
  }
};
</script>
<style scoped>
.app-container {
  /* border-top: 1px solid #fff; */
  /* display: flex;
  flex-wrap: nowrap; */
}
.search-section {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
  padding-bottom: 10px;
  box-shadow: 8px 7px 7px 0px #e7e2e2;
  padding-left: 132px;
}
.search-section .search-input {
  width: 280px;
}
.column-right {
  position: relative;
  padding-left: 132px;
}
.current-column {
  background: #fff;
  margin: 0;
  /* padding: 20px 5px; */
}
.atc-item {
  color: #3d3d3d;
  padding-bottom: 10px;
  padding-left: 50px;
}
.atc-item:not(:last-child) {
  border-bottom: 1px solid #eeeeee;
}
.atc-user-do {
  display: flex;
  align-items: center;
}
.atc-title {
  max-width: 98%;
  color: #3d3d3d;
  display: block;
  line-height: 24px;
  height: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;
  text-decoration: none;
  padding: 10px 0;
}

.atc-userinfo {
  display: inline-flex;
  align-items: center;
  /* width: 190px;; */
  margin-right: 20px;
  margin-left: 20px;
}
.atc-avatar {
  width: 24px;
  height: 24px;
  border-radius: 12px;
}
.change-for-more {
  position: fixed;
  right: 50px;
  top: 70px;
  z-index: 2;
}
</style>
