<template>
  <div class="card">
        <div class="card-header">
          <p class="card-header-title is-centered">
            {{ time.hour }}
          </p>
        </div>
    <div class="card-content">
      <div v-for="usr in users" :key="usr.id" class="grid">
        <div class="cell">
          <label class="checkbox">
            <input type="checkbox" :checked="usr.assigned" @change="toggleUser(date, time, usr, dateToAssigment)" />
            {{ usr.name }}
          </label>
          <span v-show="user?.error_assigned">{{ user.error_assigned }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, nextTick, ref, toRefs, watch, watchEffect} from 'vue';
import axios from 'axios';
import {useDailyContractsStore} from "@/stores/dailyContractsStore.js";
import {useUsers} from "@/api/index.js";
import config from '../../config';
import Swal from "sweetalert2";

axios.defaults.baseURL = config.apiBaseUrl;

export default defineComponent({
  name: 'EditHours',
  props: {
    date: {
      type: Object,
      required: true
    },
    time: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true,
      default: () => ({})
    },
    dateToAssigment: {
      type: String
    }
  },
  setup(props) {
    const { time, user, date } = toRefs(props);
    const { users, fetchUsers  } = useUsers();

    const toggleUser = async (date, time, user, dateToAssigment) => {
      user.assigned = !user.assigned
      try {
        const url = `contracts/${date.contract_id}/daily_contracts/${date.id}/time_blocks/${time.id}/assignments`
        const data = {
          assignment: {
            time_block_id: time.id,
            user_id: user.id,
            assigned: user.assigned,
            date: dateToAssigment
          }
        }
        await axios.post(url, data);

      } catch (error) {
        user.assigned = !user.assigned
        Swal.fire({
          title: "Acción no permitida",
          text: error.response.data.error,
          icon: "error"
        });
      }
    };

    const store = useDailyContractsStore();

    const fetchUsersData = async () =>{
      await fetchUsers(store.contractId, props.date.id, props.time.id, props.dateToAssigment)
      await nextTick();
    }

    watch( () => store.rangeDate, async (newRangeDate) => {
      await fetchUsers(store.contractId,props.date.id, props.time.id, props.dateToAssigment)
      await nextTick();
    });

    watchEffect(fetchUsersData);

    watchEffect(user);

    return { time, user, users, toggleUser, fetchUsersData };
  }
});
</script>
