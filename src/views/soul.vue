<template>
    <div class="monday">
        <div id="list">
            <ul>
                <li v-for="(type,index) in arrType" @click="jump(index)" :class="[index==indexNum?listClick:'']">
                    <p>{{type.name}}</p>
                </li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <div id="goodsList" @scroll="scroll" ref="orderBox">
            <ul>
                <li v-for="(content,indexOne) in arrType" class="goodsList_li">
                    <p>&nbsp&nbsp{{content.name}}</p>
                    <div v-for="(project,indexTwo) in content.soul" class="blockOne">
                        <p class="textName">{{project.name}}</p>
                        <p class="info">
                            {{project.info}}
                            <br/>
                            <span>推荐:{{project.recommended}}星</span>
                        </p>
                        <div class="inputOne">
                            <span @click="subNum(indexOne,indexTwo)" v-show="project.num!=0">-</span>
                            <span v-show="project.num!=0">{{project.num}}</span>
                            <span @click="addNum(indexOne,indexTwo)">+</span>
                        </div>
                        <p class="price"><span>{{project.cost}}</span><img src="../assets/img/price.png" alt=""></p>
                        <img :src=project.src alt="" class="inco">
                    </div>
                </li>
            </ul>
        </div>


        <div class="footers">
            <div class="pick" v-if="isShow">
                <p>&nbsp&nbsp&nbsp已选商品 <span>清空</span></p>
                <p v-if="this.goodsArr.length==0">未选择商品</p>
                <div v-for="(goods,index) in goodsArr" class="goodsListOne">
                    <span>{{goods.name}}</span>
                    <span>{{goods.num}}</span>
                </div>
            </div>
            <div class="buyCar">
                <img src="../assets/img/buy.png" alt="" @click="showThis">
                <p v-show="this.allGoodsNum!=0">{{allGoodsNum}}</p>
                <div class="footPrice">
                    <span>{{allGoodsPrice}}<img src="../assets/img/price.png" alt=""></span>
                </div>
                <div class="want">
                    <span>中奸商赚差价500<img src="../assets/img/price.png" alt=""></span>
                </div>
                <div class="footBuy">
                    <p>去结算</p>
                </div>
            </div>
        </div>


    </div>
</template>

