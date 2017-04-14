<template>
    <div class="card_password paswd ">
        <div id="Promptbox" class="Promptbox">{{Promptbox}}</div>
        <div class="pswd_wrapper">
            <form action="">
                <div class="item">
                    <label for=""><img src="../../registered/img/paswrd.png" height="20" width="20" alt=""></label>
                    <input id="card_password" placeholder="取款密码" type="password">
                    <p></p>
                </div>
                <div class="item">
                    <label for=""><img src="../../registered/img/paswrd1.png" height="20" width="20" alt=""></label>
                    <input id="cardnew_password" type="password" placeholder="新密码">
                    <p></p>
                </div>
                <div class="item">
                    <label for=""><img src="../../registered/img/paswrd1.png" height="20" width="20" alt=""></label></label>
                    <input id="cardmodify_password" type="password" placeholder="确认密码">
                    <p></p>
                </div>
            </form>
            <div @click='cardmodifycard' class='modify bnt1'>修改</div>
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
            this.modifycardvalidation()
        },
        methods: {
            modifycardvalidation:function () {
                var vm = this;
                vm.$store.commit('incrPromptbox','');
                vm.$loginpasword($('#card_password'),$('#Promptbox'),vm);
                vm.$myloginpasword($('#cardnew_password'),$('#Promptbox'),vm,$('#cardlogin_password'));
                vm.$modifypasword($('#cardmodify_password'),$('#Promptbox'),vm,$('#cardnew_password'));
            },
            cardmodifycard:function () {
                var vm = this;
                pas_1 = $('#card_password').val();
                pas_2 = $('#cardnew_password').val();
                pas_3 = $('#cardmodify_password').val();
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
                    vm.$changeQkpwd(data,vm.jrg+"User/changeQkpwd",vm);
                }
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import '../../public/public.less';
    @import './css/password.less';
    .card_password{
        width:100%;
    }
    .boxError{
        color:#e3881c;
    }
</style>