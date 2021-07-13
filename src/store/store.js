import { createStore } from 'vuex'

import weather from './module/weather.js'

export const store = createStore({
  modules: {
    weather
  }
})

export default store
