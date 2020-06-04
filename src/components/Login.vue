<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="form" class="login_form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-key"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { min: 5, max: 10, message: '请输入5~10个字符', trigger: 'blur' },
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.form.resetFields()
    },
    handleLogin() {
      let _this = this
      this.$refs.form.validate(valid => {
        if (valid === true) {
          this.axios.post('login', this.form).then(
            res => {
              if (res.data.meta.status === 200) {
                _this.$message({
                  message: '登陆成功',
                  type: 'success',
                  duration: 2000
                })
                console.log(res.data.data.token)
                window.sessionStorage.setItem('token', res.data.data.token)
                _this.$router.push({ name: 'home' })
              } else {
                _this.$message({
                  message: res.data.meta.msg,
                  type: 'error',
                  duration: 2000
                })
              }
            },
            error => {
              console.log(error)
            }
          )
        } else {
          this.$message({
            message: '登陆失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  .login_box {
    height: 300px;
    width: 450px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-color: #fff;
      padding: 10px;
      border: 1px solid #eee;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
