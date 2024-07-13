<template>
  <div class="select">
    <select v-if="!loading" v-model="selectedContract" >
      <option value="none">Selecciona un Servicio</option>
      <option v-for="contract in contracts" :key="contract.id" :value="contract.id">
        {{ contract.service_name }}
      </option>
    </select>
    <div v-else>Loading...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { useContractsStore } from '../../stores/contractsStore';
import { storeToRefs } from 'pinia'
const store = useContractsStore();
const { contracts,
  loading,
  error,
  selectedContract } = storeToRefs(store);
</script>
