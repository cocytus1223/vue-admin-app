<template>
  <div class="dialoginfo">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="40%"
    >

      <!-- 表单组件 -->
      <div class="form">
        <el-form
          ref="form"
          status-icon
          :model="formData"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input
              v-model="formData.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            v-show="isAdd"
          >
            <el-input
              v-model="formData.password"
              placeholder="请输入用户密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="formData.email"
              placeholder="请输入用户邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="电话"
            prop="mobile"
          >
            <el-input
              v-model="formData.mobile"
              placeholder="请输入用户电话"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button
          type="primary"
          @click="onSubmit('form')"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogInfo',
  data() {
    return {
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 9, message: '长度应该是3-9位之间', trigger: 'blur' }
        ],
        password: [
          { required: false, message: '用户密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '长度应该是6-12位之间', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入一个合法的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入一个合法的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    dialog: Object,
    formData: Object
  },
  methods: {
    onSubmit(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          const url = this.dialog.option === 'add' ? '' : `${this.formData.id}`
          const method = this.dialog.option === 'add' ? 'post' : 'put'
          this.$axios({
            method: `${method}`,
            url: `api/users/${url}`,
            data: this.formData }).then(res => {
            // 添加成功
            // console.log(this.formData)
            this.$message.succses('添加成功')
            // 隐藏对话框
            this.dialog.show = false
            this.$emit('update')
          })
        }
      })
    }
  },
  computed: {
    isAdd() {
      return this.dialog.option === 'add'
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
