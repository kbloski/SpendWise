<template>
    <div>
        <base-error v-if="errorMessage">{{  errorMessage }}</base-error>
        <div v-if="loading" >Loading... </div>

        <div class="sort-options">
            <base-form-control v-model="searchName">Szukaj budżetu po nazwie.</base-form-control>
        </div>

        <transition name="search-fade" mode="out-in">
            <div v-if="searchName">
                <base-ul title="Znalezione budżety" v-if="searchName">
                    <li v-if="!findedBudgets?.length">Nie dopasowano żadnego budżetu do wyszukiwań.</li>
                    <my-budgets-list-item  
                        v-else
                        v-for="rel in findedBudgets"
                        :key="rel.Budget.id"
                        :id="rel.Budget.id"
                        :name="rel.Budget.name"
                        :rolePriority="rel.role"
                    >
                    </my-budgets-list-item>
                </base-ul>
            </div>
        </transition>


        <div v-if="budgetList.length">
            <base-ul title="Moje budżety">
                <my-budgets-list-item 
                    v-for="relation in budgetList"
                    :key="relation.Budget.id"
                    :id="relation.Budget.id"
                    :name="relation.Budget.name"
                    :rolePriority="relation.role"
                >
                </my-budgets-list-item>
            </base-ul>
        </div>
        <base-info v-else title="Brak budżetów">Aktualnie nie posiadasz żadnych budżetów.</base-info>
    </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import useFetch from '../../hooks/useFetch';
import MyBudgetsListItem from './MyBudgetsListItem.vue';

export default {
    components: {
        MyBudgetsListItem,
    },
    setup(){
        const store = useStore()
        const isNeededRefresh = computed(() => store.getters['refresh/isRefreshBudgetsNeeded'] );
        watch( isNeededRefresh, () => {
            if (!isNeededRefresh.value) return;
            fetchBudgets.refetch()
        })

        const fetchBudgets = useFetch('/api/budgets/me');
        const errorMessage = computed( () => fetchBudgets?.error.value);
        const loading = computed( ()=> fetchBudgets.loading.value );
        const budgetList = computed( () => fetchBudgets?.data?.value?.budgets ?? []);

        const searchName = ref(null);
        const findedBudgets = ref([]);
        watch( searchName, () => {
            findedBudgets.value =  budgetList.value.filter( rel => rel.Budget.name.includes( searchName.value ))
        })

        return {
            errorMessage,
            loading: loading,
            budgetList,
            searchName,
            findedBudgets
        }
    }
}
</script>

<style lang="css" scoped>
.sort-options {
    /* display: flex; */
    padding: 2rem;
}


.search-fade-enter-from {
    transform: translateY(-50px);
    scale: 0.8;
    opacity: 0;
}
.search-fade-enter-active {
    transition: all 0.3s ease-in;
}
.search-fade-enter-to {
    transform: translateY(0);
    scale: 100%;
    opacity: 1;
}
.search-fade-leave-from {
}

.search-fade-leave-active {
    transition: all 0.3s ease-out;
}
.search-fade-leave-to {
    transform: translateY(-50px);
    scale: 0.8;
    opacity: 0;
}
</style>