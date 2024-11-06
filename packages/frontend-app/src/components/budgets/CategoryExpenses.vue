<template>
    <div>
        <base-title>Lista kosztów kategorii</base-title>
        <base-error v-if="error">{{  error }}</base-error>
        <div v-else-if="loading">Loading...</div>
        <ul v-else-if="expenses.length">
            <list-item 
                v-for="expense in expenses"
                :id="expense.id"
                v-bind:amount="expense.amount"
                :date="expense.date"
                :user_id="expense.user_id"
            >
            </list-item>
        </ul>
        <base-info v-else title="Brak kosztów">Ta kategoria aktualnie nie posiada żadnych kosztów.</base-info>
    </div>
</template>

<script>
import CategoryExpenseListItem from './CategoryExpenseListItem.vue';
import useFetch from '../../hooks/useFetch';

export default {
    components:{
        listItem: CategoryExpenseListItem
    },
    data(){
        return {
            fetchExpenses : {}
        }
    },
    computed:{
        expenses(){
            const expenses = this.fetchExpenses?.data?.expenses ?? []
            return expenses
        },
        loading(){
            return this.fetchExpenses.loading
        },
        error(){
            return this.fetchExpenses.error
        }
    },
    created(){
        this.fetchExpenses = useFetch(`/api/budgets/${this.$route.params.budgetId}/categories/${this.$route.params.categoryId}/expenses`)
    },

}
</script>

<style>

ul {
    list-style: none;
    margin: 1rem;
    padding: 0;
}

</style>