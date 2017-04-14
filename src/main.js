// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import {store} from "./components/vuex/store"
import '../static/css/reset.css'
import '../static/js/head.js'
import $ from 'jquery'
Vue.config.productionTip = false;
Vue.use(VueRouter);
// Vue.use(list)
import Register from './components/registered/js/register.js'
import Login from './components/login/js/login.js'
import Personal from './components/Personal/js/personal.js'
import Public from './components/public/js/public'
import Game from './components/home/game/js/game.js'
import Deposit from './components/access/deposit/js/deposit'
import Member from './components/Personal/member/member'
import Card from './components/Personal/card/js/card'
import List from './components/vuex/list.js'
import PBalance from './components/Personal/Balance/js/balance.js'
import Password from './components/Personal/password/js/password'
import  Tran_sfer from './components/Personal/Transfer/js/transfer'
import My_deposit from './components/Personal/mydeposit/js/mydeposit'
import My_withdrawals from './components/Personal/myWithdrawals/js/mywithdrawals'
Vue.use(Register);
Vue.use(Login);
Vue.use(Personal);
Vue.use(Public);
Vue.use(Game);
Vue.use(Deposit);
Vue.use(Member);
Vue.use(Card);
Vue.use(List);
Vue.use(PBalance);
Vue.use(Password);
Vue.use(Tran_sfer);
Vue.use(My_deposit);
Vue.use(My_withdrawals);
import home from './components/home/home.vue'
import Livevideo from './components/home/game/Livevideo.vue'
import Electronicamusement from "./components/home/game/Electronicamusement.vue"
import Sportsevents from './components/home/game/Sportsevents.vue'
import Lotterygame from './components/home/game/Lotterygame.vue'

import access from './components/access/access.vue'
import deposit from './components/access/deposit/deposit.vue'
import Micro from './components/access/deposit/Micro.vue'
import Alipay from './components/access/deposit/Alipay.vue'
import banking from './components/access/deposit/banking.vue'

import Withdrawals from './components/access/Withdrawals/Withdrawals.vue'

import customer from './components/Customer/customer.vue'
import personal from './components/Personal/personal.vue'


import Account_center from './components/Personal/Accountcenter/Accont_center.vue'
import member from './components/Personal/member/member.vue'
import myvip from './components/Personal/member/myvip.vue'
import mymodify from './components/Personal/member/mymodify.vue'

import card from './components/Personal/card/card.vue'
import cardinformation from './components/Personal/card/cardinformation.vue'
import cardwithdrawals from './components/Personal/card/cardwithdrawals.vue'
import addcard from './components/Personal/card/addcard.vue'

import Balance from './components/Personal/Balance/Balance.vue'
import In from './components/Personal/Balance/in.vue'
import  Out from './components/Personal/Balance/out.vue'

import password from './components/Personal/password/password.vue'
import loginpassword from './components/Personal/password/loginpassword.vue'
import cardpassword from './components/Personal/password/cardpassword.vue'

import Transfer from './components/Personal/Transfer/transfer.vue'
import mydeposit from './components/Personal/mydeposit/mydeposit.vue'
import myWithdrawals from './components/Personal/myWithdrawals/myWithdrawals.vue'
import offer from './components/Personal/offer/offer.vue'
import myoffer from './components/Personal/myoffer/myoffer.vue'


import login from './components/login/login.vue'
import register from './components/registered/register.vue'
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {path: '/', component: home,
            children: [
                {path: '/', redirect:'/Livevideo',component:Livevideo},
                {path: '/Livevideo',component:Livevideo},
                {path: '/Electronicamusement',component:Electronicamusement},
                {path: '/Sportsevents',component:Sportsevents},
                {path: '/Lotterygame',component:Lotterygame}
            ]
        },
        {path: '/access', component: access,
            children: [
                { path: '/', redirect:'/access/deposit',component: deposit },
                { path:'/access/deposit',component: deposit,
                    children: [
                        {path: '/', redirect:'/access/deposit/Micro',component:Micro},
                        {path: '/access/deposit/Micro',component:Micro},
                        {path:'/access/deposit/Alipay',component:Alipay},
                        {path:'/access/deposit/banking',component:banking}
            //             // {path:'/access/deposit/Online',component:Online}
                    ]
                },
                { path: '/access/Withdrawals', component: Withdrawals }
                // ...其他子路由
            ]
        },
        {path: '/customer', component: customer},
        {path: '/personal', component: personal},
        {path: '/Account_center',component: Account_center,
            children: [
                { path:'/Account_center/member',component: member,
                            children: [
                                {path: '/', redirect:'/Account_center/member/myvip',component:myvip},
                                {path: '/Account_center/member/myvip',component:myvip},
                                {path: '/Account_center/member/mymodify',component:mymodify}
                            ]
                },
                { path:'/Account_center/card',component: card,
                            children: [
                                {path: '/', redirect:'/Account_center/card/cardinformation',component:cardinformation},
                                {path: '/Account_center/card/cardinformation',component:cardinformation},
                                {path: '/Account_center/card/cardwithdrawals',component:cardwithdrawals}
                            ]
                },
                { path:'/Account_center/password',component: password,
                            children: [
                                {path: '/', redirect:'/Account_center/password/loginpassword',component:loginpassword},
                                {path: '/Account_center/password/loginpassword',component:loginpassword},
                                {path: '/Account_center/password/cardpassword',component:cardpassword}
                            ]
                },
                { path:'/Account_center/Transfer',component: Transfer },
                { path:'/Account_center/mydeposit',component: mydeposit },
                { path: '/Account_center/myWithdrawals',component: myWithdrawals },
                { path: '/Account_center/offer',component: offer },
                { path: '/Account_center/myoffer',component: myoffer },
                { path: '/Account_center/Balance',component: Balance,
                    children: [
                        {path: '/', redirect:'/Account_center/Balance/In',component:Out},
                        {path: '/Account_center/Balance/In',component:In},
                        {path: '/Account_center/Balance/out',component:Out}
                    ]
                },
                { path: '/Account_center/addcard',component: addcard }
            ]
        },
        {path: '/login',component:login},
        {path: '/register',component: register},

    ]
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})
