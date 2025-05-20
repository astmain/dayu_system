<template>
  <div class="login_container" style="background-size: 100%; height: 90vh; display: flex; justify-content: flex-end">
    <!-- 登陆表单 -->
    <div class="login_form" style="display: flex; justify-content: center; align-items: center; flex-direction: column; width: 50%; background-color: #fff">
      <h3 class="title" style="margin-bottom: 20px">我的网站</h3>
      <el-form style="width: 60%" ref="formRef" :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="请输入账号">
            <template #prefix>
              👤
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password>
            <template #prefix>
              🔑
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="验证码">
          <el-input v-model="loginForm.img_code">
            <template #suffix>
              <el-image style="overflow: visible; position: relative; left: 16px" :src="loginForm.img_src" @click="click_img_code()"/>
            </template>
          </el-input>
        </el-form-item>

        <div style="display: flex; justify-content: space-between; align-items: center">
          <el-checkbox v-model="loginForm.rememberMe" label="记住我" size="large"/>
          <el-text style="cursor: pointer" type="primary">忘记密码?</el-text>
        </div>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="handleLogin">登陆</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="click_img_code()">click_img_code</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {username: 'zs', password: '123456', img_code: '', img_src: '', rememberMe: undefined},
    }
  }, ////

  methods: {
    async handleLogin() {
      console.log(`handleLogin      : `, JSON.parse(JSON.stringify(this.loginForm)))
      let config = {
        method: 'get',
        url: `/controller_MAIN/login?username=${this.loginForm.username}&password=${this.loginForm.password}&img_code=${this.loginForm.img_code}`,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }
      console.log(`config      : `, config)
      let res = await axios_api(config)
      console.log('res   :', res)
      if (res.data.code === 200) {
        console.log('🚀 成功:登陆                :', res)
        BUS.user_info = res.data.user_info
        BUS.menu_list = res.data.menu_list
        BUS.Atoken = res.data.Atoken
        this.$router.push('/home')
      } else {
        console.log('🚀 失败:登陆                :', res)
        alert('失败:登陆')
      }
    }, //

    async click_img_code() {
      this.loginForm.img_src = `http://127.0.0.1:22222/controller_MAIN/image_verification_code?` + Date.now()
      console.log('🚀       this.loginForm.img_src   :', this.loginForm.img_src)
    }, //
  }, ////

  async mounted() {
    this.click_img_code()
  }, ////
}
</script>

<style scoped>
.login_container {
  background-image: url('https://gitee.com/astmain/static/raw/master/food/1.webp');
}

.el-form-item {
  width: 100%;
}

.other_login_item {
  margin-right: 60px;
  cursor: pointer;
}
</style>
