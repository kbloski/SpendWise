<template>
    <li>
        <div>
            <span>{{ name }}</span>
            <router-link :to="budgetLink">View</router-link>
            <share-budget-modal :budgetId="id"></share-budget-modal>
        </div>
    </li>
</template>

<script>
import ShareBudgetModal from '../modals/ShareBudgetModal.vue';

export default {
    components: {
        ShareBudgetModal,
    },
    props: ['name', 'id'],
    computed: {
        budgetLink(){
            return {
                name: "budget-details",
                params: {
                    budgetId: this.$props.id
                }
            }
        }
    }
}
</script>

<style scoped>
div {
    display: flex;
}
a {
    padding-left: 10px;
}
</style>

