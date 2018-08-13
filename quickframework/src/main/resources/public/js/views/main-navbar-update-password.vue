<template>
    <el-dialog
            title="修改密码"
            :visible.sync="visible"
            :append-to-body="true">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                 label-width="80px">
            <el-form-item label="账号">
                <span>{{ userName }}</span>
            </el-form-item>
            <el-form-item label="原密码" prop="password">
                <el-input type="password" v-model="dataForm.password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="dataForm.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="dataForm.confirmPassword"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    </el-dialog>
</template>

<script>
    define(['vue'], function (Vue) {
        return Vue.component('update-password', {
            template: template,

            data() {
                var validateConfirmPassword = function(rule, value, callback)
                {
                    if (this.dataForm.newPassword !== value) {
                        callback(new Error('确认密码与新密码不一致'))
                    } else {
                        callback()
                    }
                }
                return {
                    visible: false,
                    dataForm: {
                        password: '',
                        newPassword: '',
                        confirmPassword: ''
                    },
                    dataRule: {
                        password: [
                            {required: true, message: '原密码不能为空', trigger: 'blur'}
                        ],
                        newPassword: [
                            {required: true, message: '新密码不能为空', trigger: 'blur'}
                        ],
                        confirmPassword: [
                            {required: true, message: '确认密码不能为空', trigger: 'blur'},
                            {validator: validateConfirmPassword, trigger: 'blur'}
                        ]
                    }
                }
            },
            computed: {
                userName: {
                    get() {
                        return this.$store.state.user.name
                    }
                },
                mainTabs: {
                    get() {
                        return this.$store.state.common.mainTabs
                    },
                    set(val) {
                        this.$store.commit('common/updateMainTabs', val)
                    }
                }
            },
            methods: {
                // 初始化
                init() {
                    const self = this
                    this.visible = true
                    this.$nextTick(function () {
                        self.$refs['dataForm'].resetFields()
                    })
                },
                // 表单提交
                dataFormSubmit() {
                    const self = this
                    this.$refs['dataForm'].validate(function (valid) {
                        if (valid) {
                            self.$http({
                                url: self.$http.adornUrl('/sys/user/password'),
                                method: 'post',
                                data: self.$http.adornData({
                                    'password': self.dataForm.password,
                                    'newPassword': self.dataForm.newPassword
                                })
                            }).then(function (res) {
                                const data = res.data
                                if (data && data.code === 0) {
                                    this.$message({
                                        message: '操作成功',
                                        type: 'success',
                                        duration: 1500,
                                        onClose: function () {
                                            self.visible = false
                                            self.$nextTick(function () {
                                                self.mainTabs = []
                                                self.$cookies.delete('token')
                                                self.$router.replace({name: 'login'})
                                            })
                                        }
                                    })
                                } else {
                                    self.$message.error(data.msg)
                                }
                            })
                        }
                    })
                }
            }

        })

    })

</script>

