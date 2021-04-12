import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import data from './mixins/data';
import VCalendar from 'v-calendar';

Vue.mixin(data); 
Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
