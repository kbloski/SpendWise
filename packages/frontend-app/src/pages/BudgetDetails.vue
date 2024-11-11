<template>
    <base-title>Informacje o budżecie</base-title>
    <div v-if="errorMessage">
        <base-error>{{ errorMessage }}</base-error>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="!loading && !errorMessage">
        <div class="container">
            <div>
                <section class="budget-details">
                    <header>
                        <div>Budget details</div>
                    </header>
                    <div>
                        <span>Id</span>
                        <span>{{ budget.id }}</span>
                    </div>
                    <div>
                        <span>Name</span>
                        <span>{{ budget.name }}</span>
                    </div>
                    <div>
                        <span>Owner Id</span>
                        <span>{{ budget.user_id }}</span>
                    </div>
                    <div>
                        <span>CreatedAt</span>
                        <span>{{ createDate }}</span>
                    </div>
                    <div>
                        <span>Last update</span>
                        <span>{{ updateDate }}</span>
                    </div>
                    <div>
                        <span>Total</span>
                        <span>{{ total }} zł</span>
                    </div>
                </section>
            </div>
            <div class="actions">
                <base-button :link="true" :to="categoryLink">Categories</base-button>
                <base-button :link="true" :to="expensesLink">All Expenses</base-button>
                <base-button :link="true" :to="sharesLink">Shares</base-button>

                <div v-if="rolePriority < 2">
                    <modify-budget :budgetId="budgetId"></modify-budget>
                    <create-category :budgetId="budgetId"></create-category>
                    <base-button @click="onDelete">Delete</base-button>                
                    <add-report-modal :budgetId="budgetId"></add-report-modal>
                    <share-budget-modal :budgetId="budgetId"></share-budget-modal>
                </div>
            </div>
        </div>
        <router-view :id="budget.id"></router-view>
            
    </div>
</template>

<script>
import useFetch from "../hooks/useFetch.js";
import useDelete from '../hooks/useDelete.js'
import { formatDate } from "../utils/dateUtils.js";
import AddCategoryModal from '../components/modals/AddCategoryModal.vue'
import AddReportModal from "../components/modals/GenerateReportModal.vue";
import ModifyBudgetModal from "../components/modals/ModifyBudgetModal.vue";
import ShareBudgetModal from '../components/modals/ShareBudgetModal.vue';

export default {
    components: {
        createCategory: AddCategoryModal,
        modifyBudget: ModifyBudgetModal,
        AddReportModal,
        ShareBudgetModal,
    },
    props: [
        "budgetId",
        "categoryId"
    ],
    data() {
        return {
            fetchBudget: useFetch(`/api/budgets/${this.budgetId}`),
            fetchTotal: useFetch('/api/budgets/'+this.budgetId+'/summary'),
            deleteBudget: useDelete()
        };
    },
    watch: {
        budgetId(){
            this.fetchBudget.setNewUrl( '/api/budgets/'+ this.budgetId )
        },
        isNeededRefresh(val){
            if (val) {
                this.fetchTotal.refetch()
                this.fetchBudget.refetch()
            }
        },
        isDeleted( val ){
            if (val) {
                this.$store.dispatch('refresh/triggerRefreshBudgets')
                this.$router.replace('/budgets')
            }
        }
    },
    computed: {
        isDeleted(){
            return this.deleteBudget.response?.ok
        },  
        isNeededRefresh(){
            const result = this.$store.getters['refresh/isRefreshExpensesNeeded'] || this.$store.getters['refresh/isRefreshBudgetsNeeded']

            return result
        },
        total(){
            return this.fetchTotal.data?.total
        },
        errorMessage() {
            return this.fetchBudget.error ?? this.fetchTotal.error;
        },
        createDate() {
            const date = new Date(this.budget.createdAt);
            return formatDate(date);
        },
        loading() {
            return this.fetchBudget.loading || this.fetchTotal.loading 
        },
        updateDate() {
            const date = new Date(this.budget.updatedAt);
            return formatDate(date);
        },
        loading() {
            return this.fetchBudget.loading;
        },
        budget() {
            return this.fetchBudget.data?.budget ?? {};
        },
        rolePriority(){
            return this.fetchBudget.data?.rolePriority ?? 100;
        },
        categoryLink() {
            return {
                name: "budget-categories",
                params: { budgetId: this.budgetId },
            };
        },
        expensesLink(){
            return {
                name: 'budget-expenses',
                params: { budgetId: this.budgetId}
            }
        },
        sharesLink(){
            return {
                name: 'budget-shares',
                params: { budgetId: this.budgetId}
            }
        }
    },
    methods: {
        onDelete(){
            this.deleteBudget.setNewUrl('/api/budgets/'+ this.budgetId);
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
}

.budget-details {
    margin: 1rem;
    padding: 0.5rem;
    box-shadow: 0 0 10px black;
    border-radius: 1rem;
}

.budget-details > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid black;
}


span,
span {
    text-align: start;
    padding: 0.2rem 1rem;
}

header {
    padding: 0.5rem 1rem;
    box-shadow: inset 0 0 8px green;
    border-radius: 1rem;
}

header:hover {
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
