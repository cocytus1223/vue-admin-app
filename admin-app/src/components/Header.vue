<template>
  <div class="header">
    <el-row>
      <el-col
        :span="6"
        class="title"
      >
        <h1>电商后台管理系统</h1>
      </el-col>
      <el-col
        :span="6"
        class="logout"
      >
        <span class="user">
          <!-- 下拉箭头 -->
          <el-dropdown
            trigger="hover"
            @command="setDialogInfo"
          >
            <img src="../assets/avatar.jpg">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="index">首页</el-dropdown-item>
              <el-dropdown-item
                command="logout"
                divided
              >退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    setDialogInfo(cmdItem) {
      // console.log(cmdItem);
      switch (cmdItem) {
        case 'index':
          this.showIndexList()
          break
        case 'logout':
          this.logout()
          break
      }
    },
    showIndexList() {
      this.$router.push('/Index')
    },
    logout() {
      this.$confirm('您确定要退出本系统吗？', '温馨提示', {
        type: 'warning'
      }).then(() => {
        // 清除token
        localStorage.removeItem('token')
        // 设置vuex store
        this.$store.dispatch('clearCurrentState')
        // 跳转
        this.$router.push('/login')
      }).catch(() => {
        this.$message.info('取消退出')
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.header
  height 60px
  background-color #B3C1CD
  padding 0 20px
  .title
    width 180px
    h1
      text-align center
      line-height 60px
      color #fff
      font-size 22px
  .logout
    font-weight 700
    text-align right
    line-height 60px
    float right
    .user
      cursor pointer
      margin-right 5px
      img
        height 50px
        width 50px
        vertical-align middle
        margin-right 10px
        border-radius 25px
      .el-dropdown
        color #fff
</style>
