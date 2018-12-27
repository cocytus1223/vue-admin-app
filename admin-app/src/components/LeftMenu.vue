<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#545C64"
        text-color="#fff"
        active-text-color="#409eff"
        unique-opened
      >
        <router-link to="/index">
          <el-menu-item index="0">
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu
            v-if="item.children"
            :index="item.path"
            :key="item.path"
          >
            <template slot="title">
              <i :class="'el-icon-location'"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              v-for="(citem,cindex) in item.children"
              :to="citem.path"
              :key="cindex"
            >
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'left-menu',
  data() {
    return {
      items: [
        {
          name: '用户管理',
          path: 'user',
          children: [
            { path: 'users', name: '用户列表' }
          ]
        },
        {
          name: '权限管理',
          path: 'authority',
          children: [
            { path: 'roles', name: '角色管理' },
            { path: 'rights', name: '权限管理' }
          ]
        },
        {
          name: '商品管理',
          path: 'commodity',
          children: [
            { path: 'goods', name: '商品列表' },
            { path: 'params', name: '分类参数' },
            { path: 'categories', name: '商品分类' }
          ]
        },
        {
          name: '订单管理',
          path: 'order',
          children: [
            { path: 'orders', name: '订单列表' }
          ]
        },
        {
          name: '数据统计',
          path: 'data',
          children: [
            { path: 'reports', name: '数据报表' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
a
  text-decoration none
</style>
