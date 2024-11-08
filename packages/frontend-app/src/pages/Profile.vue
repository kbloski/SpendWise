<template>
    <base-card>
        <side-title>My Profile</side-title>
        <user-details></user-details>
    </base-card>
</template>

<script>
import UserDetails from '../components/pages/UserDetails.vue';
export default {
    components: {
        UserDetails
    }
}
</script>