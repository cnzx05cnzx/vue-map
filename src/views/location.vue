<template>
  <div style="text-align: center">
    <h1>ip定位</h1>
    当前地址为：<map-loc></map-loc>
  </div>
</template>

<script>
import mapLoc from "@/components/map/mapLoc";

export default {
  name: "location",
  data() {
    return {

    };
  },
  components: {
    mapLoc
  },
  created() {
    console.log("create");
  }

};
</script>