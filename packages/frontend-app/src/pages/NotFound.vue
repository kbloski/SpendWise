<template>
    <base-card>
        <side-title> 404 - Page not found!</side-title>
        <base-info title="Ups! Strona nie została znaleziona.">
            Wygląda na to, że strona, której szukasz, nie istnieje lub została przeniesiona. <br>
        </base-info>
        <base-button :link="true" to="/">Przejdź na stronę główną</base-button>
    </base-card>
</template>