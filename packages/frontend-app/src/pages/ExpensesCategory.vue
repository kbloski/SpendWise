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
            <base-ul v-if="expenses.length" title="Koszta kategorii">
                <list-item 
                    v-for="expense in expenses"
                    :key="expense.id"
                    :id="expense.id"
                    v-bind:amount="expense.amount"
                    :date="expense.date"
                    :user_id="expense.user_id"
                >
                </list-item>
            </base-ul>
            <base-info v-else title="Brak kosztów">Ta kategoria aktualnie nie posiada żadnych kosztów.</base-info>
        </div>
    </div>
</template>



<script>
import CreateExpenseModal from '../components/modals/AddExpenseModal.vue';
import CategoryExpenseListItem from '../components/pages/ExpenseListItem.vue';
import useFetch from '../hooks/useFetch';

export default {
    components:{
        listItem: CategoryExpenseListItem,
        CreateExpenseModal
    },
    data(){
        return {
            fetchExpenses : {}
        }
    },
    watch:{
        needExpenseRefresh( val ){
            if (val) this.fetchExpenses?.refetch()
        },
        categoryId( val ){
            console.log()
            this.fetchExpenses.setNewUrl(`/api/budgets/${this.budgetId}/categories/${ val }/expenses`)
        }
    },
    computed:{
        budgetId(){
            return  this.$route.params.budgetId 
        },
        categoryId(){
            return this.$route.params.categoryId
        },
        needExpenseRefresh (){
            const isNeeded =  this.$store.getters['refresh/isRefreshExpensesNeeded']
            if (isNeeded) this.fetchExpenses?.refetch()
            return isNeeded
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
        const budgetId = this.$route.params.budgetId 
        const categoryId = this.$route.params.categoryId
        this.fetchExpenses = useFetch(
            `/api/budgets/${budgetId}/categories/${categoryId}/expenses`
        )
    },

}
</script>



<style scoped>


</style>