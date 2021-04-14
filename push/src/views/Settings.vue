<template>
  <div class="flex flex-col h-full">
    <customHeader :currentPane=3 title="Settings"/>
    <div class="h-full flex flex-col items-baseline p-3 m-4 bg-blue-light overflow-y-auto">
      <div class="flex mb-1"><div class="font-bold mr-1">Name:</div>Cara Johnson</div>
      <div class="mb-1 font-bold">Email: <input value="carachip4@gmail.com"/></div>
      <div class="mb-1 font-bold">Recieve Push notifications for:</div>
      <div class="mb-1"><input type="checkbox" checked="true"/> My tasks</div>
      <div><input type="checkbox"/> My partners tasks</div>
      <router-link to="/" class="button-blue text-white mt-4">Logout</router-link>
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