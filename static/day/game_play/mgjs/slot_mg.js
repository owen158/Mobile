var mobile_src="/XPJ/";
function MG_GAME(gatory) {
	$('#als-wrapper').empty();
	for (var i = 0; i < gatory.length ; i++) {
		var img_url = gatory[i].src;
			id = gatory[i].GameID;
			title = gatory[i].title;
		  	gameType = "MG";
			model = 'real';
		var module_html = '<a href="javascript:void(0)" data-MoL="'+model+'" data-Gy="'+gameType+'" data-index="'+id+'">'+'<li class="als-item">'+'<img src='+img_url+'><p>'+title+'<p/></li>'+
					'</a>';	
			$('#als-wrapper').append(module_html);
	}
    $('#als-wrapper a img').on("click",function () {
		var Id=$(this).parent().parent().attr("data-index");
		var Gy=$(this).parent().parent().attr("data-Gy");
		var MoL=$(this).parent().parent().attr("data-MoL");
        var L_data = {
            gameType:Gy,
            gameID:Id,
            model:MoL
        };
        $.ajax({
            type:"get",
            data:L_data,
            xhrFields:{withCredentials:true},
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
        })
    })
}
$(function  () {
	MG_GAME(gamelist.bonus_slot);
});


	

	

