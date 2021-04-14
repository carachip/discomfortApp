
import moment from 'moment';
export default {
    directives: {
        clickoutside: {
            bind: function (el, binding, vnode) {
                el.clickOutsideEvent = function (event) {
                if (!(el == event.target || el.contains(event.target))) {
                    vnode.context[binding.expression](event);
                }
                };
                document.body.addEventListener('click', el.clickOutsideEvent)
            },
            unbind: function (el) {
                document.body.removeEventListener('click', el.clickOutsideEvent)
            },
            stopProp(event) { event.stopPropagation() }
        }
    },
    data: function() {
        const todos = [
            {
              description: 'Take Noah to basketball practice.',
              isComplete: false,
              dates: { weekdays: 6 }, // Every Friday
              color: 'red',
            },
          ];
        return {
            todos,
            partners: ['Zacharie Johnson', 'Jordan Chipman', 'Katie Cooper', 'Karli Stichter'],
            streak: {'Zacharie Johnson': '4/40', 'Jordan Chipman': '4/4', 'Katie Cooper': '31/32', 'Karli Stichter': '0/20'},
            searchList: ['Ashley Williams', 'Bethany Smith', 'Charlotte Cooper' , 'Derek Williams', 'Emily Machado','Pipen Williams', 'Jeremie Johnson', 'Jake Cooper'],
            tasks: {
                'Cara Johnson': [
                    {
                        id: 0,
                        title: 'Read Scriptures',
                        endDate: moment().hour(8).minutes(0).subtract(1, 'days'),
                        completed: false,
                        confirmed: false,
                        partner: "Katie Cooper",
                        rewardMsg: "Tucanos!"
                    },
                    {
                        id: 1,
                        title: 'Finish all hw',
                        endDate: moment().hour(5).minutes(0).subtract(1, 'days'),
                        completed: false,
                        confirmed: false,
                        partner: "Zacharie Johnson",
                    },
                    {
                        id: 2,
                        title: 'Read Scriptures',
                        endDate: moment().hour(8).minutes(0),
                        completed: false,
                        confirmed: false,
                        partner: "Katie Cooper",
                        rewardMsg: "Tucanos!"
                    },
                    {
                        id: 3,
                        title: 'Read Scriptures',
                        endDate: moment().hour(8).minutes(0).add(1, 'days'),
                        completed: false,
                        confirmed: false,
                        partner: "Katie Cooper",
                        rewardMsg: "Tucanos!"
                    },
                    {
                        id: 4,
                        title: 'Read Scriptures',
                        endDate: moment().hour(8).minutes(0).add(2, 'days'),
                        completed: false,
                        confirmed: false,
                        partner: "Zacharie Johnson",
                    },
                    {
                        id: 5,
                        title: 'Vacuum house',
                        endDate: moment().hour(15).minutes(0).add(2, 'days'),
                        completed: false,
                        confirmed: false,
                        partner: "Zacharie Johnson",
                    },
                    {
                        id: 6,
                        title: 'Get groceries',
                        endDate: moment().hour(17).minutes(0).add(2, 'days'),
                        completed: false,
                        confirmed: false,
                        partner: "Zacharie Johnson",
                    },
                    {
                        id: 7,
                        title: 'Read Scriptures',
                        endDate: moment().hour(8).minutes(0).add(3, 'days'),
                        completed: false,
                        confirmed: false,
                        partner: "Katie Cooper",
                        rewardMsg: "Tucanos!"
                    },
                    {
                        id: 8,
                        title: 'Make dinner!',
                        endDate: moment().hour(19).minutes(0).add(2, 'days'),
                        completed: false,
                        confirmed: false,
                        partner: "Zacharie Johnson",
                    },
                    {
                        id: 9,
                        title: 'Read Scriptures',
                        endDate: moment().hour(8).minutes(0).add(4, 'days'),
                        completed: false,
                        confirmed: false,
                        partner: "Katie Cooper",
                        rewardMsg: "Tucanos!"
                    }
                ],
                'Zacharie Johnson': [
                  {
                      id: 0,
                      title: 'Read Scriptures',
                      beginDate: '',
                      endDate: moment().hour(8).minutes(0).subtract(1, 'days'),
                      partner: 'Cara Johnson',
                      frequency: '',
                      reminderTime: '',
                      rewardMessage: '',
                      rewardType: 0,
                      rewardRecognizeLeft: 4,
                      completed: false,
                      confirmed: false
                  },
                  {
                      id: 1,
                      title: 'Do Taxes',
                      endDate: moment().hour(8).minutes(0),
                      completed: true,
                      confirmed: false,
                      partner: 'Cara Johnson'
                  },
                  {
                      id: 2,
                      title: 'Read Scriptures',
                      endDate: moment().hour(8).minutes(0).add(3, 'days'),
                      completed: false,
                      confirmed: false,
                      partner: 'Cara Johnson'
                  },
                  {
                      id: 3,
                      title: 'Read Scriptures',
                      endDate: moment().hour(8).minutes(0).add(4, 'days'),
                      completed: false,
                      confirmed: false,
                      partner: 'Cara Johnson'
                  }
              ],
              'Jordan Chipman': [
                {
                    id: 0,
                    title: 'Read Scriptures',
                    beginDate: '',
                    endDate: moment().hour(8).minutes(0).subtract(1, 'days'),
                    partner: 'Cara Johnson',
                    frequency: '',
                    reminderTime: '',
                    rewardMessage: '',
                    rewardType: 0,
                    rewardRecognizeLeft: 4,
                    completed: false,
                    confirmed: false
                },
                {
                    id: 1,
                    title: 'Do Taxes',
                    endDate: moment(),
                    completed: true,
                    confirmed: false,
                    partner: 'Cara Johnson'
                },
                {
                    id: 2,
                    title: 'Read Scriptures',
                    endDate: moment(),
                    completed: false,
                    confirmed: false,
                    partner: 'Cara Johnson'
                },
                {
                    id: 3,
                    title: 'Read Scriptures',
                    endDate: moment().hour(18).minutes(0).add(2, 'days'),
                    completed: false,
                    confirmed: false,
                    partner: 'Cara Johnson'
                }
            ],
            'Katie Cooper': [
              {
                  id: 0,
                  title: 'Read Scriptures',
                  beginDate: '',
                  endDate: moment().hour(8).minutes(0).subtract(1, 'days'),
                  partner: 'Cara Johnson',
                  frequency: '',
                  reminderTime: '',
                  rewardMessage: '',
                  rewardType: 0,
                  rewardRecognizeLeft: 4,
                  completed: false,
                  confirmed: false,
                  rewardMsg: "Tucanos!"
              },
              {
                  id: 1,
                  title: 'Do Taxes',
                  endDate: moment(),
                  completed: true,
                  confirmed: false,
                  partner: 'Cara Johnson',
                  rewardMsg: "Tucanos!"
              },
              {
                  id: 2,
                  title: 'Read Scriptures',
                  endDate: moment(),
                  completed: false,
                  confirmed: false,
                  partner: 'Cara Johnson',
                  rewardMsg: "Tucanos!"
              },
              {
                  id: 3,
                  title: 'Read Scriptures',
                  endDate: moment().hour(8).minutes(0).add(1, 'days'),
                  completed: false,
                  confirmed: false,
                  partner: 'Cara Johnson',
                  rewardMsg: "Tucanos!"
              }
            ],
            'Karli Stichter': [
                {
                    id: 0,
                    title: 'Read Scriptures',
                    beginDate: '',
                    endDate: moment("4/11/21 8:00:00"),
                    partner: 'Cara Johnson',
                    frequency: '',
                    reminderTime: '',
                    rewardMessage: '',
                    rewardType: 0,
                    rewardRecognizeLeft: 4,
                    completed: false,
                    confirmed: false
                },
                {
                    id: 1,
                    title: 'Do Taxes',
                    endDate: moment(),
                    completed: true,
                    confirmed: false,
                    partner: 'Cara Johnson'
                },
                {
                    id: 2,
                    title: 'Read Scriptures',
                    endDate: moment(),
                    completed: false,
                    confirmed: false,
                    partner: 'Cara Johnson'
                },
                {
                    id: 3,
                    title: 'Read Scriptures',
                    endDate: moment("4/9/21 8:00:00"),
                    completed: false,
                    confirmed: false,
                    partner: 'Cara Johnson'
                }
            ],
          },
        }
    },
}