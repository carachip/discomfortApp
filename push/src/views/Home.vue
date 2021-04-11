<template>
  <div class="flex flex-col h-full">
    <customHeader :currentPane=0 title="Task List"/>
    <div class="h-full m-4 bg-blue-light overflow-y-auto">
        <div class="flex items-center p-3 bg-gray">
            <div @click="dropdown = !dropdown">{{currentMessage}}</div>
            <i @click="dropdown = !dropdown" class="fas fa-caret-down pl-2"></i>
            <div v-if="dropdown" class="absolute bg-gray-200 w-full left-0 mt-52 w-80 py-2">
                <div @click="changeView(-1)" :class="[{'bg-gray-300': currentIndex == -1}, 'text-left px-2']">&#8226; My Upcoming Tasks</div>
                <div class="border-2 border-blue m-1">Or Follow Up On:</div>
                <div @click="changeView(index)" v-for="(partner, index) in partners" :key="index" :class="[{'bg-gray-300': currentIndex == index}, 'text-left px-2']">
                    &#8226; {{partner}}
                </div>
            </div>
        </div>
        <div class="pt-2">
            <div v-if="typeof overdue === 'string'">{{overdue}}</div>
            <div v-else>
                <div class="font-bold py-2">Overdue Tasks!</div>
                <div v-for="(tasks, date) in overdue" :key="date">
                    <div class="bg-yellow font-bold text-red-900 pl-3 py-1 text-left">{{date}}</div>
                    <div v-for="(task, index) in tasks" :key="index" class="flex items-center justify-between cursor-pointer py-1 px-4 border-b border-blue">
                        {{task.title}}
                        <i @click="task.completed = true" v-if="!task.completed" class="far fa-check-circle"></i>
                        <i @click="task.completed = false" v-else class="fas fa-check-circle blue"></i>
                    </div>
                </div>
            </div>
            <div class="font-bold py-2">Upcoming Tasks</div>
            <div v-for="(tasks, date) in upcoming" :key="date">
                <div class="bg-yellow font-bold pl-3 py-1 text-left">{{date}}</div>
                <div v-for="(task, index) in tasks" :key="index" class="flex items-center justify-between cursor-pointer py-1 px-4 border-b border-blue">
                    {{task.title}}
                    <i @click="task.completed = true" v-if="!task.completed" class="far fa-check-circle"></i>
                    <i @click="task.completed = false" v-else class="fas fa-check-circle blue"></i>
                </div>
            </div>
        </div>

    </div>
    <fab/>
  </div>
</template>

<script>
import moment from 'moment';
import fab from "@/components/fab.vue";
import customHeader from "@/components/header.vue";
export default {
  name: "Home",
  components: {
    fab, 
    customHeader
  },
  data: function() {
      return {
          dropdown: false,
          currentMessage: "My Upcoming Tasks",
          currentIndex: -1
      }
  },
  computed: {
      overdue: function() {
          var person = "Cara Johnson";
          if (this.currentIndex != -1) {
              person = this.partners[this.currentIndex];
          }
          var yesterday = moment().subtract(1, 'days').format('DD-MMM-YYYY');
          var overdue = {};
          overdue[yesterday] = []; //only show one day before
          var personTasks = this.tasks[person];
          if (personTasks) {
            for (let j = 0; j < personTasks.length; j++) {
                //check if date has past and only show up to one day late
                if (personTasks[j].endDate < moment() && personTasks[j].endDate >= moment().subtract(1, 'days')) {
                    if ((this.currentIndex == -1 && !personTasks[j].completed) || (this.currentIndex != -1 && !personTasks[j].recognized)) {
                        overdue[yesterday].push(personTasks[j]);
                    }
                }
            }
          }
          if (overdue[yesterday].length == 0) {
              return "No overdue tasks!"
          }
          return overdue;
      },
      upcoming: function() {
          var person = "Cara Johnson";
          if (this.currentIndex != -1) {
              person = this.partners[this.currentIndex];
          }
          var upcoming = {};
          //show next three weeks
          for (let i = 0; i < 21; i++) {
              upcoming[moment().add(i, 'days').format('DD-MMM-YYYY')] = [];
          }
          var personTasks = this.tasks[person];
          if (personTasks) {
            for (let j = 0; j < personTasks.length; j++) {
                if (personTasks[j].endDate >= moment() && personTasks[j].endDate < moment().add(21, 'days')) {
                    if ((this.currentIndex == -1 && !personTasks[j].completed) || (this.currentIndex != -1 && !personTasks[j].recognized)) {
                        let date = personTasks[j].endDate.format('DD-MMM-YYYY')
                        upcoming[date].push(personTasks[j]);
                    }
                }
            }
          }
          for (var date in upcoming) {
              if (upcoming[date].length == 0) {
                  delete upcoming[date];
              }
          }
          return upcoming;
      }
  },
  methods: {
      changeView(index) {
          this.currentIndex = index;
          if (index == -1) {
              this.currentMessage = "My Upcoming Tasks";
          }
          else {
              this.currentMessage = "Follow up on " + this.partners[index];
          }
          this.dropdown = false;

      }
  }
};
</script>