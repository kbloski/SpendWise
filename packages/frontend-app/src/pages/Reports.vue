<template>
    <div>
        <side-title>All Reports</side-title>
        <base-error v-if="error">{{ error }}</base-error>
        <div v-else-if="loading">Loading... </div>

        <div>
            <base-title>Sortuj po dacie utworzenia</base-title>
            <input type="radio" name='create' v-model="sortedFilter" value="ASC">Od najnowszych</input>
            <br>
            <input type="radio" name='create'  v-model="sortedFilter" value="DESC" >Od najstarszych</input>
            <hr></hr>
        </div>

        <ul v-if="reports?.length">
            <transition-group tag="ul" name="report-list">
                <report-list-item
                    v-for="report in reports"
                    :key="report.id"
                    :id="report.id"
                    :budgetId="report.budget_id"
                    :totalExpenses="report.total_expenses"
                    :periodStart="report.period_start"
                    :periodEnd="report.period_end"
                    :created="report.createdAt"
                    @delete="onDelete"
                ></report-list-item>
            </transition-group>
        </ul>
        <base-info v-else title="Brak raportów">Brak raportów dla posiadanych budżetów.</base-info>
    </div>
</template>

<script>
import { computed, watch, ref} from 'vue';
import useFetch from '../hooks/useFetch';
import useDelete from '../hooks/useDelete';
import { useRouter } from 'vue-router';
import ReportListItem from '../components/pages/ReportListItem.vue';

export default {
    components: {
        ReportListItem
    },
    setup(){
        const router = useRouter()
        const fetchReports = useFetch('/api/reports/all');
        const fetchDelete = useDelete()
        const reports = ref([]);
        const loading = computed( ()=> fetchReports.loading.value )
        const error = computed( ()=> fetchReports.error.value )

        watch( fetchDelete.response , ()=>{
            if (!fetchDelete.response.ok) return;
            fetchReports.refetch();
            fetchDelete.clearResponse()
            router.replace('/reports')
        })

        function onDelete( reportId ){
            fetchDelete.setNewUrl('/api/reports/'+ reportId);
        }

        const sortedFilter = ref('ASC');
        watch( [sortedFilter, fetchReports.data]  , () => {
            const data = fetchReports.data.value?.reports ?? [];
            if (!data.length) return;

            const repArr = []
            for( const i in data){
                repArr.push(data[i])
            }

            const sortedArr = repArr.sort( (elA, elB) => {
                const timeElA =  new Date(elA.createdAt).getTime() 
                const timeElB =  new Date(elB.createdAt).getTime() 

                if (timeElA > timeElB) return -1;
                if (timeElA < timeElB) return 1;
                return 0;
            })



            if ( sortedFilter.value === 'ASC') return  reports.value = sortedArr;
            return reports.value = sortedArr.reverse();
        })

        return {
            reports,
            loading,
            error,
            onDelete,
            sortedFilter
        }
    }
}
</script>

<style scoped>
ul > li {
    padding-bottom: 1rem;
}

.report-list-enter-from {
    opacity: 0;
    transform: translateX(-30px)
}
.report-list-enter-active {
    transition: all 0.3s ease-in;
}
.report-list-enter-to {
    opacity: 1;
    transform: translateX(0px);
}
.report-list-leave-from {
    opacity: 1;
    transform: translateX(0)
}
.report-list-leave-active {
    transition: all 0.3s ease-out;
}
.report-list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.report-list-move {
    transition: transform 2s ease;
}
</style>