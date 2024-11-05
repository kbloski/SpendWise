<template>
    <base-card>
        <h1>My budzes</h1>
        <ul>
            <li v-for="budget in budgets" :key="budget.id">
                {{ budget.id }}
                {{ budget.name }}
                {{ budget.user_id }}
                {{ budget.createdAt }}
                {{ budget.updatedAt }}
                <router-link :to="budgetLink(budget)">Show</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </base-card>
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
                params: { id: budget.id},
            }
        }

        watch( fetchBudgets.data , ()=> console.log(fetchBudgets.data.value.budgets[0].id))

        return {
            loading: fetchBudgets.loading,
            budgets: budgetList,
            budgetLink
        }
    },
};
</script>
