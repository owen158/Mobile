<template>
    <div class="with-wrapper">
        <form action="">
            <div class="wrapper-main" style='border-bottom:1px solid #bbb'>
                <label for="">余&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额</label>
                <span style="display:inline-block;width:69%;height:0.6rem;line-height:0.6rem;margin-left:1%;font-size:0.3rem;text-align:right;padding-right:0.01rem;box-sizing:border-box;vertical-align: bottom;color:#e3881c" class="monery">{{Centerwallet}}</span>
            </div>
            <div class="wrapper-main">
                <label for="">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label>
                <input type="text" placeholder="用户名">
            </div>
            <div class="wrapper-main">
                <label for="">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label>
                <input type="text" placeholder="卡号">
            </div>
            <div class="wrapper-main">
                <label for="">银&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;行</label>
                <select class="select" name="" id="">
                    <option value=""> 选择 银行</option>
                    <option value="ny">中国农业银行</option>
                </select>
            </div>
            <div class="wrapper-main">
                <label for="">开户网点</label>
                <select class="select" name="" id="">
                    <option value="">地区</option>
                </select>
            </div>
            <div class="wrapper-main">
                <label for="">转出金额</label><input type="text" placeholder="输入取款金额">
            </div>
            <div class="wrapper-btn">
                <div id="btn" class="bnt1 submit">
                    提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交
                </div>
            </div>
            <div class="wrapper-btn">
                <div id="btn" class="bnt2 submit" >
                    在线客服
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    var data;
    export default {
        data () {
            return {
                msg: '存取款',
                money:0
            }
        },

        computed: {
            Centerwallet() {
                return this.$store.state.Centerwallet;//页面切换 首页
            },
        },
        mounted:function() {
        },
        methods:{
        },
        components: {
        },
        created() {
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    @import '../../public/public.less';
    .with-wrapper{
        width: 100%;
        margin-top: 0.2rem;
    .wrapper-main{
        width:80%;
        margin: 0.3rem auto 0;
        height: 0.6rem;
        font-size:0;
        padding-bottom: 0.05rem;
    label{
        display: inline-block;
        width: 30%;
        text-align: left;
        height: 0.6rem;
        font-size:@font;
        line-height: 0.6rem;
        vertical-align: top;
    }
    input{
        width: 69%;
        margin-left: 1%;
        height:0.6rem;
        outline:none;
        font-size: @font;
        box-sizing: border-box;
        border:1px solid #bbb;
        padding-left: 0.1rem;
    }
    .select{
        margin-left: 1%;
        width: 69%;
        height: 0.6rem;
        border-color:#BBB;
    }
    p{

    }
    }
    .wrapper-btn{
        width:85%;
        height: 0.8rem;
        margin:0.2rem auto;
    div{
        width:100%;
        height: 0.8rem;
        text-align: center;
        font-size:@font;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-top: 0.2rem;
        color:#fff;
    }
    .submit{


    }
    }
    }
</style>