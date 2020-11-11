// import apiCategories from '@/api/categories'
import {
    API_APP_KEY,
    API_SEARCH_CITY,
    API_WEATHER_DATA,
    GETTER_CITY,
    GETTER_WEATHER_DATA,
    MUTATION_SET_CITY,
    MUTATION_SET_WEATHER_DATA,
    ACTION_LOAD_SEARCH_CITY,
    ACTION_LOAD_WEATHER_DATA,
} from './config.js'

// initial state
const state = {
    city        : {},
    weatherData : [],
}

// getters
const getters = {
    [GETTER_CITY]: (state) => {
        return state.city
    },
    [GETTER_WEATHER_DATA]: (state) => {
        return state.weatherData
    }
}

// mutations
const mutations = {
    [MUTATION_SET_CITY](state, city){
        state.city = city
    },
    [MUTATION_SET_WEATHER_DATA](state, weatherData){
        state.weatherData = weatherData
    },
}

// actions
const actions = {
    async [ACTION_LOAD_SEARCH_CITY]({ commit, state }) {
        let url = API_SEARCH_CITY + '?appid'

        return await apiWeather(
                        API_SEARCH_CITY,
                        {
                            appid : API_APP_KEY
                        }).then(function(response) {
                            // console.log('after call api categories')
                            // resolve(response);
                            commit(MUTATION_SET_CITY, response.data.data);
                        })
    },

    async [ACTION_LOAD_WEATHER_DATA]({ commit, state }) {
        let url = API_WEATHER_DATA + '?appid'
        API_APP_KEY ++
    }
}

async function apiWeather(api, params){
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
