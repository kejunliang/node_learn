<template>
   <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
    style="min-height: 100vh"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名!' }] },
        ]"
        placeholder="用户名"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
        type="password"
        placeholder="密码"
        @keydown.enter="handleSubmit"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
      <a-alert v-if="passwordError" message="UserName Or Password Error" type="error" showIcon />
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
      >
      记住密码
      </a-checkbox>
      <a class="login-form-forgot" href="javascript:void(0)" onClick="alert('功能开发中')">
        忘记密码
      </a>
      <a-button type="primary" html-type="submit" class="login-form-button">
        登陆
      </a-button>
      <!-- <a href="/todoList">
        register now!
      </a> -->
      </a-form-item>
  </a-form>
</template>
<script>
export default {
  name: 'login',
  data: function () {
    return {
      passwordError: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$axios({
            url: '/nginx/_api/rest/mobile/login.json?account=' + values.userName + '&password=' + values.password,
            method: 'POST',
            // data: {
            //   account: encodeURIComponent(values.userName),
            //   password: encodeURIComponent(values.password)
            // },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response) => {
            console.log(response)
            console.log(response.data.auth.token)
            if (response && response.data.auth && response.data.auth.token) {
              this.$router.push({ name: 'todoList', params: { todoType: 'todo' } })
            } else {
              console.log(this)
              this.passwordError = true
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    }
  }
}
</script>
<style>
.login-form{
  background-image: url(http://grcoa.smartdot.com:8088/grcv5/resources/theme/base/images/login_bg.jpg);
}
.ant-form{
  padding-top: 150px !important;
}
.ant-row{
  max-width: 300px;
  margin: auto !important;
  margin-top: 200px;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px !important;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
