<template>
    <div>
        <base-title>Moje finanse</base-title>
        <base-error v-if="errorMessage">{{  errorMessage }}</base-error>
        <div v-else-if="loading" >Loading... </div>
        <ul v-else-if="budgetList.length">
            <create-budget-modal></create-budget-modal>
            <my-budgets-list-item 
                v-for="budget in budgetList"
                :key="budget.id"
                :id="budget.id"
                :name="budget.name"
            >
            </my-budgets-list-item>
        </ul>
        <base-info v-else title="Brak budżetów">Aktualnie nie posiadasz żadnych budżetów.</base-info>
    </div>
</template>

<script>
import { computed, provide } from 'vue';
import useFetch from '../../hooks/useFetch';
import MyBudgetsListItem from './MyBudgetsListItem.vue';
import CreateBudgetModal from '../modals/AddBudgetModal.vue';

export default {
    components: {
        MyBudgetsListItem,
        CreateBudgetModal
    },
    setup(){
        const fetchBudgets = useFetch('/api/budgets/me');
        const errorMessage = computed( () => fetchBudgets?.error.value);
        const loading = computed( ()=> fetchBudgets.loading.value );
        const budgetList = computed( () => fetchBudgets?.data?.value.budgets ?? []);
        
        provide('refreshBudgetList', fetchBudgets.refetch)

        return {
            errorMessage,
            loading: loading,
            budgetList
        }
    }
}
</script>

<style scoped>
ul {
    list-style: circle;
}
</style>