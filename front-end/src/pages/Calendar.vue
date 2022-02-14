<template>
  <div class="app">
    <div class="app-main">
      <FullCalendar class="app-calendar" :options="calendarOptions">
      </FullCalendar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@fullcalendar/core/vdom'; // solve problem with Vite
import FullCalendar, {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useStore } from 'src/store';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

export default defineComponent({
  components: {
    FullCalendar,
  },
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    let currentEvents = [] as EventApi[];

    // methods
    // 일정 생성하기
    const handleDateSelect = (arg: DateSelectArg) => {
      const now = new Date();
      if (arg.start <= now) {
        $q.dialog({
          title: '지난 시간입니다.',
          message: '당일 일정은 Day에서 이용해주세요!',
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        });
      } else {
        $q.dialog({
          title: '일정 관리',
          message: '시간 설정은 Day에서 이용해주세요',
          prompt: {
            model: '',
            type: 'text', // optional
          },
          cancel: true,
          persistent: true,
        })
          .onOk((data) => {
            let calendarApi = arg.view.calendar;
            calendarApi.addEvent({
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              title: data,
              start: arg.start,
              end: arg.end,
              allDay: arg.allDay,
            });
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }
    };

    // 일정 삭제하기
    const handleEventClick = (arg: EventClickArg) => {
      $q.dialog({
        title: 'Delete Schedule',
        message: '일정을 삭제하시겠습니까?',
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          arg.event.remove();
          // db에서도 삭제할 수 있도록 함
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    };

    // 등록되었을 배열에 추가, 일정이 바뀐 events들 확인 후 backend에 data 전달하고 배열에서 제거
    const changeEvent = (events: EventApi[]) => {
      currentEvents = events;
      if (currentEvents.length > 0) {
        console.log(currentEvents);

        // all-day가 아닌 경우 일정이 등록되었다는 뜻이므로 backend data보내기
        for (let i = 0; i < currentEvents.length; i++) {
          if (currentEvents[i].allDay === false) {
            console.log(currentEvents[i].start);
            // backend로 보내기

            currentEvents.splice(i);
          }
        }
      }
      // console.log(currentEvents);
    };

    // fullcalendar options
    const calendarOptions = {
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin, // needed for dateClick
      ],
      headerToolbar: {
        left: 'prev,next today', // 이전, 다음, 오늘로 이동하는 버튼
        center: 'title', // 월-연도 표시
        right: 'dayGridMonth timeGridDay', // 월, 주, 일 frame
      },
      buttonText: {
        today: 'Today',
        month: 'Month',
        day: 'Day',
      },
      initialView: 'dayGridMonth', // 첫 화면 default 값이 오늘 날짜
      expandRows: true,
      selectOverlap: false,
      slotEventOverlap: false, // 동일시간 대 불가능
      editable: true, // 수정(day에서 drag로 시간 늘이고 줄이기 가능)
      selectable: true, // select한 일자 drag 가능
      dayMaxEvents: true, // event 갯수가 많아서 칸 초과했을 때 +개수로 표기
      nowIndicator: true, // 현재 시간 마크
      navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
      select: handleDateSelect, // 날짜 선택 후 event 등록
      eventClick: handleEventClick,
      eventsSet: changeEvent, // 등록한 일정, 변경된 일정 check
    } as CalendarOptions;

    // 이미 등록되어있는 이벤트는 eventSet에 추가(created)
    const $route = useRoute();
    $store
      .dispatch('calendar/addEvent', $route.params.userId)
      .catch(console.log);

    return {
      calendarOptions,
      currentEvents,
    };
  },
});
</script>

<style lang="css">
.app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>

function onCreate(arg0: () => void) { throw new Error('Function not
implemented.'); }
