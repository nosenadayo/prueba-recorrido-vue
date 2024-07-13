<template>
  <div class="">
    <div class="columns is-mobile is-multiline is-centered ">
      <template v-for="date in dailyContracts" :key="date.id">
        <div class="column is-narrow">
          <Days :date="date" :user="user" :editMode="editMode" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, toRefs, watch, nextTick} from 'vue';
import Days from './Days.vue';
import {useDailyContractsStore} from "@/stores/dailyContractsStore";
import {useContractsStore} from "@/stores/contractsStore";
import { storeToRefs } from 'pinia'



export default defineComponent({
  name: 'Week',
  components: {
    Days
  },
  props: {
    editMode: {
      type: Boolean,
      required: false,
      default: false
    },
    user: {
      type: Object,
      required: true,
      default: () => ({})
    },
  },
  setup(props) {
    const weekDates = ref([]);
    const { editMode, user } = toRefs(props);
    const store = useDailyContractsStore();
    const { dailyContracts } = storeToRefs(store);
    const storeContracts = useContractsStore();


    watch( () => storeContracts.selectedContract, async (newContractId) => {
        store.fetchDailyContracts(newContractId);
        await nextTick();
    });




    return { weekDates, user, editMode, dailyContracts };
  }
});
</script>
