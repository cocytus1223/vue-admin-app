<template>
  <div class="rights">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="table-container">
      <el-table
        :data="rightsList"
        style="width:100%"
        v-if="rightsList.length > 0"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="权限名称"
          prop="authName"
        ></el-table-column>
        <el-table-column
          label="路径"
          prop="path"
        ></el-table-column>
        <el-table-column
          label="层级"
          prop="level"
        >
          <template slot-scope="{row}">
            <span v-if="row.level === '0'">一级</span>
            <span v-else-if="row.level === '1'">二级</span>
            <span v-else>三级</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rights',
  data() {
    return {
      rightsList: []
    }
  },
  created() {
    this.getRightList()
  },
  methods: {
    async getRightList() {
      let res = await this.$axios.get('api/rights/list')
      if (res.meta.status === 200) {
        this.rightsList = res.data
        console.log(this.rightsList)
      }
    }
  }
}
</script>

<style scoped>
</style>
