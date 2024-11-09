<template>
    <div>
        <base-title>Udostępnienia</base-title>
        <ul>
            <li v-for="user in shares">
                {{ user.username }}
                {{ user.email }}
            </li>
        </ul>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import useFetch from '../hooks/useFetch';

export default {
    setup(){
        const route = useRoute()
        const budgedId = computed( () => route.params?.budgetId )
        const fetchShares = useFetch('/api/budgets/'+budgedId.value+'/shares');

        const shares = computed( () => fetchShares.data.value?.users)
        
        return {
            loading: fetchShares.loading,
            error: fetchShares.error,
            shares
        }

    }
}
</script>