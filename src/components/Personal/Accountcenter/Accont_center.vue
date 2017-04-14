<template>
    <div class='Account_center'>
        <router-view ></router-view>
        <!--<pop v-show="Closepop"></pop>-->
        <!--<refresh v-show="refresh"></refresh>-->
    </div>
</template>
<script>
//    import pop from '../../public/pop.vue'
//    import refresh from '../../public/refter.vue'
    export default {
        data () {
            return {}
        },
        computed: {
//            refresh() {
//                return this.$store.state.refresh;
//            },
//            Closepop() {
//                return this.$store.state.Closepop;
//            },
//            login() {
//                return this.$store.state.login;
//            },
//            jrg() {
//                return this.$store.state.jrg;
//            },
        },
        mounted:function(){
        },
        methods: {
        },
        components:{
//            refresh,
//            pop
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.Account_center{
    width:100%;
}
</style>