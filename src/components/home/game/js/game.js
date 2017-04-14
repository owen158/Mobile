/**
 * Created by Administrator on 2017/4/10.
 */
export default{
    install(Vue,options){
        Vue.prototype.$getBalanceHome=function(e,u,c) {//查询当前游戏余额
            $.ajax({
                type:"post",
                xhrFields:{withCredentials:true},
                data:e,
                url:u,
                success:function (data) {
                    if(!isNaN(data.balance)){
                        data.balance = parseInt(data.balance)
                    }
                    c.$store.commit('incrrefresh',false);
                    c.$store.commit('incrGamebalance',data.balance)
                },
                error:function () {
                    c.$store.commit('incrrefresh',false);
                    alert('网络异常')
                }
            })
        }
        Vue.prototype.$forwardGame=function(e,u,c){//进入游戏
            $.ajax({
                type:"post",
                data:e,
                xhrFields:{withCredentials:true},
                url:u,
                cache: false,
                success: function (data) {
                    if(data.msg == "error"){
                        c.$store.commit('incrrefresh',false);
                        c.$store.commit('increxamination',true);
                    }else if(data.msg =='process'){
                        c.$store.commit('incrrefresh',false);
                        c.$store.commit('increxamination',true);
                    }else if(data.msg != "error"){
                        c.$store.commit('incrrefresh',false);
                        c.$store.commit('increxamination',false);
                        c.children=data.msg;
                    }
                },
                error:function () {
                    c.$store.commit('incrrefresh',false);
                    c.$store.commit('increxamination',false);
                    c.$store.commit('incrdetailShow',false);
                    alert('网络异常');
                    // window.location.href='/'
                }
            })
        }
    }}