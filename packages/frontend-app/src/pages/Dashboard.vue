<template>
    <base-card>
        <side-title>Dashboard</side-title>
    </base-card>
</template>

<script>
export default { 
    methods: {
        openModal(){
            this.$refs['modal-test'].openModal()
        }
    },

}
</script>