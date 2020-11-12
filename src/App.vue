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
body{
    margin:0;
    padding: 0;
    background: #ddd;
}
.wrap {

}
</style>
