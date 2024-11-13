<template>
    <button class="btn-success "@click="openModal">Update Budget</button>
    <base-modal :visible="false" ref="budgetModal">
        <template v-slot:header>Update Budget</template>
        <template v-slot:default>
            <div v-if="error.serwer">
                <base-error>{{  error.serwer  }}</base-error>
                <hr></hr>
            </div>
            <base-error v-if="error.name"> {{ error.name }} </base-error>
            <base-form-control v-model="name">Name</base-form-control>
            <base-error v-if="error.owner_email"> {{ error.owner_email }} </base-error>
            <base-form-control v-model="newOwnerEmail">New owner email</base-form-control>
            <br />
            <base-button @click="updateBudget">Update</base-button>
        </template>
    </base-modal>
</template>

<script>
import { computed, ref, watch, inject, reactive } from "vue";
import usePatch from '../../hooks/usePatch.js'
import { useStore } from "vuex";
import { validEmail, validName } from "../../utils/validation.js";

export default {
    props: ['budgetId'],
    setup( props ) {
        const store = useStore()
        const budgetModal = ref(null);
        const patchBudget = usePatch("/api/budgets/"+ props.budgetId);
        const updated = computed(() => patchBudget.response?.ok);

        const error = reactive({
            name: null,
            owner_email: null,
            serwer: null
        })
        const name = ref("");
        const newOwnerEmail = ref('')

        function clearError(){
            error.name = null
            error.owner_email = null
            error.serwer = null

        }

        watch(updated, () => {
            if (!updated.value) return;

            name.value = "";
            patchBudget.clearResponse()
            store.dispatch('refresh/triggerRefreshBudgets')
            budgetModal.value.closeModal();
        });

        watch( patchBudget.error , () => error.serwer = patchBudget.error.value)

        function openModal() {
            budgetModal.value.openModal();
            clearError();
        }

        async function updateBudget() {
            clearError;
            error.name = validName( name.value );
            error.owner_email = validEmail( newOwnerEmail.value )

            if (error.name || error.owner_email) return;

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
            error
        };
    },
};
</script>

<style>
.container {
    padding-bottom: 1rem;
}
</style>
