<template>
    <div class="site-wrapper site-page--login">
        <div class="site-content__wrapper">
            <div class="site-content">
                <div class="brand-info">
                    <h2 class="brand-info__text">fast vue</h2>
                    <p class="brand-info__intro">
                        基于vue、element-ui、requirejs、axios、vuex、vue-route构建开发，前端解决方案。</p>
                </div>
                <div class="login-main">
                    <h3 class="login-title">管理员登录</h3>
                    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                             status-icon>
                        <el-form-item prop="userName">
                            <el-input v-model="dataForm.userName" placeholder="帐号"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item prop="captcha">
                            <el-row :gutter="20">
                                <el-col :span="14">
                                    <el-input v-model="dataForm.captcha" placeholder="验证码">
                                    </el-input>
                                </el-col>
                                <el-col :span="10" class="login-captcha">
                                    <img :src="captchaPath" @click="getCaptcha" alt="验证码">
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(['vue', 'utils/util'], function (vue, util) {

        return vue.component('l-login', {
            template: template,

            data() {
                return {

                    dataForm: {
                        userName: '',
                        password: '',
                        uuid: '',
                        captcha: ''
                    },
                    dataRule: {
                        userName: [{
                            required: true,
                            message: '帐号不能为空',
                            trigger: 'blur'
                        }],
                        password: [{
                            required: true,
                            message: '密码不能为空',
                            trigger: 'blur'
                        }],
                        captcha: [{
                            required: true,
                            message: '验证码不能为空',
                            trigger: 'blur'
                        }]
                    },
                    captchaPath: null
                }
            },
            created() {
                 this.getCaptcha()
            },
            methods: {
                // 提交表单
                dataFormSubmit: function () {
                    let self = this
                    this.$refs['dataForm'].validate(function (valid) {
                        if (valid) {
                            var url='/admin/login';
                              // url='login.json'
                            self.$http.post(
                                self.$http.addUrl(url),
                                self.$http.addData({
                                    'username': self.dataForm.userName,
                                    'password': self.dataForm.password,
                                    'uuid': self.dataForm.uuid,
                                    'captcha': self.dataForm.captcha
                                })
                            ).then(function (res) {
                                var  data=res.data
                                if (data && data.code === 0) {
                                    vue.cookies.set('token',data.data)
                                    self.$router.push({
                                        name: 'main'
                                    })
                                } else {
                                    self.getCaptcha()
                                    self.$message.error(data.msg)
                                }
                            }).catch(function (ex) {
                                console.error("---------login error-----" + ex)
                            })
                        }
                    })
                },
                // 获取验证码
                getCaptcha() {
                    let  uuid = util.getUUID()
                    this.dataForm.uuid = uuid
                    this.captchaPath = this.$http.addUrl('/system/auth/captcha.jpg?t=' + new Date().getMilliseconds())
                }
            }
        })
    })
</script>

<style lang="scss">
    .site-wrapper.site-page--login {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(38, 50, 56, .6);
        overflow: hidden;
        &:before {
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            content: "";
            background-image: url('/ui/img/login_bg.jpg');
            background-size: cover;
        }
        .site-content__wrapper {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 0;
            margin: 0;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: transparent;
        }
        .site-content {
            min-height: 100%;
            padding: 30px 500px 30px 30px;
        }
        .brand-info {
            margin: 220px 100px 0 90px;
            color: #fff;
        }
        .brand-info__text {
            margin: 0 0 22px 0;
            font-size: 48px;
            font-weight: 400;
            text-transform: uppercase;
        }
        .brand-info__intro {
            margin: 10px 0;
            font-size: 16px;
            line-height: 1.58;
            opacity: .6;
        }
        .login-main {
            position: absolute;
            top: 0;
            right: 0;
            padding: 150px 60px 180px;
            width: 470px;
            min-height: 100%;
            background-color: #fff;
        }
        .login-title {
            font-size: 16px;
        }
        .login-captcha {
            overflow: hidden;
            > img {
                width: 100%;
                cursor: pointer;
            }
        }
        .login-btn-submit {
            width: 100%;
            margin-top: 38px;
        }
    }
</style>
