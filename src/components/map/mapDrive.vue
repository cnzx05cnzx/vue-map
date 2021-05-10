<template>
  <div class="m-map">
    <div id="js-container" class="map">正在加载数据 ...</div>
    <div id="panel"></div>
  </div>
</template>

<script>
import remoteLoad from '@/utils/remoteLoad.js'
import {MapKey} from '@/config/config'

export default {
  name:'mapDrive',
  props: {
    center: {
      type: Array,
      default: () => [120.041224, 30.227778]
    },
    start: {
      type: Array,
      default: () => [120.041224, 30.227778]
    },
    end: {
      type: Array,
      default: () => [120.041224, 30.227778]
    },
    waypoints: {
      type: Array,
      default: () => [[120.046424, 30.229778], [120.356424, 30.119778]]
    },

  },
  data() {
    return {
      dragStatus: false,
      AMapUI: null,
      AMap: null
    }
  },
  methods: {
    // 实例化地图
    initMap() {
      const self = this

      let AMap = this.AMap = window.AMap

      let mapConfig = {
        resizeEnable: true,
        zoom: 14,
      }

      let map = new AMap.Map('js-container', mapConfig)


      AMap.plugin(
          [
            "AMap.Scale",
            "AMap.Geolocation",
            "AMap.Driving",
            "AMap.ToolBar"
          ],
          function () {
            map.addControl(new AMap.ToolBar({}))

            var driving = new AMap.Driving({
              // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
              policy: AMap.DrivingPolicy.LEAST_TIME,
              panel: 'panel',
              map: map
            })

            let s = new AMap.LngLat(self.start[0], self.start[1])
            let e = new AMap.LngLat(self.end[0], self.end[1])
            let w = []
            for (let i = 0; i < self.waypoints.length; i++) {
              w.splice(i, 0, new AMap.LngLat(self.waypoints[i][0], self.waypoints[i][1]))
            }
            // console.log(w);

            driving.search(s, e, {
              waypoints: w
            }, function (status, result) {
              if (status === 'complete') {
                console.log(('绘制驾车路线完成'));
              } else {
                console.log(('获取驾车数据失败：' + result));
              }
            });
          }
      );


    }
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap()
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`https://webapi.amap.com/maps?v=2.0&key=${MapKey}&plugin=AMap.Driving`)
      await remoteLoad('http://webapi.amap.com/ui/1.1/main.js')
      this.initMap()
    }
  }
}
</script>

<style lang="css">
#panel {
  position: fixed;
  background-color: white;
  max-height: 60%;
  overflow-y: auto;
  top: 130px;
  right: 10px;
  width: 280px;
}

#panel .amap-lib-driving {
  border-radius: 4px;
  overflow: hidden;
}
.m-map {
  min-width: 500px;
  min-height: 300px;
  position: relative;
}

#js-container {
  width: 100%;
  height: 620px;
  background-color: #ffffff;
}

.m-map .map {
  width: 100%;
  height: 100%;
}

</style>