/**
 * Created by Administrator on 2017/3/14.
 */
var head={};
head.fix=function(){
    var html=document.documentElement;
    var ww=window.innerWidth;
    html.style.fontSize=ww/7.5+"px";
}
head.fix();
window.onresize=function(){
    head.fix();
}
var mobile_src="/XPJ/";
function owen(Habanero) {
    $(".game_a").empty();
    $(".game_b").empty();
    $(".game_c").empty();
    var Keyname,G_img_src,title,gameType,model,i,text;
    var Slot_Game_a=Habanero.Slot_Game;
    var Slot_Game_b=Habanero.Table_Game;
    var Slot_Game_c=Habanero.Video_Poker;
    for(i=0;i < Slot_Game_a.length;i++){
         Keyname = Slot_Game_a[i].Keyname;
          G_img_src = Slot_Game_a[i].src;
          title = Slot_Game_a[i].title;
         model='real';
        gameType="HABA";
        text ='<a href="javascript:void(0)" data-MoL="'+model+'" data-Gy="'+gameType+'" data-index="'+Keyname+'">'+'<img src='+G_img_src+'>'+'<p>'+title+'</p>'+'</a>';
        $('.game_a').append(text);
    }
    for(i=0;i < Slot_Game_b.length;i++){
        Keyname = Slot_Game_b[i].Keyname;
        G_img_src = Slot_Game_b[i].src;
        title = Slot_Game_b[i].title;
        model='real';
        gameType="HABA";

        text ='<a href="javascript:void(0)" data-MoL="'+model+'" data-Gy="'+gameType+'" data-index="'+Keyname+'">'+'<img src='+G_img_src+'>'+'<p>'+title+'</p>'+'</a>';
        $('.game_b').append(text);
    }
    for(i=0;i < Slot_Game_c.length;i++){
         Keyname = Slot_Game_c[i].Keyname;
         G_img_src = Slot_Game_c[i].src;
         title = Slot_Game_c[i].title;
         model='real';
        gameType="HABA";
        text ='<a href="javascript:void(0)" data-MoL="'+model+'" data-Gy="'+gameType+'" data-index="'+Keyname+'">'+'<img src='+G_img_src+'>'+'<p>'+title+'</p>'+'</a>';
        $('.game_c').append(text);
    }
    $("#G_shut a").on("click",function () {
        gameType = $(this).attr("data-Gy");
        model = $(this).attr("data-MoL");
        Keyname = $(this).attr("data-index");
        $.ajax({
            type:"get",
            xhrFields:{withCredentials:true},
            data:{gameType:gameType,gameID:Keyname,model:model},
            url:"http://192.168.0.7:8080/XPJ/User/forwardGame",
            cache: false,
            success: function (data) {
                if(data.msg == "error"){
                    alert("维护中，请稍后...");
                }else if(data.type == "link"){
                    window.location.href = data.msg;
                }
            },
            error:function () {
                alert("维护中、敬请期待...");

            }
        });
    })
}
(function () {
    owen(Habanero);
})()
