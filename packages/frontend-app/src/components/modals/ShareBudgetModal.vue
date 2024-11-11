<template>
    <div class="container">
        <base-button @click="openModal">Share budget</base-button>
        <base-modal :visible="false" ref="shareModal">
            <template v-slot:header> Share </template>
            <template v-slot:default>
                <base-error v-if="error.server"> {{ error.server }} </base-error>
                Role: 
                <select v-model="enteredRole">
                    <option v-for="role in roles" :value="role.priority">{{ role.name }}</option>
                </select>
                <base-error v-if="error.email">{{ error.email }}</base-error>
                <base-form-control v-model="enteredEmail">Provide user email</base-form-control>
                <br />
                <base-button @click="onSubmit">Share</base-button>
            </template>
        </base-modal>
    </div>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import useFetch from '../../hooks/useFetch.js'
import usePut from '../../hooks/usePut';
import { validEmail } from '../../utils/validation.js'

export default {
    props: {
        budgetId: {
            required: true
        }
    },
    setup( props ){
        const store = useStore()
        const shareModal = ref();

        const fetchRoles = useFetch('/api/roles')
        const putShare = usePut('/api/budgets/' + props.budgetId + '/shares');
        const roles = computed( ()  => fetchRoles.data?.value?.roles ?? [] )
        const enteredEmail = ref('')
        const enteredRole = ref(null)


        const loading = computed( () => fetchRoles.loading || putShare.loading )
        const error = reactive({
            email: null,
            server: null
        });

        watch([ fetchRoles.error, putShare.error], () => {
            error.server = fetchRoles.error.value || putShare.error.value
        })

        function clearErrors(){
            error.email = null;
            error.server = null
        }

        function openModal(){
            shareModal.value.openModal()
        }
        
        watch( putShare.response, () => {
            if (!putShare.response.ok) return;
            store.dispatch('refresh/triggerRefreshShares')
            putShare.clearResponse()
            clearErrors()
            shareModal.value.closeModal();
        })

        function onSubmit(){
            clearErrors()
            const updatedData = {
                email: enteredEmail.value,
                role : 0
            };
            // updatedData.role = enteredRole.value;
            // error.email = validEmail( enteredEmail.value );

            if (error.email) return;
            putShare.putData(updatedData)
        }

        return {
            loading,
            error,
            shareModal,
            onSubmit,
            openModal,
            enteredEmail,
            enteredRole,
            roles
        }
    }
}

</script>