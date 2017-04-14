/**
 * Created by Administrator on 2017/4/12.
 */
export default{
    install(Vue,options){
        Vue.prototype.$getReChargeInfo =function(e,u,c){// 获取存款记录
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
                        $('.my_deposit').empty();
                        c.total_amount = false;
                        var text='<tr style="border:none"><td style="text-align: center;border:none" colspan="4">没有符合条件的记录...</td></tr>';
                        $('.my_deposit').append(text);
                    }else if(data[0].cnt != 0){
                        $('.my_deposit').empty();
                        c.total_amount = true;
                        for(var i=1;i<data.length;i++){
                            var text= '<tr><td>' +c.$time(data[i].order_time.time)+ '</td><td>' + data[i].order_amount + '</td><td>' + data[i].pay_type + '</td><td>' + data[i].trade_status + '</td></tr>';
                            $('.my_deposit').append(text)
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