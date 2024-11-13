<template>
    <button class="btn-success" @click="openModal">Create budget</button>
        <base-modal :visible="false" ref="budgetModal" @open="openInit">
            <template v-slot:header> Budget creator </template>
            <template v-slot:default>
                <div class="body-modal">
                    <base-error v-if="error"> {{ error }} </base-error>
                    <div v-if="loading">Loading...</div>
                    <div v-else>
                        <div>
                            <base-form-control v-model="name">Name</base-form-control>
                        </div>
                        <div>
                            <base-button @click="createBudget">Create</base-button>
                        </div>
                    </div>
                </div>
            </template>
        </base-modal>
</template>

<script>
import { reactive, ref, watch } from "vue";
import { useStore } from 'vuex'
import usePost from "../../hooks/usePost.js";
import { validName } from '../../utils/validation.js'

export default {
    setup() {
        const store = useStore()
        const budgetModal = ref(null);
        const postBudget = usePost("/api/budgets/me");

        const error = reactive({
            name: null,
            server: null
        })

        function clearErrors(){
            error.name = null;
            error.server = null;
        }

        watch( postBudget.error , () => error.server = postBudget.error.value ?? null)
        const name = ref("");

        function openInit(){
            clearErrors()
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
            clearErrors();
            error.name = validName( name.value )

            if (error.name) return;
            postBudget.postData({ name: name.value });
        }

        return {
            name,
            budgetModal,
            error,
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
    padding: 0;
    margin: .5rem 0;
}

.body-modal > *{
    margin-bottom: .5rem;
}
</style>
