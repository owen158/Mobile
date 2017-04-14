<template>
    <div class='cardinformation'>
        <div class="tianjia">
            添加银行卡<b v-show="more">{{title}}</b><span @click="add_card" v-show="addcard" class="add_card bnt2">＋</span>
        </div>
        <div class="titel">您目前中心钱包账户余额为 : {{Centerwallet}}</div>
        <div id="wrapper">
            <div  class="container" v-for="v in cardBank">
               <div :data-index=v.id @click="delect" class="delect"></div>
                <div class="img Img1">
                    {{v.bank_name}}
                </div>
                <div class="cardnumber">{{v.card_num}}</div>
            </div>
        </div>
        <div v-show="confirm" class="mod-news">
            <div class="main-wrapper">
                <h4>提示</h4>
                <div class="main-item">
                    <input class="password" type="password" placeholder="银行卡密码">
                </div>
                <div class="mainitem">
                    <div @click="cancel" class="bnt1">取 消</div>
                    <div @click="Confirm" class="bnt2 rf">删 除</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var data,password;
    export default {
        data () {
            return {
                title:"银行卡数量不能超过五张",
                card:{},
                addcard:true,
                more:false,
                confirm:false,
                id:''
            }
        },
        computed: {
            Centerwallet() {
                return this.$store.state.Centerwallet;//刷新
            },
            jrg() {
                return this.$store.state.jrg;//刷新
            },
            cardBank() {
                return this.$store.state.cardBank;//刷新
            }
        },
        mounted:function(){
            this.anexaminatio();
        },
        methods:{
            anexaminatio: function () {
                var vm = this;
                this.$getUserCard(data,this.jrg+'User/getUserCard',vm);
            },
            cancel:function () {
                this.confirm = false;
            },
            delect:function () {
                this.confirm = true;
                var el = event.currentTarget;
                this.id = el.getAttribute('data-index');
            },
            Confirm:function () {
                var vm =this;
                vm.$store.commit('incrrefresh',true);
                password = $('.password').val();
                data={cardId:vm.id, password:password};
                vm.$delete(data,vm.jrg+"User/delUserCard",vm);
            },
            add_card:function () {
                this.$router.push({path:'/Account_center/addcard'});
            }

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import "../../public/public.less";
.cardinformation{
    width:100%;
    padding-bottom: 1.2rem;
    .mod-news{
        position: fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:rgba(0,0,0,0.5);
        .main-wrapper{
            width:5rem;
            height: 2.3rem;
            background: #fff;
            margin: 50% auto;
            .border-radius(3px);
            font-size:0;
            h4{
                width:100%;
                height: 0.5rem;
                line-height: 0.5rem;
                text-align: center;
                font-size:@font;
                color:@form;
            }
            .main-item ,.mainitem{
                margin:0.1rem auto;
            }
            .main-item{
                width:85%;
                height: 0.6rem;
                input{
                    width:100%;
                    height: 0.6rem;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    .border(1px,@form);
                    font-size:@font1;
                    padding-left: 0.1rem;
                }
            }
            .mainitem{
                width:87%;
                height:0.8rem;
                div{
                    display: inline-block;
                    width:45%;
                    height: 0.8rem;
                    text-align: center;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    padding-top: 0.2rem;
                    font-size:@font;
                }
                .rf{
                    margin-left: 10%;
                }
            }
        }
    }
    .titel{
        width:98%;
        margin: 0.1rem auto;
        height: 0.45rem;
        line-height: 0.45rem;
        text-align: left;
        background:#faf9e6;
        box-sizing: border-box;
        padding-left: 0.1rem;
        border: 1px solid #c3c1c1;
        font-size: @font;
    }
    #wrapper{
        width:95%;
        margin:0 auto;
        .container{
            position: relative;
            width:100%;
            .border-radius(0.25rem);
            font-size:0;
            margin: 0.1rem 0;
            height: 3.3rem;
            padding-top: 1.5rem;
            padding-left: 1.9rem;
            background: url(./img/card.jpg) no-repeat center center;
            background-size: 100% 100%;
            .delect{
                position: absolute;
                right:0.3rem;
                top:0.1rem;
                width:0.35rem;
                height: 0.35rem;
                background: url(../../public/img/shut.png) no-repeat center;
                background-size: 100% 100%;
            }
            .img{
                position: absolute;
                left:0.2rem;
                top:0.15rem;
                width:3rem;
                height: 0.5rem;
                font-size:0.3rem;
                font-weight: 500;
            }
            .cardnumber{
                width:70%;
                height: 0.5rem;
                line-height: 0.5rem;
                font-size: 0.35rem;
                color:#0f0f0f;
            }
        }
    }
    .tianjia {
        width: 100%;
        height: 0.8rem;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        font-size: 0.3rem;
        font-weight: bold;
        text-align: left;
        padding-top: 0.28rem;
        background: #e6e6e6;
        position: relative;
        border-bottom: 1px solid #bbb;
        b{
            width:2.9rem;
            text-align: center;
            vertical-align: top;
            color:#fff;
            height: 0.4rem;
            line-height: 0.4rem;
            margin-left:10%;
            background: #bbb;
            font-size:0.2rem;
            border-radius: 0.1rem;
            display: inline-block;
        }
        span.add_card{
            position: absolute;
            width:0.6rem;
            top:0.2rem;
            right:0.2rem;
            padding-top: 0.04rem;
            height: 0.4rem;
            color:#FFf;
            font-size: 0.3rem;
            text-align: center;

        }
    }
}
</style>