<template>
    <base-card>
        <side-title>My Profile</side-title>
        <user-details></user-details>
       
        <base-button>Update Account</base-button><br>
        <base-button>Delete Account</base-button>
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