<template>
    <div class="access">
        <T_itle :text="text"></T_itle>
        <div class="wrapper-parent">
            <div class="item">
                <router-link  to="/access/deposit">存 款</router-link>
            </div>
            <div class="item">
                <router-link to="/access/Withdrawals">取 款</router-link>
            </div>
        </div>
        <transition :name="transitionName" >
            <router-view class="chil"></router-view>
        </transition>
    </div>
</template>

<script>
    import title from '../public/title.vue'
    export default {
        data () {
            return {
                text: '存取款',
                transitionName: 'slide-left',
            }
        },
        computed: {
            login() {
                return this.$store.state.login;//刷新
            },
            jrg() {
                return this.$store.state.jrg;//刷新
            }
        },
        mounted:function(){
//            this.anexaminatio();
        },
        methods:{
//            anexaminatio: function () {
//                if(this.login == true){
//                    this.$router.push({path:'/access'});
//                }else if(this.login !=false){
//                    this.$router.push({path:'/'});
//                }else if(this.login ==false){
//                    this.$router.push({path:'/login'});
//                }
//            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        components: {
            T_itle:title
        }
    }
</script>

<style lang="less">
    @import "../public/public.less";
    .access{
        width:100%;
        .wrapper-parent{
            width:90%;
            margin:0.2rem auto;
            height: 0.6rem;
            font-size:0;
            .item{
                display: inline-block;
                height:0.7rem;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding: 0 0.1rem;
                width:50%;
                a{
                    display: block;
                    text-align: center;
                    height: 0.7rem;
                    line-height: 0.7rem;
                    font-size: 0.33rem;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    .transparent(3px);
                }
                a.router-link-active{
                    color:@border;

                    .border-bottom(@border,3px);
                }
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    .chil {
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
</style>