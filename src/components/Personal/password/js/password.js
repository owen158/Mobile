/**
 * Created by Administrator on 2017/4/12.
 */
export default{
    install(Vue,options){
        Vue.prototype.$myloginpasword=function(t,f,c,p){//密码验证
            var text,name = /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i;
            t.blur(function(){
                text ='';
                if(name.test(t.val())){
                    c.$store.commit('incrPromptbox',text);
                    t.next().removeClass('cuo').addClass('dui');
                    f.removeClass('boxError');
                }else if(t.val() =="" ||  p.val() ==""){
                    if(t.val() ==""){
                        f.removeClass('boxsucess').addClass('boxError');
                        t.next().removeClass('dui').addClass('cuo');
                        text = "请输入新密码.";
                        c.$store.commit('incrPromptbox',text);
                        t.val("");
                    }else{
                        f.removeClass('boxsucess').addClass('boxError');
                        t.next().removeClass('dui').addClass('cuo');
                        text = "请输入旧密码.";
                        c.$store.commit('incrPromptbox',text);
                    }
                }else{
                    f.removeClass('boxsucess');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "密码必须为6-15位的数字和字母的组合";
                    c.$store.commit('incrPromptbox',text);
                    t.val("");
                }
            })
        };
        Vue.prototype.$modifypasword=function(t,f,c,p){//确认密码
            var text;
            // name = /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i;
            t.blur(function(){
                text = "";
                if(t.val() == p.val() && t.val() != "" && p.val() !=""){
                    c.$store.commit('incrPromptbox',text);
                    t.next().removeClass('cuo').addClass('dui');
                    f.removeClass('boxError').addClass('boxsucess');
                }else if(t.val() != p.val()){
                    f.removeClass('boxsucess').addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "新密码和确认密码不一致，请重新输入";
                    c.$store.commit('incrPromptbox',text);
                    t.val("");
                    p.val("");
                }else{
                    f.removeClass('boxsucess').addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "验证不通过重新新输入";
                    c.$store.commit('incrPromptbox',text);
                    t.val("");
                    p.val("");
                }
            })
        }
        Vue.prototype.$modifylogin = function(e,u,c){//修改登录密码
            $.ajax({
                type:"post",
                xhrFields:{withCredentials:true},
                url:u,
                data:e,
                cache:false,
                success: function (data) {
                    if(data.msg == "success"){
                        c.$store.commit('incrrefresh',false);
                        c.text= "修改成功 点击关闭按钮";
                        $('#login_password').val("");
                        $('#new_password').val("");
                        $('#modify_password').val('');
                        $('#login_password').next().removeClass('dui');
                        $('#new_password').next().removeClass('dui');
                        $('#modify_password').next().removeClass('dui');
                        c.$store.commit('incrClosepoptext',c.text);
                        c.$store.commit('incrClosepop',true);
                    }else{
                        c.$store.commit('incrrefresh',false);
                        c.text=data.msg;
                        c.$store.commit('incrClosepoptext',c.text);
                        c.$store.commit('incrClosepop',true);
                    }
                },
                error:function(){
                    c.$store.commit('incrrefresh',false);
                    c.text='..网络异常';
                    c.$store.commit('incrClosepoptext',c.text);
                    c.$store.commit('incrClosepop',true);

                }
            })
        };
        Vue.prototype.$changeQkpwd = function(e,u,c){//修改取款密码
            $.ajax({
                type:"post",
                xhrFields:{withCredentials:true},
                url:u,
                data:e,
                cache:false,
                success: function (data) {
                    if(data.msg == "success"){
                        c.$store.commit('incrrefresh',false);
                        c.text= "修改成功 点击关闭按钮";
                        c.$store.commit('incrClosepoptext',c.text);
                        c.$store.commit('incrClosepop',true);
                    }else{
                        c.$store.commit('incrrefresh',false);
                        c.text=data.msg;
                        c.$store.commit('incrClosepoptext',c.text);
                        c.$store.commit('incrClosepop',true);
                    }
                },
                error:function(){
                    c.$store.commit('incrrefresh',false);
                    c.text='网络异常;';
                    c.$store.commit('incrClosepoptext',c.text);
                    c.$store.commit('incrClosepop',true);
                }
            })
        }
    }}