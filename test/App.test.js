import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vue from 'vue'
// import jest from 'jest'
import App from '../src/App'
import store from '../src/store'
import {
    WEATHER_GETTER_CITY,
    WEATHER_GETTER_MESSAGE,
    WEATHER_GETTER_CURRENT_WEATHER,
    WEATHER_GETTER_FORECAST_WEATHER,
    WEATHER_MUTATION_SET_EMPTY_DATA,
    WEATHER_ACTION_LOAD_SEARCH_CITY,
} from '@/store/modules/weather/config'

test('vuex success value', async () => {
    let cityName = "Hanoi"

    await store.dispatch(WEATHER_ACTION_LOAD_SEARCH_CITY, cityName)
    expect(store.getters[WEATHER_GETTER_CITY].name).toBe(cityName)

})

test('vuex fail value', async () => {
    let cityName = "danphuong",
    error = 'city not found'

    await store.dispatch(WEATHER_ACTION_LOAD_SEARCH_CITY, cityName)
    expect(store.getters[WEATHER_GETTER_MESSAGE]).toBe(error)

})

test('render start view', async () => {
    const wrapper = mount(App, {
        global: {
            plugins: [store]
        }
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.html()).toContain('Start search city')
})

// test('render search city success "ha noi"', async () => {

//     const wrapper = mount(App, {
//             global: {
//                 plugins: [store]
//             }
//         }),
//         cityName = "Ha noi",
//         textInput = wrapper.find('input[name="city_name"]')

//     await textInput.setValue(cityName)

//     await wrapper.find('button.btn-search-city').trigger('click')

//     await wrapper.vm.$nextTick()
//     await flushPromises()
//     console.log(wrapper.html())
//     expect(wrapper.find('h2')).toBe(cityName)
// })

