<template>
    <div class="pop_login">
        <img src="./img/Refresh.gif" height="40" width="40" alt="">
    </div>
</template>

<script>
    export default {
        created() {
        },
        data () {
            return {
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .pop_login{
        position: fixed;
        top:0;
        left:0;
        right:0;
        bottom: 0;
        z-index: 70;
        text-align: center;
        background:rgba(0,0,0,0.5);
        img{
            margin-top: 50%;
        }
    }
</style>