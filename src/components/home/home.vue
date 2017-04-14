<template>
    <div class="home">
        <bnner></bnner>
        <rotation></rotation>
        <div class="wrapper">
            <div class="item">
                <router-link to="/Livevideo">
                    真人视讯
                </router-link>
            </div>
            <div class="item">
                <router-link to="/Electronicamusement">
                    电子游艺
                </router-link>
            </div>
            <div class="item">
                <router-link to="/Sportsevents">
                    体育赛事
                </router-link>
            </div>
            <div class="item">
                <router-link to="/Lotterygame">
                    彩票游戏
                </router-link>
            </div>
        </div>
        <transition :name="transitionName" >
            <router-view class="child_view"></router-view>
        </transition>
    </div>
</template>
<script>
import bnner from './bnner/bnner'
import rotation from './bnner/rotation.vue'
export default {
    data () {
        return {
            transitionName: 'slide-left',
        }
    },
    mounted:function() {
    },
    methods:{
    },
    watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    },
    components: {
        bnner,
        rotation
    },
}
</script>

<style lang="less">
    @import '../public/public.less';
    .home{
        width:100%;
        .wrapper{
            width:100%;
            font-size:0;
            .item{
                display: inline-block;
                width:25%;
                height:0.7rem;
                text-align:center;
                padding:0 0.1rem;
                box-sizing: border-box;
                a{
                    display:block;
                    height: 0.7rem;
                    line-height: 0.7rem;
                    font-size: @font;
                    color:#000;
                    box-sizing: border-box;
                    font-weight: 500;
                    .transparent(3px);
                }
                a.router-link-active{
                    color:@border;
                    .border-bottom(3px,@border);
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
    .child_view {
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