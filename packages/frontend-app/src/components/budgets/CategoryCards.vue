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
import { computed , watch} from 'vue';
import { useRoute } from 'vue-router';
import CategoryCardItem from './CategoryCardItem.vue';
import { useStore } from 'vuex';

export default {
    components: {
        CategoryCardItem
    },
    setup(){
        const route = useRoute();
        const store = useStore();
        const budgetId = computed( () =>  route.params.budgetId )

        watch(
            budgetId,
            ()=> {
                store.dispatch('categories/setFetchWithBudgetId', budgetId.value )
            }, { immediate: true}
        );

        const loading = computed(() => store.getters['categories/getLoading']);
        const error = computed( ()=> store.getters['categories/getError']);
        const categories = computed( ()=> store.getters['categories/getCategories']);

        
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