<template>
  <div class="flex flex-col h-full">
    <customHeader :currentPane=3 title="Settings"/>
    <div class="h-full m-4 bg-blue-light overflow-y-auto">

    </div>
  </div>
</template>

<script>
import customHeader from "@/components/header.vue";
//import moment from 'moment'
export default {
  name: "Settings",
  components: {
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