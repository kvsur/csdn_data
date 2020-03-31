<template>
  <section class="app-container">
    <div class="column-left">
      <el-menu
        :default-active="activeIndex"
        class="column-menu"
        mode="vertical"
        @select="handleColumnSelect"
        background-color="#fff"
        text-color="#000"
        active-text-color="red"
      >
        <el-menu-item :key="key" v-for="({key, value}) in navs" :index="key">{{value}}</el-menu-item>
      </el-menu>
    </div>
    <div class="column-right">
      <h4 class="current-column">
        当前栏目：{{columnName || '--'}}
        <span
          style="color: red;font-weight: normal;font-size: 14px;"
        >注⚠️：栏目对应文章的分类相关性是由CSDN自身搜索算法决定的，与本平台无关</span>
      </h4>
      <div class="change-for-more">
        <el-button v-if="articles.length" type="danger" size="small" @click="batchFollow" plain>批量关注当前</el-button>
        <el-button type="primary" size="small" @click="refresh('new')" plain>获取更新</el-button>
        <el-button type="primary" size="small" @click="refresh()" plain>换一批</el-button>
      </div>
      <div :key="atc.url" v-for="atc in articles" class="atc-item">
        <a :href="atc.url" target="_blank" class="atc-title" :title="atc.title">{{atc.title}}</a>
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
  fetchFirstPage,
  fetchNavData,
  fetchColumnData
} from "@/services/article";
export default {
  name: "Column",
  mounted() {
    // this.getFirstPage();
    if(this.navs.length) {
      this.activeIndex = 'home';
      this.columnName = '推荐';
      this.getFirstPage();
    }
  },
  data() {
    return {
      activeIndex: "",
      columnName: "",
      isSpecial: false, // 是否位特殊专栏，例如区块链、ai、cloud云等
      articles: [],
      page: 1,
      loading: false,
    };
  },
  computed: {
    navs() {
      return this.$store.state.global.navs.filter(
        ({ key }) => key !== "watchers"
      );
    },
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
    handleColumnSelect(index) {
      if (this.activeIndex === index) return;
      this.activeIndex = index;
      if (index.startsWith("column")) {
        this.isSpecial = true;
      } else {
        this.isSpecial = false;
      }
      this.page = 1;
      this.columnName = this.navs.find(({ key }) => key === index).value;
      this.getFirstPage();
    },
    async getFirstPage() {
      const loading = this.$loading({
        lock: true,
        text: "",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.articles = [];
      try {
        const key = this.isSpecial ? "column" : "nav";
        const value = this.isSpecial
          ? this.activeIndex.split(".")[1]
          : this.activeIndex;
        const { code, data } = await fetchFirstPage({ [key]: value });
        if (code === 200) this.articles = data;
        else throw new Error("");
      } catch (e) {
        console.error(e);
        this.$message({
          type: "error",
          message: "获取对应栏目数据失败"
        });
      } finally {
        loading.close();
      }
    },
    async refresh(isNew) {
      const loading = this.$loading({
        lock: true,
        text: "",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      try {
        let res;
        if (this.isSpecial) {
          const column = this.activeIndex.split(".")[1];
          const page = this.page;
          res = await fetchColumnData({ column, page });
          this.page = this.page++;
        } else {
          const category = this.activeIndex;
          const type = isNew ? 'new':'more';
          res = await fetchNavData({type, category});
        }

        const { code, data } = res;
        if (code === 200) this.articles = data;
        else throw new Error("");
      } catch (e) {
        console.error(e);
        this.$message({
          type: "error",
          message: "获取对应栏目数据失败"
        });
      } finally {
        loading.close();
      }
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
.column-menu {
  width: 130px;
}
.column-left {
  height: calc(100vh - 50px);
  overflow-y: auto;
  position: fixed;
}
.column-right {
  flex: 1;
  padding: 10px;
  margin-left: 132px;
  position: relative;
}
.current-column {
  position: sticky;
  top: 0;
  background: #fff;
  margin: 0;
  padding: 20px 5px;
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
}
</style>
