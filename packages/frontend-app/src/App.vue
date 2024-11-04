<template>
    <router-view></router-view>
</template>

<style>
:root {
  --background-gradient-first: #000000;
  --background-gradient-second: #1d1d1d;
}

* {
  box-sizing: border-box;
}

html, body {
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background: linear-gradient(to right top, var(--background-gradient-first), var(--background-gradient-second) 60%, var(--background-gradient-first));
}
</style>