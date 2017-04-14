<template>
    <div class='card'>
        <T_itle :text="text"></T_itle>
        <div class="wrapper">
            <div class="main-nav">
                <router-link  to='/Account_center/card/cardinformation'>添加银行卡</router-link>
            </div>
            <div class="main-nav">
                <router-link  to="/Account_center/card/cardwithdrawals">申请提款</router-link>
            </div>
        </div>
        <transition :name="transitionName" >
            <router-view  class="card_view"></router-view>
        </transition>
        <pop v-show="Closepop"></pop>
        <refter v-show="refresh"></refter>
    </div>
</template>
<script>
    import pop from '../../public/pop.vue'
    import refter from '../../public/refter.vue'
    import title from  '../../public/title.vue'
    export default {
        data () {
            return {
                transitionName: 'slide-left',
                text:'银行卡信息'
            }
        },
        computed: {
            Closepop() {
                return this.$store.state.Closepop;//刷新
            },
            refresh() {
                return this.$store.state.refresh;//刷新
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
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
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    .card_view {
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
.card{
    width:100%;
    .wrapper{
        width:98%;
        margin:0 auto;
        height: 0.7rem;
        font-size: 0;
        .main-nav{
            display: inline-block;
            box-sizing: border-box;
            width:50%;
            height: 0.7rem;
            padding: 0 0.1rem;
            a{
                display:block;
                height: 0.7rem;
                line-height: 0.7rem;
                font-size: @font;
                color:#000;
                text-align: center;
                box-sizing: border-box;
                font-weight: 700;
            .transparent(3px);
            }
            a.router-link-active{
                color:@border;
            .border-bottom(3px,@border);
            }
        }
    }
}
</style>