<template>
    <div>
        <h2>Budget with id: {{ id }} details </h2>
        <p>
            #Id: {{  budget.id }} <br>
            Name: {{  budget.name }} <br>
            Owner: {{ budget.user_id }} <br>
            Created: {{  new Date( budget.createdAt) }} <br>
            Last Update: {{  new Date( budget.updatedAt) }}
        </p>
        <router-link>Show Categories</router-link>
        <router-view :id="budget.id"></router-view>
    </div>
</template>

<script>
import useFetch from '../hooks/useFetch.js';

export default{
    props: ['id'],
    data(){
        return {
            fetchBudget: null,
        }
    },
    computed: {
        loading(){
            return this.fetchBudget.loading;
        },
        budget(){
            console.log( this.fetchBudget.data?.budget)
            return this.fetchBudget.data?.budget ?? {};
        }
    },
    created(){
        this.fetchBudget = useFetch(`/api/budgets/${this.id}`)
    }
}
</script>