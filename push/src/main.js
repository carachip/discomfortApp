import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import data from './mixins/data';

Vue.mixin(data); 

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
