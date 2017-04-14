/**
 * Created by Administrator on 2017/4/10.
 */
export default{
    install(Vue,options){
        Vue.prototype.$loginusername=function(t,f,c){//用户名
            var text,name =/^[a-zA-Z0-9]{5,15}$/;
            t.blur(function(){
                text = "";
                c.$store.commit('incrPromptbox',text);
                if(name.test(t.val())){
                    text = ""
                    c.$store.commit('incrPromptbox',text);
                    f.removeClass('boxError');
                    t.next().removeClass('cuo').addClass('dui');
                }else{
                    f.addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "验证不通过，请正确填写用户名";
                    c.$store.commit('incrPromptbox',text);
                    t.val("");
                }
            })
        }
        Vue.prototype.$logincode=function(t,f,c){
            var text,name = /^[0-9]{4}$/;
            t.blur(function(){
                text = "";
                c.$store.commit('incrPromptbox',text);
                if(name.test(t.val())){
                    text = "";
                    c.$store.commit('incrPromptbox',text);
                    t.next().removeClass('cuo').addClass('dui');
                    f.removeClass('boxError');
                }else{
                    f.addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "验证不通过，请正确填写验证码";
                    c.$store.commit('incrPromptbox',text);
                    t.val("");
                }
            })
        }
        Vue.prototype.$loginpasword=function(t,f,c){
            var text,name = /^[a-zA-Z0-9]{5,15}$/;
            t.blur(function(){
                c.$store.commit('incrPromptbox',text);
                if(name.test(t.val())){
                    text = ""
                    c.$store.commit('incrPromptbox',text)
                    f.removeClass('boxError');
                    t.next().removeClass('cuo').addClass('dui');
                }else{
                    f.addClass('boxError');
                    t.next().removeClass('dui').addClass('cuo');
                    text = "密码必须为6-15位的数字和字母的组合"
                    c.$store.commit('incrPromptbox',text)
                    t.val("");
                }
            })
        }
        Vue.prototype.$logo = function (e,u,c) {// 登陆验证
            $.ajax({
                type:"post",
                url:u,
                xhrFields:{withCredentials:true},
                data:e,
                cache:false,
                dateType:'json',
                success: function(data){
                    if(data.status == 'ok'){
                        c.$store.commit('incrrefresh',false);
                        localStorage.token = data.userKey;
                        window.location.href='/'
                        // vm.$router.push({path:'/'})
                    }else if(data.status == "faild"){
                        c.$store.commit('incrrefresh',false);
                        alert(data.errmsg);
                        c.changeImg();
                        c.$router.push({path:'/login'})
                        // window.location.href='/login'
                    }
                },
                error:function () {
                    c.$store.commit('incrrefresh',false);
                    c.changeImg()
                    alert('登录失败')
                }
            })
        }
    }}