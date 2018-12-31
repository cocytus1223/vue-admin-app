<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        :default-active="$route.path.slice(1)"
        class="el-menu-vertical-demo"
        background-color="#545C64"
        text-color="#fff"
        active-text-color="#409eff"
        unique-opened
        router
      >
        <router-link to="/index">
          <el-menu-item index="0">
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <el-submenu
          :index="menu.path"
          v-for="menu in menuList"
          :key="menu.id"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ menu.authName }}</span>
          </template>
          <el-menu-item
            :index="item.path"
            v-for="item in menu.children"
            :key="item.id"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.authName }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'left-menu',
  data() {
    return {
      menuList: []
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      let res = await this.$axios.get('/api/menus')
      this.menuList = res.data
    }
  }
}
</script>

<style scoped lang="stylus">
a
  text-decoration none
</style>
