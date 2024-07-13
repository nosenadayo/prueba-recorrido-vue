<template>
  <div class="box">
    <div class="">
      <div class="has-text-centered">
        <div :class="colorClassHour(assignment)">
          {{ time.hour }}
        </div>
        <template v-if="!loading" >
          <template v-for="assigned in assignment" :key="assigned.id">
              <div :class="colorClass(assigned.user)">
                  {{ assigned.user.name }}
              </div>
          </template>
          <h1 v-show="!assignment.length">⚠️</h1>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, toRefs, watchEffect} from 'vue';
import { useAssignments } from '../../api';

export default defineComponent({
  name: 'Hours',
  props: {
    time: {
      type: Object,
      required: true
    },
    date: {
      type: Object,
      required: true
    },
    dateToAssigment: {
      type: String
    }
  },
  setup(props) {
    // Using toRefs to retain reactivity of props
    const { time, user, editMode, date, dateToAssigment} = toRefs(props);

    const { assignment,
      loading,
      error,
      fetchUserAssignmentByDate } = useAssignments();

    const fetchAssignment =  async () => {
      await fetchUserAssignmentByDate(props.date.contract_id, props.date.id, props.time.id, props.dateToAssigment)
    }

    const colorClassHour = () => {

      if(assignment.value && assignment.value.length === 0 ) {
        return 'has-text-danger'
      }
      else {
        return 'has-text-success'
      }

    };

    const colorClass = (user) => {
      if(!user) { return 'asd'}

      return {
        'has-text-danger': user.color === 'red',
        'has-text-link': user.color === 'blue',
        'has-text-success': user.color === 'green',
        'has-text-warning': user.color === 'peru',
      };
    };

    watchEffect(fetchAssignment);
    return { time, user, colorClass, editMode, colorClassHour, assignment, loading};
  }
});
</script>
