import { ref } from 'vue';
import axios from "axios";
import config from '../config';

axios.defaults.baseURL = config.apiBaseUrl;


export function useContracts() {
    const contracts = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const countUnassigned = ref(0)

    const fetchCountUnassigned = async (contractId, date) => {
        loading.value = true;
        if(!contractId ) {return}
        try {
            const response = await axios.get(`/contracts/${contractId}/count_unassigned?date=${date}`);
            countUnassigned.value = response.data.count;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    return {
        contracts,
        countUnassigned,
        loading,
        error,
        fetchCountUnassigned
    };
}
