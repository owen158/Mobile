<template>
    <div class="Lotterygame game">
        <ul class="list">
            <li :data-title=up.title :data-Id=up.Id :data-type=up.Type :data-Mol=up.Mod class="index_up" @click='Game($event)' v-for = 'up in lottery.game'>
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
                children:null, //url链接
                title:'',
                lottery:{
                    "game":[
                        {Type:"IGLOTTERY",Id:"2",Mod:"MB",Im:'pk10',title:"PK10"},
                        {Type:"IGLOTTERY",Id:"1",Mod:"MB",Im:'ss',title:"时时彩"},
                        {Type:"IGLOTTERY",Id:"4",Mod:"MB",Im:'kl',title:"快乐十分"},
                        {Type:"IGLOTTERY",Id:"18",Mod:"MB",Im:'sy',title:"11选5"},
                        {Type:"IGLOTTERY",Id:"28",Mod:"MB",Im:'k8',title:"快乐8"},
                        {Type:"IGLOTTERY",Id:"3",Mod:"MB",Im:'k3',title:"快3"},
                        {Type:"IGLOTTERY",Id:"36",Mod:"MB",Im:'d3',title:"3D"},
                        {Type:"IGLOTTERY",Id:"42",Mod:"MB",Im:'pcdandan',title:"PC蛋蛋"},
                        {Type:"IGLOTTO",Id:"",Mod:"MB",Im:'xg',title:"香港彩"}
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
//            this.mylottery();
        },
        methods: {
//            mylottery:function () {
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
            }
        },
        components: {
            refresh,
            event
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import '../../public/public.less';
    @import './css/game.less';
    .Lotterygame{
        width:100%;
        padding-top: 0.5rem;
        background: #efefef;
        padding-bottom: 0.5rem;
        .pk10{
            background:url('./img/lottery/pk10.png') no-repeat 0 0 ;
            background-size:100% 100%;
        }
        .ss{
            background:url('./img/lottery/ss.png') no-repeat 0 0;
            background-size:100% 100%;
        }
        .kl{
            background:url('./img/lottery/kl.png') no-repeat 0 0;
            background-size:100% 100%;
        }
        .sy{
            background:url('./img/lottery/sy.png') no-repeat 0 0;
            background-size:100% 100%;
        }
        .k8{
            background:url('./img/lottery/k8.png') no-repeat 0 0;
            background-size:100% 100%;
        }
        .k3{
            background:url('./img/lottery/k3.png') no-repeat 0 0;
            background-size:100% 100%;
        }
        .d3{
            background:url('./img/lottery/3d.png') no-repeat 0 0;
            background-size:100% 100%;
        }
        .pcdandan{
            background:url('./img/lottery/pcdandan.png') no-repeat 0 0;
            background-size:100% 100%;
        }
        .xg{
            background:url('./img/lottery/xg.png') no-repeat 0 0;
            background-size:100% 100%;
        }
    }
</style>