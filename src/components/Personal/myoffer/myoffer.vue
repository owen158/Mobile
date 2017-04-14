<template>
    <div class=''>
        <T_itle :text="head"></T_itle>
    </div>
</template>

<script>
    import title from  '../../public/title.vue'
    export default {
        data () {
            return {
                head:'我的优惠'
            }
        },
        components: {
            T_itle:title
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

</style>