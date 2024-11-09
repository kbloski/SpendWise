<template>
    <div class="container">
        <base-button @click="openModal">Generate Report</base-button>
        <base-modal :visible="false" ref="reportModal">
            <template v-slot:header>Generate report </template>
            <template v-slot:default>
                <input type="date" v-model="period_start"/>
                <input type="date" v-model="period_end">
                <base-button @click="createReport">Generate</base-button>
            </template>
        </base-modal>
    </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useFetch from "../../hooks/useFetch.js";

export default {
    props: {
        budgetId: {
            required: true,
        },
    },
    setup(props) {
        const router = useRouter();
        const period_start = ref(undefined);
        const period_end = ref(undefined);
        
        const fetchGenerate = useFetch()

        const loading = computed(()=> fetchGenerate.loading?.value) 
        const error = computed( () => fetchGenerate.error?.value )


        const reportModal = ref(null);
        const created = computed(() => !!fetchGenerate.response.ok);

        function openModal() {
            reportModal.value.openModal();
        }
        
        async function createReport() {
            let newUrl = `/api/budgets/${props.budgetId}/reports?`
            const params = []
            if (period_start.value) params.push( `period_start=` + period_start.value)
            if (period_end.value) params.push( `period_end=` + period_end.value)

            newUrl+=params.join('&');

            fetchGenerate.setNewUrl( newUrl );
        }
        
        watch(created, () => {
            if (!created.value) return;
            period_start.value = null
            period_end.value = null 
            fetchGenerate.clearResponse()
            reportModal.value.closeModal();
        });

        return {
            reportModal,
            openModal,
            createReport,
            period_start,
            period_end
        };
    },
};
</script>

<style>
.container {
    padding-bottom: 1rem;
}
</style>
