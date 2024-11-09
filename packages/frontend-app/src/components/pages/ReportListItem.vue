<template>
    <li>
        <div>Budget: {{ budgetId }}</div>
        <div>Total Expenses: {{ totalExpenses }}</div>
        <div>Start: {{ periodStart }}</div>
        <div>End: {{ periodEnd }}</div>
        <div>Created: {{ created }}</div>
        <div class="actions"><base-button @click="onDelete">Delete</base-button></div>
    </li>
</template>

<script>
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

        return {
            onDelete
        }
    }
}
</script>

<style scoped>
.actions {
    padding-top: .2rem;
}
</style>
