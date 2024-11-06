<template>
    <div>
        <base-title><h2>My budgets</h2></base-title>
        <my-budgets-list></my-budgets-list>
        <router-view></router-view>
    </div>
</template>

<script>
import MyBudgetsList from "../components/budgets/MyBudgetsList.vue";

import { watch, computed } from "vue";
import useFetch from "../hooks/useFetch.js";

export default {
    components: {
        MyBudgetsList
    },  
    setup() {
        const fetchBudgets = useFetch('/api/budgets/me');
        const budgetList = computed(()=>{
            return fetchBudgets.data?.value?.budgets ?? [] 
        })

        function budgetLink(budget){
            return {
                name: "budget-details",
                params: { budgetId: budget.id},
            }
        }

        return {
            loading: fetchBudgets.loading,
            budgets: budgetList,
            budgetLink
        }
    },
};
</script>
