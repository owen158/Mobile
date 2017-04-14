<template>
    <div class="customer">
        <T_itle :text="text"></T_itle>
    </div>
</template>

<script>
    import Title  from '../public/title.vue'
    export default {
        data () {
            return {
                text: '客 服',
            }
        },
        computed: {
            login() {
                return this.$store.state.login;//刷新
            }
        },
        mounted:function(){
            this.anexaminatio();
        },
        methods:{
            anexaminatio: function () {
//                if(this.login == false){
//                    this.$router.push({path:'/login'});
//                }else if(this.login != false){
//                    this.$router.push({path:'/customer'});
//                }
            }
        },
        components: {
            T_itle:Title
        }
    }
</script>

<style lang="less">
    .customer{
        width:100%;
    }
</style>