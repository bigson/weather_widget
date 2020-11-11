import weather from './modules/weather'

import { createStore } from 'vuex'

// const app = createApp({ ... })
// Vue.use(Vuex);

// Vue.config.devtools = true
const debug = process.env.NODE_ENV !== 'production';
export default createStore({
        modules: {
            weather
        },
        strict: debug,
        // strict: true,
    })