<script>

    export default {
        name: 'monday',
        props:['parentsData'],
        data(){
            return{
                childData:{},
                arrType:[
                    {
                        "name": "攻击加成",
                        "soul": []
                    },
                    {
                        "name": "暴击",
                        "soul": []
                    },
                    {
                        "name": "防御加成",
                        "soul": []
                    },
                    {
                        "name": "生命加成",
                        "soul": []
                    },
                    {
                        "name": "效果命中",
                        "soul": []
                    },
                    {
                        "name": "效果抵抗",
                        "soul": []
                    },
                    {
                        "name": "周一掉落",
                        "soul": []
                    },
                    {
                        "name": "周二掉落",
                        "soul": []
                    },
                    {
                        "name": "周三掉落",
                        "soul": []
                    },
                    {
                        "name": "周四掉落",
                        "soul": []
                    },
                    {
                        "name": "周五掉落",
                        "soul": []
                    },
                    {
                        "name": "业原火掉落",
                        "soul": []
                    }
                ],
                arrHeight:[],//748, 748, 866, 866, 276, 394, 512, 512, 512, 512, 512, 394
                arrAllHeight:[0],//748, 1496, 2362, 3228, 3504, 3898, 4410, 4922, 5434, 5946, 6458, 6852
                jumpHeight:0,
                listClick:'listClick',
                indexNum:0,//跳转变色
                allGoodsNum:0,//所有商品数量
                allGoodsPrice:0,//所有商品价格
                isShow:false,
                goodsArr:[],
            }
        },
        components: {

        },
        created(){
            this.childData=this.parentsData;
            for(var j=0;j<this.arrType.length;j++){
                for(var i=0;i<this.childData.soul.length;i++){
                    if(this.childData.soul[i].type==this.arrType[j].name){
                        this.arrType[j].soul.push(this.childData.soul[i])
                    }
                    if(this.childData.soul[i].time==this.arrType[j].name){
                        this.arrType[j].soul.push(this.childData.soul[i])
                    }
                }
            }
            for(var a=0;a<this.arrType.length;a++){
                this.arrHeight.push(40+this.arrType[a].soul.length*118)
            }
            for(var b=0;b<this.arrHeight.length;b++){
                this.jumpHeight+=this.arrHeight[b];
                this.arrAllHeight.push(this.jumpHeight)
            }
        },
        mounted(){
            // 先给页面注册滚动事件
            document.addEventListener('scroll',this.Scroll)
        },
        methods:{

            showThis(){
                this.goodsArr=[];
                this.isShow=!this.isShow;
                for(var i=0;i<this.parentsData.soul.length;i++){
                    if(this.parentsData.soul[i].num!=0){
                        this.goodsArr.push(this.parentsData.soul[i])
                    }
                }
                console.log(this.goodsArr)
            },

            count(){//计算全部商品数量,计算全部商品价格
                this.allGoodsNum=0;
                this.allGoodsPrice=0;
              for(var i = 0;i<this.childData.soul.length;i++){
                  this.allGoodsNum+=this.childData.soul[i].num;
                  this.allGoodsPrice+=this.childData.soul[i].num*this.childData.soul[i].cost
              }
            },
            addNum(indexOne,indexTwo){
                this.arrType[indexOne].soul[indexTwo].num++;
                this.count();
                this.$emit("changeNum",this.allGoodsNum,this.allGoodsPrice)
            },
            subNum(indexOne,indexTwo){
                if(this.arrType[indexOne].soul[indexTwo].num>0){
                    this.arrType[indexOne].soul[indexTwo].num--
                }else{
                    this.arrType[indexOne].soul[indexTwo].num=0
                }
                this.count();
                this.$emit("changeNum",this.allGoodsNum,this.allGoodsPrice)
            },
            scroll(){
                for(var i=0;i<this.arrAllHeight.length;i++){
                    if(this.$refs.orderBox.scrollTop+180>=this.arrAllHeight[i]
                        &&this.$refs.orderBox.scrollTop+180<this.arrAllHeight[i+1]){
                        this.indexNum=i
                    }
                }
            },
            jump:function (index) {
                this.jumpHeight=0;
                for(var i=0;i<index;i++){
                    this.jumpHeight+=this.arrHeight[i]
                }
                this.$refs.orderBox.scrollTop=this.jumpHeight;
            }
        }
    }
</script>

