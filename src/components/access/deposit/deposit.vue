<template>
    <div class="deposit">
        <div class="wrapper">
            <div class="cuntop"> 请选择支付方式</div>
            <div class="main-wrapper">
                <div class="item">
                    <router-link   to='/access/deposit/Micro'>
                        <img src="./img/1.png"  alt="">
                    </router-link>
                </div>
                <div style="margin: 0 2%;" class="item">
                    <router-link   to='/access/deposit/Alipay'>
                        <img src="./img/3.png"  alt="">
                    </router-link>
                </div>
                <div class="item">
                    <router-link   to='/access/deposit/banking'>
                        <img src="./img/2.png"  alt="">
                    </router-link>
                </div>
            </div>
        </div>
        <transition :name="transitionName" >
            <router-view class="depositchild"></router-view>
        </transition>
        <pop v-show="Closepop"></pop>
        <refresh v-show="refresh"></refresh>
    </div>
</template>

<script>
    import pop from '../../public/pop.vue'
    import refresh from '../../public/refter.vue'
    export default {
        data() {
            return {
                transitionName: 'slide-left',
            }
        },
        computed: {
            refresh() {
                return this.$store.state.refresh;//刷新
            },
            login() {
                return this.$store.state.login;//刷新
            },
            Closepop() {
                return this.$store.state.Closepop;//提示框
            },
        },
        mounted:function(){
//            this.anexaminatio();
        },
        methods:{
//            anexaminatio: function () {
//                if(this.login == true){
//                    this.$router.push({path:'/access'});
//                }else{
//                    this.$router.push({path:'/'});
//                }
//            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        components: {
            pop,
            refresh
        }
    }
</script>

<style lang="less">
    @import "../../public/public.less";
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    .depositchild {
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
    .deposit {
        width:100%;
        .wrapper{
            width:89%;
            height: 1.15rem;
            margin:0 auto;
            .cuntop {
                height: 0.5rem;
                padding-left: 0.1rem;
                line-height:0.5rem;
                font-size:0.25rem;
                opacity: 0.4;
            }
            .main-wrapper{
                width:100%;
                height:0.65rem;
                font-size:0;
                .item{
                    display: inline-block;
                    width:32%;
                    height:0.65rem;
                    line-height:0.65rem;
                    a{
                        display: block;
                        height: 0.65rem;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        /*.transparent(3px);*/
                        img{
                            width:89%;
                        }
                    }
                    a.router-link-active{
                        color:@border;
                        background:url(./img/depositjebj_11.jpg) no-repeat;
                        background-size: 100% 100%;
                        /*.border-bottom(@border,3px);*/
                    }
                }
            }
        }
    }
</style>