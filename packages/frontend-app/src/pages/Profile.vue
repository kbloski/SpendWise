<template>
    <div>
        <side-title>My Profile</side-title>
        <user-details></user-details>
    </div>
</template>

<script>
import UserDetails from '../components/pages/UserDetails.vue';
export default {
    components: {
        UserDetails
    }
}
</script>