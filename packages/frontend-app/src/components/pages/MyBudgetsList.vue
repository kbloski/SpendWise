<template>
    <div>
        <base-error v-if="errorMessage">{{  errorMessage }}</base-error>
        <div v-if="loading" >Loading... </div>

        <div v-if="budgetList.length">
            <base-ul>
                <my-budgets-list-item 
                    v-for="relation in budgetList"
                    :key="relation.Budget.id"
                    :id="relation.Budget.id"
                    :name="relation.Budget.name"
                    :rolePriority="relation.role"
                >
                </my-budgets-list-item>
            </base-ul>
        </div>
        <base-info v-else title="Brak budżetów">Aktualnie nie posiadasz żadnych budżetów.</base-info>
    </div>
</template>

<script>
import { computed, provide, watch } from 'vue';
import { useStore } from 'vuex';
import useFetch from '../../hooks/useFetch';
import MyBudgetsListItem from './MyBudgetsListItem.vue';

export default {
    components: {
        MyBudgetsListItem,
    },
    setup(){
        const store = useStore()
        
        const isNeededRefresh = computed(() => store.getters['refresh/isRefreshBudgetsNeeded'] );
        watch( isNeededRefresh, () => {
            if (!isNeededRefresh.value) return;
            fetchBudgets.refetch()
        })

        const fetchBudgets = useFetch('/api/budgets/me');
        const errorMessage = computed( () => fetchBudgets?.error.value);
        const loading = computed( ()=> fetchBudgets.loading.value );
        const budgetList = computed( () => fetchBudgets?.data?.value?.budgets ?? []);
        

        return {
            errorMessage,
            loading: loading,
            budgetList,
        }
    }
}
</script>

