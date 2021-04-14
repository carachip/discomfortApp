<template>
  <div class="flex flex-col h-full">
    <customHeader :currentPane=3 title="Settings"/>
    <div class="h-full flex flex-col items-baseline p-3 m-4 bg-blue-light overflow-y-auto">
      <div class="mb-1">Name: Cara Johnson</div>
      <div class="mb-1">Email: <input value="carachip4@gmail.com"/></div>
      <div class="mb-1">Recieve Push notifications for:</div>
      <div class="mb-1"><input type="checkbox" checked="true"/> My tasks</div>
      <div><input type="checkbox"/> My partners tasks</div>
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