<style>
    .price{
        width: 60px;
        height: 30px;
        position: absolute;
        left: 260px;
        top:7px;
        color: red;
        font-weight: bold;
        line-height: 30px;
    }
    .price img{
        vertical-align: middle;
        height: 20px;
        margin-left: 5px;
        margin-top: -5px;
    }
    #list{
        width: 100px;
        height: 545px;
        float: left;
        overflow: auto;
    }
    #list::-webkit-scrollbar {
        display: none;
    }
    #list li{
        display: table;
        width: 100px;
        height: 50px;
        background-color: whitesmoke;
    }
    .listClick{
        background-color: white!important;
        font-weight: bold!important;
    }
    #list p{
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }
    .monday{
        width: 100%;
        height: 545px;
    }
    .blockOne{
        height: 117px;
    }
    .goodsList_li>p{
        width: 314px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        background-color: whitesmoke;
        position: relative;
        font-weight: bold;
        color:grey;
        letter-spacing: 5px;
        border-left: 3px solid #899999;
    }
    .textName{
        position: absolute;
        width: 120px;
        height: 30px;
        left: 120px;
        font-size: 20px;
        letter-spacing: 5px;
        margin-top: 5px;
        margin-left: 10px;
        line-height: 30px;
    }
    #goodsList div{
        border-bottom: 1px solid whitesmoke;
        position: relative;
    }
    #goodsList{
        width: 314px;
        height: 545px;
        float: left;
        overflow: auto;
    }
    .inco{
        width: 100px;
        margin-left: 10px;
    }
    #goodsList::-webkit-scrollbar {
        display: none;
    }
    .info{
        width: 120px;
        height: 80px;
        position: absolute;
        top:30px;
        left: 120px;
        margin-left: 10px;
        margin-top: 5px;
        color: grey;
        font-size: 12px;
    }
    .info span{
        display: inline-block;
        position: absolute;
        top: 50px;
    }
    .inputOne span:nth-of-type(1){
        position: absolute;
        top: 80px;
        left: 205px;
        width: 25px;
        height: 25px;
        background-color: skyblue;
        border-radius: 50%;
        text-align: center;
        line-height: 22px;
        color: white;
        font-weight: bold;
        font-size: 20px;
    }
    .inputOne span:nth-of-type(2){
        position: absolute;
        top: 82px;
        left: 238px;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 22px;
        font-weight: bold;
        font-size: 20px;
    }
    .inputOne span:nth-of-type(3){
        position: absolute;
        top: 80px;
        left: 270px;
        width: 25px;
        height: 25px;
        background-color: skyblue;
        border-radius: 50%;
        text-align: center;
        line-height: 22px;
        color: white;
        font-weight: bold;
        font-size: 20px;
    }
    .inputOne span:hover{
        background-color: blue;
    }
    .pick>div{
        width: 100%;
        height: 50px;
        background-color: lightgoldenrodyellow;
    }
    .pick{
        width: 100%;
        height: 400px;
        position: absolute;
        background-color: whitesmoke;
        top:-400px;
        overflow: scroll;
    }
    .pick p:nth-of-type(1){
        width: 100%;
        height: 50px;
        background-color: grey;
        line-height: 50px;
        font-weight: bold;
    }
    .pick p:nth-of-type(2){
        width: 100%;
        height: 50px;
        text-align: center;
        background-color: whitesmoke;
        line-height: 50px;
        font-weight: bold;
    }
    .pick p span{
        height: 50px;
        background-color: grey;
        line-height: 50px;
        font-size: 12px;
        float: right;
        margin-right: 20px;
    }
    .footers{
        width:100%;
        height: 55px;
        background-color:#f1c40f;
        position: absolute;
        bottom: 0;
    }
    .buyCar>img{
        width: 80px;
        position: absolute;
        top:-26px;
        left: 10px;
    }
    .buyCar>p{
        display: inline-block;
        position: absolute;
        text-align: center;
        line-height: 25px;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        background-color: red;
        top: -28px;
        left: 60px;
        color: white;
        font-weight: bold;
    }
    .footPrice{
        display: table;
        width: 100px;
        height: 25px;
        position: absolute;
        left: 90px;
        top: 5px;
    }
    .footPrice span{
        display: table-cell;
        vertical-align: middle;
        width: 50px;
        height: 25px;
        font-size: 20px;
        font-weight: bold;
    }
    .footPrice img{
        height: 25px;
        display: table-cell;
        vertical-align: middle;
        float: left;
        margin-right: 5px;
    }
    .want{
        position: absolute;
        display: table;
        width: 105px;
        height: 12px;
        left: 85px;
        top: 33px;
    }
    .want span{
        display: table-cell;
        vertical-align: middle;
        width: 50px;
        height: 12px;
        font-size: 12px;
        font-weight: bold;
        color: grey;
    }
    .want img{
        position:relative;
        height: 12px;
        display: table-cell;
        vertical-align: middle;
        float: right;
        top: 2px;
    }
    .footBuy{
        width: 150px;
        height: 55px;
        display: table;
        left: 200px;
        top: 0;
        float: right;
    }
    .footBuy p{
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: white;
        background-color: goldenrod;
    }
    .goodsListOne span:nth-of-type(1){
        position: relative;
        width: 100px;
        height: 50px;
        line-height: 50px;
        margin-left: 20px;
        font-size: 25px;
    }
    .goodsListOne span:nth-of-type(2){
        width: 100px;
        height: 50px;
        line-height: 50px;
        float: right;
        font-size: 25px;
    }


</style>