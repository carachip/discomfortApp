<template>
  <div class="flex flex-col h-full">
    <customHeader :currentPane=1 title="Calendar View"/>
    <div class="h-full m-4 bg-blue-light overflow-y-auto">

    </div>
    <fab/>
  </div>
</template>

<script>
import fab from "@/components/fab.vue";
import customHeader from "@/components/header.vue";
//import moment from 'moment'
export default {
  name: "Calendar",
  components: {
    fab, 
    customHeader
  },
  data: function() {
      return {
          
      }
  },
  methods: {
  }
};
</script>