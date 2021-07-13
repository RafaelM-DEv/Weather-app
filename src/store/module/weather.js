import axios from 'axios'

axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/'

const state = {
  weather: {},
  locations: []
}

const getters = {
  weather: state => JSON.parse(JSON.stringify(state.weather)),
  locations: state => state.locations
}

const actions = {
  async GET_WEATHER ({ commit }, id) {
    if (localStorage.getItem('WEATHER_DATA')) {
      const data = JSON.parse(localStorage.getItem('WEATHER_DATA'))

      commit('SET_WEATHER', data)
    } else {
      const response = await axios.get(`api/location/${id}/`)
      const parsed = JSON.stringify(response.data)

      localStorage.setItem('WEATHER_DATA', parsed)
      commit('SET_WEATHER', response.data)
    }
  },

  async GET_REFRESH ({ commit }, id) {
    const response = await axios.get(`api/location/${id}/`)
    const parsed = JSON.stringify(response.data)

    localStorage.setItem('WEATHER_DATA', parsed)
    commit('SET_WEATHER', response.data)
  },

  async GET_LOCATION ({ commit }, query) {
    const response = await axios.get(`/api/location/search/?query=${query}`)
    const parsed = JSON.stringify(response.data)

    localStorage.setItem('LOCATION_DATA', parsed)
    commit('SET_LOCATIONS', response.data)
  }

}

const mutations = {
  SET_WEATHER (state, payload) {
    state.weather = payload
  },

  SET_LOCATIONS (state, payload) {
    state.locations = payload
  }
}

export default {
  namespaced: false,
  getters,
  mutations,
  actions,
  state
}
