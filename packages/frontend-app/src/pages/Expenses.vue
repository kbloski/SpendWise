<template>
    <div>
        <h5>Category expenses</h5>
        <ul>
            <li v-for="expense in expenses">
                {{ expense.amount }} zł
                {{ expense.description }}
                {{ expense.date }}
                User: {{ expense.user_id }}
            </li>
        </ul>
    </div>
</template>

<script>
import useFetch from '../hooks/useFetch';

export default {
    data(){
        return {
            fetchExpenses : {}
        }
    },
    computed:{
        expenses(){
            const expenses = this.fetchExpenses?.data?.expenses ?? []
            console.log( expenses )
            return expenses
        }
    },
    created(){
        this.fetchExpenses = useFetch(`/api/budgets/${this.$route.params.budgetId}/categories/${this.$route.params.categoryId}/expenses`)
    },

}
</script>