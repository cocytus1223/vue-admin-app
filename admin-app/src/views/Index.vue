<template>
  <el-container class="index">
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <left-menu />
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '../components/Header'
import LeftMenu from '../components/LeftMenu'
export default {
  name: 'index',
  components: {
    Header,
    LeftMenu
  }
}
</script>

<style lang="stylus">
.index
  width 100%
  height 100%
  .el-header
    padding 0
  .el-container
    .el-aside
      background-color #545C64
</style>
