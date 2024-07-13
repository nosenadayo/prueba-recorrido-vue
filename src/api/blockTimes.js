import { ref } from 'vue';

export function useBlockTimes() {
    const blockTimes = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchBlockTimes = async (contractId, dailyContractId) => {
        loading.value = true;
        try {
            const response = await fetch(`http://127.0.0.1:3000/contracts/${contractId}/daily_contracts/${dailyContractId}/time_blocks`);
            if (!response.ok) {
                throw new Error('Failed to fetch daily contracts');
            }
            const data = await response.json();
            blockTimes.value = data.data;
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
