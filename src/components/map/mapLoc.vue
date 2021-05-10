<template>
  <div>
            <span>{{address}}</span>
  </div>
</template>

<script>
import remoteLoad from '@/utils/remoteLoad.js'
import {MapKey} from '@/config/config'
export default {
  name: "mapLoc",
  data() {
    return {
      AMapUI: null,
      AMap: null,
      address:"",
    };
  },
  components: {},
  methods: {
    getLocation() {
      const self = this
      let AMap = this.AMap = window.AMap
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete);
        AMap.event.addListener(geolocation, 'error', onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log('定位成功信息：', data);
          alert('精准定位成功')
          self.address=data.formattedAddress
        }

        function onError(data) {
          // 定位出错
          console.log('定位失败错误：', data);
          // 调用ip定位
          self.getLngLatLocation();
        }
      })
    },
    getLngLatLocation() {
      const self = this
      let AMap = this.AMap = window.AMap
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log('通过ip获取当前城市：', result)
            //逆向地理编码
            AMap.plugin('AMap.Geocoder', function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              })

              var lnglat = result.rectangle.split(';')[0].split(',');
              geocoder.getAddress(lnglat, function (status, data) {
                if (status === 'complete' && data.info === 'OK') {
                  // result为对应的地理位置详细信息
                  console.log(data)
                  alert('ip定位成功')
                  self.address=data.regeocode.formattedAddress
                }
              })
            })
          }
        })
      })
    }
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap()
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`https://webapi.amap.com/maps?v=1.4.15&key=${MapKey}&plugin=AMap.Driving`)
      await remoteLoad('http://webapi.amap.com/ui/1.1/main.js')
      this.getLocation();
    }
  }
};
</script>

<style scoped>


</style>
