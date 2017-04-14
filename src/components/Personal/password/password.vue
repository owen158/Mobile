<template>
    <div class="pswd ">
        <T_title :text="head"></T_title>
        <div class="wrapper">
            <div class="main-nav">
                <router-link  to='/Account_center/password/loginpassword'>登录密码</router-link>
            </div>
            <div class="main-nav">
                <router-link  to="/Account_center/password/cardpassword">取款密码</router-link>
            </div>
            <!-- <div class="main-nav">
              <router-link  to="/casino/deposit/banking">网银转账</router-link>
            </div> -->
        </div>
        <transition :name="transitionName" >
            <router-view class="child-view"></router-view>
        </transition>
        <pop  v-show='Closepop'></pop>
        <refresh v-show='refresh'></refresh>
    </div>
</template>

<script>
    import title from '../../public/title.vue'
    import refresh from '../../public/refter.vue'
    import pop from '../../public/pop.vue'
    export default {
        created() {
        },
        data () {
            return {
                transitionName: 'slide-left',
                head:'修改密码'
                // hello:this.$router.push({path:'/lottery'})
            }
        },
        computed: {
            refresh() {
                return this.$store.state.refresh;
            },
            Closepop() {
                return this.$store.state.Closepop;
            },
        },
        methods:{
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        components:{
            refresh,
            pop,
            T_title:title
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import '../../public/public.less';
    .pswd{
        width:100%;
    .wrapper{
        width:90%;
        margin:0 auto;
        height: 0.8rem;
        font-size: 0;
    .main-nav{
        display: inline-block;
        width:50%;
        height: 0.7rem;
        padding: 0 0.1rem;
        a{
        display:block;
        height: 0.7rem;
        line-height: 0.7rem;
        font-size: @font;
        text-align: center;
        color:#000;
        font-weight: 700;
        .transparent(3px);
        }
        a.router-link-active{
            color:@border;
            .border-bottom(3px,@border);
        }
    }
    }
    .wrapper-page{
        width:100%;
        min-height: 8rem;
    }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    .child-view {
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