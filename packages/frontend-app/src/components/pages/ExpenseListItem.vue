<template>
    <li>
        <span>Id: {{ id }}</span>
        <span>Kwota: {{ amount}}zł</span>
        <span>UserId: {{ user_id }}</span>
        <span>Date: {{ createdAt }}</span>
        <span>
            <modify-expense-modal :expenseId="id"></modify-expense-modal>
        </span>
    </li>
</template>

<script>
import { formatDate } from '../../utils/dateUtils';
import ModifyExpenseModal from '../modals/ModifyExpenseModal.vue';

export default {
    props: ["id", "amount", 'date', 'user_id'],
    components: {
        ModifyExpenseModal
    },
    computed: {
        createdAt(){
            const date = new Date(this.$props.date);
            return formatDate( date )
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