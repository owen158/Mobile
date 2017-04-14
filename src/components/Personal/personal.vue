<template>
    <div class="personal">
        <T_itle :text="text"></T_itle>
        <div class="head-wrapper">
            <div class="item lf"><img src="./img/myhead.png" alt=""></div>
            <div class="item md">
                <p>账户名</p>
                <span>{{Username}}</span>
            </div>
            <div @click="Refresh" class="item rf">
                <p>中心钱包</p>
                <span>{{Centerwallet}} <img src="./img/refresh.png" alt=""></span>
            </div>
        </div>
        <div class="wrapper">
            <div class="head">账户中心</div>
            <div class="container">
                <div class="item">
                    <router-link to="/Account_center/member">
                        <span><img src="./member/img/grzl.png" alt=""></span>
                        <p>会员资料</p>
                    </router-link>
                </div>
                <div class="item md">
                    <router-link to="/Account_center/card">
                        <span><img src="./card/img/card.png" alt=""></span>
                        <p>银行卡信息</p>
                    </router-link>
                </div>
                <div class="item ">
                    <router-link to="/Account_center/Balance">
                        <span><img src="./Balance/img/balance.png" alt=""></span>
                        <p>余额互转</p>
                    </router-link>
                </div>
                <div class="item">
                    <router-link to="/Account_center/password">
                        <span><img src="./password/img/password.png"  alt=""></span>
                        <p >修改密码 </p>
                    </router-link>
                </div>
                <div class="item md" >
                    <router-link to="/Account_center/Transfer">
                        <span><img src="./Transfer/img/transfer.png" alt=""></span>
                        <p>转账记录</p>
                    </router-link>
                </div>
                <div class="item">
                    <router-link to="/Account_center/mydeposit">
                        <span><img src="./mydeposit/img/deposit.png" alt=""></span>
                        <p>存款记录</p>
                    </router-link>
                </div>
                <div class="item ">
                    <router-link to="/Account_center/myWithdrawals">
                        <span><img src="./myWithdrawals/img/myWithdrawals.png" alt=""></span>
                        <p>提款记录</p>
                    </router-link>
                </div>
                <div class="item md">
                    <router-link to="/Account_center/offer">
                        <span><img src="./offer/img/offer.png"  alt=""></span>
                        <p>优惠记录</p>
                    </router-link>
                </div>
                <div class="item ">
                    <router-link to="/Account_center/myoffer">
                        <span><img src="./myoffer/img/Myoffer.png" alt=""></span>
                        <p>我的优惠</p>
                    </router-link>
                </div>
                <div @click='drop' class="item">
                    <span><img src="./img/drop.png" alt=""></span>
                    <p >安全登出</p>
                </div>
                <div class="item rt" style='border-bottom:none'>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    var data;
    import Title from '../public/title.vue'
    export default {
        data () {
            return {
                text: '个人中心'
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
            login() {
                return this.$store.state.login;
            },
            Username() {
                return this.$store.state.Username;
            },
            Centerwallet() {
                return this.$store.state.Centerwallet;
            }
        },
        mounted:function(){
        },
        methods: {
            Refresh:function(){
                var vm = this;
                data={BType:"WALLET"};
                vm.$store.commit('incrrefresh',true);
                this.$Refresh(data,vm.jrg+'User/getBalance',vm);
            },
            drop:function() { //退出登录游戏
                var vm = this;
                vm.$store.commit('incrrefresh',true);
                this.$logout(this.jrg+'logout.do',vm);
            }
        },
        components: {
            T_itle:Title
        }
    }
</script>

<style lang="less">
    @import '../public/public.less';
    .personal{
        width:100%;
        .head-wrapper{
            width:100%;
            height: 2.06rem;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 0.1rem 0.1rem;
            font-size:0;
            background:url('./img/mybg.jpg');
            background-size:100% 100%;
            .item {
                display: inline-block;
                vertical-align: top;
                height: 1.86rem;
            }
            .lf{
                width:20%;
                img{
                    width:100%;
                    margin-top: 0.2rem;
                }
            }
            .md, .rf{
                width:40%;
                p{
                    width:100%;
                    height:0.5rem;
                    line-height: 0.5rem;
                    padding-left: 0.1rem;
                    font-size:@font;
                    color:@size;
                    margin-top: 0.3rem;
                }
                span{
                    display: inline-block;
                    width:100%;
                    height: 0.4rem;
                    padding-left: 0.1rem;
                    line-height: 0.4rem;
                    font-size:@font1;
                    color:@size;
                    position: relative;
                    img{
                        position: absolute;
                        right:0.3rem;
                        width:0.4rem;
                    }
                }
            }

        }
        .out{
            width:100%;
            font-size:0.6rem;
            height: 0.5rem;
        }
        .wrapper{
            width:100%;

            .head{
                height: 0.8rem;
                line-height: 0.8rem;
                width:100%;
                color:#fff;
                background:#d0d0d0;
                font-size: 0.3rem;
                box-sizing: border-box;
                font-weight: 800;
                padding-left: 0.2rem;
            }
        }
        .container{
            width:100%;
            padding-bottom:1.2rem;
            font-size:0;
            .item{
                display: inline-block;
                vertical-align: top;
                width:33.3333333333%;
                height: 2.1rem;
                border-bottom:1px solid #d0d0d0;
                box-sizing: border-box;
                a{
                    display: block;
                    height: 2.1rem;
                }
                span{
                    display: block;
                    width:100%;
                    height: 1.2rem;
                    text-align: center;
                    img{
                        width:0.7rem;
                        margin-top: 0.5rem;
                    }
                }
                p{
                    display:block;
                    margin-top: 0.1rem;
                    height: 0.5rem;
                    line-height: 0.5rem;
                    text-align: center;
                    font-size: 0.25rem;
                    color:#000;
                    font-weight: 100;
                }
            }
            div.md{
                border-left:1px solid #d0d0d0;
                border-right:1px solid #d0d0d0;
                box-sizing: border-box;
            }
            div.rt{
                border-left:1px solid #d0d0d0;
            }
        }
    }
</style>