
var common = {};
common.iscroll = null; //预留主体滚动区域
//加载函数
common.session = null; //用变量模拟登录session
common.sessionusername = null; //用变量模拟username
common.sessionbank = null; //用变量模拟bank
common.ajax = function(url, fn) {
        $.ajax({
            "url": url,
            "type": "GET",
            "async": false,
            "cache": false,
            "beforeSend": function() {
                $(".wait").show(); //加载过程中出现
            },
            "success": function(data) {
                if (typeof fn == "function") {
                    fn(); //执行success后的回调函数
                    $(".wait").hide();
                } else {
                    console.log("fn不是函数类型")
                }
            },
            "error": function(e) {
                $(".wait").hide();
                console.log("ajax错误 错误信息是" + e);
            }
        })
    }
    //自动执行函数 禁止滚动 无需调用


common.move = (function() {
    $(document).on("touchmove", function(e) {
        e.preventDefault();
    })
    new FastClick(document.body)
})();
// 魔板填充函数
common.tmp = function(container, tmp, fn) {
        $(".wait").show();
        var container1 = $(container);
        var tmp1 = $(tmp).html();
        container1.html(tmp1);
        $(".wait").hide();
        if (typeof fn == "function") {
            fn(); //回调该模块的exec函数
        }
        common.refresh();
    }
    //让主体内容跟着滚动
common.wrapper = function() {
    common.iscroll = new IScroll(".wrapper", { "tap": true, "click": true }); //开始滚动区域
}
common.wrapper();
//当有新增内容插入重新渲染 目前预留 随时准备调用
common.refresh = function() {
        $("img").each(function() {
            var This = $(this);
            This.on("load", function() {
                common.iscroll.refresh();
            })

        })
        common.iscroll.refresh();
    }
    //进来后预先加载首页模块
    //点击遮罩 清空容器
common.overlay = (function() {
        $("body").on("touchstart", ".overlay", function(e) {
            e.preventDefault();
            var This = $(this)
            This.parent().html("")
        })
    })()
    //点击下部分的navbar


