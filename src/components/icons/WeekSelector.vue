<template>
  <div class="select">
    <select v-model="rangeDate"  >
      <option v-for="(week, index) in weeks" :key="index" :value="week">
        Semana {{ index + 1 }}: {{ formatDateRange(week) }}
      </option>
    </select>
  </div>
</template>
<script>
import {defineComponent, ref, computed} from 'vue';
import {useDailyContractsStore} from "@/stores/dailyContractsStore.js";
import {storeToRefs} from "pinia";

export default defineComponent({
  name: 'WeekSelector',
  props: {
    initialDate: {
      type: Date,
      required: true
    }
  },
  setup(props) {
    const store = useDailyContractsStore();
    const { rangeDate } = storeToRefs(store);

    const generateWeeks = (date) => {
      const weeks = [];
      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      while (start.getMonth() === date.getMonth()) {
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        weeks.push({ start: new Date(start), end: new Date(end) });
        start.setDate(start.getDate() + 7);
      }
      rangeDate.value = weeks[0]
      return weeks;
    };

    const weeks = computed(() => generateWeeks(props.initialDate));

    const formatDateRange = (week) => {
      const options = { month: 'short', day: 'numeric' };
      return `${week.start.toLocaleDateString(undefined, options)} - ${week.end.toLocaleDateString(undefined, options)}`;
    };


    return { weeks, formatDateRange , rangeDate};
  }
});
</script>

