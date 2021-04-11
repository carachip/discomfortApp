<template>
  <div class="flex bg-yellow items-center w-full h-16">
    <i @click.stop="showSideMenu = true" class="fas fa-bars cursor-pointer mx-6 my-4"/>
    <div class="text-lg">{{title}}</div>
    <transition name="slide">
        <sideMenu v-if="showSideMenu" :currentPane=currentPane @closed="showSideMenu = false" />
    </transition>
  </div>
</template>

<script>
import sideMenu from "@/components/sideMenu.vue";
export default {
  name: "customHeader",
  components: {
      sideMenu
  },
  data: function() {
      return {
          showSideMenu: false
      }
  },
  props: {
      title: String,
      currentPane: Number
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slide-leave-active,
.slide-enter-active {
  transition: .25s;
}
.slide-enter {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
