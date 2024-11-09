<template>
    <div class="container">
        <base-button @click="openModal">Create budget</base-button>
        <base-modal :visible="false" ref="budgetModal">
            <template v-slot:header> Budget create </template>
            <template v-slot:default>
                <base-form-control v-model="name">Name</base-form-control>
                <br />
                <base-button @click="createBudget">Create</base-button>
            </template>
        </base-modal>
    </div>
</template>

<script>
import { computed, ref, watch, inject } from "vue";
import { useStore } from 'vuex'
import usePost from "../../hooks/usePost.js";

export default {
    props: ['update'],
    setup( props ) {
        const store = useStore()
        const budgetModal = ref(null);
        const postBudget = usePost("/api/budgets/me");

        const name = ref("");
        const created = computed(() => postBudget.response?.ok);
        // const refreshBudgetList = inject("refreshBudgetList");

        watch(created, () => {
            if (!created.value) return;
            name.value = ""; 
            // refreshBudgetList();
            store.dispatch('refresh/triggerRefreshBudgets')
            budgetModal.value.closeModal();
        });

        function openModal() {
            budgetModal.value.openModal();
        }

        async function createBudget() {
            postBudget.postData({ name: name.value });
        }

        return {
            name,
            budgetModal,
            openModal,
            createBudget,
            created,
        };
    },
};
</script>

<style>
.container {
    padding-bottom: 1rem;
}
</style>
