import { ref } from 'vue';

import config from '../config';
import axios from "axios";

axios.defaults.baseURL = config.apiBaseUrl;


export function useBlockTimes() {
    const blockTimes = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchBlockTimes = async (contractId, dailyContractId) => {
        loading.value = true;
        try {
            const response = await axios.get(`/contracts/${contractId}/daily_contracts/${dailyContractId}/time_blocks`);
            blockTimes.value = response.data.data;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    return {
        blockTimes,
        loading,
        error,
        fetchBlockTimes
    };
}
