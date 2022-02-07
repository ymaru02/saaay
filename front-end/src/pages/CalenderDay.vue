<template>
  <div class="subcontent">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />

    <div class="row justify-center">
      <div style="display: flex; max-width: 800px; width: 100%; height: 400px">
        <q-calendar-day
          ref="calendar"
          v-model="selectedDate"
          :hour24-format="hour24"
          bordered
          animated
        />
      </div>
    </div>
  </div>
</template>

<script>
import { QCalendarDay } from '@quasar/quasar-ui-qcalendar/src/index.js';
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass';
import { defineComponent } from 'vue';
import NavigationBar from '../components/CalendarBar.vue';

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 일

export default defineComponent({
  name: 'DayHour24Format',
  components: {
    NavigationBar,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    QCalendarDay,
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      selectedDate: year + '-' + month + '-' + date,
      hour24: true,
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
  },
});
</script>
