import { ref } from 'vue';
import axios from "axios";

export function useUsers() {
    const users = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchUsers = async (contractId, dailyContractId, timeBlockId, date) => {
        loading.value = true;
        try {

            const response = await axios.get('http://127.0.0.1:3000/users');

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
        try {
            const response = await axios.get(`http://127.0.0.1:3000/contracts/${contractId}/count_assignment_by_week?date=${date}&user_id=${userId}`);
            return response.data;
        } catch (err) {
            error.value = err.message;
        }
    };

    const fetchUserAssignments = async (contractId, dailyContractId, timeBlockId, userId, date) => {
        try {
            let url = `http://127.0.0.1:3000/contracts/${contractId}/daily_contracts/${dailyContractId}/time_blocks/${timeBlockId}/assignments/assignment_by_user?user_id=${userId}&date=${date}`
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
