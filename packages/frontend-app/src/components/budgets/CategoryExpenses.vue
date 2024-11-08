<template>
    <div>
        <base-title>Lista kosztów kategorii</base-title>
        <base-error v-if="error">{{  error }}</base-error>
        <div v-else-if="loading">Loading...</div>
        <div v-else>
            <create-expense-modal
                :budgetId="budgetId"
                :categoryId="categoryId"
            ></create-expense-modal>
            <ul v-if="expenses.length">
                <list-item 
                    v-for="expense in expenses"
                    :key="expense.id"
                    :id="expense.id"
                    v-bind:amount="expense.amount"
                    :date="expense.date"
                    :user_id="expense.user_id"
                >
                </list-item>
            </ul>
            <base-info v-else title="Brak kosztów">Ta kategoria aktualnie nie posiada żadnych kosztów.</base-info>
        </div>
    </div>
</template>

<script>
import CreateExpenseModal from '../modals/CreateExpenseModal.vue';
import CategoryExpenseListItem from './ExpenseListItem.vue';
import useFetch from '../../hooks/useFetch';
import { computed } from 'vue';

export default {
    components:{
        listItem: CategoryExpenseListItem,
        CreateExpenseModal
    },
    data(){
        return {
            budgetId: null,
            categoryId: null,
            fetchExpenses : {},
        }
    },
    watch:{
        needExpenseRefresh( val ){
            if(val) this.fetchExpenses.refetch()
        }
    },
    computed:{
        needExpenseRefresh (){
            return this.$store.getters['refresh/isRefreshExpensesNeeded']
        },
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
        this.budgetId = this.$route.params.budgetId 
        this.categoryId = this.$route.params.categoryId
        this.fetchExpenses = useFetch(
            `/api/budgets/${this.budgetId}/categories/${this.categoryId}/expenses`
        )
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