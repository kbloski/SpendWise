<template>
    <base-card>
        <side-title>Dashboard</side-title>
        <base-modal ref="modal-test">
            <template v-slot:header>Header Modal</template>
            <template v-slot:default>
                <div>
                    Body modal
                </div>
            </template>
        </base-modal>
        <base-button @click="openModal">Otwórz modal informacyjny</base-button>
    </base-card>
</template>

<script>
export default { 
    methods: {
        openModal(){
            this.$refs['modal-test'].openModal()
        }
    }
}
</script>