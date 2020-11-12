// import apiCategories from '@/api/categories'
import request from '@/utils/request';
import {
    API_APP_KEY,
    API_SEARCH_CITY,
    API_WEATHER_DATA,
    GETTER_CITY,
    GETTER_WEATHER_DATA,
    GETTER_CURRENT_WEATHER,
    GETTER_FORECAST_WEATHER,
    MUTATION_SET_CITY,
    MUTATION_SET_WEATHER_DATA,
    MUTATION_SET_EMPTY_DATA,
    ACTION_LOAD_SEARCH_CITY,
    // ACTION_LOAD_WEATHER_DATA,
} from './config.js'

// initial state
const state = {
    city        : {},
    weatherData : {},
    current     : null,
    forecast    : null,
}

// getters
const getters = {
    [GETTER_CITY]: (state) => {
        return state.city
    },
    [GETTER_WEATHER_DATA]: (state) => {
        return state.weatherData
    },
    [GETTER_WEATHER_DATA]: (state) => {
        return state.weatherData
    },
    [GETTER_WEATHER_DATA]: (state) => {
        return state.weatherData
    },
    [GETTER_CURRENT_WEATHER]: (state) => {
        return state.current
    },
    [GETTER_FORECAST_WEATHER]: (state) => {
        return state.forecast
    }
}

// mutations
const mutations = {
    [MUTATION_SET_CITY](state, city){
        state.city = city
    },
    [MUTATION_SET_WEATHER_DATA](state, weatherData){
        state.weatherData = weatherData

        if(weatherData.daily.length){
            // let {current, ...forecast} = weatherData.daily

            state.current  = weatherData.daily.splice(0,1)
            state.forecast = weatherData.daily
        }
    },
    [MUTATION_SET_EMPTY_DATA] (state){
        state.city        = {}
        state.weatherData = {}
        state.current     = null
        state.forecast    = null
    }
}

// actions
const actions = {
    async [ACTION_LOAD_SEARCH_CITY]({ commit }, nameCity) {
        console.log('action', ACTION_LOAD_SEARCH_CITY, nameCity)

        let searchCity = await apiWeather(
                                            API_SEARCH_CITY,
                                            {
                                                appid : API_APP_KEY,
                                                q     : nameCity
                                            }
                                        )
        commit(MUTATION_SET_CITY, searchCity.data)

        if(!searchCity.data || !searchCity.data.coord){
            commit(MUTATION_SET_CITY, [])
            return
        }

        let coord       = searchCity.data.coord,
            weatherData = await apiWeather(
                                            API_WEATHER_DATA,
                                            {
                                                appid   : API_APP_KEY,
                                                lat     : coord.lat,
                                                lon     : coord.lon,
                                                units   : 'metric',
                                                exclude : 'hourly,minutely',
                                            }
                                        )

        commit(MUTATION_SET_WEATHER_DATA, weatherData.data);
    },

    // async [ACTION_LOAD_WEATHER_DATA]({ commit }) {
    //     let url = API_WEATHER_DATA + '?appid'
    //     API_APP_KEY ++
    // }
}

async function apiWeather(api, params){
    console.log('apiWeather', api, params)
    return await request({
        params : params,
        url    : api,
    });
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
