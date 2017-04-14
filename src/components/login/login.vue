<template>
    <div class="login Form">
        <h2>登录</h2>
        <div id="Promptbox" class="Promptbox">{{Promptbox}}</div>
        <form action="">
            <div class="item">
                <label for=""><img src="./img/username.png" height="25" width="25" alt=""></label>
                <input class="loginusername" ref='username' type="text" placeholder="用户名">
                <p class=""></p>
            </div>
            <div class="item">
                <label for=""><img src="./img/paswrd.png" height="25" width="25" alt=""></label>
                <input class="loginpassword" ref='passw' type="password" placeholder="密码">
                <p></p>
            </div>
            <div class="item code">
                <label for=""><img style="margin-top:0;" src="./img/code.png" height="25" width="25" alt=""></label>
                <input class="logincode" ref='code' type="text" placeholder="验证码">
                <p class=""></p>
                <img id='changeImg' @click='changeImg' :src="myurl" alt="验证码">
            </div>
        </form>
        <div class="botton">
            <div style="margin-top:0.9rem;" id="btn" class="submit bnt1" @click='LogIn()'>登 录</div>
        </div>
        <div class="botton">
            <div style="margin-top:0.4rem;" id="btn" class="submit bnt2" @click='Register()'>注 册</div>
        </div>
        <pop v-show="Closepop"></pop>
        <Refter v-show="refresh"></Refter>
    </div>
</template>

<script>
    import pop from '../public/pop.vue'
    import Refter from '../public/refter.vue'
    var name,code,pswd,paswd,data,token,tel,Sign,userKey,tikuan,qrtikuan,regtoken;
    export default {
        data () {
            return {
                myurl:'http://192.168.0.7:8080/XPJ/validateCode?timesp'+(new Date()).valueOf(),
                text:''
            }
        },
        computed: {
            refresh() {
                return this.$store.state.refresh;
            },
            Closepop() {
                return this.$store.state.Closepop;
            },
            jrg() {
                return this.$store.state.jrg;
            },
            Promptbox() {
                return this.$store.state.Promptbox
            }
        },
        mounted:function(){
             this.loginvalidation();
        },
        methods:{
            changeImg() {//验证码
                var src = this.jrg+'validateCode?timesp'+(new Date()).valueOf();
                $("#changeImg").attr("src", src);
            },
            Register:function () {
                this.$router.push({path:'/register'})
                this.$store.commit('incrPromptbox',"")
            },
            loginvalidation:function(){
                var vm = this;
                vm.$loginusername($('.loginusername'),$('#Promptbox'),vm);
                vm.$loginpasword($('.loginpassword'),$('#Promptbox'),vm);
                vm.$logincode($('.logincode'),$('#Promptbox'),vm);
            },
            LogIn:function() {//登录验证
                this.$store.commit('incrPromptbox',"");
                var vm=this;
                name = $('.loginusername').val();
                paswd = $('.loginpassword').val();
                code = $('.logincode').val();
                data={tname:name,tpwd:paswd,imgcode:code,savelogin:1};
                if(name == "" || paswd == "" || code == ''){
                    this.$store.commit('incrClosepop',true);
                    vm.text = "请正确填写登录信息.";
                    this.$store.commit('incrClosepoptext',vm.text);
                }else{
                    vm.$store.commit('incrrefresh',true);
                    vm.$logo(data,vm.jrg+'login.do',vm);
                }
            },
        },
        created() {
        },
        components: {
            Refter,
            pop
        }
    }
</script>

<style lang="less">
    @import '../public/public.less';
    @import './css/Form.less';
    .login{
        width:100%;

    }

</style>