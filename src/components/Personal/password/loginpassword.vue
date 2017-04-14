<template>
    <div class="login_password paswd ">
        <div id="Promptbox" class="Promptbox">{{Promptbox}}</div>
        <div class="pswd_wrapper">
            <form action="">
                <div class="item">
                    <label for=""><img src="../../registered/img/paswrd.png" height="20" width="20" alt=""></label>
                    <input id="login_password" placeholder="登录密码" type="password">
                    <p></p>
                </div>
                <div class="item">
                    <label for=""><img src="../../registered/img/paswrd1.png" height="20" width="20" alt=""></label>
                    <input id="new_password" type="password" placeholder="新密码">
                    <p></p>
                </div>
                <div class="item">
                    <label for=""><img src="../../registered/img/paswrd1.png" height="20" width="20" alt=""></label></label>
                    <input id="modify_password" type="password" placeholder="确认密码">
                    <p></p>
                </div>
            </form>
            <div @click='modify' class='modify bnt1'>修改</div>
        </div>
    </div>
</template>

<script>
    var data,pas_1,pas_2,pas_3;
    export default {
        data () {
            return {
                text:""
            }
        },
        computed: {
            jrg() {
                return this.$store.state.jrg;// 中心钱包
            },
            Promptbox() {
                return this.$store.state.Promptbox
            }
        },
        mounted:function() {
            this.loginmodifyvalidation()
        },
        methods:{
            loginmodifyvalidation:function () {
                var vm = this;
                vm.$store.commit('incrPromptbox','');
                vm.$loginpasword($('#login_password'),$('#Promptbox'),vm);
                vm.$myloginpasword($('#new_password'),$('#Promptbox'),vm,$('#login_password'));
                vm.$modifypasword($('#modify_password'),$('#Promptbox'),vm,$('#new_password'));
            },
            modify:function(){
                var vm = this;
                pas_1 = $('#login_password').val();
                pas_2 = $('#new_password').val();
                pas_3 = $('#modify_password').val();
                data={password:pas_1,npassword:pas_2,renpassword:pas_3};
                if(pas_1 == ""){
                    vm.text ="请输入密码";
                    vm.$store.commit('incrClosepoptext',vm.text);
                    vm.$store.commit('incrClosepop',true);
                }else if(pas_2 == ""){
                    vm.text ="请输入新密码";
                    vm.$store.commit('incrClosepoptext',vm.text);
                    vm.$store.commit('incrClosepop',true);
                }else if(pas_3 == ''){
                    vm.text ="请输入确认密码";
                    vm.$store.commit('incrClosepoptext',vm.text);
                    vm.$store.commit('incrClosepop',true);
                }else{
                    vm.$store.commit('incrrefresh',true);
                    vm.$modifylogin(data,vm.jrg+"User/changePassword",vm)
                }
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import '../../public/public.less';
    @import './css/password.less';
    .login_password{
        width:100%;
    }
    .boxError{
        color:#e3881c;
    }
</style>