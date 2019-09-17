<template>
  <div id="app">
    <headers></headers>
    <ul id="nav">
      <li @click="jump('1')" :class="[tipNum==1?click:'']">御魂</li>
      <li @click="jump('2')" :class="[tipNum==2?click:'']">式神</li>
      <li @click="jump('3')" :class="[tipNum==3?click:'']">搭配</li>
    </ul>
    <router-view :parentsData="responseData" @changeNum="allNum"></router-view>
    <footers :goodsNum="allGoodsNum" :goodsPrice="allGoodsPrice" :parentsData="responseData"></footers>
  </div>
</template>

<script>
  import headers from './components/headers.vue'
  import footers from './components/footers.vue'
  import {getTest} from '.././service/testApi'
  export default {
      name:'app',
      components:{
          headers,
          footers,
      },
      data(){
          return {
              responseData:'',
              tipNum:1,
              click:'click',
              allGoodsNum:0,
              allGoodsPrice:0,
          }
      },
      methods:{
          allNum(num,price){
              if(num>=100){
                  this.allGoodsNum="···"
              }else{
                  this.allGoodsNum=num;
              }
              this.allGoodsPrice=price
          },
          jump(val){
              switch(val){
                  case '1':
                      this.tipNum=1;
                      this.$router.push({path:'/Monday'});
                      this.arrNum=0;
                      break;
                  case '2':
                      this.tipNum=2;
                      this.$router.push({path:'/Tuesday'});
                      break;
                  case '3':
                      this.tipNum=3;
                      this.$router.push({path:'/Wednesday'});
                      break;
              }
          }
      },
      created(){
          var _this=this;
          getTest('/').then(function (response) {
              _this.responseData = JSON.parse(response.data);
              console.log(JSON.parse(response.data))
          })
      }
  }
</script>

<style>
  *{margin:0;padding:0;}
  ul li{list-style: none}
  #app{}
  #nav{
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid whitesmoke;
    box-sizing: border-box;
  }
  #nav li{
    flex: 1;
    text-align: center;
    line-height: 40px;
    height: 40px;
    cursor: pointer;
  }
  #nav li:hover{
    background-color: red;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }
  .click{
    background-color: red;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }

</style>
