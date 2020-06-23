<template>
  <div id="app" dir="ltr">
    <button @click="cur = Math.floor(Math.random() * list.length)">
      random change slide
    </button>
    <div>{{ `current slide: ${cur}` }}</div>
    <div class="slide-container">
      <VueSlideLite :list="list" :cur="cur" :dir="'ltr'">
        <template v-slot:slide="{ index }">
          <div class="box">{{ `slide ${index}` }}</div>
        </template>
      </VueSlideLite>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import VueSlideLite from "../src/index"
// Vue.use(VueSlideLite)
Vue.component('VueSlideLite', VueSlideLite.component)

export default {
  name: "app",
  data() {
    return {
      cur: 4,
      list: [
        { name: "a" },
        { name: "b" },
        { name: "c" },
        { name: "d" },
        { name: "e" },
        { name: "f" },
      ],
    }
  },
  mounted() {
    // setInterval(() => {
    //   this.inc()
    // }, 3000)
  },
  methods: {
    inc() {
      this.cur = (this.cur + 1) % this.list.length
    },
  },
}
</script>

<style lang="less">
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.slide-container {
  border: 1px solid #675ccc;
  width: 200px;
  position: relative;
  left: 200px;
  .box {
    height: 100px;
  }
}
</style>
