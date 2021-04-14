<template>
  <div class="flex flex-col h-full">
    <customHeader :currentPane=1 title="Task Streak"/>
    <div class="h-full m-4 p-3 bg-blue-light overflow-y-auto">
      <div v-for="partner in partners" :key="partner" class="flex flex-col items-baseline" >
        <div class="font-bold bg-gray w-full">{{partner}}</div>
        <div class="font-bold">Current streak: {{streak[partner]}}</div>
        <div class="font-bold">My Tasks:</div>
        <div v-for="(task, index) in individualTasks[partner].me" :key="partner + index + task + 0">{{task}}</div>
        <div class="font-bold">Their Tasks:</div>
        <div v-for="(task, index) in individualTasks[partner].them" :key="partner + index + task">{{task}}</div>
      </div>
    </div>
    <fab/>
  </div>
</template>

<script>
import fab from "@/components/fab.vue";
import customHeader from "@/components/header.vue";
//import moment from 'moment'
export default {
  name: "TaskStreak",
  components: {
    fab, 
    customHeader
  },
  data: function(){
    return {
    }
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
          customData: todo,
        })),
      ];
    },
    individualTasks() {
      //['Zach': []]
      var iTasks = {};
      for (let i = 0; i < Object.keys(this.tasks).length; i++) {
        let person = Object.keys(this.tasks)[i];
        if (person == "Cara Johnson") {
          continue;
        }
        let newTasks = []
        for (let j = 0; j < this.tasks[person].length; j++) {
          if (!newTasks.includes(this.tasks[person][j].title)) {
            newTasks.push(this.tasks[person][j].title);
          }
        }
        iTasks[person] = {'them': [], 'me': []};
        iTasks[person].them = newTasks;
        iTasks[person].me = [];
      }
      for (let i = 0; i < this.tasks["Cara Johnson"].length; i++) {
        var curTask = this.tasks["Cara Johnson"][i];
        if (!iTasks[curTask.partner].me.includes(curTask.title)) {
          iTasks[curTask.partner].me.push(curTask.title);
        }
      }
      return iTasks;
    }
  }
    
};
</script>