<template>
    <div>
        <h3>Budget categories</h3>
        <ul>
            <li v-for="category in categories" :key="category.id">
                {{ category.id }} 
                {{ category.name }}
                <router-link :to="createLinkCategory(category.id)">Expenses</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useFetch from '../../hooks/useFetch';

export default {
    setup(){
        const route = useRoute()
        const budgetId = computed(() => route.params.budgetId);

        const categoriesArr = computed(()=>{
            return fetchCategories?.data?.value?.categories ?? []
        })
        const fetchCategories = useFetch(`/api/budgets/${budgetId.value}/categories`)

        function createLinkCategory(categoryId){
            return `/user/budgets/${budgetId.value}/categories/${categoryId}/expenses`
        }

        return {
            budgetId,
            loading: fetchCategories?.loading ?? [],
            categories: categoriesArr,
            createLinkCategory
        }
    }
}
</script>