
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
            searchList: ['Ashley Williams', 'Bethany Smith', 'Charlotte Cooper' , 'Derek Williams', 'Emily Machado','Pipen Williams', 'Jeremie Johnson', 'Jake Cooper'],
            tasks: {
              'Zacharie Johnson': [
                  {
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
                      recognized: false
                  },
                  {
                      title: 'Do Taxes',
                      endDate: moment(),
                      completed: true,
                      recognized: false,
                  },
                  {
                      title: 'Read Scriptures',
                      endDate: moment(),
                      completed: false,
                      recognized: false,
                  },
                  {
                      title: 'Read Scriptures',
                      endDate: moment("4/9/21 8:00:00"),
                      completed: false,
                      recognized: false,
                  }
              ]
          },
        }
    },
}