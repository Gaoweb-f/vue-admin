<template>
    <div id="login">
        <div class="login-wrap">
             <ul class="menu-tab">
                 <li v-for="item in menuTab" :key="item.id" :class="{ 'current': item.current }" @click="toggleMenuTab(item)">{{item.text}}</li>
             </ul>
             <!--表单start-->
             <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
                
                <el-form-item  prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item  prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>
                
                <el-form-item  prop="passwords" class="item-form" v-show="vmodel === 'register'">
                    <label>重复密码</label>
                    <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

             <el-form-item  prop="code" class="item-form">
                 <label>验证码</label>
                    <el-row :gutter="20">
                    <el-col :span="15">
                        <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>   
                    </el-col>
                    <el-col :span="9"><el-button type="success">获取验证码</el-button></el-col>
                </el-row>
              </el-form-item>  

                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { reactive,ref,onMounted } from '@vue/composition-api';
import { stripscript,validateEmail,validatePass,validateVCode } from '@/utils/validate.js';
export default {
     setup(props, {refs}) {
     let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(!validateEmail(value)){
          callback(new Error('邮箱格式不正确'));
        }else{
          callback();
        }
      }
    let validatePassword = (rule, value, callback) => {
          ruleForm.password = stripscript(value);
          value = ruleForm.password;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!validatePass(value)) {
          callback(new Error('请输入6-20位的字母或数字!'));
        } else {
          callback();
        }
      }
    let validatePasswords = (rule, value, callback) => {
            debugger;
          if(vmodel.value === 'login'){
              callback();
          }
          if(value !== ruleForm.password){
              callback(new Error('两次输入的密码不一致'));
          }
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else {
          callback();
        }
      }
    let checkCode = (rule, value, callback) => {
          ruleForm.code = stripscript(value);
          value = ruleForm.code;
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else if(!validateVCode(value)){
          return callback(new Error('验证码为6位的字母或数字'));
        }else{
            callback();
        }
    }

           const menuTab = reactive([
               {text:"登录",current:true,type:'login'},
               {text:"注册",current:false,type:'register'}
           ])
        const ruleForm = reactive({
                username: '',
                password: '',
                passwords:'',
                code: ''
           })
        const rules = reactive({
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                passwords: [
                    { validator: validatePasswords, trigger: 'blur' }
                ],
                code: [
                    { validator: checkCode, trigger: 'blur' }
                ]
           })
        const vmodel= ref('login')

        const toggleMenuTab = function(data){
            menuTab.forEach(elem => {
                elem.current = false;
            })
            data.current = true
            vmodel.value = data.type
        }
        /*
          箭头函数写法
        */
        const submitForm = (formName => {
            refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
         })


    onMounted(()=> {
        
    })

    return{
        menuTab,
        ruleForm,
        rules,
        vmodel,
        toggleMenuTab,
        submitForm
      }  
        
    }

   }
</script>
<style lang="scss" scoped>
   #login{
       height: 100vh;
       background-color: #087eb9;
   }
   .login-wrap{
       width: 330px;
       margin: auto;
   }
   .menu-tab{
       text-align: center;
       li{
           margin-top:50px;
           display: inline-block;
           width: 88px;
           line-height: 36px;
           font-size: 14px;
           color: #fff;
           border-radius: 2px;
           cursor: pointer;
       }
   }
   .current{
       background-color: rgba(0,0,0,.1);
   }
   .login-form{
       margin-top:29px;
       label{
           display: block;
           font-size: 14px;
           color:#fff;
           margin-bottom: 3px;
       }
   }
   .item-form{
       margin-bottom:13px;
   }
   .block{
       display: block;
       width: 100%;
   }
   .login-btn{
       margin-top:19px;
   }

</style>
