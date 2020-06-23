<template>
  <div class="slide-lite" :dir="dir">
    <div class="slide-lite-wrap" :style="wrapStyle">
      <div
        class="slide-item"
        v-for="(item, index) in list"
        :key="index"
        :style="listItemStyle[index] || ''"
      >
        <slot name="slide" :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      require: true,
      type: Array,
    },
    dir: {
      type: String,
      default: () => "ltr",
    },
    cur: {
      require: true,
      type: Number,
      default: () => 0,
    },
    duration: {
      type: Number,
      default: () => 300,
    },
  },
  data() {
    return {
      slideWidth: 0,
      listItemStyle: [],
      dirFlag: 1,
      wrapStyle: "",
    };
  },
  watch: {
    cur(v, o) {
      this.updateStyle([v, o]);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.slideWidth = this.$el.offsetWidth;
      this.dirFlag = this.dir === "ltr" ? 1 : -1;
      this.wrapStyle = `width: ${this.list.length * this.slideWidth}px;`;
      this.updateStyle();
    },

    calcStyle(left, duration, translateX) {
      return `width: ${this.slideWidth}px; left: ${left}px; transition-duration: ${duration}ms; transform: translate(${translateX}px, 0px) translateZ(0px);`;
    },

    updateStyle(arr) {
      const len = this.list.length;
      this.list.forEach((item, index) => {
        let translateXDirection = 0;
        if (this.cur === index) {
          translateXDirection = 0;
        } else if (index < this.cur) {
          if ((this.cur + 1) % len === index) {
            translateXDirection = 1;
          } else {
            translateXDirection = -1;
          }
        } else if (index > this.cur) {
          if ((index + 1) % len === this.cur) {
            translateXDirection = -1;
          } else {
            translateXDirection = 1;
          }
        }
        const dur = arr && arr.indexOf(index) !== -1 ? this.duration : 0;
        const left = this.slideWidth * index * this.dirFlag * -1;
        let translateX = this.slideWidth * this.dirFlag * translateXDirection;
        let style = this.calcStyle(left, dur, translateX);
        this.$set(this.listItemStyle, index, style);
      });
    },
  },
};
</script>

<style>
.slide-lite {
  overflow: hidden;
  position: relative;
  width: 100%;
}
.slide-lite .slide-lite-wrap {
  display: flex;
}
.slide-lite .slide-item {
  position: relative;
  width: 100%;
}
</style>
