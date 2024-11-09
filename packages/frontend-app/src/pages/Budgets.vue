<template>
    <div>
        <side-title>My budgets</side-title>
        <my-budgets-list></my-budgets-list>
        <router-view></router-view>
    </div>
</template>

<script>
import MyBudgetsList from "../components/pages/MyBudgetsList.vue";

export default {
    components: {
        MyBudgetsList
    },  
};
</script>
