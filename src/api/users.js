import { ref } from 'vue';
import axios from "axios";
import config from '../config';

axios.defaults.baseURL = config.apiBaseUrl;


export function useUsers() {
    const users = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchUsers = async (contractId, dailyContractId, timeBlockId, date) => {
        loading.value = true;
        try {
            const response = await axios.get('users');
            const data =  response.data
            users.value = await Promise.all(data.data.map(async (user) => {
                const assigned = await fetchUserAssignments(contractId, dailyContractId, timeBlockId, user.id, date)
                const countAssignedResponse = await fetchCountAssignedToUserByWeek(contractId, user.id, date)
                const countAssigned = countAssignedResponse.count;
                return {
                    ...user,
                    countAssigned: countAssigned,
                    assigned: assigned
                };
            }));



        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };
    const fetchCountAssignedToUserByWeek = async (contractId,userId, date) => {
        if(!contractId) {return}
        try {
            const response = await axios.get(`/contracts/${contractId}/count_assignment_by_week?date=${date}&user_id=${userId}`);
            return response.data;
        } catch (err) {
            error.value = err.message;
        }
    };

    const fetchUserAssignments = async (contractId, dailyContractId, timeBlockId, userId, date) => {
        try {
            let url = `/contracts/${contractId}/daily_contracts/${dailyContractId}/time_blocks/${timeBlockId}/assignments/assignment_by_user?user_id=${userId}&date=${date}`
            let response = await axios.get(url);
            return response.data.data.assigned
        } catch (error) {

        }
    }


    return {
        users,
        loading,
        error,
        fetchUsers
    };
}
