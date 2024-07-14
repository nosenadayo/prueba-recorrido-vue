// stores/contractsStore.js
import { defineStore } from 'pinia';
import axios from "axios";
import config from '../config';

axios.defaults.baseURL = config.apiBaseUrl;

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
                const response = await axios.get(`/contracts/${contractId}/daily_contracts`);

                const data = response.data

                this.dailyContracts = await Promise.all(data.data.map(async (obj) => {
                    const timeBlocksResponse = await axios.get(`/contracts/${contractId}/daily_contracts/${obj.id}/time_blocks`);

                    const timeBlocks = await timeBlocksResponse.data
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
