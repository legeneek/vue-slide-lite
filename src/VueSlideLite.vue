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
      type: Array
    },
    dir: {
      type: String,
      default: () => "ltr"
    },
    cur: {
      require: true,
      type: Number,
      default: () => 0
    },
    duration: {
      type: Number,
      default: () => 300
    }
  },
  data() {
    return {
      slideWidth: 0,
      listItemStyle: [],
      dirFlag: 1,
      wrapStyle: ''
    };
  },
  watch: {
    cur(v, o) {
      this.updateStyle([v, o]);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.slideWidth = this.$el.offsetWidth;
      this.dirFlag = this.dir === "ltr" ? 1 : -1;
      this.wrapStyle = `width:${this.list.length * this.slideWidth}px;`
      this.updateStyle();
    },
    updateStyle(arr) {
      const len = this.list.length;
      this.list.forEach((item, index) => {
        let s;
        const dur = arr && arr.indexOf(index) !== -1 ? this.duration : 0;
        const left = -1 * this.slideWidth * index;
        if (this.cur === index) {
          s = `width: ${this.slideWidth}px; left: ${left *
            this
              .dirFlag}px; transition-duration: ${dur}ms; transform: translate(0px, 0px) translateZ(0px);`;
        } else if (index < this.cur) {
          if ((this.cur + 1) % len === index) {
            s = `width: ${this.slideWidth}px; left: ${left *
              this
                .dirFlag}px; transition-duration: ${dur}ms; transform: translate(${this
              .slideWidth * this.dirFlag}px, 0px) translateZ(0px);`;
          } else {
            s = `width:${this.slideWidth}px; left: ${left *
              this
                .dirFlag}px; transition-duration: ${dur}ms; transform: translate(${this
              .slideWidth *
              -1 *
              this.dirFlag}px, 0px) translateZ(0px);`;
          }
        } else if (index > this.cur) {
          if ((index + 1) % len === this.cur) {
            s = `width: ${this.slideWidth}px; left: ${left *
              this
                .dirFlag}px; transition-duration: ${dur}ms; transform: translate(${this
              .slideWidth *
              -1 *
              this.dirFlag}px, 0px) translateZ(0px);`;
          } else {
            s = `width: ${this.slideWidth}px; left: ${left *
              this
                .dirFlag}px; transition-duration: ${dur}ms; transform: translate(${this
              .slideWidth * this.dirFlag}px, 0px) translateZ(0px);`;
          }
        }

        this.$set(this.listItemStyle, index, s);
      });
    }
  }
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
