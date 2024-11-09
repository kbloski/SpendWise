<template>
    <div class="container">
        <button @click="openModal">Share</button>
        <base-modal :visible="false" ref="shareModal">
            <template v-slot:header> Budget create </template>
            <template v-slot:default>
                <base-form-control v-model="email">Provide user email</base-form-control>
                <br />
                <base-button @click="onSubmit">Share</base-button>
            </template>
        </base-modal>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getLocalToken } from '../../utils/localStore';

export default {
    props: {
        budgetId: {
            required: true
        }
    },
    setup( props ){
        const shareModal = ref();
        const userEmail = ref('');
        const loading = ref(false);
        const error = ref(null);
        const ok = ref(null)
        const email = ref('')

        function openModal(){
            shareModal.value.openModal()
        }

        function onSubmit(){
            loading.value = true
            const url = 'http://localhost:8081/api/budgets/'+ props.budgetId + '/shares';
            const token = getLocalToken()

            fetch( url , {
                method: "PUT",
                headers: {
                    authorization: "Bearer "+token,
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(
                    {
                        email: email.value 
                    }
                )
            }).then( res => {
                ok.value = res.ok
                error.value = res.statusText
            })
            .finally( () => loading.value = false)
        }

        return {
            onSubmit,
            shareModal,
            openModal,
            email
        }
    }
}

</script>