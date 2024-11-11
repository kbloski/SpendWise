<template>
    <div>
        <base-title>Kategorie budżetu</base-title>
        <create-category :budgetId="budgetId"></create-category>
        <category-cards></category-cards>
        <router-view></router-view>
    </div>
</template>

<script>
import CategoryCards from '../components/pages/CategoriesList.vue'
import AddCategoryModal from '../components/modals/AddCategoryModal.vue';

export default {
    components: {
        createCategory: AddCategoryModal,
        CategoryCards
    },
    computed: {
        budgetId(){
            return this.$route.params.budgetId
        }
    }
}
</script>