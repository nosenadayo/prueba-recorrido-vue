// stores/contractsStore.js
import { defineStore } from 'pinia';

export const useDailyContractsStore = defineStore('dailyContracts', {
    state: () => ({
        dailyContracts: [],
        loading: true,
        error: null,
        contractId: null,
        rangeDate: null,
    }),
    actions: {
        async fetchDailyContracts(contractId) {
            try {
                if(contractId === 'none') {
                    this.dailyContracts = []
                    this.error = null
                    this.contractId = null;
                    return
                }
                const response = await fetch(`http://127.0.0.1:3000/contracts/${contractId}/daily_contracts`);
                if (!response.ok) {
                    throw new Error('Failed to fetch daily contracts');
                }
                const data = await response.json();


                this.dailyContracts = await Promise.all(data.data.map(async (obj) => {
                    const timeBlocksResponse = await fetch(`http://127.0.0.1:3000/contracts/${contractId}/daily_contracts/${obj.id}/time_blocks`);

                    if (!timeBlocksResponse.ok) {
                        throw new Error(`Error al obtener los time_blocks para el objeto con id ${obj.id}`);
                    }
                    const timeBlocks = await timeBlocksResponse.json();
                    return {
                        ...obj,
                        time_blocks: timeBlocks
                    };
                }));

                this.contractId = contractId;
            } catch (err) {
                this.dailyContracts = []
                this.error = err.message;
                this.contractId = null;
            } finally {
                this.loading = false;
            }
        },
        selectRangeDate (date) {
            this.rangeDate = date;
        }
    },
    persist: true
});
