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
  async getWeather ({ commit }, id) {
    if (localStorage.getItem('weatherData')) {
      const data = JSON.parse(localStorage.getItem('weatherData'))

      commit('setWeather', data)
    } else {
      const response = await axios.get(`api/location/${id}/`)
      const parsed = JSON.stringify(response.data)

      localStorage.setItem('weatherData', parsed)
      commit('setWeather', response.data)
    }
  },

  async getRefresh ({ commit }, id) {
    const response = await axios.get(`api/location/${id}/`)
    const parsed = JSON.stringify(response.data)

    localStorage.setItem('weatherData', parsed)
    commit('setWeather', response.data)
  },

  async getLocation ({ commit }, query) {
    const response = await axios.get(`/api/location/search/?query=${query}`)
    const parsed = JSON.stringify(response.data)

    localStorage.setItem('locationData', parsed)
    commit('setLocations', response.data)
  }
}

const mutations = {
  setWeather (state, payload) {
    state.weather = payload
  },

  setLocations (state, payload) {
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
