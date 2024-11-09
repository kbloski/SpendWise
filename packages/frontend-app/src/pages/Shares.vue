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
import { computed, watch } from 'vue';
import useFetch from '../hooks/useFetch';
import { useStore } from 'vuex';

export default {
    setup(){
        const store = useStore()
        const route = useRoute()
        const budgedId = computed( () => route.params?.budgetId )
        const fetchShares = useFetch('/api/budgets/'+budgedId.value+'/shares');
        const refreshNeeded = computed(() => store.getters['refresh/isRefreshSharesNeeded'])
        watch( refreshNeeded, ()=>{
            if (!refreshNeeded.value) return;
            fetchShares.refetch()
        })

        const shares = computed( () => fetchShares.data.value?.users)
        
        return {
            loading: fetchShares.loading,
            error: fetchShares.error,
            shares
        }

    }
}
</script>