<template>
    <div>
        <base-title>Wszystkie koszta budżetu</base-title>
        <base-error v-if="error">{{ error }}</base-error>
        <div v-else-if="loading">Loading...</div>
        <ul v-else-if="expenses.length">
            <expense-list-item
                v-for="expense in expenses"
                :key="expense.id"
                :amount="expense.amount"
                :user_id="expense.user_id"
                :date="expense.date"
            ></expense-list-item>
        </ul>
        <base-info v-else title="Brak kosztów">Budżet aktualnie nie posiada żadnych kosztów.</base-info>
    </div>
</template>

<script>
import { computed } from 'vue';
import useFetch from '../hooks/useFetch';
import { useRoute } from 'vue-router';
import ExpenseListItem from '../components/pages/ExpenseListItem.vue';

export default {
    components: {
        ExpenseListItem
    },
    setup(){
        const route = useRoute();
        const budgetId = route.params?.budgetId;
        const fetchExpenses = useFetch('/api/budgets/'+budgetId+'/expenses');
        const loading = computed(()=> fetchExpenses.loading.value);
        const expenses = computed(()=> fetchExpenses.data.value?.expenses ?? []);
        const error = computed( ()=> fetchExpenses.error.value)
        
        return {
            loading,
            expenses,
            error
        }
    }
}
</script>