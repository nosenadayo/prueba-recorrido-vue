import { ref } from 'vue';
import axios from "axios";

export function useContracts() {
    const contracts = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const countUnassigned = ref(0)

    const fetchCountUnassigned = async (contractId, date) => {
        loading.value = true;
        try {
            const response = await axios.get(`http://127.0.0.1:3000/contracts/${contractId}/count_unassigned?date=${date}`);
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
