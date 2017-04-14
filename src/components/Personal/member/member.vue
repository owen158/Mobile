<template>
    <div class='member'>
        <T_itle :text="text"></T_itle>
        <div class="warpper">
            <div class="main-nav">
                <router-link  to='/Account_center/member/myvip'>个人中心</router-link>
            </div>
            <div class="main-nav">
                <router-link  to="/Account_center/member/mymodify">修改资料</router-link>
            </div>
        </div>
        <transition :name="transitionName" >
            <router-view class="member-child"></router-view>
        </transition>
    </div>
</template>

<script>
    import title from '../../public/title.vue'
    export default {
        data () {
            return {
                text:'会员资料',
                transitionName: 'slide-left',
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
            T_itle:title
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import "../../public/public.less";
    .member {
        width: 100%;
        .warpper {
            width: 100%;
            margin-bottom: 0.2rem;
            font-size: 0;
            .main-nav {
                 display: inline-block;
                 box-sizing: border-box;
                 width: 50%;
                 padding: 0 0.2rem;
                 height: 0.7rem;
                a {
                    display: block;
                    height: 0.7rem;
                    line-height: 0.7rem;
                    font-size: 0.3rem;
                    color: #000;
                    box-sizing: border-box;
                    font-weight: 700;
                    .transparent(3px);
                    text-align: center;
                }
                a.router-link-active {
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
    .member-child {
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