<template>
  <div class="category">
    <el-button
      type="success"
      plain
      @click="showAdd"
    >添加分类</el-button>
    <el-table :data="categoryList">
      <el-table-tree-column
        label="分类名称"
        prop="cat_name"
        tree-key="cat_id"
        parent-key="cat_pid"
        level-key="cat_level"
        :indentSize="20"
      ></el-table-tree-column>
      <el-table-column
        label="是否删除"
        prop="cat_deleted"
      >
        <template slot-scope="{row}">
          {{row.cat_deleted ? '是':'否'}}
        </template>
      </el-table-column>
      <el-table-column
        label="排序"
        prop="cat_level"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            size="mini"
            circle
          ></el-button>
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="total"
    >
    </el-pagination>

    <el-dialog
      title="添加分类"
      :visible.sync="addDialogVisible"
      width="40%"
    >
      <el-form
        :rules="rules"
        status-icon
        ref="addForm"
        :model="addForm"
        label-width="80px"
      >
        <el-form-item
          label="分类名称"
          prop="cat_name"
        >
          <el-input
            placeholder="请输入分类名称"
            v-model="addForm.cat_name"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="父级名称"
          prop="cat_pid"
        >
          <el-cascader
            change-on-select
            clearable
            :options="options"
            v-model="addForm.cat_pid"
            :props="props"
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCategory"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryList: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      addDialogVisible: false,
      addForm: {
        cat_name: '',
        cat_pid: []
      },
      options: [],
      props: {
        children: 'children',
        value: 'cat_id',
        label: 'cat_name'
      },
      rules: {
        cat_name: [
          { required: true, message: '分类名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList() {
      let res = await this.$axios.get('api/categories', {
        params: {
          type: 3,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      })
      if (res.meta.status === 200) {
        this.categoryList = res.data.result
        this.total = res.data.total
        this.loading = false
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getCategoryList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCategoryList()
    },
    async showAdd() {
      this.addDialogVisible = true
      let res = await this.$axios.get('api/categories?type=2')
      if (res.meta.status === 200) {
        this.options = res.data
      }
    },
    async addCategory() {
      try {
        await this.$refs.addForm.validate()
        let res = await this.$axios.post('api/categories', {
          cat_name: this.addForm.cat_name,
          cate_pid: this.addForm.cate_pid[this.addForm.cate_pid.length - 1],
          cate_level: this.addForm.cate_pid.length
        })
        if (res.meta.data === 201) {
          this.$refs.addForm.resetFields()
          this.addDialogVisible = false
          this.categoryList()
          this.$message.success('添加成功')
        }
      } catch (error) {
        return error
      }
    }
  }
}
</script>

<style>
</style>
