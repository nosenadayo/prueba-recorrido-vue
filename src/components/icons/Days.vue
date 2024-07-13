<template>
  <section class="section">
    <h3 class="subtitle">{{ getNextWeekday(rangeDate.start, date.day) }}</h3>
    <template v-for="time in date.time_blocks" :key="time.id">
      <component :is="editMode ? 'EditHours' : 'Hours'"
                 :date="date"
                 :time="time"
                 :user="user"
                 :dateToAssigment="dateToAssigment" />
    </template>
  </section>
</template>

<script>
import Hours from './Hours.vue'
import EditHours from './EditHours.vue'
import {defineComponent, toRefs, ref} from 'vue';
import {useDailyContractsStore} from "@/stores/dailyContractsStore.js";
import {storeToRefs} from "pinia";
import { parseISO, format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';




export default defineComponent({
  name: 'Days',
  components: {
    Hours,
    EditHours
  },
  props: {
    date: {
      type: Object,
      required: true,
      default: () => ({})
    },
    user: {
      type: Object,
      required: true,
      default: () => ({})
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { date, user, editMode } = toRefs(props);


    const store = useDailyContractsStore();
    const { rangeDate } = storeToRefs(store);
    const dateToAssigment = ref(null)

    const getNextWeekday =  (dateStr, day) => {
      let baseDate;
      const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      try{
        baseDate = parseISO(dateStr);
      } catch {
         baseDate = dateStr
      }
      const baseDayIndex = baseDate.getDay();
      const targetDayIndex = daysOfWeek.indexOf(day);

      if (targetDayIndex === -1) {
        throw new Error('Día de la semana no válido');
      }

      const daysToAdd = (targetDayIndex - baseDayIndex + 7) % 7;

      let date = addDays(baseDate, daysToAdd)
      dateToAssigment.value = format(date, 'yyyy-MM-dd');
      return format(date, "EEEE, d 'de' MMMM", { locale: es });
    }




    return {user, date, editMode, getNextWeekday, rangeDate, dateToAssigment};
  }
});
</script>

<style>
/* Estilos personalizados */
</style>
