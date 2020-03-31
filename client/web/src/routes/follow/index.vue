<template>
  <section class="app-container">
    <div class="follows-container">
      <div class="atc-user-do" :key="username + nickname" v-for="({nickname, username}) in follows">
        <span class="atc-userinfo">
          <img class="atc-avatar" src="static/avatar.gif" />
          <span class="more-ellipsis" :title="nickname">
            <sup v-if="usernames.some(iName => iName === username) && fans.some(iName => iName === username)" style="color:red;font-size: 12px;">互粉</sup>
            {{nickname}}
          </span>
        </span>
        <template v-if="usernames.some(iName => iName === username)">
          <el-button
            :loading="loading"
            @click="toggleFollowHandle(username, 1)"
            size="mini"
            type="info"
            plain>取消关注</el-button>
        </template>
        <template v-else>
          <el-button
            :loading="loading"
            @click="toggleFollowHandle(username)"
            size="mini"
            type="danger"
            plain>关注</el-button>
        </template>
      </div>
    </div>
    <div class="batch-btn"><el-button :disabled="!usernames.length" size="small" type="danger" plain @click="batchUnFollow">批量取消(20)</el-button></div>
  </section>
</template>
<script>
export default {
  name: 'Follows',
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    follows() {
      return this.$store.state.global.follows
    },
    usernames() {
      return this.$store.state.global.usernames
    },
    fans() {
      return this.$store.state.global.fans.map(({fans: username}) => username)
    }
  },
  methods: {
    async batchUnFollow() {
      try {
        const loading = this.$loading({
          lock: true,
          text: "",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        await this.$store.dispatch('BatchUnFollow');
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
.more-ellipsis {
  line-height: 24px;
  height: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 170px;
}
.batch-btn {
  position: fixed;
  top: 10px;
  right: 300px;
  z-index: 2;
}
</style>
