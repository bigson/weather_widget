<template>
    <div class="wrap">
        <WeatherWidget/>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import WeatherWidget from './components/WeatherWidget.vue'

export default {
    name: 'App',
    components: {
        WeatherWidget
    }
}
</script>

<style>
.wrap {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
