<template>
    <div class="weather">
        <div class="weather__header">
            <div class="weather__logo">
                <img class="weather__logo--image" alt="LOGO" src="/assets/images/weather_widget.png">
            </div>
            <div class="weather__form">
                <div class="form-input">
                    <input type="text" v-model.trim="keyword" @keyup.enter="searchCity(keyword)" name="city_name">
                </div>
                <button class="form-btn btn-search-city" @click="searchCity(keyword)">Search</button>
            </div>
        </div>
        <div class="weather__body">
            <template v-if="!currentWeather || !Object.keys(currentWeather).length">
                <div class="weather__body--notify">
                    {{message}}
                </div>
            </template>
            <template v-else>
                <div class="weather__current">
                    <h2 class="current__city">{{currentCity.name}}</h2>
                    <div class="current__info">
                        <div class="info__icon">
                            <img :src="getIcon(currentWeather.weather[0].icon+'@2x')" :alt="currentWeather.weather[0].description">
                            <div class="info__des">{{currentWeather.weather[0].description}}</div>
                        </div>
                        <div class="info__temperature">{{currentWeather.temp}}℃</div>
                        <div class="info__detail">
                            <p>Wind: {{ currentWeather.wind_speed }} m/s</p>
                            <p>Sunrise: {{ getTimeDetail(currentWeather.sunrise) }}</p>
                            <p>Sunset: {{ getTimeDetail(currentWeather.sunset) }}</p>
                        </div>
                    </div>
                </div>
                <div class="weather__forecast">
                    <div class="weather__item" v-for="(item, index) in forecastWeather.slice(0, 5)" :key="index">
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
    WEATHER_GETTER_CITY,
    WEATHER_GETTER_MESSAGE,
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

        let keyword = ref('')

        return {
            keyword,
            weekdays,
            currentCity     : computed(() => store.getters[WEATHER_GETTER_CITY]),
            message         : computed(() => store.getters[WEATHER_GETTER_MESSAGE]),
            currentWeather  : computed(() => store.getters[WEATHER_GETTER_CURRENT_WEATHER]),
            forecastWeather : computed(() => store.getters[WEATHER_GETTER_FORECAST_WEATHER]),
            getWeekday      : (time) => weekdays[moment.unix(time).day()],
            getTimeDetail   : (time) => moment.unix(time).format('h:mm A'),
            getIcon         : (name) => `http://openweathermap.org/img/wn/${name}.png`,
            searchCity      : (keyword) => {
                if(keyword){
                    store.dispatch(WEATHER_ACTION_LOAD_SEARCH_CITY, keyword)
                    return
                }

                store.commit(WEATHER_MUTATION_SET_EMPTY_DATA)
            }
        }
    }
}
</script>

<style lang="scss">
*{
    box-sizing: border-box;
}
.weather{
    font-family: Tahoma, Geneva, sans-serif;
    font-size: 13px;

    width: 450px;
    // height: 530px;
    padding: 25px;

    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;

    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);

    .weather__header{
        // height: 300px;
        width: 100%;

        .weather__logo{
            width: 100%;
        }
        .weather__logo--image{
            max-width: 100%;
        }
        .weather__form{
            display: flex;
            margin-top: 10px;
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
        margin-top: 25px;
        padding: 25px 0;

        border: 2px solid #00487b;
        border-radius: 3px;

        .weather__body--notify{
            // padding: 25px;
            font-weight:bold;
            text-align:center;
        }
        .weather__current{
            width: 100%;
            // padding: 0 25px;

            .current__city{
                text-align:center;
                padding: 0;
                margin: 0;
                font-size: 16px;
            }

            .current__info{
                display:flex;

            }
            .info__icon{
                flex: 1 1 auto;
                text-align:center;

                img{
                    // max-width
                }

                .info__des{
                    text-transform: capitalize;
                    font-weight: bold;
                    font-size: 15px;
                }
            }
            .info__temperature{
                flex: 0 0 33.33%;
                display:flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
            }
            .info__detail{
                flex: 0 0 33.33%;

                p{

                }
            }
        }
        .weather__forecast{
            display: flex;
            margin-top: 25px;
        }
        .weather__item{
            flex: 0 0 20%;
            display: flex;
            flex-direction: column;
            text-align:center;
            // padding: 10px;
            font-size: 13px;

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