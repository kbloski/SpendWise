<template>
    <base-card>
        <base-title>
            <h2>404 - Page not found!</h2>
        </base-title>
        <base-info title="Ups! Strona nie znaleziona">
            Wygląda na to, że strona, której szukasz, nie istnieje lub została przeniesiona. <br>
        </base-info>
        <base-button :link="true" to="/">Przejdź na stronę główną</base-button>
    </base-card>
</template>