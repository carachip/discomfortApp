<template>
  <div class="flex flex-col h-full">
    <customHeader :currentPane=1 title="Calendar View"/>
    <div class="h-full m-4 bg-blue-light overflow-y-auto">
      <vc-calendar :attributes='attributes' is-dark/>
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
  computed: {
    attributes() {
      return [
        // Attributes for todos
        ...this.todos.map(todo => ({
          dates: todo.dates,
          dot: {
            color: todo.color,
            class: todo.isComplete ? 'opacity-75' : '',
          },
          popover: {
            label: todo.description,
            visibility: 'click'
          },
          customData: todo,
        })),
      ];
    },
  }
};
</script>