// 公共部分js结束  开始注册js逻辑
var register = {};
register.chinese = /[\u4E00-\u9FA5]/i; //中文验证
register.special = /["'<>%;)(&+]/; //特殊字符
register.tel = /^1[34578]\d{9}$/; //手机号码
//准备等待验证的
register.check = {
        "username": false,
        "pwd": false,
        "spwd": false,
        "tel": false
    }
    // 统一执行函数
register.exec = function() {
    register.input();
};
var my = {};
var mobile_src="/XPJ/";
var g_userkey='';
var g_name ="";
var g_money="";
var title;
Function.prototype.method = function (name,fn) {
    this.prototype[name] = fn;
    return this;
};

var obile =function (eT,url) {
    this.name = eT.name;//用户名
    this.pwd = eT.pwd;//密码
    this.Tpwd = eT.Tpwd;//确认密码
    this.code = eT.code;//验证码
    this.Reg = eT.Reg;//token
    this.mob = eT.mob;//手机号
    this.savelogin = eT.savelogin;
    this.url = url;
    this.gameTe = eT.gameTe;//gameType
    this.gameI = eT.gameI;//gameID
    this.M_odel = eT.M_odel;//model
};
var content;

//*****************      检测登录状态    **************************
$(window).ready(
    $.ajax({
        type:"get",
        async : false,
        xhrFields:{withCredentials:true},
        url:mobile_src+"checklogin.do",
        success: function (data) {
            content = $('#tname').html()
            if(data.msg == "faild"){
                $("body").on("click", ".index_tap", function() {
                    common.tmp(".deposite", ".tmp_login", login.exec);
                    return false; //阻止冒泡
                })
            }else if(data.msg == "islogin"){
                changeImg_zc();
                console.log('账户已在别处登录');
                common.tmp(".deposite", ".tmp_login", login.exec)
            }else if(data.msg == "success"){
                $('#tname').html(data.userName);
                $('#z_money').html(data.balance);
                // my.exec = function() {
                //
                // };
                $("body").on("click", ".index_tap", function() {
                        common.tmp(".deposite", ".tmp_deposite");
                        $('#tname').html(data.userName);
                        $('#z_money').html(data.balance);
                        title = $(this).find("p").html(); //获得title
                        var G_key = $(this).find("img").parent().attr("data-index");//获取游戏金额
                        var gamenum = $(this).find("img").parent().attr("data-Id");//gameId
                        var Mole = $(this).find("img").parent().attr("data-Mo");//model 参数
                        $('#deposite_title').html(title);
                        var L_img = $(this).find("img").parent().attr("data-index");//gameType
                        if(L_img != "PT" && L_img != "MG" && L_img != "HABA"){
                            var loaddy = new obile({gameTe:L_img,gameI:gamenum,M_odel:Mole},mobile_src+'User/forwardGame');
                            loaddy.forGme();
                        }else if(L_img == "PT"){
                            $('.deposite_submit').on("click",function () {
                                window.location.href = mobile_src+"Mobile/game/slot_PT.html";
                            })
                        }else if(L_img == "MG"){
                            $('.deposite_submit').on("click",function () {
                                location.href = mobile_src+"Mobile/game_play/slot_mg.html";
                            })
                        }else if(L_img == "HABA"){
                            $('.deposite_submit').on("click",function () {
                                location.href = mobile_src+"Mobile/game_Haba/game_haba.html";
                            })
                        }
                    var text = $("<p id='G_shut'></p>").text("× 关闭窗口");
                    $('.deposite_container').append(text);
                    $("#G_shut").css({
                        "position": "absolute",
                        "top":'1%',
                        "right":'1%',
                        "font-size":16+"px",
                        "color":'red'
                    });
                    $("#G_shut").on("click",function () {
                        $(this).parent().parent().html("");
                    });
                    var Tran = new obile({name:G_key},mobile_src+"User/getBalance");
                    Tran.Balance();
                    // common.tmp(".deposite", ".tmp_deposite")

                    // return false
                    });
            }
        },
        error:function () {
            changeImg_zc();
            $("body").on("click", ".index_tap", function() {
                common.tmp(".deposite", ".tmp_login", login.exec);
                // return false; //阻止冒泡
            })
        }
    })
);
console.log(content);
// index.tap = function() {
//     $("body").on("click", ".index_tap", function() {
//         title = $(this).find("p").html(); //获得title
//         var gamenum ="";
//         var Mole ="";
//         var L_img = $(this).find("img").parent().attr("data-index");
//         gamenum = $(this).find("img").parent().attr("data-Id");
//         Mole = $(this).find("img").parent().attr("data-Mo");
//         if(L_img == undefined){
//             L_img = "";
//         }
//         if(Mole == undefined){
//             Mole = "";
//         }
//
//         if (common.session) {
//             //通过session判断是否登录
//             common.tmp(".deposite", ".tmp_deposite"); //登录后加载转账模块
//             // var che_login = new obile({},mobile_src+'checklogin.do');
//             // che_login.chekgin();
//         } else {
//             // 加载登录魔板
//             common.tmp(".deposite", ".tmp_login", login.exec);
//         }
//         return false; //阻止冒泡
//     })
//
// }
// index.tap();
//*****************      转账到平台    **************************
obile.method("TransferFrom",function () {
    $.ajax({
        type:"get",
        xhrFields:{withCredentials:true},
        data:{},
        url:this.url,
        cache:false,
        success:function () {

        },
        error:function () {

        }
    })
});
// var Trans = new obile({gameTe:L_img,gameI:gamenum,M_odel:Mole},mobile_src+'User/TransferFrom');
// Trans.TransferFrom();
//*****************      转账到平台    **************************

//*****************      检测登录状态    **************************

//***************** 用户注册 **************************
obile.method("Register",function () {
    var N_ame=this.name;
    var P_wd = this.pwd;
    var C_ode= this.code;
    $.ajax({
        type:"post",
        xhrFields:{withCredentials:true},
        url:this.url,
        data:{userName:this.name,mobileNo:this.mob,passWord:this.pwd,repassWord:this.Tpwd,reguuid:this.Reg,imgcode:this.code},
        cache:false,
        dateType:'json',
        success: function(data) {
            var msg=data.msg;
            switch (msg) {
                case '001':
                    alert('用户名为空');
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    changeImg_zc();
                    break;
                case '002':
                    alert('用户名格式不正确');
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    changeImg_zc();
                    break;
                case '003':
                    alert('手机号为空');
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    changeImg_zc();
                    break;
                case '004':
                    alert('手机号不正确');
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    changeImg_zc();
                    break;
                case '005':
                    changeImg_zc();
                    alert('密码为空');
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    break;
                case '006':
                    alert('确认密码为空');
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    changeImg_zc();
                    break;
                case '007':
                    alert('两次密码不一致');
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    changeImg_zc();
                    break;
                case '008':
                    alert('密码格式不正确');
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    changeImg_zc();
                    break;
                case '009':
                    alert('账号已存在');
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    changeImg_zc();
                    break;
                case '010':
                    alert('用户名已存在、请从新注册...');
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    changeImg_zc();
                    break;
                case '011':
                    changeImg_zc();
                    alert('图片验证码为空');
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    changeImg_zc();
                    break;
                case '012':
                    alert('图片验证码错误');
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    changeImg_zc();
                    break;
                case 'success':
                    $.ajax({
                        type:"post",
                        xhrFields:{withCredentials:true},
                        url:mobile_src+'login.do',
                        data:{tname:N_ame, tpwd :P_wd, imgcode : C_ode, savelogin: 1},
                        cache:false,
                        success: function(data){
                            if(data.status == 'ok'){
                                $(".wait").hide(); //等待条没了
                                g_name = data.userName;
                                g_money = data.balance;
                                $('#tname').html(g_name);
                                $('#z_money').html(g_money);
                                location.href = mobile_src+"Mobile/index.html";
                                console.log("注册成功，并登录");
                            }
                        }
                    });
                    break;
                case 'error':
                    alert("注册失败,用户名已存在,请从新注册...");
                    common.tmp(".deposite", ".tmp_login", register.exec);
                    changeImg_zc();
                    break;
            }
        },
        error:function () {
            alert("注册失败,用户名已存在,请从新注册");
            changeImg_zc();
            common.tmp(".deposite", ".tmp_login", register.exec);
        }
    });

});


//***************** 用户注册 **************************

//***************** 用户登录 **************************
obile.method("login_go",function () {
    $.ajax({
        type:"post",
        url:this.url,
        xhrFields:{withCredentials:true},
        data:{tname:this.name, tpwd : this.pwd, imgcode : this.code, savelogin: this.savelogin},
        cache:false,
        dateType:'json',
        success: function(data){
            if(data.status == 'ok'){
                $(".wait").hide(); //等待条没了
                // common.session = true; //模拟session 记录登录
                $(".deposite").html(""); //退出
                g_name = data.userName;
                g_money = data.balance;
                location.href = mobile_src+"Mobile/index.html";
                // changeImg();
            }else if(data.status == "faild"){
                alert(data.errmsg);
                changeImg();
            }
        },
        error:function () {
            console.log('登录失败')
        }
    })
});
//***************** 用户登录 **************************

//***************** 检查cookie,并自动登录 **************************
$(window).ready(
    $.ajax({
        type:"get",
        xhrFields:{withCredentials:true},
        url:mobile_src+"checkcookie.do",
        success: function (data) {
            if(data.msg == "faild"){
                console.log(" ");
            }else if(data.msg == "islogin"){
                console.log('1');
            }else if(data.msg == "success"){
                console.log(1+"登录成功....");
            }
        }
    })
);
//***************** 检查cookie,并自动登录 **************************

//***************** ZC成功之后跳转登录 **************************

//***************** ZC成功之后跳转登录 **************************

//**************** 检测登录状态 **********************
                                //未更新
//**************** 检测登录状态 **********************

//************ 根据平台类型获取余额 **********************
obile.method("Balance",function () {
  $.ajax({
      type:"get",
      xhrFields:{withCredentials:true},
      data:{BType:this.name},
      url:this.url,
      success:function (data) {
            $('#tname').html(data.userName);
            $('#money').html(data.balance);
      },
      error:function () {
          $('#money').html("更新数据...");
      }
  })
});
//************ 根据平台类型获取余额 **********************

// obile.method("chekgin",function () {
//     $.ajax({
//         type:'get',
//         url: this.url,
//         cache: false,
//         success:function (data) {
//             var data_msg = data.msg
//             switch (data_msg) {
//                 case 'faild':
//                     alert('未登录或登录信息失效');
//                     location
//                     $(".wait").hide()
//                     break;
//                 case 'outlogin':
//                     alert('账户已在别处登录');
//                     $(".wait").hide();
//                     break;
//                 case 'success':
//                     g_name = data.userName;
//                     g_money = data.balance;
//                     g_userkey = data.userKey;
//                     $(".wait").hide();
//                     $('#tname').html(g_name);
//                     // $("#money").html(g_money);
//                     $("#z_money").html(g_money);
//
//                     // var B_lan=new obile({gameTe:L_img},mobile_src+"User/getBalance");
//                     // B_lan.Balance();
//                     break;
//             }
//         }
//     })
// })

//*************** 获取游戏跳转连接 **********************
obile.method("forGme",function () {
    if(this.M_odel == undefined) {
        this.M_odel = "";
    }
    if(this.gameI == undefined){
        this.gameI = "";
    }
    var L_data = {
        gameType:this.gameTe,
        gameID:this.gameI,
        model:this.M_odel
    };
    $.ajax({
        type:"get",
        data:L_data,
        xhrFields:{withCredentials:true},
        url:this.url,
        cache: false,
        success: function (data) {
            if(data.msg == "error"){
                $(".deposite_container").css({"font-size":"16px",'text-align':'center'}).html("维护中、请稍后...");
            }else if(data.type =="from"){
                $('.deposite_submit').on("click",function () {
                    var url =data.msg;
                    $('#Plat_form').attr('action', url);
                    $('#Plat_form').submit();
                })
            }else if(data.type == "link"){
                $('.deposite_submit').on("click",function () {
                    window.location.href = data.msg;
                })
            }
        },
        error:function () {
            $(".deposite_container").css({"font-size":"16px",'text-align':'center'}).html("维护中、请稍后...");
        }
    })
})
//*************** 获取游戏跳转连接 **********************
function changeImg_zc() {
    var imgSrc = $("#imgObj_zc");
    var src = imgSrc.attr("src");
    imgSrc.attr("src", "../validateCode?timesp"+ (new Date()).valueOf());
}
//*************** 刷新验证码 **********************
function changeImg() {
    var imgSrc = $("#imgObj");
    var src = imgSrc.attr("src");
    imgSrc.attr("src", "../validateCode?timesp"+ (new Date()).valueOf());
}
//*************** 刷新验证码 **********************

register.input = function() {
    changeImg_zc();
        var regright = $(".register_right");
        var userinput = regright.find(".uname"); //用户名
        var pwdinput = regright.find(".pwd"); //密码
        var spwdinput = regright.find(".spwd"); //重复密码
        var telinput = regright.find(".tel"); //电话号码
        var code = regright.find(".code"); //验证码
        var submitdom = $(".register_submit"); //注册按钮
        var change = $(".register_change"); //修改为登录
        //输入用户名的时候逻辑
        userinput.on("input", function() {
                var This = $(this);
                var val = $.trim(This.val()); //获得username 的值
                if (register.chinese.test(val) || register.special.test(val)) {
                    //如果包含了汉字和特殊字符
                    $(".register_error").css("opacity", 1).html("用户名不包含中文和特殊字符");
                    register.check.username = false;
                } else if (val.length < 6 || val.length > 10) {
                    $(".register_error").css("opacity", 1).html("用户名长度必须在6-10位");
                    register.check.username = false;
                } else if (val.length >= 6 && val.length <= 10 && !register.chinese.test(val) && !register.special.test(val)) {
                    //这次都符合了
                    $(".register_error").css("opacity", 0);
                    register.check.username = true;
                }
            }) //用户名输入结束
            //输入密码逻辑 其实跟用户名一样
        console.log($(".my_zr"))
        pwdinput.on("input", function() {
                var This = $(this);
                var val = $.trim(This.val()); //获得username 的值
                if (register.chinese.test(val) || register.special.test(val)) {
                    //如果包含了汉字和特殊字符
                    $(".register_error").css("opacity", 1).html("密码不包含中文和特殊字符");
                    register.check.pwd = false;
                } else if (val.length < 6 || val.length > 10) {
                    $(".register_error").css("opacity", 1).html("密码长度必须在6-10位");
                    register.check.pwd = false;
                } else if (val.length >= 6 && val.length <= 10 && !register.chinese.test(val) && !register.special.test(val)) {
                    //这次都符合了
                    $(".register_error").css("opacity", 0);
                    register.check.pwd = true;
                }
            }) //密码输入结束
            //重复密码
        spwdinput.on("input", function() {
                var This = $(this);
                var sval = $.trim(pwdinput.val()); //新密码对比
                var val = $.trim(This.val()); //第二次密码
                if (val != sval) {
                    $(".register_error").css("opacity", 1).html("两次密码不一致");
                    register.check.spwd = false;
                } else {
                    //这次都相等了
                    $(".register_error").css("opacity", 0);
                    register.check.spwd = true;
                }
            })
            //输入手机号码
        telinput.on("input", function() {
            var This = $(this);
            var val = $.trim(This.val())
            if (register.tel.test(val)) {
                //手机号码对了
                $(".register_error").css("opacity", 0);
                register.check.tel = true;
            } else {
                $(".register_error").css("opacity", 1).html("手机号码不正确");
                register.check.tel = false;
            }
        });

        //这个时候点击注册
        submitdom.on("click", function(e) {
            console.log(userinput.val().length)
            var username = userinput.val();
            var mobileNo = telinput.val();
            var passWord = pwdinput.val();
            var repassWord = spwdinput.val();
            var imgcode = code.val();
            var token ="";
            if(username.length < 5 || username.length > 16 || passWord.length < 6 || passWord.length > 18) {
                if(username.length < 5){
                    changeImg_zc()
                    console.log("用户名不能低于6位");
                }else if(username.length >= 16){
                    changeImg_zc()
                    console.log("用户名不能大于16位");
                }else if(passWord.length <= 6){
                    changeImg_zc()
                    alert("密码不能低于6位");
                }else{
                    changeImg_zc()
                    alert("密码不能大于16位");
                }
            }else if(username == passWord){
                alert("账户、密码不能相等");
            }else{
                $.ajax({
                    type:'get',
                    xhrFields:{withCredentials:true},
                    url:mobile_src+'User/getToken',
                    cache:false,
                    success: function(data) {
                        token =data.msg;
                        var Reg = new obile({name:username,pwd:passWord,Tpwd:repassWord,mob:mobileNo,code:imgcode,Reg:token},mobile_src+'User/register');
                        Reg.Register();
                        $(".deposite").html("");
                    }
                });
            }
            // if (register.check.tel && register.check.spwd && register.check.pwd && register.check.username) {
                //所有验证都走通了
// ************* 注册 ****************** //



// ************* 注册 ****************** //
                // 进行登录喽 开车
                // console.log(userinput);
            //     $(".wait").show(); //出现等待条
            //     window.setTimeout(function() {
            //         $(".wait").hide(); //等待条没了
            //     }, 2000)
            //     common.session = true; //模拟session 记录登录
            //     $(".deposite").html(""); //退出
            //
            // } else {
            //     $(".register_error").css("opacity", 1).html("正确填写您的注册信息")
            // }
            e.preventDefault();

// ************* 注册 ****************** //



        });
        // 点击关闭函数
        register.close = (function() {
            $("body").on("touchstart", ".close", function(e) {
                e.preventDefault();
                var This = $(this);
                This.parent().html("");
            })
        })();
        // 切换函数
        register.change = (function() {
            $("body").on("touchstart", ".register_change", function(e) {
                e.preventDefault();
                common.tmp(".deposite", ".tmp_login", login.exec)
            })
        })()
    } //自动执行函数
    //点击关闭按钮


// 登录js逻辑开始
var login = {};
login.chinese = /[\u4E00-\u9FA5]/i; //中文验证
login.special = /["'<>%;)(&+]/; //特殊字符
//准备等待验证的
login.check = {
    "username": false,
    "pwd": false,
}
login.exec = function() {
    login.input();
};


login.input = function() {
        changeImg();
        var regright = $(".login_right");
        var userinput = regright.find(".uname"); //用户名
        var pwdinput = regright.find(".pwd"); //密码
        var spwdinput = regright.find(".spwd"); //重复密码
        var telinput = regright.find(".tel"); //电话号码
        var yzm = regright.find(".logo_code_yzm"); //验证码
        var submitdom = $(".login_submit"); //注册按钮
        var change = $(".login_change"); //修改为登录
        //输入用户名的时候逻辑

    console.log($(".my_zr"))
        userinput.on("input", function() {
                var This = $(this);
                var val = $.trim(This.val()); //获得username 的值
                if (login.chinese.test(val) || login.special.test(val)) {
                    //如果包含了汉字和特殊字符
                    $(".login_error").css("opacity", 1).html("用户名不包含中文和特殊字符");
                    login.check.username = false;
                } else if (val.length < 6 || val.length > 10) {
                    $(".login_error").css("opacity", 1).html("用户名长度必须在6-10位");
                    login.check.username = false;
                } else if (val.length >= 6 && val.length <= 10 && !login.chinese.test(val) && !login.special.test(val)) {
                    //这次都符合了
                    $(".login_error").css("opacity", 0);
                    login.check.username = true;
                }
            }) //用户名输入结束
            //输入密码逻辑 其实跟用户名一样
        pwdinput.on("input", function() {
                var This = $(this);
                var val = $.trim(This.val()); //获得username 的值
                if (login.chinese.test(val) || login.special.test(val)) {
                    //如果包含了汉字和特殊字符
                    $(".login_error").css("opacity", 1).html("密码不包含中文和特殊字符");
                    login.check.pwd = false;
                } else if (val.length < 6 || val.length > 10) {
                    $(".login_error").css("opacity", 1).html("密码长度必须在6-10位");
                    login.check.pwd = false;
                } else if (val.length >= 6 && val.length <= 10 && !login.chinese.test(val) && !login.special.test(val)) {
                    //这次都符合了
                    $(".login_error").css("opacity", 0);
                    login.check.pwd = true;
                }
            }) //密码输入结束
        //这个时候点击注册
        submitdom.on("click", function(e) {
            // if (login.check.pwd && login.check.username) {
                //所有验证都走通了
                // 进行登录喽 开车
                var b = new obile({name:userinput.val(),pwd:pwdinput.val(),code:$('.logo_code_yzm').val(),savelogin:1},mobile_src+'login.do')
                b.login_go();
                $(".wait").show(); //出现等待条
                window.setTimeout(function() {
                    $(".wait").hide(); //等待条没了
                }, 2000);
                // common.session = true; //模拟session 记录登录
                // $(".deposite").html(""); //退出
            // } else {
            //     $(".login_error").css("opacity", 1).html("正确填写您的登录信息")
            // }
            e.preventDefault();


        });
        //点击关闭按钮
        login.close = (function() {
            $("body").on("touchstart", ".close", function(e) {
                e.preventDefault();
                var This = $(this);
                This.parent().html("");
            })
        })();
        //修改状态
        login.change = (function() {
            $("body").on("click", ".login_change", function(e) {
                common.tmp(".deposite", ".tmp_register", register.exec);
                e.preventDefault();

            })
        })()
    } //自动执行函数

// 首页模块js逻辑开始

var index = {};
index.swiper1 = null; //banner轮播预留
//执行banner轮播
index.exec = function() {
    index.swiper(); //执行banner轮播
    index.resize();
    index.countwidth();
    index.scroller();

    $(".head").html("首页");
    $(".wait").show();
    window.setTimeout(function() {
        $(".wait").hide();
    }, 700)
}
index.swiper = function() {
    index.swiper1 = $(".index_swiper").swiper({
        "autoplay": 3000,
        "loop": true,
        pagination: ".dot",
        paginationClickable: true


    })
}

//当页面大小变化 重新渲染banner
index.resize = function() {
    $(window).resize(function() {
        index.swiper1.reInit();
    })
};

// 动态计算十字交互的宽度
index.countwidth = function() {
        var i = null;
        var num = $(".index_ten").length;
        for (i = 1; i <= num; i++) {
            var length = $(".index_scroller" + i).find(".index_tap").length;
            var width = $(".index_scroller" + i).find(".index_tap").outerWidth(true);
            var distance = width * length;
            $(".index_scroller" + i).css({
                "width": distance + "px"
            });
            $(".index_scroller" + i).find(".index_tap").last().css("margin-right", "0px");
        }
    }
    //十字交互区域
index.scroller = function() {
    changeImg_zc();
    console.log(changeImg_zc())
    var i = null;
        var num = $(".index_ten").length;
        console.log(num);
        for (i = 1; i <= num; i++) {
            new IScroll(".index_wrapper" + i, {
                "scrollX": true,
                "scrollY": false,
                "tap": true,
                "click": true
            });

        }



    } //end this function
    // 重新渲染 
    //点击圆圈的时候

// $(".deposite_title").innerHTML=title;

// 一进来就加载首页模块
// navbar第二个选项的魔板js
var second = {};
second.swiper = null;
second.num = /^[0-9]+$/; //正整数正则
second.exec = function() {
        $(".head").html("存取款")

        second.swiper1();

    }
    //点击最上面的选项卡
second.headtap = function() {
        //点击存款
        $("body").on("touchstart", ".second_left", function(e) {
            e.preventDefault();
            var This = $(this);
            This.addClass("second_active");
            This.siblings().removeClass("second_active");
            $(".second_ck").show();
            $(".second_quk").hide();
            $(".second_error").css("opacity", 0).html("")
        })
        $("body").on("touchstart", ".second_right", function(e) {
            e.preventDefault();
            var This = $(this);
            This.addClass("second_active");
            This.siblings().removeClass("second_active");
            $(".second_ck").hide();
            $(".second_quk").show();
            $(".second_error").css("opacity", 0).html("")
        })

    }
    // 点击存款的四个导航
second.navbar = function() {
        $("body").on("touchstart", ".second_float", function(e) {
            e.preventDefault();
            var This = $(this);
            This.addClass("second_floatactive"); //点击相应的导航变色
            This.siblings().removeClass("secon d_floatactive");
            var index = This.index();
            second.swiper.swipeTo(index)
        })
        $("body").on("click", ".second_service", function(e) {
            $(".wait").show();
            window.setTimeout(function() {
                $(".wait").hide();
            }, 2000)
            window.location.href = "https://f18.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=731516&configID=62710&jid=4083401009&s=1";
            e.preventDefault();
        })
    }
    //banner轮播区域
second.swiper1 = function() {
        second.swiper = $(".second_container1").swiper({
            "mode": "horizontal",
            "calculateHeight": true,
            "onSlideChangeStart": function() {
                var index = second.swiper.activeIndex;
                $(".second_float").eq(index).addClass("second_floatactive");
                $(".second_float").eq(index).siblings().removeClass("second_floatactive");
                //由于每个swiper的高度都不一样 
                // $(".second_show").hide();
                // common.refresh();
            }
        }); //end swiper
        $(window).on("resize", function() {
            second.swiper.reInit();
        })
    }
    //选择银行的时候 回填容器
second.bank = function() {
        $("body").on("change", ".second_bank", function() {
            var This = $(this);
            var val = This.val();
            This.next().val(val)
        })
    }
    // 验证表单信息
second.input = function() {
        $("body").on("input", ".second_container input", function() {
            var This = $(this);
            var val = This.val();
            var parent = This.parents(".swiper-slide");
            // 下一步判断一定是正整数才可以
            var numtrue = second.num.test(val) && val.indexOf("0") != 0;
            if (!numtrue || val == "0") {
                parent.find(".second_error").css("opacity", 1).html("请输入正整数金额")
            } else {
                parent.find(".second_error").css("opacity", 0).html("")
            }
        });
        //表单验证 取款的时候
        $("body").on("input", ".second_qukc input", function() {
            var This = $(this);
            var val = This.val();
            var parent = This.parents(".second_qukc");
            // 下一步判断一定是正整数才可以
            var numtrue = second.num.test(val) && val.indexOf("0") != 0;
            if (!numtrue || val == "0") {
                parent.find(".second_error").css("opacity", 1).html("请输入正整数金额");
            } else {
                parent.find(".second_error").css("opacity", 0).html("");
            }
        });
        //微信存款 点击提交后
        $("body").on("tap", ".wxsubmit", function(e) {
            var This = $(this);
            var parent = This.parents(".swiper-slide"); //获得父亲容器
            var input = parent.find("input.wxmoney").val(); //获得对应的值
            var true1 = parent.find(".second_error").css("opacity"); //如果为0 表示没有错误
            if (true1 == "0" && input) {

                // 如果没有错误信息并且val不为空
                $(".second_er").show();
            } else {
                $(".second_error").css("opacity", 1).html("请输入正整数");
            }
        });
        // 支付宝存款 提交
        $("body").on("click", ".zfsubmit", function(e) {
            var This = $(this);
            var parent = This.parents(".swiper-slide"); //获得父亲容器
            var input = parent.find("input").val(); //获得对应的值
            var true1 = parent.find(".second_error").css("opacity");
            if (true1 == "0" && input) {

                // 如果没有错误信息并且val不为空

            } else {
                $(".second_error").show().html("请输入正整数")
            }
            e.preventDefault();
        });
        // 在线支付
        $("body").on("click", ".onlinesubmit", function(e) {
            var This = $(this);
            var parent = This.parents(".swiper-slide"); //获得父亲容器
            var input = parent.find("input").val(); //获得对应的值
            var true1 = parent.find(".second_error").css("opacity");
            if (true1 == "0" && input) {

                // 如果没有错误信息并且val不为空

            } else {
                $(".second_error").css("opacity", 1).html("请输入正整数")
            }
            e.preventDefault();
        });
        // 人工出款
        $("body").on("click", ".personsubmit", function(e) {
            var This = $(this);
            var parent = This.parents(".swiper-slide"); //获得父亲容器
            var input = parent.find("input").val(); //获得对应的值
            var true1 = parent.find(".second_error").css("opacity");
            if (true1 == "0" && input) {

                // 如果没有错误信息并且val不为空

            } else {
                $(".second_error").css("opacity", 1).html("请输入正整数");
            }
            e.preventDefault();
        });
        //取款
        $("body").on("click", ".second_qksubmit", function(e) {
            var This = $(this);
            var parent = This.parents(".swiper-slide"); //获得父亲容器
            var input = parent.find("input").val(); //获得对应的值
            var true1 = parent.find(".second_error").css("opacity");
            if (true1 == "0" && input) {

                // 如果没有错误信息并且val不为空

            } else {
                $(".second_error").css("opacity", 1).html("请输入正整数")
            }
            e.preventDefault();
        });
        // 点击存款的关闭X
        $("body").on("touchstart", ".close1", function(e) {
            e.preventDefault();
            var This = $(this);
            $(".second_er").hide();
            $("input").val(""); //清空所有input标记
        });

    }
    // 点击人工存款 银行账户资料
second.see = function() {
        $("body").on("click", ".second_see", function(e) {

            $(".second_show").show();
            common.refresh();
            e.preventDefault();

        })
        $("body").on("touchstart", ".close2", function() {
            //点击second——show的close
            $(".second_show").hide();
        })
    }
    /////
second.bank();
second.input();
second.see();
second.headtap();
second.navbar();

// 我的模块开始
// var my = {};
// 我的模块执行函数
my.exec = function() {
    $(".head").html("我的");
    // $(window).ready(
    //     $.ajax({
    //         type:"get",
    //         url:mobile_src+"checklogin.do",
    //         success: function (data) {
    //            if(data.msg == "success"){
    //                     console.log($("#head"));
    //                     $("#head").html("退出登录");
    //
    //             }
    //         }
    //     })
    // );
}
    // 点击对应的列表 然后弹出相应的

my.navbar = function() {
        $("body").on("tap", ".my_list", function() {
                $(".my").show();
                var This = $(this);
                var dataurl = This.attr("data-url"); //获得对应的魔板名称
            $(".my_zr").on('click',function () {
                console.log(this)
            })
            $(".my_zc").on('click',function () {
                console.log(this)
            })
                var datasession = $.trim(This.attr("data-session")); //获取对应的session 如果为1 表示需要判断session
                 console.log(datasession);
                window.location.href=dataurl
                return false;

            }) //end click
    }
    //隐藏的select下拉框回填数据
my.select = function() {
    $("body").on("change", ".my_float select", function() {
        var This = $(this);
        var temp = This.attr("class");
        // var value = $.trim(This.val()); //获得select值
        // var span = This.parent().find("span"); //获得他的上面的span
        // span.html(value);
        // var a =document.createElement('select');
        // var _gamename=
        var ob =$('.my_zcc');
        var od =$('.my_zrr');
        console.log(ob.val());
        console.log(od.val());
        if(This.attr("class") == 'my_zcc'){
            console.log(This.val().indexOf('中心钱包') != -1)
            if(This.val().indexOf('中心钱包') != -1){
                od.val("中心钱包");
            }
        }else{
            od.val("中心钱包")
        }

        if(This.attr("class") == 'my_zrr'){

            if(This.val().indexOf('中心钱包') != -1){
                // od.val("中心钱包")
            }
        }
        // if(temp=="my_zr"){
        //     var checkzr = $(".my_zrspan").html().indexOf("中心钱包") != -1;
        //     if(checkzr){
        //         $('.my_zr').val("中心钱包")
        //         // $(".my_wallzc").attr("disabled", "disabled");
        //         // $(".my_zcwall").removeAttr("disabled");
        //         // $(".my_zcspan").html(_gamename);
        //         // $(".my_wallzc").removeAttr("selected");
        //         //$("#agsx").attr("selected","selected");
        //         console.log(11)
        //     }else{
        //         $('.my_zc').val("中心钱包")
        //         // $(".my_wallzc").removeAttr("disabled");
        //         // $(".my_zcwall").attr("disabled", "disabled");
        //         // $(".my_zcspan").html("中心钱包");
        //         // $(".my_wallzc").attr("selected","selected");
        //     }
        // }
    })
    //下面进行一个逻辑判断 如果转入这边是中心钱包 那么转出那边 就不可以有中心
    // $("body").on("change", ".my_zc", function() {
    //     var checkzr = $(".my_zrspan").html().indexOf("中心钱包") != -1;
    //     if (checkzr == true) {
    //         //转入有中心钱包
    //         $(".my_wallzc").attr("disabled", "disabled")
    //     } else {
    //         $(".my_wallzc").removeAttr("disabled")
    //     }
    //     //如果check存在 就表示有中心钱包
    //     // if ( ) {
    //
    //     // } else {
    //     //     $(".my_wallzc").show(); //自己的中心钱包那一项显示
    //     // }
    //
    // })
    // $("body").on("change", ".my_zr", function() {
    //         console.log(this);
    //     var checkzc = $(".my_zcspan").html().indexOf("中心钱包") != -1;
    //     if (checkzc == true) {
    //         $(".my_wallzr").attr("disabled", "disabled")
    //     } else {
    //         $(".my_wallzr").removeAttr("disabled")
    //     }
    //     //如果check存在 就表示有中心钱包
    //     // if () {
    //
    //     //     // 如果对面的是中心钱包
    //     //     $(".my_wallzr").hide(); //自己的中心钱包那一项去掉
    //     //     //  $(".my_zr").show();
    //     // } else {
    //     //     // 如果对方没有 就显示
    //
    //     //     $(".my_wallzr").show();
    //     // }
    //
    // })
}
my.money1 = function() {
        //用户点击中心钱包 就是刷新中心钱包
        $("body").on("touchstart", ".my_money", function() {
            var This = $(this);
            var money = This.find(".name"); //money数值
            var total = Math.floor(Math.random() * 10000);
            money.html(total);
        })
    }
    //一进来先加载首页  
    //接下来是用户的资料 会员信息
my.navbar(); //点击事件让他自己执行吧 要不然会出现多次重复
my.select(); //
my.money1();
var member = {};
$(".my_zr").on('click',function () {
    console.log(this)
})
$(".my_zc").on('click',function () {
    console.log(this)
})
member.chinese = /[\u4E00-\u9FA5]/i; //中文验证
member.special = /["'<>%;)(&+]/; //特殊字符
member.onlychinese = /^[\u2E80-\u9FFF]+$/;
member.num = new RegExp("^[0-9]*$"); //只能是数字
member.tel = /^1(3|4|5|7|8)\d{9}$/;
//准备等待验证的
member.check = {

        "username": false,
        "truename": false,
        "mobile": false,
        "qq":false,
        "wx":false
    }
    //暴露执行方法
member.exec = function() {
    if (common.sessionusername) {
        //如果已经修改过 锁死所有input
        $(".member_container input").each(function(index, value) {
            $(value).attr("disabled", "disabled");
        })
        $(".member_submit").hide(); //提交隐藏
        $(".member_hide").show(); //客服闪现
    }

}

member.input = function() {
        // 点击用户名的时候

        // $("body").on("input", "#member_username", function() {

        //         var This = $(this);
        //         var val = $.trim(This.val()); //获得value值

        //         if (val && !member.chinese.test(val) && !member.special.test(val)) {
        //             //如果有并且合格
        //             member.check.username = true;
        //             $(".member_error").css("opacity", "0").html("");
        //         } else {
        //             member.check.username = false;
        //             $(".member_error").css("opacity", "1").html("用户名不包含中文和特殊字符");
        //         }
        //     })
            //点击真实姓名的时候
        $("body").on("input", "#member_truename", function() {
            var This = $(this);
            var val = $.trim(This.val());
            if (val && member.onlychinese.test(val)) {
                //不为空只能是中文
                member.check.truename = true;
                $(".member_error").css("opacity", "0").html("");
            } else {
                member.check.truename = false;
                $(".member_error").css("opacity", "1").html("真实姓名必须是中文");
            }
        });
        // $("body").on("input", "#member_mobile", function() {
        //         var This = $(this);
        //         var val = $.trim(This.val()); //获得值
        //         if (member.tel.test(val) && val) {
        //             //如果是手机号码而且不为空
        //             member.check.mobile = true;
        //             $(".member_error").css("opacity", "0").html("")
        //         } else {
        //             member.check.mobile = false;
        //             $(".member_error").css("opacity", "1").html("请填写正确的手机号码")
        //         }
        //     })
            // 如果修改qq的时候
        $("body").on("input", "#member_qq", function() {
                var This = $(this);
                var value = $.trim(This.val()); //获得qq的值
                if (value && member.num.test(value)) {
                    //不为空而且是数字
                    member.check.qq = true;
                    $(".member_error").css("opacity", "0").html("")
                } else {
                    member.check.qq = false;
                    $(".member_error").css("opacity", "1").html("qq号码必须是数字");
                }
            })
            //修改微信号码的时候
        $("body").on("input", "#member_wx", function() {
            var This = $(this);
            var value = $.trim(This.val()); //获得qq的值
            if (value && !member.chinese.test(value) && !member.special.test(value)) {
                member.check.wx = true;
                $(".member_error").css("opacity", "0").html("")
            } //不为中文和特殊字符
            else {
                member.check.wx = false;
                $(".member_error").css("opacity", "1").html("微信号不还有中文和特殊字符");
            }
        })
        // $("body").on("click", ".member_submit", function(e) {
        //     if (member.check.qq && member.check.truename && member.check.wx) {
        //         //所有验证都走通了
        //         // 进行登录喽 开车
        //         $(".wait").show(); //出现等待条
        //         window.setTimeout(function() {
        //             $(".wait").hide(); //等待条没了
        //         }, 2000)
        //         common.sessionusername = true; //模拟session 记录登录
        //         $(".my").html("").hide(); //退出
        //         window.history.back(-1);
        //     } else {
        //         $(".member_error").css("opacity", 1).html("正确填写您的登录信息");
        //     }
        //
        // })

        //点击关闭按钮
       
        member.close = (function() {
            $("body").on("touchstart", ".close", function() {
                var This = $(this);
                This.parent().html("");
            })
        })();
        //修改状态

    } //自动执行函数
     member.input();
    // 银行
var bank = {};
bank.chinese = /[\u4E00-\u9FA5]/i; //中文验证
bank.special = /["'<>%;)(&+]/; //特殊字符
bank.onlychinese = /^[\u2E80-\u9FFF]+$/;
bank.num = new RegExp("^[0-9]*$"); //只能是数字
bank.tel = /^1(3|4|5|7|8)\d{9}$/;
bank.check = {
    "truename": false,
    "key": false
};
bank.exec = function() {
    //执行函数
    if (common.sessionbank) {
        //如果已经修改过 锁死所有input
        $(".bank_container input").each(function(index, value) {
            $(value).attr("disabled", "disabled");
        })
        $(".bank_submit").hide(); //提交隐藏
        $(".bank_hide").show(); //客服闪现
    }
}
bank.back = (function() {
        $("body").on("touchstart", ".arrow2", function() {
            var container = $(".my");
            var template = $(".tmp_bankshow").html();
            console.log(template)
            $(container).html(template);
            bankshow.exec();
            $(".my_zr").on('click',function () {
                console.log(this)
            })
            $(".my_zc").on('click',function () {
                console.log(this)
            })
        });
    })() //点击bank回退箭头
    //select框回填数据
bank.select = function() {

        $("body").on("change", ".bank_right select", function() {
            var This = $(this);
            var value = $.trim(This.val()); //value值
            This.prev().val(value); //获取上面的input回填
        })
    $(".my_zr").on('click',function () {
        console.log(this)
    })
    $(".my_zc").on('click',function () {
        console.log(this)
    })
    }
    // 真实姓名 填写账户姓名只能是中文
bank.truename = function() {
    $("body").on("input", "#bank_truename", function() {
        var This = $(this);
        var val = $.trim(This.val()); //获得value值
        if (val && bank.onlychinese.test(val)) {
            //都是中文
            $(".bank_error").css("opacity", "0").html("");
            bank.check.truename = true;
        } else {
            $(".bank_error").css("opacity", "1").html("账户姓名只能是中文");
            bank.check.truename = false;
        }
    })
}; //
bank.key = function() {
        $("body").on("input", "#bank_key", function() {
            var This = $(this);
            var value = $.trim(This.val()); //银行卡号值
            if (value && !bank.chinese.test(value) && !bank.special.test(value)) {
                bank.check.key = true;
                $(".bank_error").css("opacity", "0").html("");
            } else {
                bank.check.key = false;
                $(".bank_error").css("opacity", "1").html("银行卡号不含中文和特殊字符");
            }
        })
    } //end key
bank.submit = function() {
        $("body").on("click", ".bank_submit", function() {
                // 点击submit
                var bank_name = $.trim($("#bank_name").val()); //银行名称
                var bank_city = $.trim($("#bank_city").val()); //银行省份
                var bank_address = $.trim($("#bank_address").val()); //银行收获地址
                if (bank.check.truename && bank.check.key && bank_name && bank_city && bank_address) {
                    // 程序走通 登录走起
                    common.sessionbank = true; //用变量模拟bank
                    $(".bank_error").css("opacity", "0").html("");
                    window.history.back(-1);
                } else {
                    $(".bank_error").css("opacity", "1").html("请填写完整信息");
                }
            }) //点击submit
    } //点击submit
bank.select();
bank.truename();
bank.key();
bank.submit();
//密码修改修改密码 我的里面
var password = {};
password.check = {
    "repeat": false
}
password.exec = function() {

}

//重复密码的时候
password.repeat = function() {
    $("body").on("input", "#password_new", function() {
        var This = $(this);
        var value = $.trim(This.val()); //表单数值
        var compare = $.trim($("#password_old").val()); //旧密码
        if (value == compare) {
            // 旧密码等于新密码
            password.check.repeat = true;
            $(".password_error").css("opacity", "1").html("两次密码不一致");
        } else {
            $(".password_error").css("opacity", "1").html("两次密码不一致");
            password.check.repeat = false;
        }
    });
    $("body").on("click",".password_submit",function(){
        alert("修改密码成功");
        window.history.back(-1);
    })
}
password.repeat();
password.close = (function() {
    $("body").on("touchstart", ".close", function() {
        var This = $(this);
        This.parent().html("");
    })
})();
// 转账记录
var deposite_data = {};
deposite_data.scroller1 = null; //预留scroller
deposite_data.exec = function() {
        //执行函数
        deposite_data.scroller();
        deposite_data.refresh();
    }
    // 滚动启动
deposite_data.scroller = function() {
        //
        deposite_data.scroller1 = new IScroll(".deposite_data_container .wrapper", {
            probeType: 3,
            "tap": true,
            "click": true
        });
    }
    // 分段滚动区域
deposite_data.refresh = function() {
        deposite_data.scroller1.on("scrollEnd", function(e) {
            var maxy = this.maxScrollY
            var y = this.y;
            if (y <= maxy) {
                //滚动到底部了
                // 那么进行分段加载
                deposite_data.scroller1.refresh(); //动态dom加载后 会refresh重新渲染节点 这一点非常重要
            }
        })
    } //刷新
    // 点击关闭按钮
deposite_data.close = (function() {
    $("body").on("touchstart", ".close2", function() {
        var This = $(this);
        $(".my").html("");
    })
})();
//存款记录 
var ck_data = {};
ck_data.scroller1 = null; //预留scroller
ck_data.exec = function() {
        //执行函数
        ck_data.scroller();
        ck_data.refresh();
    }
    // 滚动启动
ck_data.scroller = function() {
        //
        ck_data.scroller1 = new IScroll(".ck_data_container .wrapper", {
            probeType: 3,
            "tap": true,
            "click": true
        });
    }
    // 分段滚动区域
ck_data.refresh = function() {
        ck_data.scroller1.on("scrollEnd", function(e) {
            var maxy = this.maxScrollY
            var y = this.y;
            if (y <= maxy) {
                //滚动到底部了
                // 那么进行分段加载
                ck_data.scroller1.refresh(); //动态dom加载后 会refresh重新渲染节点 这一点非常重要
            }
        })
    } //刷新
    // 点击关闭按钮
ck_data.close = (function() {
    $("body").on("touchstart", ".close2", function() {
        var This = $(this);
        $(".my").html("");
    })
})();
// 提款记录
var tk_data = {};
tk_data.scroller1 = null; //预留scroller
tk_data.exec = function() {
        //执行函数
        tk_data.scroller();
        tk_data.refresh();
    }
    // 滚动启动
tk_data.scroller = function() {
        //
        tk_data.scroller1 = new IScroll(".tk_data_container .wrapper", {
            probeType: 3,
            "tap": true,
            "click": true
        });
    }
    // 分段滚动区域
tk_data.refresh = function() {
        tk_data.scroller1.on("scrollEnd", function(e) {
            var maxy = this.maxScrollY
            var y = this.y;
            if (y <= maxy) {
                //滚动到底部了
                // 那么进行分段加载
                tk_data.scroller1.refresh(); //动态dom加载后 会refresh重新渲染节点 这一点非常重要
            }
        })
    } //刷新
    // 点击关闭按钮
tk_data.close = (function() {
    $("body").on("touchstart", ".close2", function() {
        var This = $(this);
        $(".my").html("");
    })
})();
//我的优惠
// 提款记录
var yh_data = {};
yh_data.scroller1 = null; //预留scroller
yh_data.exec = function() {
        //执行函数
        yh_data.scroller();
        yh_data.refresh();
    }
    // 滚动启动
yh_data.scroller = function() {
        //
        yh_data.scroller1 = new IScroll(".yh_data_container .wrapper", {
            probeType: 3,
            "tap": true,
            "click": true
        });
    }
    // 分段滚动区域
yh_data.refresh = function() {
        yh_data.scroller1.on("scrollEnd", function(e) {
            var maxy = this.maxScrollY
            var y = this.y;
            if (y <= maxy) {
                //滚动到底部了
                // 那么进行分段加载
                yh_data.scroller1.refresh(); //动态dom加载后 会refresh重新渲染节点 这一点非常重要
            }
        })
    } //刷新
    // 点击关闭按钮
yh_data.close = (function() {
    $("body").on("touchstart", ".close2", function() {
        var This = $(this);
        $(".my").html("");
    })
})();
//卡片式银行卡
var bankshow = {};
bankshow.scroller1 = null; //预留scroller
bankshow.exec = function() {
        //执行函数
        bankshow.scroller();
        bankshow.refresh();
    }
    // 滚动启动
bankshow.scroller = function() {
        //
        bankshow.scroller1 = new IScroll(".bankshow_container .wrapper", {
            probeType: 3,
            "tap": true,
            "click": true
        });
    }
    // 分段滚动区域
bankshow.refresh = function() {
        bankshow.scroller1.on("scrollEnd", function(e) {
            var maxy = this.maxScrollY
            var y = this.y;
            if (y <= maxy) {
                //滚动到底部了
                // 那么进行分段加载
                bankshow.scroller1.refresh(); //动态dom加载后 会refresh重新渲染节点 这一点非常重要
            }
        })
    } //刷新
    // 点击关闭按钮
bankshow.close = (function() {
    $("body").on("touchstart", ".close2", function() {
        var This = $(this);
        $(".my").html("");
    })
})();
// 银行卡点击删除
bankshow.delete = (function() {
        $("body").on("tap", ".cardnew .delete", function() {
            var This = $(this);
            var true1 = confirm("确定要删除这张银行卡么？");
            if (true1 == true) {
                alert("删除成功");
                This.parents(".cardnew").remove();
                bankshow.scroller1.refresh(); //remove掉后重新刷新
            }
        })
    })()
    // 银行卡点击修改
bankshow.modify = (function(){
        $("body").on("tap", ".cardnew .modify", function() {
            var This = $(this);
            var container = $(".my");
            var template = $(".tmp_bank").html();
            container.html(template);
            bank.exec();
        })
    })()
    //点击银行的bankshow模式 点击加号
bankshow.plus = (function() {
        $("body").on("touchstart", ".plus", function() {
            var container = $(".my");
            var template = $.trim($(".tmp_bank").html());
            container.html(template); //回填末班
            bank.exec();
        });
    })()
    //我的优惠
var benefit = {};
benefit.exec = function() {

    }
    //点击优惠的内容
benefit.clickshow = function() {
    $("body").on("click", ".benefit_container .text img", function() {
        var This = $(this);
        var title = $.trim(This.attr("data-title")); //获得title的值
        var container = $(".showbenefit"); //获得深入优惠的容器
        var tmp = $(".tmp_showbenefit").html(); //魔板
        container.html(tmp); //回填魔板
        showbenefit.exec(); //执行回填魔板
    })
}
benefit.clickshow();
//展示优惠的内容
var showbenefit = {};
showbenefit.scroller1 = null; //预留scroller
showbenefit.exec = function() {
    showbenefit.scroller();

}

showbenefit.scroller = function() {
        showbenefit.scroller1 = new IScroll(".showbenefit_container .wrapper")
    }
    //点击关闭按钮
showbenefit.close = function() {
    $("body").on("click", ".showbenefit_container .close3", function() {
        $(".showbenefit").html("")
    })

}
showbenefit.close();

    // 公共部分点击脚步
common.navbar = (function() {
    // $("body").on("touchstart", ".navbar", function() {
    //     $(".second_show").hide();
    //     var This = $(this);
    //     This.siblings().removeClass("active");
    //     This.addClass("active");
    //     // 图标显示激活 然后ui变化 与后端业务逻辑无关u

    // })

})();
// // 实现路由
// var routers = {
//     "/index": function() {
//         $(".second_show").hide();
//         $(".my").html("")
//         common.tmp(".scroller", ".tmp_index", index.exec)
//         $(".navbar").eq(0).addClass("active");
//         $(".navbar").eq(0).siblings().removeClass("active")

//     },
//     "/second": function() {
//         $(".second_show").hide();
//         $(".my").html("")
//         common.tmp(".scroller", ".tmp_second", second.exec)
//         $(".navbar").eq(1).addClass("active");
//         $(".navbar").eq(1).siblings().removeClass("active")
//     },
//     "/my": function() {
//         $(".second_show").hide();
//         $(".my").html("")
//         common.tmp(".scroller", ".tmp_my", my.exec)
//         $(".navbar").eq(3).addClass("active");
//         $(".navbar").eq(3).siblings().removeClass("active")
//     }
// }
// var router = Router(routers);
// router.init();
$("body").on("touchstart",".arrow1",function(){
    window.history.back(-1);
})
var app = new Xroute();
app.get("/index", function(req,next) {
    $(".second_show").hide();
    $(".my").html("")
    common.tmp(".scroller", ".tmp_index", index.exec)
    $(".navbar").eq(0).addClass("active");
    $(".navbar").eq(0).siblings().removeClass("active")
    
})
app.get("/second", function(req,next) {
    $(".second_show").hide();
    $(".my").html("")
    common.tmp(".scroller", ".tmp_second", second.exec)
    $(".navbar").eq(1).addClass("active");
    $(".navbar").eq(1).siblings().removeClass("active")
    
})

// function dJ1(){
//
// }

// function dJ2(){
//     var key = document.getElementById('my_zc').options[window.document.getElementById("my_zr").selectedIndex].text;
//     key = key.indexOf('中心钱包') != -1
//     console.log(key)
//     if(key == true){
//         document.getElementById("my_zr").selectedIndex =0;
//     }else{
//         document.getElementById("my_zr").selectedIndex =8
//     }
// }
console.log($('#tname').text())
app.get("/my", function(req,next) {
    // var a=document.getElementById("tname")
    $(".second_show").hide();
    $(".my").html("")
    common.tmp(".scroller", ".tmp_my", my.exec)
    $(".navbar").eq(3).addClass("active");
    $(".navbar").eq(3).siblings().removeClass("active");
    $('#my_zr').on('click',function () {
        var key = document.getElementById('my_zr').options[window.document.getElementById("my_zr").selectedIndex].text;
        key = key.indexOf('中心钱包') != -1
        console.log(key);
        if(key == true){
            document.getElementById("my_zc").selectedIndex =0;
        }else{
            document.getElementById("my_zc").selectedIndex =8
        }
    });

    $('#my_zc').on("click",function () {
        alert("hello");
        var key = document.getElementById('my_zc').options[window.document.getElementById("my_zr").selectedIndex].text;
        key = key.indexOf('中心钱包') != -1
        console.log(key)
        // if(key == true){
        //     document.getElementById("my_zr").selectedIndex =0;
        // }else{
        //     document.getElementById("my_zr").selectedIndex =8
        // }
    });
    $(window).ready(
        $.ajax({
            type:"get",
            xhrFields:{withCredentials:true},
            url:mobile_src+"checklogin.do",
            success: function (data) {
                if(data.msg == "success"){

                    $('#z_money').html(data.balance);
                    $('#tname').html(data.userName);
                    $("#head").html("退出登录");
                    $("#head").on("click",function () {
                        //***************** 退出登录 **************************
                        $.ajax({
                            type:"get",
                            xhrFields:{withCredentials:true},
                            url:mobile_src+"logout.do",
                            success: function (data) {
                                if(data.msg == undefined){
                                    location.href = mobile_src+"Mobile/index.html"
                                }else{
                                    location.href = mobile_src+"Mobile/index.html"
                                }
                            }
                        })
                        //***************** 退出登录 **************************
                    });

                }else if(data.msg == "faild"){
                    common.tmp(".deposite", ".tmp_login", login.exec);
                    return false;
                }else if(data.msg == 'outlogin'){
                    common.tmp(".deposite", ".tmp_login", login.exec);
                    return false;
                }
            }
        })
    );
})
app.get("/tmp_member", function(req,next) {
    $(".second_show").hide();
    var container=$(".my");
    container.show();
    var tmp=$(".tmp_member").html();
    container.html(tmp);
    member.exec();
})
app.get("/tmp_password", function(req,next) {
    $(".second_show").hide();
    var container=$(".my");
    container.show();
    var tmp=$(".tmp_password").html();
    container.html(tmp);
    password.exec();
})
app.get("/tmp_bankshow", function(req,next) {
    $(".second_show").hide();
    var container=$(".my");
    container.show();
    var tmp=$(".tmp_bankshow").html();
    container.html(tmp);
    bankshow.exec();
})
app.get("/tmp_deposite_data", function(req,next) {
    $(".second_show").hide();
    var container=$(".my");
    container.show();
    var tmp=$(".tmp_deposite_data").html();
    container.html(tmp);
    deposite_data.exec();
    console.log(1111);
})
app.get("/tmp_ck_data", function(req,next) {
    $(".second_show").hide();
    var container=$(".my");
    container.show();
    var tmp=$(".tmp_ck_data").html();
    container.html(tmp);
    ck_data.exec();
})
app.get("/tmp_tk_data", function(req,next) {
    $(".second_show").hide();
    var container=$(".my");
    container.show();
    var tmp=$(".tmp_tk_data").html();
    container.html(tmp);
    tk_data.exec();
})
app.get("/tmp_yh_data", function(req,next) {
    $(".second_show").hide();
    var container=$(".my");
    container.show();
    var tmp=$(".tmp_yh_data").html();
    container.html(tmp);
    yh_data.exec();
})
app.get("/tmp_benefit", function(req,next) {
    $(".second_show").hide();
    var container=$(".my");
    container.show();
    var tmp=$(".tmp_benefit").html();
    container.html(tmp);
    benefit.exec();
})
// app.get("/loginout", function(req,next) {
//     $(".second_show").hide();
//     var confirm1=confirm("确定要登出？")
//     if(confirm1==true)
//     {
//         alert("执行登出逻辑");
//         window.location.href="#/index"
//         // 进入首页
//
//     }
// })
app.get(function(){
    $(".second_show").hide();
    $(".my").html("").hide();
    common.tmp(".scroller", ".tmp_index", index.exec)
})

app.start();
// 点击优惠banner的时候 进入优惠
$("body").on("tap",".index_swiper",function(){
   window.location.href="#/tmp_benefit";
})