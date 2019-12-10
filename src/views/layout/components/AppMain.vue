/* eslint-disable keyword-spacing */
<template>
  <section class="app-main">
    <transition
      name="fade"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  mounted() {
    // 根据屏幕宽度动态边栏折叠,动态分页导航、对话框全屏
    window.onresize = () => {
      if (document.documentElement.clientWidth < 632) {
        this.$store.state.app.sidebar.opened = false
        this.$store.state.app.dialog.fullScreen = true
        this.$store.state.app.pagation.layout = 'total, prev, next, jumper'
      } else {
        this.$store.state.app.sidebar.opened = true
        this.$store.state.app.dialog.fullScreen = false
        this.$store.state.app.pagation.layout = 'total, sizes, prev, pager, next, jumper'
      }
      // console.log(document.documentElement.clientHeight)
      switch (true) {
        case (document.documentElement.clientHeight >= 320 && document.documentElement.clientHeight <= 480):
          this.$store.state.app.table.height = document.documentElement.clientHeight * 0.9
          break
        case (document.documentElement.clientHeight > 480 && document.documentElement.clientHeight <= 568):
          this.$store.state.app.table.height = 290
          break
        case (document.documentElement.clientHeight > 568 && document.documentElement.clientHeight <= 640):
          this.$store.state.app.table.height = 360
          break
        case (document.documentElement.clientHeight > 640 && document.documentElement.clientHeight <= 667):
          this.$store.state.app.table.height = 375
          break
        case (document.documentElement.clientHeight > 667 && document.documentElement.clientHeight <= 736):
          this.$store.state.app.table.height = 465
          break
        case (document.documentElement.clientHeight > 736 && document.documentElement.clientHeight <= 823):
          this.$store.state.app.table.height = 550
          break
        // case (document.documentElement.clientHeight > 823 && document.documentElement.clientHeight <= 850):
        //   this.$store.state.app.table.height = 750
        //   break
        // case (document.documentElement.clientHeight > 1024 && document.documentElement.clientHeight <= 1366):
        //   this.$store.state.app.table.height = 1024
        //   break
        // case (document.documentElement.clientHeight > 1024):
        //   this.$store.state.app.table.height = ''
        //   break
        default:
          this.$store.state.app.table.height = ''
          break
      }
    }

    // if (document.documentElement.clientHeight < 1300) {
    //   console.log(document.documentElement.clientHeight)
    //   this.$store.state.app.table.height = document.documentElement.clientHeight * 0.6
    // } else {
    //   this.$store.state.app.table.height = ''
    // }
  }
}
</script>
