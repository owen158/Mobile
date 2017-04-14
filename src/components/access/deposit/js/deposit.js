/**
 * Created by Administrator on 2017/4/11.
 */
export default{
    install(Vue,options){
        Vue.prototype.$deposit = function(e,u,c) { //存款链接
            $.ajax({
                type:"post",
                xhrFields:{withCredentials:true},
                data:e,
                url:u,
                success:function (data) {
                    console.log(data);
                    if(data.msg  == 'error'){
                        c.$store.commit('incrrefresh',false);
                        c.text = data.msg;
                        c.$store.commit('incrClosepoptext',this.text);
                        c.$store.commit('incrClosepop',true);
                    }else{
                        c.$store.commit('incrrefresh',false);
                        c.$store.commit('incrClosepop',false);
                        window.location = data.msg;
                    }
                },
                error:function () {
                    c.$store.commit('incrrefresh',false);
                    alert('查询失败，请稍后重试...')
                }
            })
        }
    }}