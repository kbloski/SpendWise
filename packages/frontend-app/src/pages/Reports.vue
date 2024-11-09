<template>
    <div>
        <side-title>All Reports</side-title>
        <base-error v-if="error">{{ error }}</base-error>
        <div v-else-if="loading">Loading... </div>
        <ul v-else-if="reports.length">
            <li
                v-for="report in reports"
                :key="report.id"
            >
                <div>
                    Budget: {{  report.budget_id }}
                </div>
                <div>
               Total Expenses: {{  report.total_expenses }}
                </div>
                <div>
               Start: {{  report.period_start }}
                </div>
                <div>
               End:  {{  report.period_end }}
                </div>
                <div>
               Created:  {{  report.createdAt }}
                </div>
            </li>
        </ul>
        <base-info v-else title="Brak raportów">Brak raportów dla posiadanych budżetów.</base-info>
    </div>
</template>

<script>
import { computed } from 'vue';
import useFetch from '../hooks/useFetch';

export default {
    setup(){
        const fetchReports = useFetch('/api/reports/all');
        const reports = computed( () => fetchReports.data.value?.reports)
        const loading = computed( ()=> fetchReports.loading.value )
        const error = computed( ()=> fetchReports.error.value )
        return {
            reports,
            loading,
            error 
        }
    }
}
</script>