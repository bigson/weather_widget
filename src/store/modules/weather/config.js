var WEATHER = 'weather/'

export const API_APP_KEY      = '9e40f5784403c76f6c79a86f2a966298'
export const API_SEARCH_CITY  = 'https://api.openweathermap.org/data/2.5/weather'
export const API_WEATHER_DATA = 'https://api.openweathermap.org/data/2.5/onecall'

export const GETTER_CITY             = 'GETTER_CITY'
export const GETTER_WEATHER_DATA     = 'GETTER_WEATHER_DATA'
export const GETTER_CURRENT_WEATHER  = 'GETTER_CURRENT_WEATHER'
export const GETTER_FORECAST_WEATHER = 'GETTER_FORECAST_WEATHER'

export const MUTATION_SET_CITY         = 'MUTATION_SET_CITY'
export const MUTATION_SET_WEATHER_DATA = 'MUTATION_SET_WEATHER_DATA'
export const MUTATION_SET_EMPTY_DATA   = 'MUTATION_SET_EMPTY_DATA'

export const ACTION_LOAD_SEARCH_CITY   = 'ACTION_LOAD_SEARCH_CITY'
export const ACTION_LOAD_WEATHER_DATA  = 'ACTION_LOAD_WEATHER_DATA'


export const WEATHER_GETTER_CITY               = WEATHER + GETTER_CITY
export const WEATHER_GETTER_WEATHER_DATA       = WEATHER + GETTER_WEATHER_DATA
export const WEATHER_GETTER_CURRENT_WEATHER    = WEATHER + GETTER_CURRENT_WEATHER
export const WEATHER_GETTER_FORECAST_WEATHER   = WEATHER + GETTER_FORECAST_WEATHER
export const WEATHER_MUTATION_SET_CITY         = WEATHER + MUTATION_SET_CITY
export const WEATHER_MUTATION_SET_WEATHER_DATA = WEATHER + MUTATION_SET_WEATHER_DATA
export const WEATHER_MUTATION_SET_EMPTY_DATA   = WEATHER + MUTATION_SET_EMPTY_DATA
export const WEATHER_ACTION_LOAD_SEARCH_CITY   = WEATHER + ACTION_LOAD_SEARCH_CITY
export const WEATHER_ACTION_LOAD_WEATHER_DATA  = WEATHER + ACTION_LOAD_WEATHER_DATA