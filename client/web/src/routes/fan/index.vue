<template>
  <section class="app-container">
    <div class="follows-container">
      <div class="atc-user-do" :key="fans + nickname" v-for="({nickname, fans}) in fans">
        <span class="atc-userinfo">
          <img class="atc-avatar" src="static/avatar.gif" />
          <span>{{nickname}}</span>
        </span>
        <template v-if="usernames.some(iName => iName === fans)">
          <el-button
            :loading="loading"
            @click="toggleFollowHandle(fans, 1)"
            size="mini"
            type="info"
            plain>取消关注</el-button>
        </template>
        <template v-else>
          <el-button
            :loading="loading"
            @click="toggleFollowHandle(fans)"
            size="mini"
            type="danger"
            plain>关注</el-button>
        </template>
      </div>
    </div>
    <div class="batch-btn"><el-button :disabled="!fans.length" size="small" type="danger" plain @click="batchFollow">批量关注(20)</el-button></div>
  </section>
</template>
<script>
import { fetchFans } from '@/services/user';
export default {
  name: 'Fans',
  data() {
    return {
      loading: false,
      // fans: [],
    }
  },
  created() {
    this.$store.dispatch('FetchGlobalFans')
  },
  computed: {
    usernames() {
      return this.$store.state.global.usernames
    },
    fans() {
      return this.$store.state.global.fans
    }
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
        let ids = [];
        for(let {fans: username} of this.fans) {
          if(ids.length > 19) break;
          if (!this.usernames.some(name => username === name)) ids.unshift(username);
        }
        if(!ids.length) {
          loading.close()
          return};
        await this.$store.dispatch('BatchFollow', {ids: Array.from(new Set(ids))});
        loading.close()
      } catch (e) {
        console.error(e)
      }
    },
    async toggleFollowHandle(username, isUnFollow) {
      const action = isUnFollow ? 'UnFollow' : "DoFollow";
      this.loading = true;
      await this.$store.dispatch(action, {username});
      this.loading = false;
    },
  }
}
</script>
<style scoped>
.follows-container {
  display: flex;
  flex-wrap: wrap;
}
.atc-user-do {
  display: flex;
  align-items: center;
  width: 340px;
  height: 44px;
  justify-content: space-between;
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
.batch-btn {
  position: fixed;
  top: 10px;
  right: 300px;
  z-index: 2;
}
</style>
