<template>
    <div>
        <side-title>Dashboard</side-title>
    </div>
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