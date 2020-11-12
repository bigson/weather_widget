import axios from 'axios'
import {
    API_APP_KEY,
    API_SEARCH_CITY,
    API_WEATHER_DATA,
    GETTER_CITY,
    GETTER_MESSAGE,
    GETTER_WEATHER_DATA,
    GETTER_CURRENT_WEATHER,
    GETTER_FORECAST_WEATHER,
    MUTATION_SET_CITY,
    MUTATION_SET_WEATHER_DATA,
    MUTATION_SET_EMPTY_DATA,
    MUTATION_SET_STATE_DATA,
    MUTATION_SET_MESSAGE,
    ACTION_LOAD_SEARCH_CITY,
    // ACTION_LOAD_WEATHER_DATA,
} from './config.js'

// initial state
const
    defaultMessage = 'Start search city',
    state          = {
        city           : {},
        weatherData    : {},
        current        : null,
        forecast       : null,
        message        : defaultMessage,
    }

// getters
const getters = {
    [GETTER_CITY]: (state) => {
        return state.city
    },
    [GETTER_MESSAGE]: (state) => {
        return state.message
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

        state.current = weatherData.current
        if(weatherData.daily.length > 1){
            // let {current, ...forecast} = weatherData.daily

            // state.current  = weatherData.daily.splice(0,1)
            state.forecast = weatherData.daily.splice(1)
        }
    },
    [MUTATION_SET_EMPTY_DATA] (state){
        state.city        = {}
        state.weatherData = {}
        state.current     = null
        state.forecast    = null
        state.message     = defaultMessage
    },
    [MUTATION_SET_STATE_DATA] (state, m){
        state.city        = {}
        state.weatherData = {}
        state.current     = {}
        state.forecast    = []
        state.message     = m
    },
    [MUTATION_SET_MESSAGE] (state, message){
        state.message = message
    }
}

// actions
const actions = {
    async [ACTION_LOAD_SEARCH_CITY]({ commit }, nameCity) {
        // console.log('action', ACTION_LOAD_SEARCH_CITY, nameCity)
        commit(MUTATION_SET_STATE_DATA, 'Loading ...')

        // search city
        let searchCity = await apiWeather(
                                            API_SEARCH_CITY,
                                            {
                                                appid : API_APP_KEY,
                                                q     : nameCity
                                            }
                                        ).catch(err => err.response)

        if(!searchCity || !searchCity.data){
            commit(MUTATION_SET_STATE_DATA, 'An error occurred')
            return
        }
        if(searchCity.data.cod != 200){
            commit(MUTATION_SET_STATE_DATA, searchCity.data.message)
            return
        }

        commit(MUTATION_SET_CITY, searchCity.data)


        // fetch daily data
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
                                        ).catch(err => err.response)

        if(!weatherData || !weatherData.data){
            commit(MUTATION_SET_STATE_DATA, 'An error occurred')
            return
        }

        commit(MUTATION_SET_WEATHER_DATA, weatherData.data);
        commit(MUTATION_SET_MESSAGE, '');
    },

    // async [ACTION_LOAD_WEATHER_DATA]({ commit }) {
    //     let url = API_WEATHER_DATA + '?appid'
    //     API_APP_KEY ++
    // }
}

async function apiWeather(api, params){
    console.log('apiWeather', api, params)
    return await axios({
                        params : params,
                        url    : api,
                    })
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
