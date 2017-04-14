<template>
    <div class="pop-wrapper">
        <div class="wrapper_main">
            <h3>提示</h3>
            <div class="text">{{Closepoptext}}</div>
            <div @click='Close' class="Close_button"><img src="./img/shut.png" alt=""></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'pop-wrapper',
        data () {
            return {
            }
        },
        computed: {
            url() {
                return this.$store.state.url;
            },
            Closepoptext() {
                return this.$store.state.Closepoptext;
            }
        },
        methods: {
            Close:function(){
                this.$store.commit('incrClosepop',false);
                // this.$router.push({path:this.url})
            }
        },
        created() {
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .pop-wrapper{
        position: fixed;
        left:0;
        top:0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 50;
    h3{
        font-weight: 500;
        height: 0.4rem;
        line-height:0.4rem;
    }
    .text{
        width:100%;
        height: auto;
        font-size:0.25rem;
        padding-top: 0.1rem;
        text-align: center;
        opacity: 0.5;
    }
    .wrapper_main{
        position: relative;
        width:56%;
        height: 2.5rem;
        margin: 50% auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0.1rem 0.3rem;
        text-align: center;
        border-radius: 0.1rem;
        background: #FFF;
        font-size: 0.3rem;
    .Close_button{
        position: absolute;
        right:-0.7rem;
        top:0rem;
        height:0.5rem;
        width:0.5rem;
        img{
            width:100%;
        }
    }
    }
    }
</style>