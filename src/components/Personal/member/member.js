/**
 * Created by Administrator on 2017/4/11.
 */
export default{
    install(Vue,options){
        Vue.prototype.$getuserinfo= function(u,c){
            $.ajax({
                type:"post",
                url:u,
                xhrFields:{withCredentials:true},
                // data:e,
                cache:false,
                success: function(data){
                    if(data.email == ""){
                        data.email ="暂无"
                    }
                    for(var i = 0; i<data.vip_level;i++){
                        var tex = '<span class="img"></span> ';
                        $('#stat').append(tex);
                    }
                    data.login_time = c.$franttime(data.login_time.time);
                    data.reg_date = c.$franttime(data.reg_date.time);
                    c.data = data;
                },
                error:function () {
                    alert('网.络.异常');
                }
            })
        }
}}