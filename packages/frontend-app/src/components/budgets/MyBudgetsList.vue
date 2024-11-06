<template>
    <div>
        <h4>Moje finanse</h4>
        <base-error v-if="errorMessage">{{  errorMessage }}</base-error>
        <div v-else-if="loading" >Loading... </div>
        <ul v-else>
            <my-budgets-list-item 
                v-for="budget in budgetList"
                :key="budget.id"
                :id="budget.id"
                :name="budget.name"
            >
            </my-budgets-list-item>
        </ul>
    </div>
</template>

<script>
import { computed } from 'vue';
import useFetch from '../../hooks/useFetch';
import MyBudgetsListItem from './MyBudgetsListItem.vue';

export default {
    components: {
        MyBudgetsListItem
    },
    setup(){
        const fetchBudgets = useFetch('/api/budgets/me');
        const errorMessage = computed( () => fetchBudgets?.error.value);
        const loading = computed( ()=> fetchBudgets.loading.value );

        const budgetList = computed( () => fetchBudgets?.data?.value.budgets ?? []);


        return {
            errorMessage,
            loading: loading,
            budgetList
        }
    }
}
</script>

<style scoped>
h4 {
    border-bottom: 2px solid black;
}

ul {
    list-style: circle;
}
</style>