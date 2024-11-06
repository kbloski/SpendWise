<template>
    <div>
        <h3>Budget categories</h3>
        <ul>
            <li v-for="category in categories" :key="category.id">
                {{ category.id }} 
                {{ category.name }}
                <router-link>Expenses</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useFetch from '../hooks/useFetch.js';

export default {
    setup(){
        const route = useRoute()
        const budgetId = computed(() => route.params.id);

        const categoriesArr = computed(()=>{
            return fetchCategories?.data?.value?.categories ?? []
        })
        const fetchCategories = useFetch(`/api/budgets/${budgetId.value}/categories`)

        setTimeout( () => console.log(fetchCategories?.data?.value?.categories), 300)
        setTimeout( () => console.log(categoriesArr), 300)
        
        return {
            budgetId,
            loading: fetchCategories?.loading ?? [],
            categories: categoriesArr
        }
    }
}
</script>