# vue-slide-lite
light weight vue slide componnet

## install

```shell
npm i vue-slide-lite
```

## usage

```html
<template>
  <VueSlideLite :list="list" :cur="cur" :dir="'ltr'">
    <template v-slot:slide="{ item, index }">
      <div>{{ `slide ${index}` }}</div>
    </template>
  </VueSlideLite>
</template>

<script>
import VueSlideLite from "vue-slide-lite"
// use as plugin
Vue.use(VueSlideLite)
// or use as component 
Vue.component('VueSlideLite', VueSlideLite.component)
</script>
```

## demo 

check the [online demo](https://legeneek.github.io/vue-slide-lite/) or run local demo use `npm run start `

## props

| Property | Type | Required? | Description |
|:---|:---|:---|:---|
| list | Array | true | slide list items，list should contain `at least 3 items`(loop slide requirement), if your list has 2 items, you should concat it: `list = list.concat(list)`
| cur | Number | true | the current slide index (start from 0)
| duration | Number | false | slide animation duration
| dir | String | false | direction (default `ltr`)
