<template>
  <div class="flex flex-col h-full">
    <customHeader :currentPane=0 title="Task List"/>
    <div class="h-full m-4 bg-blue-light overflow-y-auto">
        <div class="flex items-center p-3 bg-gray">
            <div @click="dropdown = !dropdown">{{currentMessage}}</div>
            <i @click="dropdown = !dropdown" class="fas fa-caret-down pl-2"></i>
            <div v-if="dropdown" class="absolute bg-gray-200 w-full left-0 mt-52 w-80 py-2">
                <div @click="changeView(-1)" :class="[{'bg-gray-300': currentIndex == -1}, 'text-left px-2']">&#8226; My Tasks</div>
                <div class="border-2 border-blue m-1">Or Follow Up On:</div>
                <div @click="changeView(index)" v-for="(partner, index) in partners" :key="index" :class="[{'bg-gray-300': currentIndex == index}, 'text-left px-2']">
                    &#8226; {{partner}}
                </div>
            </div>
        </div>
        <div v-if="currentIndex != -1" class="self-start bg-blue text-white text-sm">CURRENT STREAK: {{streak[partners[currentIndex]]}}</div>
        <div class="pt-2">
            <div v-if="typeof overdue === 'string'">{{overdue}}</div>
            <div v-else>
                <div class="font-bold py-2">Overdue Tasks!</div>
                <div v-for="(tasks, date) in overdue" :key="date">
                    <div class="bg-yellow font-bold text-red-900 pl-3 py-1 text-left">{{date}}</div>
                    <div v-for="(task, index) in tasks" :key="index" class="flex flex-col py-1 px-3 border-b border-blue">
                        <div class="flex items-center justify-between cursor-pointer h-8">
                            <div><span class="italic">{{task.endDate.format("h:mm a")}}</span> - {{task.title}}</div>
                            <div v-if="currentIndex == -1">
                                <i @click="completeTask(task)" v-if="!task.completed" class="far fa-check-circle"></i>
                                <i @click="task.completed = false" v-else class="fas fa-check-circle blue"></i>
                            </div>
                            <div v-else>
                                <div v-if="task.confirmed" @click="confirmTask(task, false)" class="h-8 flex items-center text-xs px-1 text-white border border-blue rounded bg-blue">Confirmed!</div>
                                <div v-else-if="!task.completed" class="text-xs border border-blue rounded px-2 h-8 flex items-center">Remind!</div>
                                <div v-else @click="confirmTask(task, true)" class="h-8 flex items-center w-20 text-xs border border-blue rounded">Confirm Complete!</div>
                            </div>
                        </div>
                        <div v-if="currentIndex == -1" class="flex flex-col text-sm blue items-start">
                            <div>Follow up Partner: {{task.partner}}</div>
                            <div>Streak: {{streak[task.partner]}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="font-bold py-2">Upcoming Tasks</div>
            <div v-for="(tasks, date) in upcoming" :key="date">
                <div class="bg-yellow font-bold pl-3 py-1 text-left">{{date}}</div>
                <div v-for="(task, index) in tasks" :key="index" class="flex flex-col py-1 px-3 border-b border-blue">
                    <div class="flex items-center justify-between cursor-pointer h-8">
                        <div><span class="italic">{{task.endDate.format("h:mm a")}}</span> - {{task.title}}</div>
                        <div v-if="currentIndex == -1">
                            <i @click="completeTask(task)" v-if="!task.completed" class="far fa-check-circle"></i>
                            <i @click="task.completed = false" v-else class="fas fa-check-circle blue"></i>
                        </div>
                        <div v-else>
                            <div v-if="task.confirmed" @click="confirmTask(task, false)" class="h-8 flex items-center text-xs px-1 text-white border border-blue rounded bg-blue" >Confirmed!</div>
                            <div v-else-if="!task.completed" class="text-xs rounded italic">In progress</div>
                            <div v-else @click="confirmTask(task, true)" class="h-8 flex items-center  w-16 text-xs border border-blue rounded">Confirm Complete!</div>
                        </div>
                    </div>
                    <div v-if="currentIndex == -1" class="flex flex-col text-sm blue items-start">
                        <div>Follow up Partner: {{task.partner}}</div>
                        <div>Streak: {{streak[task.partner]}}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <transition name="fade">
        <div v-if="completeDialog" class="flex flex-col absolute w-full bg-yellow top-0 p-4">
            <div class="flex flex-col">
                <div>You have completed task</div>
                <div class="font-bold">{{completedTask.title}}</div>
                <div>Your partner will be notified!</div>
            </div>
            <div @click="completeDialog = false" class="button">Ok</div>
        </div>
    </transition>
    <transition>
        <div v-if="goalAchieved" class="flex flex-col w-3/4 ml-10 mt-10 p-4 text-white bg-yellow border-blue border-2 absolute">
            <div>Congratulations! You've met your goal!</div>
            <div>Your reward is: <span class="font-bold">{{rewardMsg}}</span></div>
            <div @click="goalAchieved = false" class="button-blue mt-2">Yippee!!</div>
        </div>
    </transition>
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
          currentMessage: "My Tasks",
          currentIndex: -1,
          completeDialog: false,
          completedTask: null,
          goalAchieved: false,
          rewardMsg: ""
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
                if (personTasks[j].endDate < moment().startOf('day') && personTasks[j].endDate >= moment().subtract(1, 'days').startOf('day')) {
                    if ( (this.currentIndex == -1 && !personTasks[j].completed) || (this.currentIndex != -1 && !personTasks[j].recognized) ) {
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
                if (personTasks[j].endDate >= moment().startOf('day') && personTasks[j].endDate < moment().add(21, 'days')) {
                    //if ((this.currentIndex == -1 && !personTasks[j].completed) || (this.currentIndex != -1 && !personTasks[j].recognized)) {
                        let date = personTasks[j].endDate.format('DD-MMM-YYYY')
                        upcoming[date].push(personTasks[j]);
                    //}
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

      },
      completeTask(task) {
          var personTasks = this.tasks["Cara Johnson"];
          if (this.currentIndex != -1) {
            personTasks = this.tasks[this.partners[this.currentIndex]];
          }
          for (let i = 0; i < personTasks.length; i++) {
              if (task.id == personTasks[i].id) {
                this.$set(personTasks[i], 'completed', true);
                if (this.currentIndex != -1) {
                    this.$set(this.tasks, this.partners[this.currentIndex], this.tasks[this.partners[this.currentIndex]]);
                }
                break;
              }
          }
          if (this.currentIndex == -1) {
            this.completedTask = task;
            this.completeDialog = true;
          }
      },
      confirmTask(task, confirmed) {
        var person = this.partners[this.currentIndex];
        var personTasks = this.tasks[person];
        for (let i = 0; i < personTasks.length; i++) {
            if (task.id == personTasks[i].id) {
                this.$set(this.tasks[person][i], 'confirmed', confirmed);
                let num = confirmed ? 1: -1;
                let halves = this.streak[person].split('/');
                let newStreak = String(parseInt(halves[0]) + num);
                this.$set(this.streak, person, newStreak + "/" + halves[1]);
                if (newStreak == halves[1]) {
                    this.goalAchieved = true;
                    this.rewardMsg = task.rewardMsg;
                    this.$confetti.start();
                    setTimeout(() => this.$confetti.stop(), 4000);
                }
                break;
            }
        }
      }
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>