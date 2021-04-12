<template>
  <div v-clickoutside="closed" class="absolute h-full z-10 left-0 top-0 bg-yellow w-64">
    <div class="flex flex-col items-start justify-center w-full h-32 pl-4 bg-gray">
        <div>Cara Johnson</div><div>@carachips</div>
    </div>
    <div class="flex flex-col p-4">
        <router-link to="/home" :class="[{'bg-gray': currentPane == 0}, 'flex items-center p-1 m-1']"><i class="fas fa-tasks pr-2"></i><div>Task List</div></router-link>
        <router-link to="/calendar" :class="[{'bg-gray': currentPane == 1}, 'flex items-center p-1 m-1']"><i class="far fa-calendar-check pr-2"></i><div>Calendar View</div></router-link>
        <router-link to="/findPartners" :class="[{'bg-gray': currentPane == 2}, 'flex items-center p-1 m-1']"><i class="fas fa-user-friends pr-2"></i><div>Find Partners</div></router-link>
        <div class="border-b-2 border-gray"></div>
        <router-link to="/settings" :class="[{'bg-gray': currentPane == 3}, 'flex items-center p-1 m-1']"><i class="fas fa-cog pr-2"></i><div>App Settings</div></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "sideMenu",
  props: {
      currentPane: Number
  },
    methods: {
        closed: function() {
            this.$emit('closed');
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
