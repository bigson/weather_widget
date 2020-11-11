<template>
    <h1>bigson</h1>
    <input type="text" v-model='city'>
    <button @click='searchCity(city)'>load data</button>
</template>

<script>
import {
    WEATHER_GETTER_CITY,
    WEATHER_GETTER_WEATHER_DATA,
    WEATHER_ACTION_LOAD_SEARCH_CITY,
} from '@/store/modules/weather/config'
import {   useStore } from 'vuex'
import {  ref, computed } from 'vue'

export default {
    name: 'WeatherWidget',
    setup() {
        const store = useStore()

        let city = ref('')
            // {WEATHER_ACTION_LOAD_SEARCH_CITY : searchCity} = mapActions({
            //     WEATHER_ACTION_LOAD_SEARCH_CITY
            // })

        return {
            city,
            cityData    : computed(() => store.getters[WEATHER_GETTER_CITY]),
            weatherData : computed(() => store.getters[WEATHER_GETTER_WEATHER_DATA]),
            data        : computed(() => store.getters[WEATHER_GETTER_WEATHER_DATA]),
            searchCity  : (city) => store.dispatch(WEATHER_ACTION_LOAD_SEARCH_CITY, city)
        }
    }
}
</script>