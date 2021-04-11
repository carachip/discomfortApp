<template>
  <div class="flex flex-col h-full">
    <customHeader :currentPane=2 title="Find Partners"/>
    <div class="h-full m-4 bg-blue-light overflow-y-auto">
        <div class="m-2">
            <div class="mb-2">Find Partners to help you push to new goals!</div>
            <input v-model="search" class="w-full" placeholder="search name or handle..."/>
            <div v-if="search.length > 0" class="absolute bg-gray-200 w-full left-0 w-80 py-2">
                <div @click="selectPartner(partner)" v-for="(partner, index) in filteredList" :key="index">
                    {{partner}}
                </div>
            </div> 
        </div>
        <div>
            <div class="font-bold">My Current Partners</div>
            <div class="flex flex-col items-start pl-4">
                <div v-for="(partner, index) in partners" :key="index">
                    {{partner}}
                </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
import customHeader from "@/components/header.vue";
//import moment from 'moment'
export default {
  name: "FindPartners",
  components: {
    customHeader
  },
  computed: {
    filteredList() {
      return this.searchList.filter(item => {
        return item.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  data: function() {
      return {
          search: '',
      }
  },
  methods: {
      selectPartner: function(partner) {
          this.search = "";
          this.tasks[partner] = [];
          this.partners.push(partner);
      }
  }
};
</script>