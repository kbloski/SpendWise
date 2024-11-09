<template>
    <nav>
        <ul>
            <base-link to="/dashboard"><li>Dashboard</li></base-link>
            <base-link to="/user/profile"><li>My profile</li></base-link>
            <base-link to="/user/budgets"><li>Budgets</li></base-link>
            <base-link to="/reports"><li>Reports</li></base-link>
            <base-link to="/support"><li>Support</li></base-link>
        </ul>
    </nav>
</template>

<style scoped>

nav {
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 1;
    position: relative;
}

li {
    margin: 1rem 0 0 0 ;
}

.router-link-active > li {
    color: black;
    background-color: var(--background-color-light);
    z-index: 3;
    padding: 1rem;
    border-radius: 1rem 0 0 1rem;
    width: auto;
    position: relative
}



</style>