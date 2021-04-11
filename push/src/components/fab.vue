<template>
  <div>
    <div @click="showAddGoal = true" class="absolute bottom-0 right-0 text-6xl cursor-pointer m-4 bg-white rounded-full customPadding">
      +
    </div>
    <addGoal v-if="showAddGoal" @close="showAddGoal = false"/>
  </div>
</template>

<script>
import addGoal from '@/components/addGoal.vue';
export default {
  name: "fab",
  components: {
    addGoal
  },
  data: function() {
    return {
      showAddGoal: false
    }
  },
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.customPadding {
    padding-right: 1.1rem;
    padding-left: 1.1rem;
}

</style>
