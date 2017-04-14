/**
 * Created by Administrator on 2017/4/12.
 */
export default{
    install(Vue,options){
        Vue.prototype.$getBalance=function(e,u,c,o) {//刷新全部游戏余额
            $.ajax({
                type:"post",
                xhrFields:{withCredentials:true},
                data:e,
                url:u,
                success:function (data) {
                    c.$store.commit('incrrefresh',false);
                    if(!isNaN(data.balance)){
                        data.balance = parseInt(data.balance)
                    }
                    if(data.balance == "维护中"){
                        o.css('color','red')
                    }else{
                        o.css('color','#e3881c')
                    }
                    o.html(data.balance);
                },
                error:function () {
                    c.$store.commit('incrrefresh',false);
                    alert('网络异常')
                }
            })
        };
        Vue.prototype.$getBalanceBytype=function(e,u,c,o){//g根据type查询当前游戏余额
            $.ajax({
                type:"post",
                xhrFields:{withCredentials:true},
                data:e,
                url:u,
                success:function (data) {
                    if(!isNaN(data.balance)){
                        data.balance = parseInt(data.balance)
                    }
                    if(data.balance == "维护中"){
                        o.css('color','red')
                    }else{
                        o.css('color','#e3881c')
                    }
                    c.$store.commit('incrrefresh',false);
                    o.html(data.balance)
                },
                error:function () {
                    c.$store.commit('incrrefresh',false);
                    alert('网络异常')
                }
            })
        };
        Vue.prototype.$transferTo=function(e,u,c,o){ //转账到游戏
            $.ajax({
                type: "post",
                url: c.jrg + 'User/getToken',
                async: true,
                data: {userKey: o},
                xhrFields: {withCredentials: true},
                success: function(data){
                    c.tokenuuid = data.msg;
                    e.uuid = c.tokenuuid;
                    $.ajax({
                        type:'post',
                        url:u,
                        data:e,
                        async:true,
                        cache:false,
                        xhrFields: {withCredentials: true},
                        success:function(d_ata){
                            var msg = d_ata.msg;
                            switch (msg) {
                                case '01':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "转账平台错误";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case '02':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "转账金额错误";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case '03':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "验证失败 请重新登录";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case '04':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "图形验证码错误";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case '05':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "转账未完成,请稍后再试";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case '06':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "余额不足";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case '07':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "钱包查询出错";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case 'error':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "系统错误,请稍后再试";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case 'success':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "转账成功";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case 'process':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "维护中";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                            }
                        },
                        error:function(){
                            c.$store.commit('incrrefresh',false);
                            c.text = "网络异常!";
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change()
                        }
                    })
                }
            })
        };
        Vue.prototype.$TransferFrom=function(e,u,c,o){//转账到平台
            $.ajax({
                type: "post",
                url: c.jrg + 'User/getToken',
                async: true,
                data: {userKey: o},
                xhrFields: {withCredentials: true},
                success: function(data){
                    c.tokenuuid = data.msg;
                    e.uuid = c.tokenuuid;
                    $.ajax({
                        type:'post',
                        url:u,
                        data:e,
                        async:true,
                        cache:false,
                        xhrFields: {withCredentials: true},
                        success:function(d_ata){
                            var msg = d_ata.msg;
                            switch (msg) {
                                case '01':
                                    c.$store.commit('incrrefresh',false);
                                    c.change();
                                    c.text = "转账平台错误";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    break;
                                case '02':
                                    c.text = "转账金额错误";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case '03':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "验证失败，请重新登录";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case '04':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "图形验证码错误";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case '05':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "转账未完成,请稍后再试";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case '06':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "余额不足";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case '07':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "钱包查询出错";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case 'error':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "系统错误,请稍后再试";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case 'success':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "转账成功";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                                case 'process':
                                    c.$store.commit('incrrefresh',false);
                                    c.text = "维护中";
                                    c.$store.commit('incrClosepoptext',c.text);
                                    c.$store.commit('incrClosepop',true);
                                    c.change();
                                    break;
                            }
                        },
                        error:function(){
                            c.$store.commit('incrrefresh',false);
                            c.text = "网络异常";
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change();
                        }
                    })
                }
            })
        }
    }}