/**
 * Created by Administrator on 2017/4/11.
 */
export default{
    install(Vue,options){
        Vue.prototype.$getUserCard = function(e,u,c){//获取银行卡列表
            $.ajax({
                type:"post",
                url:u,
                xhrFields:{withCredentials:true},
                // data:e,
                cache:false,
                success: function(data){
                    if(data.length < 5){
                        c.addcard = true;
                        c.more=false;
                    }else if(data.length == 5){
                        c.addcard = false;
                        c.more=true;
                    }
                    c.$store.commit('incrcardBank',data);
                },
                error:function () {
                    alert('网络异常');
                }
            })
        };
        Vue.prototype.$addUserCard= function(e,u,c){//添加银行卡
            $.ajax({
                type:"post",
                data:e,
                xhrFields:{withCredentials:true},
                url:u,
                cache: false,
                success: function (data) {
                    if(data.msg == 'success'){
                        alert("添加成功");
                        c.$store.commit('incrrefresh',false);
                        c.$router.push({path:'/Account_center/card/cardinformation'});
                    }else{
                        alert(data.msg);
                        c.$store.commit('incrrefresh',false);
                    }
                },
                error:function () {
                    c.$store.commit('incrrefresh',false);
                    alert('网络异常');

                }
            })
        };
        Vue.prototype.$delete=function(e,u,c){ //删除银行卡
            $.ajax({
                type:"post",
                url:u,
                xhrFields:{withCredentials:true},
                data:e,
                cache:false,
                success: function(data){
                    if(data.msg == "success"){
                        alert('成功');
                        c.confirm = false;
                        c.$store.commit('incrrefresh',false);
                        c.anexaminatio();
                    }else{
                        c.$store.commit('incrrefresh',false);
                        alert(data.msg);
                        c.confirm = false;
                    }
                },
                error:function () {
                    c.$store.commit('incrrefresh',false);
                    alert('网络异常...');
                    c.confirm = false;
                }
            })
        };
        Vue.prototype.$cardnumber=function(t,f,c){// 银行验证 卡号
            var text,name = /^[0-9]{16,19}$/;
            t.blur(function() {
                text = "";
                c.$store.commit('incrPromptbox',text);
                if(name.test(t.val())){
                    text = "";
                    c.$store.commit('incrPromptbox',text);
                    f.removeClass('boxError');
                    t.next().removeClass('cuo').addClass('dui');
                }else{
                    f.addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "验证不通过，请填写数字，范围在16~19位之间！";
                    c.$store.commit('incrPromptbox',text);
                    t.val("");
                }
            });
        };
        Vue.prototype.$carduser=function(t,f,c){//银行验证用户名
            var text,name = /^[\u4e00-\u9fa5]{2,7}$/;
            t.blur(function() {
                text = "";
                c.$store.commit('incrPromptbox',text);
                if(name.test(t.val())){
                    text = "";
                    c.$store.commit('incrPromptbox',text);
                    f.removeClass('boxError');
                    t.next().removeClass('cuo').addClass('dui');
                }else{
                    f.addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "验证不通过,请填写中文，范围在2~7位之间";
                    c.$store.commit('incrPromptbox',text);
                    t.val("");
                }
            });
        };
        Vue.prototype.$province=function(t,f,c){// 银行  开户支行
            var text,name=/^[\u4e00-\u9fa5A-Za-z0-9_-]{2,20}$/;
            t.blur(function() {
                text = "";
                c.$store.commit('incrPromptbox',text);
                if(name.test(t.val())){
                    text = "";
                    c.$store.commit('incrPromptbox',text);
                    f.removeClass('boxError');
                    t.next().removeClass('cuo').addClass('dui');
                }else{
                    f.addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "请正确填写开户支行地址";
                    c.$store.commit('incrPromptbox',text);
                    t.val("");
                }
            });
        };
        Vue.prototype.$cardpassword=function(t,f,c){//密码验证
            var text,name=/^[A-Za-z0-9]{5,16}$/;
            t.blur(function() {
                text = "";
                c.$store.commit('incrPromptbox',text);
                if(name.test(t.val())){
                    text = "";
                    c.$store.commit('incrPromptbox',text);
                    f.removeClass('boxError');
                    t.next().removeClass('cuo').addClass('dui');
                }else{
                    f.addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "密码验证错误，请从新输入";
                    c.$store.commit('incrPromptbox',text);
                    t.val("");
                }
            });
        };
        Vue.prototype.$cardmoney=function(t,f,c){//银行 金额验证
            var text;
            t.blur(function() {
                text = "";
                c.$store.commit('incrPromptbox',text);
                if(c.$toDecimal(t.val()) >=100 && c.$toDecimal(t.val()) <= 500000 ){
                    text = "";
                    c.$store.commit('incrPromptbox',text);
                    f.removeClass('boxError');
                    t.next().removeClass('cuo').addClass('dui');
                }else if(t.val() < 100 ){
                    f.addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "提款金额不能小于100";
                    c.$store.commit('incrPromptbox',text);
                    t.val("");
                }else if(t.val() > 500000 ){
                    f.addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "提款金额不能大于50万";
                    c.$store.commit('incrPromptbox',text);
                    t.val("");
                }else{
                    t.next().removeClass('dui').addClass('cuo');
                    text = "请输入金额.";
                    c.$store.commit('incrPromptbox',text);
                }
            });
        };
        Vue.prototype.$WithDraw=function(e,u,c){
            $.ajax({
                type:"post",
                url:u,
                xhrFields:{withCredentials:true},
                data:e,
                cache:false,
                success: function(data){
                    if(data.msg == "success"){
                        c.$store.commit('incrrefresh',false);
                        c.text ="申请成功，请稍后";
                        c.$store.commit('incrClosepoptext',c.text);
                        c.$store.commit('incrClosepop',true);
                    }else{
                        c.$store.commit('incrrefresh',false);
                        c.text = data.msg;
                        c.$store.commit('incrClosepoptext',c.text);
                        c.$store.commit('incrClosepop',true);
                    }
                },
                error:function () {
                    c.$store.commit('incrrefresh',false);
                    alert('网络异常');
                }
            })
        }

}}