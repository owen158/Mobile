<template>
    <div class="column">
        <div id="marquee" class="con">
            <dl>
                <dt>
                    <a href="javascript:void(0)">公告： 1.新注册会员您的前十次存款都能享受10%的存款优惠，10存10送达到8倍流水即可提款，详情可查阅【优惠活动】</a>
                    <a href="javascript:void(0)">公告： 2.新注册会员您的前十次存款都能享受10%的存款优惠，10存10送达到8倍流水即可提款，详情可查阅【优惠活动】</a>
                </dt>
                <dd></dd>
            </dl>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'column',
        data () {
            return {
                msg: '公告'
            }
        },
        mounted:function() {
            this.Marquee("marquee");
        },
        methods:{
            Marquee:function(id){
                try{document.execCommand("BackgroundImageCache", false, true);}catch(e){};
                var container = document.getElementById(id),

                    original = container.getElementsByTagName("dt")[0],
                    clone = container.getElementsByTagName("dd")[0],
                    speed = arguments[1] || 50;
                clone.innerHTML=original.innerHTML;
                var rolling = function(){
                    if(container.scrollLeft == clone.offsetLeft){
                        container.scrollLeft = 0;
                    }else{
                        container.scrollLeft++;
                    }
                }
                var timer = setInterval(rolling,speed)//设置定时器
                $('#'+id).on('mouseover',function(){
                    clearInterval(timer)
                })
                $('#'+id).on('mouseout',function(){
                    timer=setInterval(rolling,speed)
                })
                // container.on=function() {}//鼠标移到marquee上时，清除定时器，停止滚动
                // container.on=function() {}//鼠标移开时重设定时器
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*@import '../../../store/public.less'*/
    .column{
        width: 100%;
        height: 0.44rem;
        line-height: 0.44rem;
        font-size: 0.2rem;
        overflow: hidden;
        background: #efefef;
        text-align: left;
        font-size: 0;
        box-sizing: border-box;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
    }
    #marquee {
        display: inline-block;
        position:relative;
        box-sizing: border-box;
        width: 100%;
        overflow:hidden;
        height: 0.44rem;
        font-size:0.20rem;
        opacity: 0.8;
    }
    #marquee dl, #marquee dt,#marquee dd,#marquee a {
        float:left;
        margin:0;
        height: 0.44rem;
        padding:0;
        color:#000;
    }
    #marquee dl{
        width:1000%;
        height: 0.44rem;
    }
</style>