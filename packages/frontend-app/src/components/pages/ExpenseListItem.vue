<template>
    <li>
        <span>Id: {{ id }}</span>
        <span>Kwota: {{ amount}}zł</span>
        <span>UserId: {{ user_id }}</span>
        <span>Date: {{ createdAt }}</span>
        <span>
            <modify-expense-modal :expenseId="id"></modify-expense-modal>
        </span>
        <span><button @click="onDelete">Delete</button></span>
    </li>
</template>

<script>
import useDelete from '../../hooks/useDelete';
import { formatDate } from '../../utils/dateUtils';
import ModifyExpenseModal from '../modals/ModifyExpenseModal.vue';

export default {
    props: ["id", "amount", 'date', 'user_id'],
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
    background: rgb(217, 255, 233);
    display: flex;
    justify-content: space-between;
}
li:nth-child(2n){
    background: rgb(192, 255, 220);
}
span {
    margin: .3rem;
    padding: .1rem;
}
</style>