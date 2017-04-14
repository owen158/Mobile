/**
 * Created by Administrator on 2017/4/12.
 */
export default{
    install(Vue,options){
        Vue.prototype.$getWithDrawInfo=function(e,u,c){//获取提款记录
            $.ajax({
                type:"post",
                url:u,
                xhrFields:{withCredentials:true},
                data:e,
                cache:false,
                success: function(data){
                    c.$store.commit('incrrefresh',false);
                    c.total = data[0].total;
                    c.page = Math.ceil(data[0].cnt/c.pageSize);
                    data.length > 1 ?  c.total_amount = true : c.total_amount = false;
                    c.page > 1 ?  c.pagination = true : c.pagination = false;
                    if(data[0].cnt <= 0){
                        c.total_amount = false;
                        var text='<tr style="border:none"><td style="text-align: center;border:none" colspan="4">没有符合条件的记录...</td></tr>';
                        $('.my_withtbody').append(text);
                    }else if(data[0].cnt != 0){
                        for(var i=1;i<data.length;i++){
                            var text= '<tr><td>' +c.$time(data[i].add_time.time)+ '</td><td>' + data[i].card_num + '</td><td>' + data[i].amount + '</td><td>' + data[i].status + '</td></tr>';
                            $('.my_withtbody').append(text)
                        }
                    }


                },
                error:function () {
                    c.$store.commit('incrrefresh',false);
                    alert('.网络异常.');
                }
            })
        }
    }}