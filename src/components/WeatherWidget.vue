<template>
    <div class="weather">
        <div class="weather__header">
            <div class="weather__logo">
                <img class="weather__logo--image" alt="LOGO" src="/assets/images/weather_widget.png">
            </div>
            <div class="weather__form">
                <div class="form-input">
                    <input type="text" v-model.trim="city" @keyup.enter="searchCity(city)">
                </div>
                <button class="form-btn" @click="searchCity(city)">Search</button>
            </div>
        </div>
        <div class="weather__body">
            <template v-if="currentWeather === null">
                <div class="weather__body--notify">
                    Click search city
                </div>
            </template>
            <template v-else-if="!currentWeather">
                <div class="weather__body--notify">
                    City Not Found
                </div>
            </template>
            <template v-else>
                <div class="weather__current">
                    <h2></h2>
                    <div>
                        <div class="current__icon">
                            <img :src="getIcon(currentWeather.weather[0].icon+'@2x')" :alt="currentWeather.weather[0].description">
                        </div>
                        <div class="current__temperature">

                        </div>
                        <div class="current__info"></div>
                    </div>
                </div>
                <div class="weather__forecast">
                    <div class="weather__item" v-for="(item, index) in forecastWeather.slice(0, 4)" :key="index">
                        <div class="item__weekday">{{ getWeekday(item.dt) }}</div>
                        <div class="item__icon">
                            <img :src="getIcon(item.weather[0].icon)" :alt="item.weather[0].description">
                        </div>
                        <div class="item__temperature">{{item.temp.day}}℃</div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import {
    WEATHER_GETTER_CURRENT_WEATHER,
    WEATHER_GETTER_FORECAST_WEATHER,
    WEATHER_MUTATION_SET_EMPTY_DATA,
    WEATHER_ACTION_LOAD_SEARCH_CITY,
} from '@/store/modules/weather/config'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import moment from 'moment'

export default {
    name: 'WeatherWidget',
    setup() {
        const store = useStore(),
                weekdays = ['SUN','MON','TUE','WED','THU','FRI','SAT']

        let city = ref('')

        return {
            city,
            weekdays,
            currentWeather  : computed(() => store.getters[WEATHER_GETTER_CURRENT_WEATHER]),
            forecastWeather : computed(() => store.getters[WEATHER_GETTER_FORECAST_WEATHER]),
            getWeekday      : (time) => weekdays[moment.unix(time).day()],
            getIcon         : (name) => `http://openweathermap.org/img/wn/${name}.png`,
            searchCity      : (city) => {
                if(city){
                    store.dispatch(WEATHER_ACTION_LOAD_SEARCH_CITY, city)
                    return
                }

                store.commit(WEATHER_MUTATION_SET_EMPTY_DATA)
            }
        }
    }
}
</script>

<style lang="scss">
.weather{
    width: 470px;
    height: 530px;
    padding: 25px;

    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;

    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);

    .weather__header{
        height: 300px;
        width: 100%;

        .weather__logo{
            width: 100%;
        }
        .weather__logo--image{
            max-width: 100%;
        }
        .weather__form{
            display: flex;
        }
        .form-input{
            flex: 1 auto;
            margin-right: 20px;
            input{
                width: 100%;
            }
        }
        .form-btn{

        }
    }
    .weather__body{
        // width: 100%;
        padding: 25px;

        border: 2px solid #00487b;
        border-radius: 3px;

        .weather__body--notify{

        }
        .weather__current{
            width: 100%;
            display:flex;

            .current__icon{
                flex: 1 1 auto;
            }
            .current__temperature{
                flex: 0 0 33.33%
            }
            .current__info{
                flex: 0 0 33.33%
            }
        }
        .weather__forecast{
            display: flex;
        }
        .weather__item{
            flex: 0 0 20%;
            display: flex;
            flex-direction: column;

            .item__weekday{

            }
            .item__icon{

            }
            .item__temperature{

            }
        }
    }
}
</style>