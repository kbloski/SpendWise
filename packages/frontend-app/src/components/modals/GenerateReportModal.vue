<template>
    <button class="btn-success"@click="openModal">Generate Report</button>
    <base-modal :visible="false" ref="reportModal">
        <template v-slot:header>Generate report </template>
        <template v-slot:default>
            <base-error v-if="error">{{ error }}</base-error>
            <div v-if="loading">Loading...</div>
            <div v-else>
                <span>Start: </span>
                <input type="date" class="input-date" v-model="period_start"/>
                <span>End: </span>
                <input type="date" class="input-date" v-model="period_end" />
                <base-button @click="createReport">Generate</base-button>
            </div>
        </template>
    </base-modal>
</template>

<script>
import { ref, watch } from "vue";
import useFetch from "../../hooks/useFetch.js";

export default {
    props: {
        budgetId: {
            required: true,
        },
    },
    setup(props) {
        const period_start = ref(undefined);
        const period_end = ref();
        
        const oldUrl = ref(null)
        const fetchGenerate = useFetch()
        const reportModal = ref(null);

        function openModal() {
            reportModal.value.openModal();
        }
        
        async function createReport() {
            let newUrl = `/api/budgets/${props.budgetId}/reports?`
            const params = []
            if (period_start.value) params.push( `period_start=` + period_start.value)
            if (period_end.value) params.push( `period_end=` + period_end.value)
            newUrl+=params.join('&');
        
            if ( oldUrl.value !== newUrl){
                oldUrl.value = newUrl;
                fetchGenerate.setNewUrl( newUrl );
            } else {
                fetchGenerate.refetch()
            }
        }
        
        watch(fetchGenerate.response, () => {
            if (!fetchGenerate.response.ok) return;
            period_start.value = null
            period_end.value = null 
            fetchGenerate.clearResponse()
            reportModal.value.closeModal();
        });

        return {
            error: fetchGenerate.error,
            loading: fetchGenerate.loading,
            reportModal,
            openModal,
            createReport,
            period_start,
            period_end
        };
    },
};
</script>

<style scoped>
.input-date{
    width: 100%;
    padding: .2rem 1rem;
    margin: .2rem 0;
}
</style>
