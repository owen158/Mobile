<template>
    <div class="out">
        <div id="Promptbox" class="Promptbox">{{Promptbox}}</div>
        <div id='Transfer' class="lotty_name">
            <div class="item">
                <select id="Bsele"  name="" >
                    <option value='0' >请选择游戏</option>
                    <option value="CG">CG视讯</option >
                    <option value="AGIN">AGIN国际厅</option >
                    <option value="AG">AG视讯</option >
                    <option value="SB">申博视讯</option >
                    <!-- <option value="OB">欧博视讯</option > -->
                    <option value="OG">OG视讯</option >
                    <option value="DS">DS视讯</option >
                    <option value="BBIN">BBIN视讯</option >
                    <option value="PT">PT电子</option >
                    <option value="MG">MG电子</option >
                    <option value="HABA">HABA电子</option >
                    <option value="HG">皇冠</option >
                    <option value="IG">彩票</option >
                </select>
            </div>
            <div class="item">
                <select disabled="disabled" name="" >
                    <option value='0'>中心钱包</option>
                </select>
            </div>
            <div class="item code">
                <input id='codely' type="text" placeholder="验证码">
                <p></p>
                <div class="img">
                    <img id='change' @click='change' :src="myurl" alt="">
                </div>
            </div>
            <div class="item">
                <input onkeyup="this.value=this.value.replace(/\D/gi,'');" type="text" id='Smoney' placeholder="请输入金额" name="">
                <p></p>
            </div>
            <div style="margin-top:0.5rem" class="item click-item">
                <div @click='outsubmit' class="access_bnt bnt1">转账</div>
            </div>
        </div>

    </div>
</template>
<script>
    var data,credit,type,Out,In,token,name,money,code;
    export default {
        data () {
            return {
                myurl:'http://192.168.0.7:8080/XPJ/validateCode?timesp'+(new Date()).valueOf(),
                text:''
            }
        },
        created() {

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
            this.outbalancevalidation()
        },
        methods :{
            outbalancevalidation:function () {
                var vm= this;
                vm.$store.commit('incrClosepoptext','');
                vm.$cardmoney($('#Smoney'),$('#Promptbox'),vm);
                vm.$logincode($('#codely'),$('#Promptbox'),vm);
            },
            change() {//验证码
                var src = this.jrg+'validateCode?timesp'+(new Date()).valueOf();
                $("#change").attr("src", src);
            },

            outsubmit:function(){
                var vm=this;
                type = $('#Bsele').val();
                var Smoney = $('#Smoney').val();
                code = $('#codely').val();
                var toSmoney = this.$toDecimal(Smoney);
                token = localStorage.token;
                data = {credit:toSmoney,type:type,imgcode: code,uuid:token}
                if(Smoney == ""){
                    vm.change();
                    vm.text = "金额不能低于100元 或 高于50万";
                    vm.$store.commit('incrClosepoptext',vm.text);
                    vm.$store.commit('incrClosepop',true);
                }else if(code == ""){
                    vm.change();
                    vm.text = "请输入验证码";
                    vm.$store.commit('incrClosepoptext',vm.text);
                    vm.$store.commit('incrClosepop',true);
                }else if(toSmoney < 100 || toSmoney > 500000){
                    vm.change();
                    vm.text = "金额不能低于100元 或 高于50万";
                    vm.$store.commit('incrClosepoptext',vm.text);
                    vm.$store.commit('incrClosepop',true);
                }else if(type == '0'){
                    vm.change();
                    vm.text = "请选择游戏类型";
                    vm.$store.commit('incrClosepoptext',vm.text);
                    vm.$store.commit('incrClosepop',true);
                }else{
                    vm.$store.commit('incrrefresh',true);
                    vm.$TransferFrom(data,vm.jrg+'User/TransferFrom',vm,token);
                }
            }
        },


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import '../../public/public.less';
    @import './css/balance.less';
    .out{
        width:100%;
    }
</style>