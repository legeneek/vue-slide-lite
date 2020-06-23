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

run demo
```
npm run start 
```

## props

| Property | Type | Required? | Description |
|:---|:---|:---|:---|
| list | Array | true | slide list items
| cur | Number | true | the current slide index (start from 0)
| duration | Number | false | slide animation duration
| dir | String | false | direction (default `ltr`)

