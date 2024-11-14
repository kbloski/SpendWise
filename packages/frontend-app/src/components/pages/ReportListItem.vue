<template>
    <li>
        <div>Budget: {{ budgetId }}</div>
        <div>Total Expenses: {{ totalExpenses }} zł</div>
        <div>Start: {{ perStart }}</div>
        <div>End: {{ perEnd }}</div>
        <div>Created: {{ createdAt }}</div>
        <div class="actions"><button class="btn-success" @click="onDelete">Delete</button></div>
    </li>
</template>

<script>
import { computed } from 'vue';
import { formatDate } from '../../utils/dateUtils';

export default {
    props: {
        id: {required: true},
        budgetId: { required: true},
        totalExpenses: { required: true},
        periodStart: { required: false},
        periodEnd: { required: false},
        created: { required: true}
    },
    setup( props,  ctx){
        function onDelete(){
            ctx.emit('delete', props.id)
        }

        const perStart = computed( () => formatDate(new Date( props.periodStart)))
        const perEnd = computed( () => formatDate(new Date( props.periodEnd)))
        const createdAt = computed( () => formatDate(new Date( props.created)))

        return {
            onDelete,
            perStart,
            perEnd,
            createdAt
        }
    }
}
</script>

<style scoped>
.actions {
    padding-top: .2rem;
}
</style>
