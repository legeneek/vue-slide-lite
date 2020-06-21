import VueSlideLite from './VueSlideLite.vue'

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueSlideLite', VueSlideLite);
}

export default {
  install,
  component: VueSlideLite
}