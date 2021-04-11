<template>
  <div class="absolute left-0 top-0 bg-blue w-full h-full">
    <div class="flex flex-col bg-blue-light m-4 h-full">
        <div class="flex justify-between bg-gray p-3">Push for a new Goal!<i @click="close" class="far fa-times-circle"></i></div>
        <div>
            <div class="flex">Title<input class="w-full ml-2"/></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addGoal",
  data: function() {
      return {
          showSideMenu: false
      }
  },
  methods: {
      close: function() {
          this.$emit("close");
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
