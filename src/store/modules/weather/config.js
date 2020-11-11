var WEATHER = 'WEATHER/'

export const API_APP_KEY      = '9e40f5784403c76f6c79a86f2a966298'
export const API_SEARCH_CITY  = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'
export const API_WEATHER_DATA = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}'

export const GETTER_CITY               = 'GETTER_CITY'
export const GETTER_WEATHER_DATA       = 'GETTER_WEATHER_DATA'

export const MUTATION_SET_CITY         = 'MUTATION_SET_CITY'
export const MUTATION_SET_WEATHER_DATA = 'MUTATION_SET_WEATHER_DATA'

export const ACTION_LOAD_SEARCH_CITY   = 'ACTION_LOAD_SEARCH_CITY'
export const ACTION_LOAD_WEATHER_DATA  = 'ACTION_LOAD_WEATHER_DATA'


export const WEATHER_GETTER_CITY               = WEATHER + GETTER_CITY
export const WEATHER_GETTER_WEATHER_DATA       = WEATHER + GETTER_WEATHER_DATA
export const WEATHER_MUTATION_SET_CITY         = WEATHER + MUTATION_SET_CITY
export const WEATHER_MUTATION_SET_WEATHER_DATA = WEATHER + MUTATION_SET_WEATHER_DATA
export const WEATHER_ACTION_LOAD_SEARCH_CITY   = WEATHER + ACTION_LOAD_SEARCH_CITY
export const WEATHER_ACTION_LOAD_WEATHER_DATA  = WEATHER + ACTION_LOAD_WEATHER_DATA