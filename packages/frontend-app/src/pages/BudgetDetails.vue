<template>
    <div>
        <h2>Budget with id: {{ budgetId }} details </h2>
        <p>
            #Id: {{  budget.id }} <br>
            Name: {{  budget.name }} <br>
            Owner: {{ budget.user_id }} <br>
            Created: {{  new Date( budget.createdAt) }} <br>
            Last Update: {{  new Date( budget.updatedAt) }}
        </p>
        <router-link :to="categoryLink">Categories</router-link>
        <router-view :id="budget.id"></router-view>
    </div>
</template>

<script>
import useFetch from '../hooks/useFetch.js';

export default{
    props: ['budgetId'],
    data(){
        return {
            fetchBudget: null,
        }
    },
    computed: {
        categoryLink(){
            return {
                name: 'budget-categories',
                params: { budgetId: this.budgetId }
            }
        },
        loading(){
            return this.fetchBudget.loading;
        },
        budget(){
            return this.fetchBudget.data?.budget ?? {};
        }
    },
    created(){
        this.fetchBudget = useFetch(`/api/budgets/${this.budgetId}`)
    }
}
</script>