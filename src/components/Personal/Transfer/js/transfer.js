/**
 * Created by Administrator on 2017/4/12.
 */
export default{
    install(Vue,options){
        Vue.prototype.$getTransferinfo = function(e,u,c) {//获取转账信息
            $.ajax({
                type:"post",
                xhrFields:{withCredentials:true},
                data:e,
                url:u,
                success:function (data) {
                    c.$store.commit('incrrefresh',false);
                    c.total =data[0].total;
                    c.page = Math.ceil(data[0].cnt/c.pageSize);
                    data.length > 1 ?  c.total_amount = true : c.total_amount = false;
                    c.page > 1 ?  c.pagination = true : c.pagination = false;
                    if(data[0].cnt <= 0){
                        $('.transfertbody').empty();
                        var text='<tr style="border:none"><td style="text-align: center;border:none" colspan="6">没有符合条件的记录...</td></tr>';
                        $('.transfertbody').append(text);
                    }else if(data[0].cnt != 0){
                        $('.transfertbody').empty();
                        for(var i=1;i<data.length;i++){
                            var text= '<tr><td>' +c.$time(data[i].t_time.time)+ '</td><td>' + data[i].t_money + '</td><td>' + data[i].new_money + '</td><td>' + data[i].old_money + '</td><td>' + data[i].type + '</td><td>' + data[i].t_type + '</td></tr>';
                            $('.transfertbody').append(text)
                        }
                    }

                },
                error:function () {
                    c.$store.commit('incrrefresh',false);
                    alert('查询失败，请稍后重试...')
                }
            })
        }
    }}