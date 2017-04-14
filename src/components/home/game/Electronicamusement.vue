<template>
    <div class="Electronicamusement game">
        <ul class="list">
            <li :data-title=up.title :data-Id=up.Id :data-type=up.Type :data-Mol=up.Mod class="index_up" @click='Game($event)' v-for = 'up in electro.game'>
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
                electro: {
                    "game": [
                        {Type: "PT", Id: "", Mod: "mobile", Im: 'PT', title: "PT电子"},
                        {Type: "MG", Id: "", Mod: "", Im: 'MG', title: "MG电子"},
                        {Type: "BBIN", Id: "2", Mod: "", Im: 'bbin', title: "BBIN电子"},
                        {Type: "HABA", Id: "", Mod: "", Im: 'haba', title: "HABA电子"},
                        {Type: "SB", Id: "4", Mod: "", Im: 'TGP', title: "TGP电子"}
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
//            this.myElectron();
        },
        methods: {
//            myElectron:function () {
//                vm.$store.commit('incrrefresh',false);
//                var time = setTimeout(function () {
//                    window.location='/';
//                },0);
//                clearTimeout(time);
//            },
            Game:function(event){
                var vm=this;
                vm.$store.commit('incrGamebalance',0);
                var el = event.currentTarget;
                gametype = el.getAttribute('data-type');
                gameId = el.getAttribute('data-Id');
                model = el.getAttribute('data-Mol');
                vm.me = el.getAttribute('data-title');
                data = {gameType:gametype,gameID:gameId,model:model};
                if(this.login == false){
                    vm.$store.commit('incrdetailShow',false);
                    vm.$router.push({path:'/login'});
                }else if(this.login == true){
                    vm.$store.commit('incrdetailShow',true);
                    vm.$getBalanceHome({BType:gametype},vm.jrg+'User/getBalance',vm);
                    if(gametype != "PT" && gametype != "MG" && gametype != "HABA"){
                        vm.$store.commit('incrrefresh',true);
                        vm.$forwardGame(data,vm.jrg+'User/forwardGame',vm);
                    }else if(gametype == "PT"){
                        vm.$store.commit('incrrefresh',true);
                        vm.children = "./static/day/game/slot_PT.html"
                    }else if(gametype == "MG"){
                        vm.$store.commit('incrrefresh',true);
                        vm.children = "./static/day/game_play/slot_mg.html"
                    }else if(gametype == "HABA"){
                        vm.$store.commit('incrrefresh',true);
                        vm.children = "./static/day/game_Haba/game_haba.html"
                    }
                }
            }
        },
        components:{
            refresh,
            event
        },
}
</script>

<style lang="less">
    @import '../../public/public.less';
    @import './css/game.less';
    .Electronicamusement{
        width:100%;
        padding-top: 0.5rem;
        background: #efefef;
        padding-bottom: 0.5rem;
        .PT{
            background: url('./img/electron/PT.png') no-repeat;
            background-size:100% 100%;
        }
        .MG{
            background: url('./img/electron/MG.png') no-repeat;
            background-size:100% 100%;
        }
        .bbin{
            background: url('./img/electron/bbin.png') no-repeat;
            background-size:100% 100%;
        }
        .haba{
            background: url('./img/electron/haba.png') no-repeat;
            background-size:100% 100%;
        }
        .TGL{
            background: url('./img/electron/TGP.png') no-repeat;
            background-size:100% 100%;
        }
    }
</style>