<template>
    <div class="container">
        <base-button @click="openModal">Update Budget</base-button>
        <base-modal :visible="false" ref="budgetModal">
            <template v-slot:header>Update Budget</template>
            <template v-slot:default>
                <base-form-control v-model="name">Name</base-form-control>
                <base-form-control v-model="newOwnerEmail">New owner email</base-form-control>
                <br />
                <base-button @click="updateBudget">Update</base-button>
            </template>
        </base-modal>
    </div>
</template>

<script>
import { computed, ref, watch, inject } from "vue";
import usePatch from '../../hooks/usePatch.js'

export default {
    props: ['budgetId'],
    setup( props ) {
        const budgetModal = ref(null);
        const patchBudget = usePatch("/api/budgets/"+ props.budgetId);
        const updated = computed(() => patchBudget.response?.ok);

        const name = ref("");
        const newOwnerEmail = ref('')

        watch(updated, () => {
            if (!updated.value) return;

            name.value = "";
            patchBudget.clearResponse()
            store.dispatch('refresh/triggerRefreshBudgets')
            budgetModal.value.closeModal();
        });

        function openModal() {
            budgetModal.value.openModal();
        }

        async function updateBudget() {
            patchBudget.patchData(
                { 
                    name: name.value ,
                    owner_email: newOwnerEmail.value
                }
            );
        }

        return {
            name,
            newOwnerEmail,
            budgetModal,
            openModal,
            updateBudget,
        };
    },
};
</script>

<style>
.container {
    padding-bottom: 1rem;
}
</style>
