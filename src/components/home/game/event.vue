<template>
    <div class="event_k">
        <div class="enter-main alearfix">
            <div class="enter-wrapper">
                <h2>{{title}}</h2>
                <div class="menu-wrapper">
                    <div class="left">账户名称 :</div>
                    <div ref="heery" class="right">{{Username}}</div>
                </div>
                <div class="menu-wrapper">
                    <div class="left">游戏余额 :</div>
                    <div  ref="monery" class="right monery">{{Gamebalance}}</div>
                </div>
                <div class="menu-wrapper">
                    <div  class="left monay">中心钱包 :</div>
                    <div class="right">{{Centerwallet}}</div>
                </div>
                <div class="menu_sup">
                    <div @click='out'id="btn" class="menu-zc bnt1">转 入</div><div @click='oin' id="btn" class="menu-zr bnt2">转 出</div>
                </div>
                <div class="menu_sub">
                    <div @click='enter' class="menu_submit  bnt3" id="btn">立即游戏</div>
                </div>
                <div v-show='examination' class="menu_sub and">
                    <div class="exami">维护中，请稍后 <span @click='home_page()' class="main">返回首页</span></div>
                </div>
            </div>
            <div @click='dropout' class="status">×</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String
            },
            children:{
                type: String
            },
        },
        data () {
            return {
            }
        },
        computed: {
            refresh() {
                return this.$store.state.refresh;//刷新
            },
            examination() {
                return this.$store.state.examination;//game 维护中 刷新
            },
            refresh() {
                return this.$store.state.refresh;//刷新
            },
            Centerwallet() {
                return this.$store.state.Centerwallet;// 中心钱包
            },
            Username() {
                return this.$store.state.Username;// 用户名
            },
            Gamebalance() {
                return this.$store.state.Gamebalance;// 游戏余额
            }
        },
        ready: function() {
        },
        mounted:function(){
        },
        methods:{
            enter:function() { //进入游戏
                var vm = this;
                vm.$store.commit('incrdetailShow',false);
                window.location.href=vm.children;
            },
            out:function(){
                window.location.href='/lottery/transferaccess/oin'
            },
            oin:function(){
                window.location.href='/lottery/transferaccess/out'
            },
            home_page:function() { //获取游戏失败，返回首页
                this.$store.commit('increxamination',false);
                this.$store.commit('incrdetailShow',false);
                // this.$router.push({path:'/'})
            },
            dropout:function(){
                // window.location.href='/'
                this.$store.commit('increxamination',false);
                this.$store.commit('incrdetailShow',false);
            }
        },
        created() {
        },
        components:{
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import '../../public/public.less';
    .status{
        position: absolute;
        width:0.5rem;
        font-size:0.5rem;
        height: 0.5rem;
        background: #bbb;
        color: #FFF;
        border-radius: 50%;
        z-index: 55;
    }
    .event_k{
        width: 100%;
    .enter-main{
        width: 100%;
        text-align: center;
        z-index: 2;
        position: relative;
    .status{
        right:0.5rem;
        top:0.1rem;
    }
    .enter-wrapper{
        width:6.74rem;
        height: 5.9rem;
        background: #fff;
        border-radius: 0.1rem;
        margin:40% auto;
        font-size: 0;
    h2{
        font-size: 0.4rem;
        font-weight: 500;
        height: 1rem;
        line-height: 1rem;
        box-sizing: border-box;
        border-bottom: 1px solid #f0f0f0
    }
    .menu-wrapper{
        width:95%;
        margin:0.2rem auto 0;
        height: 0.6rem;
        box-sizing: border-box;
    .left, .right{
        display: inline-block;
        width: 50%;
        vertical-align: top;
        line-height: 0.6rem;
        font-size:@font;
        border-bottom:1px solid #f0f0f0;
    }
    .left{
        text-align: left;
        height: 0.6rem;
        box-sizing: border-box;
        padding-left: 0.18rem;
    }
    .right{
        text-align:right;
        box-sizing: border-box;
        padding-right: 0.18rem;
        height: 0.6rem;
    }
    }
    .menu_sup, .menu_sub{
        width:95%;
        color:#FFF;
        margin:0.2rem auto 0;
    }
    .menu_sub{
        padding: 0 0.15rem;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .menu-zc, .menu-zr{
        height: 0.8rem;
        width: 47%;
        box-sizing: border-box;
        padding-top: 0.2rem;
        display: inline-block;
        font-size: @font;
    }
    .menu-zr{
        margin-left: 3%;
    }
    .and{
        position: relative;
    }
    .menu_submit{
        height: 0.8rem;
        width: 100%;
        box-sizing: border-box;
        padding-top: 0.2rem;
        font-size:@font2;
        color:#fff;

    }
    }
    }
    }
    .exami{
        position: absolute;
        left:0rem;
        bottom: 0.2rem;
        background:#bbb;
        border-radius: 0.2rem;
        width:100%;
        z-index: 5;
        height: 3.6rem;
        line-height: 3.6rem;
        font-size:0.6rem;
    .main{
        font-size:0.3rem;
        color:#ff6c00;
    }
    }
</style>