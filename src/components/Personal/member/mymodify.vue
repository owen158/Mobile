<template>
    <div class="mymodify">
        <form action="">
            <div class="item-main">
                <label for=""><img src='../../login/img/username.png' height="20" width="20" alt=""></label><input type="text" placeholder="真实姓名">
            </div>
            <div class="item-main">
                <label for=""><img src="../../registered/img/phone.png" height="20" width="20" alt=""></label><input type="tel" placeholder="手机号码">
            </div>
            <div class="item-main">
                <label for=""><img src="./img/qq.png" height="20" width="20" alt=""></label><input type="text" placeholder="QQ号码">
            </div>
            <div class="item-main">
                <label for=""><img src="./img/weixin.png" height="20" width="20" alt=""></label><input type="text" placeholder="微信号码">
            </div>
        </form>
        <div class="bnt1 modify">修改资料</div>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import '../../public/public.less';
    .mymodify{
        width:100%;
    form{
        width: 80%;
        box-sizing: border-box;
        margin:0.5rem auto;
    .item-main{
        width:100%;
        height: 0.7rem;
        font-size:0;
        margin-bottom: 0.2rem;
    label{
        display: inline-block;
        width: 16%;
        height: 0.7rem;
        text-align: center;
        background:  @form;
    img{
        margin-top: 0.1rem;
    }
    }
    input{
        width: 84%;
        vertical-align: top;
        height: 0.7rem;
        border:1px solid @form;
        color:#BBB;
        font-size:@font1;
        padding-left: 0.2rem;
        box-sizing: border-box;
    }
    }
    }
    .modify{
        height: 0.8rem;
        width:85%;
        text-align: center;
        margin: 0 auto;
        box-sizing: border-box;
        padding-top: 0.2rem;
        font-size: @font;
        color:#FFf;
        font-weight: 500
    }
    }
</style>