<template>
    <base-error v-if="error">{{ error }}</base-error>
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="categories.length">
        <base-info>Kliknij w kategorię aby zobaczyć jej koszta.</base-info>
        <ul>
            <category-card-item 
                v-for="category in categories"
                :key="category.id"
                :id="category.id"
                :name="category.name"
            ></category-card-item>
        </ul>
    </div>
    <base-info v-else title="Brak kategori.">Bierzący budżet nie posiada żadnych kategori.</base-info>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useFetch from '../../hooks/useFetch';
import CategoryCardItem from './CategoryCardItem.vue';

export default {
    components: {
        CategoryCardItem
    },
    setup(){
        const route = useRoute();
        const budgetId = computed(()=> route.params.budgetId);
        const fetchCategories = useFetch(`/api/budgets/${budgetId.value}/categories`);
        const loading = computed(() => fetchCategories.loading.value);
        const error = computed(()=> fetchCategories.error.value)
        const categories = computed(()=> fetchCategories.data.value?.categories)
        return {
            loading,    
            categories,
            error
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}
</style>