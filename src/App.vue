<template>
  <div id="app">
    <div class="wrapper">
      <router-view></router-view>
    </div>
    <footer class="footer">
      <div class='item'>
        <router-link to="/">
          <span class="sup"><img src="./assets/home.png" alt=""></span>
          <span class="sub">首页</span>
        </router-link>
      </div>
      <div id="judgment" class='item'>
        <router-link to="/access">
          <span class="sup"><img src="./assets/money.png" alt=""></span>
          <span class="sub">存取款</span>
        </router-link>
      </div>
      <div class='item'>
        <router-link to="/customer">
          <span class="sup"><img src="./assets/kefu.png" alt=""></span>
          <span class="sub">客服</span>
        </router-link>
      </div>
      <div id="myjudgment" class='item'>
        <router-link to="/personal">
          <span class="sup"><img src="./assets/me.png" alt=""></span>
          <span class="sub">我的</span>
        </router-link>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
    computed: {
        login() {
            return this.$store.state.login;
        },
        jrg() {
            return this.$store.state.jrg;
        },
        Centerwallet() {
            return this.$store.state.Centerwallet;
        },
        Username() {
            return this.$store.state.Username;
        }
    },
    mounted:function() {
        this.checklogin();
    },
    methods:{
        checklogin:function(){//登录状态查询
            var vm=this;
            var time = setTimeout(function () {
                window.location='/';
            },0);

            vm.$Appchecklogin({},this.jrg+"checklogin.do",vm);
            vm.$store.commit('incrrefresh',false);
            $('.item').on('click',function () {
                $(this).children().children().css('color','#e3881c');
                $(this).siblings().children().children().css('color','#fff')
            });
            $('#judgment').on('click',function () {
                if(vm.login == true){
                    vm.$router.push({path:'/access'});
                }else if(vm.login == false){
                    vm.$router.push({path:'/login'});
                }
            });
            $('#myjudgment').on('click',function () {
                if(vm.login == true){
                    vm.$router.push({path:'/personal'});
                }else if(vm.login == false){
                    vm.$router.push({path:'/login'});
                }
            });
            clearTimeout(time);
        }
    },
    created() {
    },
    components: {
    }
}
</script>

<style lang="less">
  @import './components/public/public.less';
  #app{
    width:100%;
  }
  .footer{
    position: fixed;
    display: block;
    bottom:0;
    left:0;
    z-index: 100;
    height: 0.88rem;
    width:100%;
    font-size:0;
    .item{
      display: inline-block;
      width:25%;
      height:0.88rem;
      background: #000;
      span{
        display:block;
        width:100%;
        height:0.5rem;
        img{
          width:100%
        }
      }
      a{
        display: block;
        height: 0.88rem;
        font-weight: 100;
        color:#FFF;
        span{
          display: inline-block;
          width:100%;
        }
      .sup{
        text-align: center;
        height: 0.44rem;

        img{
          margin-top: 0.04rem;
          width:0.4rem;
        }
      }
      .sub{
        height: 0.44rem;
        line-height: 0.44rem;
        font-weight: 100;
        text-align: center;
        font-size:@font;
        color:#c9cacb;
      }
      }
    }
  }
</style>
