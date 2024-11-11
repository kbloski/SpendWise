<template>
    <div>
        <base-title>Udostępnienia</base-title>
        <base-error v-if="error">{{  error }}</base-error>
        <base-ul>
            <li v-for="share in shares">
                {{ share.user.username }}
                {{ share.user.email }}
                <base-button @click="onDelete(share.user.id)" v-if="share.role !== 0">Delete</base-button>
                <div v-else>Admin</div>
            </li>
        </base-ul>
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

        const shares = computed( () => fetchShares.data.value?.shares ?? [])
        const loading = computed( () => fetchShares.loading.value ?? deleteShares.loading.value )
        const error = computed( () => fetchShares.error.value || deleteShares.error.value )

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

        return {
            loading,
            error,
            shares,
            onDelete
        }

    }
}
</script>

<style lang="css" scoped>

li {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>