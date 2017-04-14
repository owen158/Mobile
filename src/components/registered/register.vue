<template>
    <div class="register Form">
        <h2>注册</h2>
        <div id="Promptbox" class="Promptbox">{{Promptbox}}</div>
        <form action="">
            <div class="item">
                <label for=""><img src="./img/username.png" height="25" width="25" alt=""></label>
                <input  class='regusername'  type="text" placeholder="用户名">
                <p></p>
            </div>
            <div class="item">
                <label for=""><img src="./img/paswrd.png" height="25" width="25" alt=""></label>
                <input  class='regpassword'  type="password" placeholder="密码">
                <p></p>
            </div>
            <div class="item">
                <label for=""><img src="./img/paswrd1.png" height="25" width="25" alt=""></label>
                <input  class='regqrpassword'  type="password" placeholder="确认密码">
                <p></p>
            </div>
            <div class="item">
                <label for=""><img src="./img/phone.png" height="25" width="25" alt=""></label>
                <input ref='tel' class="regtel" id="tel" type="tel" placeholder="手机号码">
                <p></p>
            </div>
            <div class="item">
                <label for=""><img src="./img/tikuan.png" height="25" width="25" alt=""></label>
                <input ref='tikuan' class="regtikuan" id="tikuan" type="password" placeholder="提款密码">
                <p></p>
            </div>
            <div class="item">
                <label for=""><img src="./img/qrtikuan.png" height="25" width="25" alt=""></label>
                <input ref='qrtikuan' class="regqrtikuan" id="qrtikuan" type="password" placeholder="确认提款密码">
                <p></p>
            </div>
            <div class="item code">
                <label  for=""><img style="margin-top:0;" src="./img/code.png" height="25" width="25" alt=""></label>
                <input class="regcode"  type="text"  placeholder="验证码">
                <p></p>
                <img id="change_Img" @click='change_Img()' :src="myurl"   alt="验证码"/>
            </div>
            <div class="item">
                <input type="checkbox" id="john" value="John" v-model="Rt">
                <span>我已经同意并阅读<a href="#">开户协议</a></span>
            </div>
        </form>
        <div class="botton">
            <div style="margin-top:0.6rem;" id="btn" class="submit bnt1" @click='Register'>注 册</div>
        </div>
        <div class="botton">
            <div style="margin-top:0.4rem;" id="btn" class="submit bnt2" @click='LogIn()'>登 录</div>
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
                Rt:true,// checkbox
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
            this.Registervalidation();
            this.token();
        },
        methods: {
            token:function(){
                var vm = this;
                $.ajax({
                    type:'get',
                    xhrFields:{withCredentials:true},
                    url:vm.jrg+'User/getToken',
                    cache:false,
                    success: function(data) {
                        regtoken = data.msg;
                    }
                });
            },
            Registervalidation:function(){
                var vm = this;
                vm.$registerusername($('.regusername'),$('#Promptbox'),vm)
                vm.$registerpasword($('.regpassword'),$('#Promptbox'),vm,$('.regusername'))
                vm.$registerP_Rpasword($('.regqrpassword'),$('#Promptbox'),vm,$('.regpassword'));
                vm.$registertel($('.regtel'),$('#Promptbox'),vm);
                vm.$registertikuan($('.regtikuan'),$('#Promptbox'),vm,$('.regpassword'));
                vm.$registerqr($('.regqrtikuan'),$('#Promptbox'),vm,$('.regtikuan'));
                vm.$registercode($('.regcode'),$('#Promptbox'),vm);
            },
            change_Img() {//验证码
                var src = this.jrg+'validateCode?timesp'+(new Date()).valueOf();
                $("#change_Img").attr("src", src);
            },
            LogIn:function () {
                this.$router.push({path:'/login'});
                this.$store.commit('incrPromptbox',"")
            },
            Register:function(){//注册验证
                this.$store.commit('incrPromptbox',"")
                var vm =this;
                name = $('.regusername').val()
                pswd = $('.regpassword').val();
                paswd = $('.regqrpassword').val();
                tel = $('.regtel').val();
                code = $('.regcode').val();
                tikuan = $('.regtikuan').val();
                qrtikuan = $('.regqrtikuan').val();
                Sign = {tname:name,tpwd:pswd,imgcode:code,savelogin:1};
                data = {userName: name, passWord: pswd,repassWord: paswd,mobileNo:tel,imgcode: code,reguuid:regtoken,qkpwd:tikuan,reqkpwd:qrtikuan};
                if(name == "" || pswd == "" || paswd == "" || tel == "" || code == "" || tikuan == "" || qrtikuan == ""){
                    this.change_Img();
                    vm.text = "注册信息，不能有空，请正确填写."
                    this.$store.commit('incrClosepoptext',vm.text);
                    this.$store.commit('incrClosepop',true);
                }else if(!this.Rt) {
                    this.change_Img();
                    vm.text = "是否同意开户协议."
                    this.$store.commit('incrClosepoptext',vm.text);
                    this.$store.commit('incrClosepop',true);
                }else{
                    vm.$store.commit('incrrefresh',true);
                    vm.$register(data, vm.jrg+'User/register', vm, Sign, vm.jrg+'login.do')
                }
            }
        },
        components: {
            Refter,
            pop
        }
    }
</script>

<style lang="less">
    @import '../public/public.less';
    @import '../login/css/Form.less';
    .register{
        width:100%;
    }
</style>