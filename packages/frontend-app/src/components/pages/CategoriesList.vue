<template>
    <base-error v-if="error">{{ error }}</base-error>
    <div v-else-if="loading">Loading...</div>
    <div v-if="categories?.length">
        <base-ul>
            <category-card-item 
                v-for="category in categories"
                :key="category.id"
                :id="category.id"
                :name="category.name"
                :rolePriority="rolePriority"
            ></category-card-item>
        </base-ul>
    </div>
    <base-info v-else title="Brak kategori.">Bierzący budżet nie posiada żadnych kategori.</base-info>
</template>

<script>
import { computed , watch} from 'vue';
import { useRoute } from 'vue-router';
import CategoryCardItem from './CategoriesCardItem.vue';
import { useStore } from 'vuex';
import useFetch from '../../hooks/useFetch';

export default {
    components: {
        CategoryCardItem,
    },
    setup(){
        const route = useRoute();
        const store = useStore();
        const budgetId = computed( () =>  route.params.budgetId )
        const fetchCategories = useFetch( `/api/budgets/${budgetId.value}/categories` );

        const loading = computed(() => fetchCategories.loading.value);
        const error = computed( ()=> fetchCategories.error.value );
        const categories = computed( ()=> fetchCategories.data.value?.categories);
        const rolePriority = computed(()=> fetchCategories.data.value.rolePriority ?? 100 )

        const refreshNeeded = computed( 
            ()=> store.getters['refresh/isRefreshCategoriesNeeded']
        )
        watch( refreshNeeded,
            () => fetchCategories.refetch()
        )
        

        return {
            loading,    
            categories,
            error,
            rolePriority
        }
    }
}
</script>
