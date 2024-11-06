<template>
    <div>
        <base-title>Kategorie budżetu</base-title>
        <category-cards></category-cards>
        <router-view></router-view>
    </div>
</template>

<script>
import CategoryCards from './CategoryCards.vue';

export default {
    components: {
        CategoryCards
    }
}
</script>