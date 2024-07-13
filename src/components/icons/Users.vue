<template>
  <section class="section">
  <nav class="level">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Sin Asignar</p>
        <p class="title">{{countUnassigned}}</p>
      </div>
    </div>
    <template v-for="user in users" :key="user.id">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{ user.name }}</p>
          <p class="title">{{ user.countAssigned }}</p>
        </div>
      </div>
    </template>
  </nav>
  </section>
</template>
<script setup>
import {useUsers, useContracts} from "@/api/index.js";
import {nextTick, toRefs, defineProps, watchEffect, watch} from "vue";
import {useDailyContractsStore} from "@/stores/dailyContractsStore.js";
import {format} from "date-fns";

const props = defineProps({
  editMode: { type: Boolean, required: true },
})
const { editMode } = toRefs(props);

const { users, fetchUsers  } = useUsers();
const { countUnassigned, fetchCountUnassigned } = useContracts()
const store = useDailyContractsStore();

const fetchUsersData = async () =>{
  const date = format(store.rangeDate.start, 'yyyy-MM-dd');
  await fetchUsers(store.contractId, null, null, date)
  await fetchCountUnassigned(store.contractId, date)
  await nextTick();
}

watchEffect( () => store.rangeDate, async (newRangeDate) => {
  const date = format(newRangeDate.start, 'yyyy-MM-dd');
  await fetchUsers(store.contractId, null, null, date)
  await fetchCountUnassigned(store.contractId, date)
  await nextTick();
});

watch( () => props.editMode, async (newRangeDate) => {
  const date = format(store.rangeDate.start, 'yyyy-MM-dd');
  await fetchUsers(store.contractId, null, null, date)
  await fetchCountUnassigned(store.contractId, date)
  await nextTick();
});


watchEffect(fetchUsersData);

</script>
