<template>
    <div>
        <base-title>Udostępnienia</base-title>
        <base-error v-if="error">{{  error }}</base-error>
        <base-ul>
            <share-list-item
                v-for="share in shares"
                :key="share.user.id"
                :userId="share.user.id"
                :username="share.user.username"
                :email="share.user.email"
                :rolePriority="share.role"
                @delete="onDelete"
            ></share-list-item>
        </base-ul>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { computed, watch } from 'vue';
import useFetch from '../hooks/useFetch';
import { useStore } from 'vuex';
import useDelete from '../hooks/useDelete';
import ShareListItem from '../components/pages/ShareListItem.vue';

export default {
    components: {
        ShareListItem
    },
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
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
</style>