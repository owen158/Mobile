/**
 * Created by Administrator on 2017/4/10.
 */
export default{
    install(Vue,options){
        Vue.prototype.$logout=function(u,c){//退出游戏
            $.ajax({
                type:"post",
                xhrFields:{withCredentials:true},
                url:u,
                success: function (data) {
                    if(data.msg == undefined){
                        c.$store.commit('incrrefresh',false);
                        c.$store.commit('login',false);
                        // c.$router.push({path:'/'});
                        window.location.href='/'
                    }else{
                        c.$store.commit('incrrefresh',false);
                        c.$store.commit('login',false);
                        window.location.href='/';
                        // c.$router.push({path:'/'});
                    }
                },
                error:function () {
                    alert('网络异常');
                    c.$store.commit('incrrefresh',false);
                    c.$store.commit('login',false);
                    window.location.href='/';
                    // c.$router.push({path:'/'});
                }
            })
        };
        Vue.prototype.$Refresh = function(e,u,c){//刷新中心钱包余额显示
            $.ajax({
                type:"post",
                xhrFields:{withCredentials:true},
                url:u,
                success: function (data) {
                    c.$store.commit('incrrefresh',false);
                    c.$store.commit('incrCenterwallet',data.balance);
                },
                error:function() {
                    c.$store.commit('incrrefresh',false);
                    alert("网络异常");
                }
            })
        }
    }}