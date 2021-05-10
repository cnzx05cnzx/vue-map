<template>
  <div>
    <map-drive :waypoints="item"></map-drive>
  </div>
</template>


<script>

import mapDrive from "@/components/map/mapDrive";
export default {
  name:'navigation',
  components:{
    mapDrive
  },
  data() {
    return {
      infoWindow: "",
      item:[[120.146424, 30.209778], [120.356424, 30.119778],[120.326424, 30.139778]]
      //item为导航点对应坐标，按顺序排列
    };
  },
};
</script>
<style scoped>

</style>