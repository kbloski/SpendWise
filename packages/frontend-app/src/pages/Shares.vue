<template>
    <div>
        <base-title>Udostępnienia</base-title>
        <ul>
            <li v-for="user in shares">
                {{ user.username }}
                {{ user.email }}
                <button @click="onDelete(user.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { computed, watch } from 'vue';
import useFetch from '../hooks/useFetch';
import { useStore } from 'vuex';
import useDelete from '../hooks/useDelete';

export default {
    setup(){
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const budgedId = computed( () => route.params?.budgetId )
        const fetchShares = useFetch('/api/budgets/'+budgedId.value+'/shares');
        const deleteShares = useDelete();
        const refreshNeeded = computed(() => store.getters['refresh/isRefreshSharesNeeded'])
        watch( refreshNeeded, ()=>{
            if (!refreshNeeded.value) return;
            fetchShares.refetch()
        })
        watch( deleteShares.response, ()=>{
            if (!deleteShares.response.ok) return;
            store.dispatch('refresh/triggerRefreshShares')
            router.replace(
                {
                    name: 'budget-shares',
                    props: {
                        budgedId: budgedId
                    }
                }
            )
        })

        function onDelete(userId){
            deleteShares.setNewUrl('/api/budgets/'+budgedId.value+'/shares/'+ userId)

        }

        const shares = computed( () => fetchShares.data.value?.users)
        
        return {
            loading: fetchShares.loading,
            error: fetchShares.error,
            shares,
            onDelete
        }

    }
}
</script>