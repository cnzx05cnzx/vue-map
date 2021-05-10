<template>
  <div class="home" style="text-align: center">
    <p>对vue进行了学习，封装了两个关于高德地图使用的组件</p>
    <p>第一个mapLoc用来进行定位，本地ip和https基本使用浏览器精准定位，http基本采用ip定位，后者精准度相对较差</p>
    <p>第二个mapDrive展示导航，根据给定的点，采用高德api展示驾车导航轨迹</p>
    <hr>
    <button @click="$router.push('location')">定位</button>
    <button @click="$router.push('navigation')">导航</button>
  </div>
</template>

<script>


export default {
  name: 'Home',
}
</script>
