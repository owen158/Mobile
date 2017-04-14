<template>
    <div class="Transfer detail-wrapper">
        <T_itle :text="head"></T_itle>
        <div class='wrapper'>
            <div class="wrapper_top">
                <div class="item">
                    <div class="main buton">
                        <span>开始时间:</span>
                        <input id="disableRange" v-model="Start" placeholder="开始日期">
                    </div>
                    <div class="main " >
                        <span>结束时间:</span>
                        <input id="disableRangeend" v-model="End" type="date" placeholder="结束日期">
                    </div>
                </div>
                <div class="item">
                    <div  class="main buton main_center">
                        <span>转账类型:</span>
                        <select ref='transfer1' name="" id="">
                            <option value="">所有</option>
                            <option value="OUT">转入游戏</option>
                            <option value="IN">转入平台</option>
                        </select>
                    </div>
                    <div class="main">
                        <span>游戏平台:</span>
                        <select ref='transfer2' name="" id="">
                            <option value="">所有</option>
                            <option value="CG">CG视讯</option >
                            <option value="AGIN">AGIN国际厅</option >
                            <option value="AG">AG视讯</option >
                            <option value="SB">申博视讯</option >
                            <!-- <option value="OB">欧博视讯</option > -->
                            <option value="OG">OG视讯</option >
                            <option value="DS">DS视讯</option >
                            <option value="BBIN">BBIN视讯</option >
                            <option value="PT">PT电子</option >
                            <option value="MG">MG电子</option >
                            <option value="HABA">HABA电子</option >
                            <option value="HG">皇冠</option >
                            <option value="IG">彩票</option >
                        </select>
                    </div>
                </div>
                <div class="item_rt">
                    <div style="margin-top:0.25rem" class="main">
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
                <tbody class="transfertbody">
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
        <pop v-show="Closepop"></pop>
    </div>
</template>
<script>
    var Start,End,transfer1,transfer2,vm;
    import pop from '../../public/pop.vue'
    import refresh from '../../public/refter.vue'
    import title from  '../../public/title.vue'
    import '../../../../node_modules/flatpickr/dist/flatpickr'
    import Chinese from '../../../../node_modules/flatpickr/dist/l10n/zh'
    export default {
        data () {
            return {
                head:'转账记录',
                Start:'',
                text:'',
                pagination:false,
                total_amount:false,
                title:["日期",'转账金额','转前金额',"转后金额","平台",'类型'],
                End:"",
                cont:"",//数据
                page:0,//总页数
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
                var vm = this;
                document.getElementById("disableRange").flatpickr({

                });
                document.getElementById("disableRange").flatpickr({
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
                    maxDate: new Date().fp_incr(-1),

                });
                document.getElementById("disableRangeend").flatpickr({
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
                vm.date={
                    pageSize:vm.pageSize,
                    pageNo:1,
                    bdate:vm.Start,
                    edate:vm.End,
                    Type:vm.$refs.transfer2.value,
                    Ttype:vm.$refs.transfer1.value
                };
                if(vm.Start =="" || vm.End == ""){
                    vm.text = "开始 结束时间不能空";
                    vm.$store.commit('incrClosepoptext',vm.text);
                    vm.$store.commit('incrClosepop',true);
                }else{
                    vm.$store.commit('incrrefresh',true);
                    vm.$getTransferinfo(vm.date,vm.jrg+"User/getTransferInfo",vm);
                }
            },
            goto:function(index){
                var vm =this ;
                this.current = index;
                vm.date.pageNo = index;
                vm.$store.commit('incrrefresh',true);
                vm.$getTransferinfo(vm.date,vm.jrg+"User/getTransferInfo",vm);
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
@import "./css/page.less";
</style>