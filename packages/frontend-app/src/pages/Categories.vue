<template>
    <div>
        <base-title>Kategorie budżetu</base-title>
        <category-cards></category-cards>
        <router-view></router-view>
    </div>
</template>

<script>
import CategoryCards from '../components/pages/CategoriesCards.vue'
import AddCategoryModal from '../components/modals/AddCategoryModal.vue';

export default {
    components: {
        createCategory: AddCategoryModal,
        CategoryCards
    }
}
</script>