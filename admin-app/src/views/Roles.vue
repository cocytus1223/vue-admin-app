<template>
  <div class="roles">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="success"
      plain
      @click="showAdd"
    >添加角色</el-button>
    <div class="table-container">
      <el-table :data="rolesList">
        <el-table-column type="expand">
          <template slot-scope="{row}">
            <span v-show="row.children.length === 0">暂无权限</span>
            <!-- 展示一级权限 -->
            <el-row
              class="l1"
              v-for="l1 in row.children"
              :key="l1.id"
            >
              <el-col :span="4">
                <el-tag
                  @close="delRight(row, l1.id)"
                  closable
                >{{l1.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <!-- 展示二级权限 -->
                <el-row
                  class="l2"
                  v-for="l2 in l1.children"
                  :key="l2.id"
                >
                  <el-col :span="4">
                    <el-tag
                      @close="delRight(row, l2.id)"
                      closable
                      type="success"
                    >{{l2.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="20">
                    <!-- 展示3级 -->
                    <el-tag
                      @close="delRight(row, l3.id)"
                      closable
                      class="l3"
                      type="danger"
                      v-for="l3 in l2.children"
                      :key="l3.id"
                    >{{l3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column
          label="角色名称"
          prop="roleName"
        >
        </el-table-column>
        <el-table-column
          label="角色描述"
          prop="roleDesc"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
              circle
              size="mini"
              @click="showEdit(row)"
            ></el-button>
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              circle
              size="mini"
              @click="delRole(row.id)"
            >
            </el-button>
            <el-button
              type="success"
              plain
              icon="el-icon-check"
              round
              size="mini"
              @click="showAssign(row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="分配权限"
        :visible.sync="assignDialogVisible"
        width="40%"
      >
        <el-tree
          :data="rightList"
          :props="defaultProps"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
        ></el-tree>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="assignDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="assignRight()"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-dialog
      :title="addForm.id ? '修改角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        status-icon
        ref="addForm"
        :rules="rules"
        :model="addForm"
        label-width="80px"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input
            placeholder="请输入角色名称"
            v-model="addForm.roleName"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="roleDesc"
        >
          <el-input
            placeholder="请输入角色描述"
            v-model="addForm.roleDesc"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addRole"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Roles',
  data() {
    return {
      rolesList: [],
      roleId: '',
      assignDialogVisible: false,
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rightList: [],
      addForm: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      let res = await this.$axios.get('/api/roles')
      if (res.meta.status === 200) {
        this.rolesList = res.data
      }
    },
    async delRight(role, rightId) {
      let res = await this.$axios.delete(`/api/roles/${role.id}/rights/${rightId}`)
      role.children = res.data
      this.$message.success('删除权限成功')
    },
    async showAssign(role) {
      this.roleId = role.id
      this.assignDialogVisible = true
      let res = await this.$axios.get('/api/rights/tree')
      this.rightList = res.data
      let ids = []
      role.children.forEach(l1 => {
        l1.children.forEach(l2 => {
          l2.children.forEach(l3 => {
            ids.push(l3.id)
          })
        })
      })
      this.$refs.tree.setCheckedKeys(ids)
    },
    async assignRight() {
      // 所有选中的id
      let checkedKeys = this.$refs.tree.getCheckedKeys()
      // 所有的半选中的节点
      let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      let rids = checkedKeys.concat(halfCheckedKeys).join()

      // 发送ajax请求
      await this.$axios.post(`api/roles/${this.roleId}/rights`, { rids })
      this.assignDialogVisible = false
      this.getRoleList()
      this.$message.success('分配权限成功了')
    },
    async delRole(id) {
      try {
        await this.$confirm('你确定要删除该角色吗', '温馨提示', { type: 'warning' })
        await this.$axios.delete(`api/roles/${id}`)
        // 重新渲染
        this.getRoleList()
        // 提示消息
        this.$message.success('删除成功')
      } catch (e) {
        this.$message.info('取消删除')
      }
    },
    showAdd() {
      this.dialogVisible = true
      this.addForm.id = ''
      this.addForm.roleName = ''
      this.addForm.roleDesc = ''
    },
    showEdit(role) {
      this.dialogVisible = true
      // 数据回显
      this.addForm.id = role.id
      this.addForm.roleName = role.roleName
      this.addForm.roleDesc = role.roleDesc
    },
    async addRole() {
      try {
        await this.$refs.addForm.validate()
        let id = this.addForm.id
        let method = id ? 'put' : 'post'
        let url = id ? `api/roles/${id}` : 'api/roles'
        let status = id ? 200 : 201
        let res = await this.$axios[method](url, this.addForm)
        if (res.meta.status === status) {
          this.$refs.addForm.resetFields()
          this.dialogVisible = false
          this.getRoleList()
          this.$message.success('操作成功了')
        }
      } catch (e) {
        return false
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.l1
  padding 5px 0
.l3
  margin-right 5px
  margin-bottom 5px
</style>
