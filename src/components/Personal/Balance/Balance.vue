<template>
    <div class="cardaccess ">
        <div class="wrapper-money ">
            <div class="top">转账</div>
            <div class="item">
                <div class="main">
                    <p style='padding-left:0.8rem;padding-top:0.1rem;' class="sup"><img src="../img/money.png" alt="">中心钱包</p>
                    <p class="sub">{{Centerwallet}}</p>
                </div>
                <div @click='all' class="main" style='border-left:1px solid #bbb'>
                    <p class="sup sousuo"><img src="../img/refresh.png" alt=""></p>
                    <p class="sub cx"><a href="javascript:void(0)"></a>一键查询</p>
                </div>
            </div>
            <div class="connter">
                <div style='border-top: 1px dotted #bbb' class="item">
                    <div class="main">
                        <p class="sup">CG视讯</p>
                        <p data-type='CG' class="sub dianji"></p>

                    </div>
                    <div class="main">
                        <p class="sup mt">AGIN国际厅</p>
                        <p data-type='AGIN' class="sub mt dianji"></p>
                    </div>
                    <div class="main">
                        <p class="sup">AG视讯</p>
                        <p data-type='AG' class="sub dianji"></p>
                    </div>
                </div>
                <div class="item">
                    <div class="main">
                        <p class="sup">申博视讯</p>
                        <p data-type='SB' class="sub dianji"></p>
                    </div>
                    <!-- <div class="main">
                      <p class="sup mt">欧博视讯</p>
                      <p data-type='OB' class="sub mt dianji"></p>
                    </div> -->
                    <div class="main">
                        <p class="sup mt">OG视讯</p>
                        <p data-type='OG' class="sub dianji mt"></p>

                    </div>
                    <div class="main">
                        <p class="sup">DS太阳城</p>
                        <p data-type='DS' class="sub dianji"></p>
                    </div>
                </div>
                <div class="item">
                    <div class="main">
                        <p class="sup">MG电子</p>
                        <p data-type='MG' class="sub dianji"></p>
                    </div>
                    <div class="main">
                        <p class="sup mt">BBIN视讯</p>
                        <p data-type='BBIN' class="sub mt dianji"></p>
                    </div>
                    <div class="main">
                        <p class="sup ">PT电子</p>
                        <p data-type='PT' class="sub dianji"></p>
                    </div>
                </div>
                <div class="item">
                    <div class="main">
                        <p class="sup">HABA电子</p>
                        <p data-type='HABA' class="sub dianji"></p>
                    </div>
                    <div class="main">
                        <p class="sup mt">HG(体育)</p>
                        <p data-type='HG' class="sub mt dianji"></p>
                    </div>
                    <div class="main">
                        <p class="sup">IG彩票</p>
                        <p data-type='IG' class="sub dianji"></p>
                    </div>
                </div>
            </div>
            <div class="transfer-parent">
                <div class="item">
                    <router-link to="/Account_center/Balance/In">
                        转帐到游戏
                    </router-link>
                </div>
                <div class="item">
                    <router-link to="/Account_center/Balance/out">
                        转账到平台
                    </router-link>
                </div>
            </div>
            <transition :name="transitionName" >
                <router-view  class="child"></router-view>
            </transition>
        </div>
        <pop v-show="Closepop"></pop>
        <refresh v-show='refresh'></refresh>
    </div>
</template>
<script>
    var data,credit,type,Out,In,token,name,code;
    import refresh from "../../public/refter.vue"
    import pop from '../../public/pop.vue'
    export default {
        data () {
            return {
                text:"",
                transitionName: 'slide-left',
            }
        },
        created() {
        },
        computed: {
            refresh() {
                return this.$store.state.refresh;
            },
            Closepop() {
                return this.$store.state.Closepop;
            },
            Centerwallet() {
                return this.$store.state.Centerwallet;// 中心钱包
            },
            jrg() {
                return this.$store.state.jrg;// 中心钱包
            }
        },
        mounted:function() {
            this.loddery();
        },
        methods:{
            all:function(){
                var vm = this;
                vm.$store.commit('incrrefresh',true);
                var b = $('.dianji');
                for(var i=0;i< b.length; i++){
                    var Prev = $(b[i]);
                    var len = $(b[i]).attr('data-type');
                    vm.$getBalance({BType:len},vm.jrg+'User/getBalance',vm,Prev)
                }
            },
            loddery:function(){
                var vm = this;
                $('.dianji').html('点击刷新');
                $('.dianji').css({color:'#bbb',opacity: 0.6});
                $('.dianji').on('click',function(){
                    vm.$store.commit('incrrefresh',true);
                    var Prev = $(this);
                    var date = $(this).attr('data-type');
                    vm.$getBalanceBytype({BType:date},vm.jrg+'User/getBalance',vm,Prev)
                })
            },
        },
        watch:{
            '$route' (to, from) {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        components: {
            refresh,
            pop
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import '../../public/public.less';
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    .child{
        position: absolute;
        transition: all .5s cubic-bezier(.55,0,.1,1);
    }
    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }
    .cardaccess{
        width:100%;
        .wrapper-money{
            width:100%;
            .item{
                width:100%;
                height: 1.2rem;
                font-size:0;
                .main{
                    display: inline-block;
                    width:50%;
                    height: 1.2rem;
                    vertical-align: top;
                    .sup , .sub{
                        display:block;
                        width:100%;
                        background: #e6e6e6;
                        text-align: center;
                        height: 0.6rem;
                        line-height: 0.6rem;
                        font-size:0.3rem;
                        position: relative;
                        img{
                            width:0.6rem;
                            top:0.1rem;
                            left:1.05rem;
                            position: absolute;
                        }
                    }
                    .sup{
                        color:#000;
                        /*font-weight: bold;*/
                        font-weight: 400;
                    }
                    .sub{
                        color:@border;
                        text-align: center;
                    }
                    .sousuo{
                        width:100%;
                        text-align: center;
                        img{
                            width:0.4rem;
                            top:0.15rem;
                            left:45%;
                        }
                    }
                    .cx{
                        color:#8a8a8a;
                    }
            }
        }
    }
    .connter{
        width:100%;
        font-size:0;
        margin-bottom: 0.2rem;
        .item{
            display: inline-block;
            width:100%;
            height: 1.05rem;
            box-sizing: border-box;
            border-bottom: 1px dotted #bbb;
            .main{
                width:33.3%;
                height: 1rem;
                .sup, .sub{
                    width:100%;
                    height: 0.5rem;
                    background: #fff;
                }
                p.mt{
                    border-left:1px dotted #bbb;
                    border-right:1px dotted #bbb;
                    box-sizing: border-box;
                }
                .dianji{
                    width:100%;
                    height: 0.5rem;
                    box-sizing: border-box;
                /*border-top: 1px dotted #bbb;*/
                    img{
                        width:0.3rem;
                        margin-top: 0.05rem;
                    }
                /*background:red;*/
                }
            }
        }
    }
        .transfer-parent{
            width:100%;
            height: 0.7rem;
            font-size: 0;
            .item{
                display: inline-block;
                vertical-align: top;
                width:50%;
                padding: 0 0.2rem;
                height: 0.6rem;
                a{
                    display: block;
                    height: 0.6rem;
                    line-height: 0.6rem;
                    font-weight: 600;
                    font-size:0.3rem;
                    text-align: center;
                    .transparent(2px);
                    color:#515151;
                }
                a.router-link-active{
                    color:@border;
                    .border-bottom(2px,@border)
                }
            }
        }
    }
</style>