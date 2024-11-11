<template>
    <div class="container">
        <base-button @click="openModal">Create budget</base-button>
        <base-modal :visible="false" ref="budgetModal" @open="openInit">
            <template v-slot:header> Budget creator </template>
            <template v-slot:default>
                <div class="body-modal">
                    <base-error v-if="error"> {{ error }} </base-error>
                    <div>
                        <base-form-control v-model="name">Name</base-form-control>
                    </div>
                    <div>
                        <base-button @click="createBudget">Create</base-button>
                    </div>
                </div>
            </template>
        </base-modal>
    </div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from 'vuex'
import usePost from "../../hooks/usePost.js";

export default {
    props: ['update'],
    setup( props ) {
        const store = useStore()
        const budgetModal = ref(null);
        const postBudget = usePost("/api/budgets/me");

        const name = ref("");
        function openInit(){
            postBudget.clearResponse()
        }

        watch( postBudget.response, () => {
            if (!postBudget.response.ok) return;
            name.value = ""; 
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
            error: postBudget.error,
            loading: postBudget.loading,
            openModal,
            createBudget,
            openInit
        };
    },
};
</script>

<style>
.container {
    padding-bottom: 1rem;
}

.body-modal > *{
    margin-bottom: .5rem;
}
</style>
