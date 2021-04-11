<template>
  <div class="flex bg-yellow items-center w-full h-16">
    <i class="fas fa-bars cursor-pointer mx-6 my-4"/>
    <div class="text-lg">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "header",
  props: {
      title: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
