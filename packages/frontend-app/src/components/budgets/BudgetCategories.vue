<template>
    <div>
        <base-title>Kategorie budżetu</base-title>
        <category-cards></category-cards>
        <router-view></router-view>
    </div>
</template>

<script>
import CategoryCards from './CategoryCards.vue';
import CreateCategoryModal from '../modals/CreateCategoryModal.vue';

export default {
    components: {
        createCategory: CreateCategoryModal,
        CategoryCards
    }
}
</script>