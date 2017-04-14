<template>
    <div class='cardwithdrawals'>
        <div id="Promptbox" class="Promptbox">{{Promptbox}}</div>
        <div class="wrapper">
            <form action="">
                <div class="item">
                    <label class="lf" for="">卡&nbsp;&nbsp;&nbsp;&nbsp;号</label><select   class="number" name="" id="">
                    <option value="">请选择卡号</option>
                    <option v-for="v in cardBank" :data-index="v.card_username"  :value='v.id'>{{v.card_num}}</option>
                </select>
                </div>
                <div class="item">
                    <label class="lf" for="">金&nbsp;&nbsp;&nbsp;&nbsp;额</label>
                    <input onkeyup="this.value=this.value.replace(/\D/gi,'');" class="card_money" type="text" placeholder="提款金额">
                    <p></p>
                </div>
                <div class="item">
                    <label class="lf" for="">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                    <input class="cardpasword" type="password" placeholder="提款密码">
                    <p></p>
                </div>
                <p class="pswd_wj"><a href="">忘记密码？</a></p>
                <div class="main">
                    <div @click="cardsubmit" class="bnt1 submit">提 交</div>
                </div>
            </form>
        </div>
        <pop v-show="Closepop"></pop>
        <refter v-show=""></refter>
    </div>
</template>

<script>
    import  pop from '../../public/pop.vue'
    import refter from '../../public/refter.vue'
    export default {
        data () {
            return {
                number:'',
                money:'',
                pasword:'',
                text:"",
                data:''
            }
        },
        computed: {
            jrg() {
                return this.$store.state.jrg;//刷新
            },
            Promptbox() {
                return this.$store.state.Promptbox;//刷新
            },
            refresh() {
                return this.$store.state.refresh;//刷新
            },
            Closepoptext() {
                return this.$store.state.Closepoptext;//刷新
            },
            Closepop() {
                return this.$store.state.Closepop;//刷新
            },
            cardBank() {
                return this.$store.state.cardBank;//刷新
            }
        },
        mounted:function(){
            this. withvalidation();
        },
        methods: {
            withvalidation:function(){
                var vm = this;
                vm.$cardmoney($('.card_money'),$('#Promptbox'),vm);
                vm.$cardpassword($('.cardpasword'),$('#Promptbox'),vm)
            },
            cardsubmit:function () {
                var vm = this;
                vm.money = $('.card_money').val();
                vm.money = vm.$toDecimal(vm.money);
                vm.number = $('.number').val();
                vm.pasword=$('.cardpasword').val();
                vm.data={credit:vm.money,cardid:vm.number,password:vm.pasword};
                if( $('.number').val() == "" || $('.card_money').val() == "" || $('.cardpasword').val() == ""){
                   if($('.number').val() == ""){
                        vm.text = "请选择卡号";
                        vm.$store.commit('incrClosepoptext',vm.text);
                        vm.$store.commit('incrClosepop',true);
                    }else if($('.card_money').val() == ""){
                        vm.text = "请输入金额";
                        vm.$store.commit('incrClosepoptext',vm.text);
                        vm.$store.commit('incrClosepop',true);
                    }else if($('.cardpasword').val() == ""){
                        vm.text = "请输入密码";
                        vm.$store.commit('incrClosepoptext',vm.text);
                        vm.$store.commit('incrClosepop',true);
                    }else{
                        vm.text = "请认真填写";
                        vm.$store.commit('incrClosepoptext',vm.text);
                        vm.$store.commit('incrClosepop',true);
                    }
                }
                else{
                    console.log(vm.data);
                    vm.$store.commit('incrrefresh',true);
                    vm.$WithDraw(vm.data,vm.jrg+'User/WithDraw',vm)
                }
            }
        },
        components: {
//            T_itle:title,
            refter,
            pop
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import '../../public/public.less';
    .boxError{
        color:#e3881c;
    }
.cardwithdrawals{
    width:100%;
    min-height:7rem;
    .Promptbox{
        width:100%;
        margin: 0.2rem auto;
        height: 0.5rem;
        text-align: center;
        background: #f0f0f0;
        font-size:0.25rem;
        font-weight: 300;
        line-height: 0.5rem
    }
    .wrapper{
        width:100%;
        margin-top:0.4rem;
        form{
            width:100%;
            .item{
                width:85%;
                margin: 0.2rem auto;
                height: 0.6rem;
                position: relative;
                font-size:0;
                label{
                    width:20%;
                    height: 0.6rem;
                    font-size:0.3rem;
                    background: @form;
                    text-align: center;
                    line-height:0.6rem;
                    color:#FFF;
                }
                input,select{
                    width:80%;
                    height:0.6rem;
                    font-size:@font1;
                    padding-left: 0.1rem;
                    .border(1px, @form)
                }
                p{
                    position: absolute;
                    right:0.00rem;
                    top:0.1rem;
                    width:0.4rem;
                    height: 0.4rem;
                    border-radius: 50%;
                }
            }
            .main{
                width:90%;
                margin:0.5rem auto;
                .submit{
                    width:100%;
                    height: 0.8rem;
                    font-size:@font;
                    text-align:center;
                    padding-top: 0.2rem;
                }
            }
        }
    }
}
</style>