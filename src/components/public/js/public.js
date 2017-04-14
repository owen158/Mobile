/**
 * Created by Administrator on 2017/4/10.
 */
export default{
    install(Vue,options){
        Vue.prototype.$Appchecklogin=function(e,u,c){//  App.vue 主页面检查登录状态
            $.ajax({
                type:"post",
                async : false,
                xhrFields:{withCredentials:true},
                url:u,
                success: function (data) {
                    if(data.msg == "faild"){
                        console.log("没登录");
                        c.$store.commit('incrlogin',false);
                        c.$store.commit('incrCenterwallet',"");
                        c.$store.commit('incrUsername',"");
                    }else if(data.msg == "islogin"){
                        console.log("已登录");
                        c.$store.commit('incrlogin',true);
                        c.$store.commit('incrCenterwallet',data.balance);
                        c.$store.commit('incrUsername',data.userName)
                    }else if(data.msg == "success"){
                        console.log('登录成功');
                        c.$store.commit('incrlogin',true);
                        c.$store.commit('incrCenterwallet',data.balance);
                        c.$store.commit('incrUsername',data.userName)
                    }
                },
                error:function () {
                    c.$store.commit('incrlogin',false);
                    alert("网络异常");
                }
            })
        };
        Vue.prototype.$franttime=function(time) {
            var date,Y ,M,D,h,m,s
            date = new Date(time);
            Y = date.getFullYear() + '-';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            D = date.getDate() + ' ';
            h = (date.getHours()<10? '0'+ date.getHours():date.getHours())+ ':';
            m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':';
            s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds());
            var fommat_time = Y + M + D + h + m + s;
            return fommat_time;
        };
        Vue.prototype.$time=function(time) {
            var date,Y ,M,D,h,m,s
            date = new Date(time);
            Y = date.getFullYear() + '-';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            D = date.getDate() + ' ';
            // h = (date.getHours()<10? '0'+ date.getHours():date.getHours())+ ':';
            // m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':';
            // s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds());
            var fommat_time = Y + M + D
            // + h + m + s;
            return fommat_time;
        }
        Vue.prototype.$toDecimal = function (x) {
            var f = parseFloat(x);
            if (isNaN(f)) {
                return;
            }
            f = Math.round(x*100)/100;
            return f;
        }
    }}