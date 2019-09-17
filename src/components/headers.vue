<template>
    <div class="headers">
        <img src="../assets/img/timg.png">
        <img src="../assets/img/text.png" alt="">
    </div>
</template>

<script>
    export  default {
        name:'headers'
    }
</script>
<style>
    .headers{
        width:100%;
        height: 100px;
        background-image: url("../assets/img/head.png");
        background-size: 100%;
    }
    .headers img{
        height: 50px;
        position: relative;
        top: 25px;
        left: 20px;
        margin-left: 10px;
    }
</style>