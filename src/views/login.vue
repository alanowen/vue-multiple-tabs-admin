<template>
    <div id="main" class="app-main">
        <div class="login" @keydown.enter="login">
            <div class="login-content">
                <Alert type="error" show-icon closable v-if="showAlert" @on-close="showAlert = false">用户名或密码错误</Alert>
                <Card>
                    <Form ref="form" :model="loginModel" :rules="rules">
                        <FormItem prop="loginAccount">
                            <i-Input type="text" v-model="loginModel.loginAccount" placeholder="请输入登陆账户" :maxlength="30">
                                <Icon type="person" slot="prepend"></Icon>
                            </i-Input>
                        </FormItem>
                        <FormItem prop="loginPwd">
                            <i-Input type="password" v-model="loginModel.loginPwd" placeholder="请输入登陆密码"  :maxlength="30">
                                <Icon type="locked" slot="prepend"></Icon>
                            </i-Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" size="large" long @click="login" :loading="showLoading">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
    import util from '../libs/util'
    import common from '../libs/common'

    import * as types from '../store/types'

    export default {
        data() {
            return {
                showLoading: false,
                showAlert: false,

                loginModel: {
                    loginAccount: '',
                    loginPwd: '',
                    checkCode: ''
                },
                rules: {
                    loginAccount: [{
                        required: true,
                        message: '请输入登录账户',
                        trigger: 'blur'
                    }],
                    loginPwd: [{
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur'
                    }]

                }
            }
        },
        mounted: function () {
        },

        methods: {

            login() {
                this.showLoading = true
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('auth/login').then(() => {
                            this.$router.replace({name: 'Index'})
                        })
                    } else {
                        this.showLoading = false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    html,
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow: hidden;
    }

    .app-main {
        width: 100%;
        height: 100%;
    }

    .login {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        position: relative;
    }

    .login-content {
        position: absolute;
        left: 40%;
        top: 35%;
        -webkit-transform: translateY(-60%);
        transform: translateY(-60%);
        width: 300px;
        .form-con {
            padding: 10px 0 0;
        }
    }
</style>