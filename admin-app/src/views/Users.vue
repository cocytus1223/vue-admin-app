<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/users">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form>
      <!-- 搜索框 -->
      <el-form-item>
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchUser"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          plain
          @click="handleAdd"
        >添加用户</el-button>
      </el-form-item>
    </el-form>
    <div class="table_container">

      <!-- 表格 -->
      <el-table
        :data="userList"
        style="width: 100%"
        v-if="userList.length > 0"
      >
        <el-table-column
          prop="username"
          label="姓名"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="mg_state"
          label="状态"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="changeState(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              plain
              circle
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              plain
              circle
              @click="handleDelete(scope.row.id)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              size="mini"
              plain
              round
            >分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-row>
      <el-col :span=24>
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[2, 4, 6, 8, 10]"
            :page-size="pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <dialog-info
      :dialog="dialog"
      @update="getUserList"
      :formData="formData"
    ></dialog-info>
  </div>
</template>

<script>
import DialogInfo from '../components/Dialog'
export default {
  name: 'users',
  components: {
    DialogInfo
  },
  data() {
    return {
      userList: [],
      query: '',
      pageSize: 2,
      currentPage: 1,
      total: 0,
      formData: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      },
      dialog: {
        show: false,
        title: '',
        option: 'edit'
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      let res = await this.$axios({
        method: 'get',
        url: '/api/users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      })
      let { meta: { status }, data: { users, total } } = res
      if (status === 200) {
        this.userList = users
        this.total = total
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      // 修改 currentPage
      this.currentPage = val
      // 重新渲染
      this.getUserList()
    },
    async handleDelete(id) {
      try {
        // 弹出一个确认框
        await this.$confirm('你确定要删除该用户吗?', '温馨提示', {
          type: 'warning'
        })
        let res = await this.$axios.delete(`/api/users/${id}`)
        if (res.meta.status === 200) {
          if (this.userList.length <= 1 && this.currentPage > 1) {
            this.currentPage--
          }
          this.getUserList()
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      } catch (error) {
        this.$message.info('取消删除')
      }
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: '修改信息',
        option: 'edit'
      }
      this.formData = {
        username: row.username,
        id: row.id,
        email: row.email,
        mobile: row.mobile
      }
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: '添加信息',
        option: 'add'
      }
      this.formData = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.dialog.show = true
    },
    searchUser() {
      this.currentPage = 1
      this.getUserList()
    },
    async changeState(user) {
      let res = await this.$axios.put(`/api/users/${user.id}/state/${user.mg_state}`)
      if (res.meta.status === 200) {
        this.$message.success('修改成功')
        this.getUserList()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.el-breadcrumb
  height 40px
  line-height 40px
.el-input
  width 300px
  margin-bottom 5px
</style>
