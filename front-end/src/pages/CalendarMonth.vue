<template>
  <div class="subcontent">
    <calendar-bar @prev="onPrev" @today="onToday" @next="onNext" />

    <div class="row justify-center">
      <div style="display: flex; max-width: 800px; width: 100%">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          dark
          :day-min-height="40"
          animated
          bordered
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-day="onClickDay"
          @click-workweek="onClickWorkweek"
          @click-head-workweek="onClickHeadWorkweek"
          @click-head-day="onClickHeadDay"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { QCalendarMonth } from '@quasar/quasar-ui-qcalendar/src/index.js';
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass';

import { defineComponent } from 'vue';
import CalendarBar from '../components/CalendarBar.vue';

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 일

export default defineComponent({
  name: 'MonthDark',
  components: {
    CalendarBar,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    QCalendarMonth,
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      selectedDate: year + '-' + month + '-' + date,
    };
  },
  methods: {
    onToday() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$refs.calendar.moveToToday();
    },
    onPrev() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$refs.calendar.prev();
    },
    onNext() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$refs.calendar.next();
    },
    onMoved(data) {
      // 월 이동할 때<이전, 다음 페이지 눌렀을 때>
      console.log('onMoved', data);
    },
    onChange(data) {
      // 달력이 변경될 때
      console.log('onChange', data);
    },
    onClickDate(data) {
      // calendar의 날짜(숫자) 클릭했을 때
      console.log('onClickDate', data);
    },
    onClickDay(data) {
      // calendar의 날짜(공백) 부분 클릭했을 때
      console.log('onClickDay', data);
    },
    onClickHeadDay(data) {
      // 요일 클릭
      console.log('onClickHeadDay', data);
    },
  },
});
</script>
