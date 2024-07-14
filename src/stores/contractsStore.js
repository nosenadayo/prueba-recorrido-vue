// stores/contractsStore.js
import { defineStore } from 'pinia';
import axios from "axios";
import config from '../config';

axios.defaults.baseURL = config.apiBaseUrl;

export const useContractsStore = defineStore('contracts', {
    state: () => ({
        contracts: [],
        loading: true,
        error: null,
        selectedContract: null
    }),
    actions: {
        async fetchContracts() {
            try {
                const response = await axios.get('/contracts');
                this.contracts = response.data.data;
                this.error = null;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        selectContract(contractId) {
            this.selectedContract = contractId; // Acción para actualizar el contrato seleccionado
        }
    },
    persist: true
});
