<template>
  <section class="main-header">
    <el-menu
      :default-active="activeIndex"
      class="main-menu"
      mode="horizontal"
      @select="goNav"
      background-color="#1f2d3d"
      text-color="#fff"
      active-text-color="red"
    >
      <el-menu-item v-for="({key, value}) in navs" :key="key" :index="key">
        {{value}}
      </el-menu-item>
    </el-menu>
  </section>
</template>
<script>
export default {
  name: 'MainHeader',
  computed: {
    activeIndex() {
      return this.$route.name
    }
  },
  data() {
    return {
      navs: [
        {
          key: 'column',
          value: '栏目'
        },
        {
          key: 'so',
          value: '博客搜索'
        },
        {
          key: 'follows',
          value: '关注的人'
        },
        {
          key: 'fans',
          value: '所有粉丝'
        },
        {
          key: 'cookie',
          value: '更新cookie'
        }
      ]
    };
  },
  methods: {
    goNav(index) {
      this.$router.push({
        path: index
      })
    }
  }
};
</script>
<style scoped>
.main-header {
  box-sizing: border-box;
  height: 50px;
}

.main-header /deep/ .el-menu--horizontal>.el-menu-item {
  height: 50px;
  box-sizing: border-box;
}

.main-menu {
  display: flex;
  justify-content: center;
}
</style>
