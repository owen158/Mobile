/**
 * Created by Administrator on 2017/4/10.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export const store = new Vuex.Store({
    state:{
        login:false,// 检查登录状态
        jrg:'http://192.168.0.7:8080/XPJ/',
        Promptbox:'',//登录提示文字 注册 、登录专用
        Closepop:false,//pop 提示框
        Closepoptext:'',// pop 提示内容
        refresh:false, //刷新等待
        Gamebalance:0,// 游戏余额
        Centerwallet:0,//中心钱包
        Username:'',//用户名字
        detailShow:false, //游戏提示框
        examination:false,//游戏进入  维护中 检查提示
        cardBank:"" //银行卡信息
    },
    mutations:{
        incrlogin (state,value) {//判断登录状态
            state.login=value
        },
        incrcardBank (state,value) {//判断登录状态
            state.cardBank=value
        },
        incrCenterwallet(state,value){//中心钱包
            state.Centerwallet=value
        },
        incrGamebalance (state,value) {
            state.Gamebalance=value
        },
        incrdetailShow(state,value){
            state.detailShow=value
        },
        incrUsername(state,value){//用户名
            state.Username=value
        },
        incrrefresh (state,value) {
            state.refresh=value
        },
        incrClosepop(state,value) {
            state.Closepop =value
        },
        incrClosepoptext(state,value){
            state.Closepoptext =value
        },
        incrPromptbox(state,value){ //银行卡 验证 提示 框
            state.Promptbox =value
        },
        increxamination(state,value){//游戏入口检查
            state.examination=value
        },
    },
    actions:{

    }
});