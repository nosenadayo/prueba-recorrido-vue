// stores/contractsStore.js
import { defineStore } from 'pinia';

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
                const response = await fetch('http://127.0.0.1:3000/contracts');
                if (!response.ok) {
                    throw new Error('Failed to fetch contracts');
                }
                const data = await response.json();
                this.contracts = data.data;
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
