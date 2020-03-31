<template>
  <section class="app-main">
    <transition name="fade-tranform" mode="out-in">
      <router-view/>
    </transition>
  </section>
</template>
<script>
export default {
  name: 'AppMain'
}
</script>
<style scoped>
.app-main {
  height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
</style>
