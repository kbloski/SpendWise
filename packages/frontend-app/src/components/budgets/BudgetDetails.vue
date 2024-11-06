<template>
    <base-title>Informacje o budżecie</base-title>
    <div v-if="errorMessage">
        <base-error>{{ errorMessage }}</base-error>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="!loading && !errorMessage">
        <div class="container">
            <div>
                <table>
                    <thead>
                        <th colspan="2">Budget details</th>
                    </thead>
                    <tr>
                        <th>Id</th>
                        <td>{{ budget.id }}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{{ budget.name }}</td>
                    </tr>
                    <tr>
                        <th>Owner Id</th>
                        <td>{{ budget.user_id }}</td>
                    </tr>
                    <tr>
                        <th>CreatedAt</th>
                        <td>{{ createDate }}</td>
                    </tr>
                    <tr>
                        <th>Last update</th>
                        <td>{{ updateDate }}</td>
                    </tr>
                </table>
            </div>
            <div class="actions">
                <base-button :link="true" :to="categoryLink">Categories</base-button>
                <base-button :link="true" :to="'#'">All Expenses</base-button>
                <base-button :link="true" :to="'#'">Summary</base-button>
                <base-button :link="true" :to="'#'">Reports</base-button>
            </div>
        </div>
        <router-view :id="budget.id"></router-view>
    </div>
</template>

<script>
import useFetch from "../../hooks/useFetch.js";
import { formatDate } from "../../utils/dateUtils.js";

export default {
    props: [
        "budgetId",
        "categoryId"
    ],
    data() {
        return {
            fetchBudget: {},
        };
    },
    computed: {
        errorMessage() {
            return this.fetchBudget.error;
        },
        createDate() {
            const date = new Date(this.budget.createdAt);
            return formatDate(date);
        },
        loading() {
            return this.fetchBudget.loading;
        },
        updateDate() {
            const date = new Date(this.budget.updatedAt);
            return formatDate(date);
        },
        categoryLink() {
            return {
                name: "budget-categories",
                params: { budgetId: this.budgetId },
            };
        },
        loading() {
            return this.fetchBudget.loading;
        },
        budget() {
            return this.fetchBudget.data?.budget ?? {};
        },
    },
    created() {
        this.fetchBudget = useFetch(`/api/budgets/${this.budgetId}`);
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
}

table {
    margin: 1rem;
    padding: 0.5rem;
    box-shadow: 0 0 10px black;
    border-radius: 1rem;
}

td {
    border-bottom: 1px solid black;
}

td,
th {
    text-align: start;
    padding: 0.2rem 1rem;
}

thead > th {
    padding: 0.5rem 1rem;
    box-shadow: inset 0 0 8px green;
    border-radius: 1rem;
}

thead:hover {
    box-shadow: inset 0 0 8px rgb(0, 255, 0);
    background-color: white;
    border-radius: 1rem;
}

.actions {
    padding: 1rem;
}
.actions > * {
    padding-bottom: 0.4rem;
}
</style>
