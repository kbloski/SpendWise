<template>
    <div>
        <h1>My budgets</h1>
        <ul>
            <li v-for="budget in budgets" :key="budget.id">
                {{ budget.name }}
                <router-link :to="budgetLink(budget)">Show</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import { watch, computed } from "vue";
import useFetch from "../hooks/useFetch.js";

export default {
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
