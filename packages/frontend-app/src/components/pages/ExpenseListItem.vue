<template>
    <li>
        <span>Kwota: {{ amount}}zł</span>
        <span>UserId: {{ user_id }}</span>
        <span>Date: {{ createdAt }}</span>
        <base-dropdown>
            <modify-expense-modal v-if="rolePriority < 2" :expenseId="id"></modify-expense-modal>
            <span><button class="btn-success" v-if="rolePriority < 2" @click="onDelete">Delete</button></span>
        </base-dropdown>
    </li>
</template>

<script>
import useDelete from '../../hooks/useDelete';
import { formatDate } from '../../utils/dateUtils';
import ModifyExpenseModal from '../modals/ModifyExpenseModal.vue';

export default {
    props: ["id", "amount", 'date', 'user_id','rolePriority'],
    components: {
        ModifyExpenseModal
    },
    data(){
        return {
            deleteExpense: useDelete()
        }
    },
    watch: {
        isDeleted(val) {
            if (!val) return;
            this.$store.dispatch('refresh/triggerRefreshExpenses')
            this.$router.replace({
                name: 'budget-expenses',
                params: {
                    budgetId: this.$route.params.budgetId
                }
            })
        }
    },
    computed: {
        isDeleted(){
            return this.deleteExpense.response.ok
        },
        createdAt(){
            const date = new Date(this.$props.date);
            return formatDate( date )
        }
    },
    methods: {
        onDelete(){
            this.deleteExpense.setNewUrl('/api/expenses/'+this.id)
        }
    }
}
</script>

<style scoped>
li{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}


</style>