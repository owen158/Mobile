<template>
    <div class="banking">
        <div id="wrapper-main">
            <form action="">
                <div class="main">
                    <label for=""><img src="./img/Amount .png" height="" width="25" alt=""></label>
                    <input onkeyup="this.value=this.value.replace(/\D/gi,'');" class='money' type="text" placeholder="输入存款金额">
                </div>
                <div style="margin-top: 0.2rem;" class="main">
                    <label for=""><img src="./img/bank.png" width="25"  alt=""></label>
                    <select  name="" class="card">
                        <option value="1">选择银行种类</option>
                        <option value="CCB">建设银行</option>
                        <option value="CMBC">招商银行</option>
                        <option value="CGB">广东发展银行</option>
                        <option value="HXB">华夏银行</option>
                    </select>
                </div>
                <div style="margin-top: 0.3rem;" class="item">
                    <p>单笔限额100-500000人民币</p>
                </div>
            </form>
            <div class="submit">
                <div id="btn" @click="submit" class="bnt1">提 交</div>
            </div>
            <div  style="margin-top: 0.5rem;" class="main">
                <p>若有疑问，请咨询</p>
            </div>
            <div class="submit">
                <div id="btn" class="bnt2">在线客服</div>
            </div>
        </div>
    </div>
</template>
<script>
    var money,data,card;
    export default {
        data() {
            return {
                text:''
            }
        },
        computed: {
            jrg() {
                return this.$store.state.jrg;//url 链接地址
            },
        },
        methods: {
            submit:function () {
                var vm= this;
                card = $('.card').val();
                money = this.$toDecimal($('.money').val());
                if($('.money').val() == ""){
                    this.text = "请输入金额";
                    vm.$store.commit('incrClosepoptext',this.text);
                    vm.$store.commit('incrClosepop',true);
                }else if(money < 100 || money >500000 ){
                    this.text ='金额不能低于100元 或 高于50万';
                    vm.$store.commit('incrClosepoptext',this.text);
                    vm.$store.commit('incrClosepop',true);
                }else if(card == '1'){
                    this.text ='请选择银行卡类型';
                    vm.$store.commit('incrClosepoptext',this.text);
                    vm.$store.commit('incrClosepop',true);
                }else{
                    vm.$store.commit('incrrefresh',true);
                    data={payType:1,bankCode:card,amount:money};
                    this.$deposit(data,vm.jrg+'User/ReChangePay',vm);
                }
            }
        },
        components: {}
    }
</script>

<style lang="less">
    .banking{
        width:100%;
    }
</style>