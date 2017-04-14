<template>
    <div class="title top" >
        {{text}}
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String
            }
        },
        components: {
        },
        created() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    @import './public.less';
    .top{
        width: 100%;
        height: 0.88rem;
        line-height: 0.88rem;
        font-size:@font2;
        font-weight: 100;
        text-align: center;
        background: #1f1f1f;
        color: #fff;
    }
</style>
