<template>
  <section class="main-layout">
    <main-header />
    <app-main />
  </section>
</template>
<script>
import MainHeader from './components/Header'
import AppMain from './components/Main'

export default {
  name: 'Layout',
  components: {
    MainHeader,
    AppMain
  },
  created() {
    this.$store.dispatch('FetchGlobalNavs')
    this.$store.dispatch('FetchGlobalFollows')
    this.$store.dispatch('FetchGlobalFans')
  },
  watch: {
    $route(val) {
      if(val.name === 'cookie' || val.name === '404') return;
      this.$store.dispatch('FetchGlobalFollows')
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
