<template>
    <base-card>
        <side-title>My Profile</side-title>
        <user-details></user-details>
    </base-card>
</template>

<script>
import UserDetails from '../components/users/UserDetails.vue';
export default {
    components: {
        UserDetails
    }
}
</script>