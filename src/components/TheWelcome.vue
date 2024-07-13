<script setup>
import Users from './icons/Users.vue'
import Contracts from './icons/Contracts.vue'
import WeekSelector from './icons/WeekSelector.vue'
import ButtonEdit from './icons/ButtonEdit.vue'
import Week from './icons/Week.vue'
import { ref, watch } from 'vue';
import { useContractsStore } from '../stores/contractsStore';


const initialDate = ref(new Date());
const currentUser = ref({ name: 'Juan', color: 'orange' });
const editMode = ref(false)
const contractSelected = ref({})


const updateEditMode = (value) => {
  editMode.value = value;
};

const updateContractSelected = (value) => {
  contractSelected.value = value;
};

useContractsStore().fetchContracts();


</script>
<template>
  <section class="section">
    <Contracts />
    <WeekSelector :initialDate="initialDate" />
    <ButtonEdit @edit-mode-changed="updateEditMode"/>
  </section>
  <Users :editMode="editMode" />
  <Week :user="currentUser" :editMode="editMode" />
</template>
