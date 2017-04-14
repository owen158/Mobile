<template>
    <div class='myvip'>
        <div class="wrapper" >
            <p class="head"></p>
            <div class="item">
                <div class="lf">用&nbsp;&nbsp;户&nbsp;&nbsp;名</div>
                <div class="rf">{{data.username}}</div>
            </div>
            <div class="item">
                <div class="lf">会员等级 </div>
                <div class="rf" id="stat"></div>
            </div>
            <div class="item">
                <div class="lf">手&nbsp;&nbsp;机&nbsp;&nbsp;号</div>
                <div class="rf">{{data.mobile}}<span @click="modify" class="menu jian"></span></div>
            </div>
            <div class="item">
                <div class="lf">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</div>
                <div class="rf">{{data.email}}<span @click="modify" class="menu jian"></span></div>
            </div>
            <div class="item">
                <div class="lf" style="border:none">
                    账户余额
                </div>
                <div class="rf" style="border:none">{{Centerwallet}}</div>
            </div>
            <p class="main"></p>
            <div class="item">
                <div class="lf">
                    注册时间
                </div>
                <div class="rf">{{data.reg_date}}</div>
            </div>
            <div class="item">
                <div class="lf" style="border:none">
                    上次登录时间
                </div>
                <div class="rf" style="border:none">{{data.login_time}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                data:{}
            }
        },
        computed: {
            Centerwallet() {
                return this.$store.state.Centerwallet;//url 链接地址
            },
            jrg() {
                return this.$store.state.jrg;
            }
        },
        mounted:function(){
            this.user()
        },
        methods: {
            modify:function () {
                this.$router.push({path:'/Account_center/member/mymodify'});
            },
            user:function(){
                var vm = this;
                this.$getuserinfo(vm.jrg+'User/getUserInfo',vm);
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import '../../public/public.less';
.myvip{
    position: fixed;
    top:1.78rem;
    left:0;
    right:0;
    bottom:0;
    width:100%;
    .wrapper{
        width:100%;
        margin: 0 auto;
        min-height:100%;
        font-size:0;
        padding-bottom: 6rem;
        background: #e6e6e6;
        .item{
            width:100%;
            padding:0 0.3rem;
            height: 0.7rem;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            font-size:0;
            background: #fff;
            .lf{
                width:45%;
            }
            #stat{
                span{
                    display: inline-block;
                    width:0.3rem;
                    margin-top: 0.2rem;
                    background: url('./img/star.png') no-repeat;
                    background-size: 100% 100%;
                    height: 0.3rem;
                }
            }
            .rf, .lf{
                height: 0.7rem;
                line-height: 0.7rem;
                font-size:@font;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                border-bottom: 1px solid #e6e6e6;
            }
            .rf{
                width:55%;
                text-align: right;
                /*opacity: 0.5;*/
                color:@form;
                font-size:@font1;
                padding-right: 0.51rem;
                position: relative;
                .menu{
                    position: absolute;
                    right:0;
                    top:0.1rem;
                    width:0.5rem;
                    height: 0.5rem;
                }
                .jian{
                    background: url('./img/jian.png') no-repeat;
                    background-size: 100% 100%;
                }
            }

        }
        .head{
            width:100%;
            height: 0.4rem;
            background: #e6e6e6;
        }
        .main{
            height: 0.8rem;
            width:100%;
        }
    }
}
</style>