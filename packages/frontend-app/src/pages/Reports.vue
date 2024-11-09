<template>
    <div>
        <side-title>All Reports</side-title>
        <ul>
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
    </div>
</template>

<script>
import { computed } from 'vue';
import useFetch from '../hooks/useFetch';

export default {
    setup(){
        const fetchReports = useFetch('/api/reports/all');
        const reports = computed( () => fetchReports.data.value?.reports)

        return {
            reports
        }
    }
}
</script>