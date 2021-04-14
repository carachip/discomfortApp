import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import data from './mixins/data';
import VCalendar from 'v-calendar';
import VueConfetti from 'vue-confetti'

Vue.mixin(data); 

Vue.use(VueConfetti);
Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");


//TODO
/**
 * addGoal: help popup or icon
 * calendar functionality, also adding the Home stuff to the bottom
 * add more dummy data
 * app settings
 * be able to delete partners
 * 
 */