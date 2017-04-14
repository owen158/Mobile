<template>
    <div id='addcard'>
        <T_itle :text="poptext"></T_itle>
        <div id="Promptbox" class="Promptbox">{{Promptbox}}</div>
        <div class="wrapper">
            <div class="item">
                <label for="">所属银行:</label>
                <select class="bankCode" name="" id="">
                    <option value="">选择银行种类</option>
                    <option value="4">建设银行</option>
                    <option value="7">招商银行</option>
                    <option value="14">广东发展银行</option>
                    <option value="13">华夏银行</option>
                </select>
            </div>
            <div class="item">
                <label for="">开&nbsp;&nbsp;户&nbsp;&nbsp;人:</label>
                <input  class='username' type="text" placeholder="填写真实姓名">
                <p></p>
            </div>
            <div id="addcarditem" class="item">
                <label class="control-label" >省&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份:</label>
                <select @change='select' name="" class="province">
                    <option  value="">选择-省-</option>
                    <option  v-for='(v,key) in $list' :value='key'>{{v.name}}</option>
                </select>
                <select @change='city' name="" class="city">
                    <option value="">选择-市-</option>
                    <option v-for='(index,key) in cities' :value='index.id'>{{index.name}}</option>
                </select>
            </div>
            <div class="item">
                <label for="">开户支行:</label>
                <input class='address'  type="text" placeholder="开户支行">
                <p></p>
            </div>
            <div class="item">
                <label for="">银行卡号:</label>
                <input class='cardnum' onkeyup="this.value=this.value.replace(/\D/gi,'');" type="text" placeholder="与开户名 保持一致">
                <p></p>
            </div>
            <div class="item">
                <label for="">取款密码:</label>
                <input class='pass_word' type="password" placeholder="取款密码">
                <p></p>
            </div>
            <div class="submit">
                <div @click="cardreturn" class="bnt1 lf">取 消</div>
                <div @click="cardsubmit" class="bnt2 rf">添 加</div>
            </div>
        </div>
        <pop v-show="Closepop"></pop>
        <refter v-show="refresh"></refter>
    </div>
</template>

<script>
    var bankCode,name,province,city,address,password,data,cardnum;
    import title from '../../public/title.vue'
    import pop from '../../public/pop.vue'
    import refter from '../../public/refter.vue'
    export default {
        data () {
            return {
                poptext:'添加银行卡',
                cities:null,
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
            this.validation();
            this.select();
        },
        methods: {
            validation:function(){
                var vm = this;
                vm.$carduser($('.username'),$('#Promptbox'),vm);
                vm.$cardnumber($('.cardnum'),$('#Promptbox'),vm);
                vm.$province($('.address'),$('#Promptbox'),vm);
                vm.$cardpassword($('.pass_word'),$('#Promptbox'),vm)
            },
            select: function(){
                if($('.province').val() ==""){
                    $('.city')[0].selectedIndex = 0;
                    $(".city").attr("disabled","disabled");
                }else if($('.province').val() !=""){
                    $('.city')[0].selectedIndex = 1;
                    $(".city").removeAttr("disabled");
                    var a = $('.province').val();
                    var list = this.$list;
                    this.cities = list[a].cities;
                }
            },
            city:function() {
                var province= $('.province').val();
                var city =$('.city').val()
            },
            cardreturn:function () {
                this.$store.commit('incrPromptbox',"");
                this.$router.push({path:'/Account_center/card/cardinformation'});
            },
            cardsubmit:function(){
                var vm = this;
                bankCode = $('.bankCode').val();
                name = $('.username').val();
                province = $('.province').val();
                city = $('.city').val();
                address = $('.address').val();
                cardnum = $('.cardnum').val();
                password= $('.pass_word').val();
                data={cardUserName:name,bankCode:bankCode,cardNum:cardnum,cardAddress:address,password:password};
                if($('.bankCode').val() == "" || $('.username').val() == "" || $('.province').val() == "" || $('.city').val() == "" || $('.address').val() == "" || $('.cardnum').val() == "" || $('.pass_word').val() == ""){
                    if($('.bankCode').val() == ""){
                        this.text ="选择银行卡种类.";
                        vm.$store.commit('incrClosepoptext',this.text);
                        vm.$store.commit('incrClosepop',true)
                    }else if($('.username').val() == ""){
                        this.text ="请填写真实用户名.";
                        vm.$store.commit('incrClosepoptext',this.text);
                        vm.$store.commit('incrClosepop',true);
                    }else if($('.province').val() == ""){
                        this.text ="省份不能为空.";
                        vm.$store.commit('incrClosepoptext',this.text);
                        vm.$store.commit('incrClosepop',true);
                    }else if($('.city').val() == ""){
                        this.text ="市  不能为空.";
                        vm.$store.commit('incrClosepoptext',this.text);
                        vm.$store.commit('incrClosepop',true);
                    }else if($('.address').val()){
                        this.text ="开户支行不能为空.";
                        vm.$store.commit('incrClosepoptext',this.text);
                        vm.$store.commit('incrClosepop',true);
                    }else if($('.cardnum').val() == ""){
                        this.text ="请正确填写卡号 16到19位之间.";
                        vm.$store.commit('incrClosepoptext',this.text);
                        vm.$store.commit('incrClosepop',true);
                    }else if($('.pass_word').val() == ""){
                        this.text ="密码不能为空.";
                        vm.$store.commit('incrClosepoptext',this.text);
                        vm.$store.commit('incrClosepop',true);
                    }else{
                        this.text ="请正确填写资料.";
                        vm.$store.commit('incrClosepoptext',this.text);
                        vm.$store.commit('incrClosepop',true);
                    }
                }else{
                    vm.$store.commit('incrrefresh',true);
                    vm.$addUserCard(data,this.jrg+'User/addUserCard',vm);
                }
            }
        },
        components: {
            T_itle:title,
            refter,
            pop
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import '../../public/public.less';
#addcard{
    .Promptbox{
        width:100%;
        margin: 0.2rem auto;
        height: 0.5rem;
        text-align: center;
        background: #f0f0f0;
        font-size:0.25rem;
        font-weight: 300;
        line-height: 0.5rem;
    }
    .wrapper{
        width:100%;
        font-size:0;
        padding-top:0.2rem;
        .item{
            width:80%;
            margin:0.1rem auto;
            height: 0.6rem;
            position:relative;
            label{
                display: inline-block;
                width:25%;
                height: 0.6rem;
                line-height: 0.6rem;
                font-size:0.3rem;
                text-align: right;
                padding-right: 0.2rem;
            }
            select,input{
                width:75%;
                vertical-align: top;
                height: 0.6rem;
                font-size:@font1;
                padding-left: 0.1rem;
                .border(1px,@form)
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
        .submit{
            height: 0.8rem;
            width:83%;
            margin:0.5rem auto;
            padding-left:5%;
            div{
                width:40%;
                height: 0.8rem;
                font-size:@font;
                text-align: center;
                padding-top:0.2rem;
            }
            .rf{
                margin-left: 19%;
            }
        }
        #addcarditem{
            select{
                width:37.5%;
            }
        }
    }
}

</style>