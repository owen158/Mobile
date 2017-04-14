<template>
    <div class=''>
        <T_itle :text="head"></T_itle>
            <!--<input id="disableRange"  placeholder="......">-->
    </div>
</template>

<script>
    import title from  '../../public/title.vue'
//    import '../../../../node_modules/flatpickr/dist/flatpickr'
    export default {
        data () {
            return {
                head:'优惠记录'
            }
        },
        mounted:function(){
//            this.init();
        },
        methods: {
//            init:function () {
//                document.getElementById("disableRange").flatpickr({
//                    disable: [
//                        {
//                            from: "2016-08-16",
//                            to: "2016-08-19"
//                        },
//                        "2016-08-24",
//                        new Date().fp_incr(7) // 30 days from now
//                    ],
//                    minDate:new Date().fp_incr(-30),
//                    // minDate:new Date().fp_incr(),
//                    maxDate: "today"
//                });
//            }
        },
        components: {
            T_itle:title
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    /*@import "../../../../node_modules/flatpickr/dist/flatpickr.css";*/
    input{
        height: 0.5rem;
        width:40%;
        font-size:0.3rem;
        border:1px solid red;
    }
</style>