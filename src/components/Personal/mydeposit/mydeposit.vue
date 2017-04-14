<template>
    <div class="mydeposit">
        <T_itle :text="head"></T_itle>
        <div class='wrapper'>
            <div class="wrapper_top">
                <div class="item">
                    <div class="main buton">
                        <span>开始时间:</span>
                        <input type="text" placeholder="开始日期" id="depositstart" v-model="cStart">
                    </div>
                    <div class="main " >
                        <span>结束时间:</span>
                        <input type="text" id="depositcend" placeholder="结束日期" v-model="cEnd">
                    </div>
                </div>
                <div class="item">
                    <div  class="main buton main_center">
                        <span>转账类型:</span>
                        <select v-model='mytype'  name="" id="">
                            <option value="">所有</option >
                            <option value="1">网银</option >
                            <option value="2">微信</option >
                            <option value="3">支付宝</option >
                        </select>
                    </div>
                    <div class="main">
                        <span>游戏平台:</span>
                        <select v-model='mystatus'  name="" id="">
                            <option value="">所有</option>
                            <option value="paying">交易中</option >
                            <option value="failed">交易失败</option >
                            <option value="success">交易成功</option >
                        </select>
                    </div>
                </div>
                <div class="item_rt">
                    <!-- <div class="main buton">
                      筛&nbsp;&nbsp;&nbsp; 选
                    </div> -->
                    <div style="margin-top:0.28rem" class="main">
                        <div @click='inquire' class="bnt1 cx">查 询</div>
                    </div>
                </div>
            </div>
        </div>
        <div  class="content">
            <table class="tabel">
                <thead>
                <tr >
                    <th v-for='v in title'>{{v}}</th>
                </tr>
                </thead>
                <tbody class="my_deposit">
                </tbody>
            </table>
        </div>
        <div class="detail-wrapper">
            <div id="pageslo">
                <div class="total" v-show="total_amount">总金额: {{total}}</div>
                <ul v-show="pagination" class="pagination">
                    <li class="lf" v-show="current != 1" @click="current-- && goto(current)" ><a href="#">上一页</a></li>
                    <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
                        <a href="#" >{{index}}</a>
                    </li>
                    <li class="rt" v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a href="#" >下一页</a></li>
                </ul>
            </div>
        </div>
        <refresh v-show='refresh'></refresh>
        <pop v-show='Closepop' ></pop>
    </div>
</template>

<script>
    var vm;
    import pop from '../../public/pop.vue'
    import refresh from '../../public/refter.vue'
    import title from  '../../public/title.vue'
    import '../../../../node_modules/flatpickr/dist/flatpickr'
    import Chinese from '../../../../node_modules/flatpickr/dist/l10n/zh'
    export default {
        data () {
            return {
                head:'存款记录',
                title:["日期","转账金额","存款平台","状态"],
                cStart:"",
                cEnd:"",
                cont:"",//数据
                text:'',
                mytype:'',
                mystatus:'',
                page:0,//总页数
                pagination:false,
                total_amount:false,
                pageSize:12,//每页页数
                total:0,//总金额
                date:'',
                current:1,
                showItem:5,
                allpage:0
            }
        },
        computed: {
            Closepop() {
                return this.$store.state.Closepop;
            },
            refresh() {
                return this.$store.state.refresh;//提示框
            },
            jrg() {
                return this.$store.state.jrg;//提示框
            },
            pages:function(){
                var vm = this;
                vm.allpage =vm.page;
                var pag = [];
                if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem,this.allpage);
                    while(i){
                        pag.unshift(i--);
                    }
                }else{ //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                        i = this.showItem;
                    if( middle >  (this.allpage - this.showItem)  ){
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while(i--){
                        pag.push( middle++ );
                    }
                }
                return pag
            }
        },
        mounted:function(){
            this.init();
        },
        methods: {
            init:function () {
                document.getElementById("depositstart").flatpickr({
                    "locale": Chinese.zh,
                    disable: [
                        {
                            from: "2016-08-16",
                            to: "2016-08-19"
                        },
                        "2016-08-24",
                        new Date().fp_incr(7) // 30 days from now
                    ],
                    minDate:new Date().fp_incr(-31),
                    // minDate:new Date().fp_incr(),
                    maxDate: new Date().fp_incr(-1)
                });
                document.getElementById("depositcend").flatpickr({
                    "locale": Chinese.zh,
                    disable: [
                        {
                            from: "2016-08-16",
                            to: "2016-08-19"
                        },
                        "2016-08-24",
                        new Date().fp_incr(7) // 30 days from now
                    ],
                    minDate:new Date().fp_incr(0),
                    // minDate:new Date().fp_incr(),
                    maxDate:'today'
                });
            },
            inquire:function(){
                vm = this;
                $('.my_deposit').empty();
                vm.total_amount = false;
                vm.date={pageSize:vm.pageSize,
                    pageNo:1,
                    bdate:vm.cStart,
                    edate:vm.cEnd,
                    Type:vm.mytype,
                    status:vm.mystatus
                };
                if(this.cStart =="" || this.cEnd == ""){
                    vm.text = "请选择日期";
                    vm.$store.commit('incrClosepoptext',vm.text);
                    vm.$store.commit('incrClosepop',true);
                }else{
                    vm.$store.commit('incrrefresh',true);
                    this.$getReChargeInfo(vm.date,vm.jrg+"User/getReChargeInfo",vm);
                }
            },
            goto:function(index){
                vm =this ;
                this.current = index;
                vm.date.pageNo = index;
                vm.$store.commit('incrrefresh',true);
                this.$getReChargeInfo(vm.date,vm.jrg+"User/getReChargeInfo",vm);
            }
        },
        components: {
            refresh,
            pop,
            T_itle:title
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    @import "../../../../node_modules/flatpickr/dist/themes/material_orange.css";
    @import "../../public/public.less";
    @import "../Transfer/css/page.less";
</style>