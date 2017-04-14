<template>
    <div class="Sportsevents game">
        <ul class="list">
            <li :data-title=up.title :data-Id=up.Id :data-type=up.Type :data-Mol=up.Mod class="index_up" @click='Game($event)' v-for = 'up in Sports.game'>
                <div style="" class="img" :class="up.Im"></div>
            </li>
        </ul>
        <div class="enter" v-show='detailShow'>
            <event :children='children'  :title='title'></event>
        </div>
        <refresh v-show='refresh'></refresh>
    </div>
</template>

<script>
    var gametype,gameId,model,data;
    import refresh from '../../public/refter.vue'
    import event from './event.vue'
    export default {
        data () {
            return {
                children: null, //url链接
                title: '',
                Sports: {
                    "game": [
                        {Type:"HG",Id:"",Mod:"MB",Im:'hg',title:"皇冠体育"}
                    ]
                }
            }
        },
        computed: {
            refresh() {
                return this.$store.state.refresh;//刷新
            },
            Closepop() {
                return this.$store.state.Closepop;//提示框
            },
            login() {
                return this.$store.state.login;//刷新
            },
            detailShow() {
                return this.$store.state.detailShow;//提示框
            },
            jrg() {
                return this.$store.state.jrg;
            },
        },
        mounted:function(){
//            this.mysports();
        },
        methods: {
//            mysports:function () {
//                vm.$store.commit('incrrefresh',false);
//                var time = setTimeout(function () {
//                    window.location='/';
//                },0);
//                clearTimeout(time);
//            },
            Game:function(event) {//游戏入口查询
                var vm=this;
                vm.$store.commit('incrGamebalance',0);
                var el = event.currentTarget;
                gametype = el.getAttribute('data-type');
                gameId = el.getAttribute('data-Id');
                model = el.getAttribute('data-Mol');
                vm.title = el.getAttribute('data-title');
                data = {gameType:gametype,gameID:gameId,model:model};
                if(vm.login == false){
                    vm.$store.commit('incrdetailShow',false);
                    vm.$router.push({path:'/login'});
                }else if(vm.login == true){
                    vm.$getBalanceHome({BType:gametype},vm.jrg+'User/getBalance',vm);
                    vm.$store.commit('incrdetailShow',true);
                    vm.$store.commit('incrrefresh',true);
                    vm.$forwardGame(data,vm.jrg+'User/forwardGame',vm);
                }
            },
        },
        components: {
            refresh,
            event
        }
    }
</script>

<style lang="less">
    @import '../../public/public.less';
    @import './css/game.less';
    .Sportsevents{
        width:100%;
        padding-top: 0.5rem;
        background: #efefef;
        padding-bottom: 0.5rem;
        .hg{
            background: url('./img/sports/hg.png') no-repeat 0 0;
            background-size:100% 100%;
        }

    }
</style>