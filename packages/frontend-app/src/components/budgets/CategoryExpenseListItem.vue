<template>
    <li>
        <span>Id: {{ id }}</span>
        <span>Kwota: {{ amount}}zł</span>
        <span>UserId: {{ user_id }}</span>
        <span>Data: {{ data }}</span>
    </li>
</template>

<script>
import { formatDate } from '../../utils/dateUtils';

export default {
    props: ["id", "amount", 'date', 'user_id'],
    computed: {
        data(){
            const date = new Date(this.$props.date);
            return formatDate( date )
        }
    }
}
</script>

<style scoped>
li{
    background: rgb(217, 255, 233);
    display: flex;
    justify-content: space-between;
}
li:nth-child(2n){
    background: rgb(192, 255, 220);
}
span {
    margin: .3rem;
    padding: .1rem;
}
</style>