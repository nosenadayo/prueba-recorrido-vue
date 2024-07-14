import axios from "axios";
import {ref} from "vue";
import config from '../config';

axios.defaults.baseURL = config.apiBaseUrl;


export function useAssignments() {
    const assignment = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const fetchUserAssignmentByDate = async (contractId, dailyContractId, timeBlockId, dateToAssigment) => {
        try {
            let url = `/contracts/${contractId}/daily_contracts/${dailyContractId}/time_blocks/${timeBlockId}/assignments/assignment_by_date?date=${dateToAssigment}`
            let response = await axios.get(url);
            assignment.value = response.data
        } catch (error) {
            error.value = error
            console.error(error);
        }
        finally {
            loading.value = false
        }
    }

    return {
        assignment,
        loading,
        error,
        fetchUserAssignmentByDate
    };
}
