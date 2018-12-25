<template>
  <div class="login">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="80px"
    >
      <img
        src="../assets/avatar.jpg"
        alt=""
      >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="form.password"
          @keyup.enter.native="login"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="login"
        >登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'change'
        },
        {
          min: 3,
          max: 9,
          message: '长度在3到9个字符',
          trigger: 'change'
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'change'
        },
        {
          min: 6,
          max: 12,
          message: '长度在6到12个字符',
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        this.$axios.post('/api/login', this.form).then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.$message({
              message: '登录成功了',
              type: 'success',
              duration: 1000
            })
            const { token } = res.data.data
            // 存储到ls
            localStorage.setItem('token', token)
            // 解析token
            const decoded = jwtDecode(token)
            // console.log(decoded)

            // token 存储到vuex中
            this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
            this.$store.dispatch('setUser', decoded)
            this.$router.push('/home')
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
      })
    },
    reset() {
      this.$refs.form.resetFields()
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style lang="stylus">
.login
  width 100%
  height 100%
  background-color #2d434c
  overflow hidden
  .el-form
    width 400px
    margin 200px auto
    background-color #fff
    padding 75px 40px 15px
    border-radius 20px
    position relative
    img
      position absolute
      left 50%
      transform translateX(-50%)
      top -80px
      border-radius 50%
      border 10px solid #fff
    .el-button + .el-button
      margin-left 70px
</style>
