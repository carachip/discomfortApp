<template>
  <div class="absolute left-0 top-0 bg-blue w-full h-full">
    <div class="flex flex-col bg-blue-light m-4" style="height: calc(100% - 2rem)">
        <div class="flex justify-between items-center bg-gray p-3 text-xl">
            <div class="flex">
                <div class="push-font mr-2 text-2xl">Push</div> 
                <div>for a new Goal!</div>
            </div>
            <i @click="close" class="far fa-times-circle"></i>
        </div>
        <div class="flex justify-between h-full">
            <div class="p-3 overflow-y-auto w-full">
                <div class="flex py-1 whitespace-nowrap items-center">Partner
                    <select v-model="chosenPartner" class="ml-2 w-full">
                        <option v-for="partner in partners" :key="partner">{{partner}}</option>
                    </select>
                </div>
                <div class="flex font-bold"><input @click="checkGoalType(0)" type="checkbox" id="goal0" class="mr-1"/>Goal Info</div>
                <div v-if="newGoalType == 0">
                    <div class="flex py-1 whitespace-nowrap items-center">Title<input v-model="title" class="w-full ml-2"/></div>
                    <div class="flex py-1 whitespace-nowrap items-center">
                        <div class="mr-2">Starts</div>
                        <vc-date-picker v-model="date" mode="dateTime">
                            <template v-slot="{ inputValue, inputEvents }">
                                <input class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                                    :value="inputValue"
                                    v-on="inputEvents"
                                />
                            </template>
                        </vc-date-picker>
                    </div>
                    <div class="flex py-1 whitespace-nowrap items-center">
                        <input v-model="reminder" type="checkbox"/>
                        <div class="ml-2">Reminder</div>
                        <div v-if="reminder" class="flex items-center">
                            <input v-model="reminderNum" type="number" min=0 class="ml-2 w-10"/>
                            <select v-model="reminderFreq" class="ml-2">
                                <option v-for="option in ['minutes', 'hours', 'days', 'weeks']" :key="option">{{option}}</option>
                            </select>
                            <div class="ml-2">before</div>
                        </div>
                    </div>
                    <div class="flex items-center border-t border-blue mt-1 pt-1">
                        <input v-model="repeat" class="mr-2" type="checkbox"/>
                        <div class="font-bold">Repeat</div>
                    </div>
                    <div>
                        <select :disabled="!repeat" v-model="repeatFreq" class="w-24 flex my-1">
                            <option v-for="x in ['daily','weekly','monthly','yearly']" :key="x">{{x}}</option>
                        </select>
                        <div v-if="repeatFreq=='weekly' && repeat" class="flex justify-between py-1 whitespace-nowrap">
                            <div>On</div>
                            <div class="flex">
                                <div v-for="(weekday, index) in ['S', 'M', 'T', 'W', 'T', 'F', 'S']" :key="index" 
                                    @click="updateWeekday(index)"
                                    :class="[{'bg-blue text-white': weekdays[index]}, 'border border-blue cursor-pointer px-2 mx-1']">
                                    {{weekday}}
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center py-1 whitespace-nowrap">
                            <div>Ends</div>
                            <select :disabled="!repeat" v-model="ends" class="ml-2">
                                <option v-for="option in ['On', 'After', 'Never']" :key="option">{{option}}</option>
                            </select>
                            <vc-date-picker v-if="ends == 'On'" v-model="endDate" mode="dateTime" class="ml-2">
                                <template v-slot="{ inputValue, inputEvents }">
                                    <input :disabled="!repeat" class="py-1 w-40 border rounded focus:outline-none focus:border-blue-300"
                                        :value="inputValue"
                                        v-on="inputEvents"
                                    />
                                </template>
                            </vc-date-picker>
                            <div v-else-if="ends=='After'" class="flex">
                                <input :disabled="!repeat" v-model="endsAfter" min=1 class="w-12 mx-2" />
                                <div>events</div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="flex font-bold border-t border-blue mt-1"><input @click="checkGoalType(1)" type="checkbox" id="goal1" class="mr-1"/>Goal Reward</div>
                <div v-if="newGoalType == 1">
                    <div class="flex py-1 whitespace-nowrap items-center">Reward Message</div>
                    <textarea v-model="rewardMsg" rows=2 class="w-full p-1"/>
                    <div class="flex py-1">Reward requirement</div>
                    <div class="border border-blue">
                        <div @click="goalType=true" :class="[{'bg-blue text-white': goalType}]">Consecutive (in order)</div>
                        <div @click="goalType=false" :class="[{'bg-blue text-white': !goalType}]">Cumulative (in total)</div>
                    </div>
                    <div v-if="repeat" class="flex py-1 whitespace-nowrap items-center">Number of Recognizes Required<input v-model="recsNum" min=1 type="number" class="w-full ml-2"/></div>
                </div>
            </div>
        </div>
        <div @click="validateAndSave" class="button-yellow self-end m-4">Add Goal!</div>
    </div>
    <transition name="slide">
        <div v-if="errors" class="flex flex-col absolute w-full bg-yellow top-0 p-4">
            <div>You must complete all fields!</div>
            <div @click="errors = false" class="button">Ok</div>
        </div>
    </transition>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: "addGoal",
  data: function() {
      return {
          title: "",
          chosenPartner: "",
          date: new Date(),
          reminder: false,
          reminderNum: 0,
          reminderFreq: "",
          repeat: false,
          repeatFreq: "",
          weekdays: [false, false, false, false, false, false, false],
          ends: 'On',
          endDate: new Date(),
          endsAfter: 0,
          rewardMsg: "",
          goalType: true,
          recsNum: 1,
          errors: false,
          newGoalType: -1,
      }
  },
  computed: {
      today: function(){
          return moment().format("YYYY-DD-MM");
      }
  },
  methods: {
      close: function() {
          this.$emit("close");
      },
      updateWeekday: function(index) {
          this.$set(this.weekdays, index,  !this.weekdays[index]);
      },
      validateAndSave: function() {
          if ( this.chosenPartner == "" ||
                (this.newGoalType == -1 ) ||
                (this.newGoalType == 0 && (this.title == "" || (this.reminder && this.reminderFreq == "") || (this.repeat && this.repeatFreq == "")) ) ||
                (this.newGoalType == 1 && this.rewardMsg == "")) {
              this.errors = true;    
          }
          else {
              this.close();
          }
      },
      checkGoalType(type) {
          if (this.newGoalType == -1) {
              this.newGoalType = type;
          }
          else if (this.newGoalType == type) {
              this.newGoalType = -1;
          }
          else if (this.newGoalType != type) {
              document.getElementById('goal' + this.newGoalType).checked = false;
              this.newGoalType = type;   
          }
          else {
              this.newGoalType = type;
          }
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
select, input{
    height: 1.5rem;
    border-radius: .25rem;
}

.slide-leave-active,
.slide-enter-active {
  transition: .5s;
}
.slide-enter {
  transform: translate(0, -100%);
}
.slide-leave-to {
  transform: translate(0, -100%);
}
</style>
