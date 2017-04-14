/**
 * Created by Administrator on 2017/4/10.
 */
export default{
    install(Vue,options){
        Vue.prototype.$registerusername=function(t,f,c){//用户名验证
            var text,name =/^[a-zA-Z0-9]{5,15}$/;
            t.blur(function(){
                text = "";
                if(name.test(t.val())){
                    c.$store.commit('incrPromptbox',text)
                    t.next().removeClass('cuo').addClass('dui');
                    f.removeClass('boxError').addClass('boxsucess');
                }else{
                    f.removeClass('boxsucess').addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "请正确输入用户名 . 5-16个字母、或数字"
                    c.$store.commit('incrPromptbox',text)
                    t.val("");
                }
            })
        }
        Vue.prototype.$registertel=function(t,f,c){//手机号码
            var text,name = /^1[3|4|5|7|8][0-9]{9}$/;
            t.blur(function(){
                text='';
                if(name.test(t.val())){
                    text = "";
                    c.$store.commit('incrPromptbox',text)
                    t.next().removeClass('cuo').addClass('dui');
                    f.removeClass('boxError').addClass('boxsucess');
                }else{
                    f.removeClass('boxsucess').addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "正确填写手机号码."
                    c.$store.commit('incrPromptbox',text)
                    t.val("");
                }
            })
        }
        Vue.prototype.$registerpasword=function(t,f,c,p){//密码验证
            var text,name = /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i;
            t.blur(function(){
                text='';
                if(name.test(t.val()) && t.val() != p.val()){
                    c.$store.commit('incrPromptbox',text)
                    t.next().removeClass('cuo').addClass('dui');
                    f.removeClass('boxError').addClass('boxsucess');
                }else if(t.val() == p.val()){
                    f.removeClass('boxsucess').addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "请重新输入，密码和账户名验证不通过.";
                    c.$store.commit('incrPromptbox',text);
                    t.val("");
                    p.val('');
                }else{
                    f.removeClass('boxsucess').addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "密码必须为6-15位的数字和字母的组合"
                    c.$store.commit('incrPromptbox',text)
                    t.val("");
                }
            })
        };
        Vue.prototype.$registerP_Rpasword=function(t,f,c,p){//确认密码
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
                    text = "密码和确认密码不一致，请重新输入";
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
        Vue.prototype.$registertikuan=function(t,f,c,p){//提款密码
            var text,name = /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i;
            t.blur(function(){
                text = "";
                if(name.test(t.val()) && t.val() != p.val()){
                    c.$store.commit('incrPromptbox',text)
                    t.next().removeClass('cuo').addClass('dui');
                    f.removeClass('boxError').addClass('boxsucess');
                }else if(t.val() == p.val()){
                    f.removeClass('boxsucess').addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "请从新输入，登录密码不能和提款密码一样."
                    c.$store.commit('incrPromptbox',text)
                    t.val("");
                }else{
                    f.removeClass('boxsucess').addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "密码必须为6-15位的数字和字母的组合."
                    c.$store.commit('incrPromptbox',text)
                    t.val("");
                }
            })
        }
        Vue.prototype.$registerqr=function(t,f,c,p){//确认提款密码
            var text;
            // name = /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i;
            t.blur(function(){
                text = ""
                if(t.val() == p.val() && t.val() != "" && p.val() !=""){
                    c.$store.commit('incrPromptbox',text);
                    t.next().removeClass('cuo').addClass('dui');
                    f.removeClass('boxError').addClass('boxsucess');
                }else if(t.val() == "" && p.val()=="" ){
                    f.removeClass('boxsucess').addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "请输入提款密码"
                    c.$store.commit('incrPromptbox',text)
                    t.val("");
                    p.val("");
                }else{
                    f.removeClass('boxsucess').addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "提款密码不一致，请从新输入"
                    c.$store.commit('incrPromptbox',text)
                    t.val("");
                    p.val("");
                }
            })
        }
        Vue.prototype.$registercode=function(t,f,c){
            var text,name = /^[0-9]{4}$/;
            t.blur(function(){
                text = "";
                if(name.test(t.val())){
                    c.$store.commit('incrPromptbox',text)
                    t.next().removeClass('cuo').addClass('dui');
                    f.removeClass('boxError').addClass('boxsucess');
                }else{
                    f.removeClass('boxsucess').addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "验证不通过，请正确填写验证码"
                    c.$store.commit('incrPromptbox',text)
                    t.val("");
                }
            })
        }
        Vue.prototype.$register=function(e,u,c,l,o){//注册 登录
            $.ajax({
                type:"post",
                xhrFields:{withCredentials:true},
                url:u,
                data:e,
                cache:false,
                dateType:'json',
                success:function(data){
                    var msg=data.msg;
                    switch (msg) {
                        case '001':
                            c.$store.commit('incrrefresh',false);
                            c.text ='用户名为空';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '002':
                            c.$store.commit('incrrefresh',false);
                            c.text ='用户名格式不正确';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '003':
                            c.$store.commit('incrrefresh',false);
                            c.text ='手机号为空';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '004':
                            c.$store.commit('incrrefresh',false);
                            c.text ='手机号不正确';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '005':
                            c.$store.commit('incrrefresh',false);
                            c.text ='密码为空';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '006':
                            c.$store.commit('incrrefresh',false);
                            c.text ='确认密码为空';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '007':
                            c.$store.commit('incrrefresh',false);
                            c.text ='两次密码不一致';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '008':
                            c.$store.commit('incrrefresh',false);
                            c.text ='密码格式不正确';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '009':
                            c.$store.commit('incrrefresh',false);
                            c.text ='账号已存在';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '010':
                            c.$store.commit('incrrefresh',false);
                            c.text ='reguuid为空; 用户名已存在、请从新注册...';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '011':
                            c.$store.commit('incrrefresh',false);
                            c.text ='图片验证码为空...';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '012':
                            c.$store.commit('incrrefresh',false);
                            c.text ='图片验证码错误..';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '013':
                            c.$store.commit('incrrefresh',false);
                            c.text ='取款密码为空.';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '014':
                            c.$store.commit('incrrefresh',false);
                            c.text ='确认取款密码为空.';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '015':
                            c.$store.commit('incrrefresh',false);
                            c.text ='两次取款密码不一致.';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '016':
                            c.$store.commit('incrrefresh',false);
                            c.text ='取款密码格式不正确.';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case '017':
                            c.$store.commit('incrrefresh',false);
                            c.text ='取款密码不能与登录密码相同.';
                            c.$store.commit('incrClosepoptext',c.text);
                            c.$store.commit('incrClosepop',true);
                            c.change_Img();
                            break;
                        case 'success':
                            $.ajax({
                                type:"post",
                                xhrFields:{withCredentials:true},
                                url:o,
                                data:l,
                                cache:false,
                                success: function(data){
                                    if(data.status == 'ok'){
                                        c.$store.commit('incrrefresh',false);
                                        localStorage.token = data.userKey;
                                        alert("注册成功，并登录");
                                        window.location.href = "/"
                                    }
                                }
                            });
                            break;
                        case 'error':
                            c.$store.commit('incrrefresh',false);
                            alert("网络.异常");
                            c.change_Img();
                            // window.location.href='/home/login'
                            c.$router.push({path:'/register'});
                            break;
                    }
                },
                error:function (){
                    c.$store.commit('incrrefresh',false);
                    alert("网络异常.");
                    c.change_Img();
                    c.$router.push({path:'/register'})
                }
            })
        }
}}