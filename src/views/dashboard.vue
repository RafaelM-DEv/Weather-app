<template>
  <div class="dashboard lg:flex text-white bg-primary">
    <div class="w-full h-screen lg:w-[459px] mr-1 bg-blue-900">
      <weather-today class="h-screen lg:w-[400px]" :item="getWeatherToday()" :location="getLocationTitle()"
                     :unit-fahrenheit="fahrenheit" @query="fetchSearch" @fetchCity="fetchCity"
      />
    </div>
    <div class="w-screen lg:mt-2 mt-10">
      <div class="flex flex-wrap justify-center sm:justify-end sm:mr-10 items-center mt-2 space-x-2 text-white">
        <div class="text-gray-500">Atualizado em: {{ formatDate(weather.time, 'en-US', 'time') }}</div>
        <div class="flex flex-nowrap space-x-3">
          <button class="flex flex-nowrap font-bold rounded-full py-1 px-2 bg-gray-500" @click="refresh()">
            <img src="../assets/refresh.svg" alt="refresh_icon">
            <div>Refresh</div>
          </button>
          <button id="celsius" class="active font-bold rounded-full py-1 px-2 bg-gray-500 hover:bg-[#1E213A]" @click="setUnitCelsius">°C</button>
          <button id="fahrenheit" class="font-bold rounded-full py-1 px-2 bg-gray-500 hover:bg-[#1E213A]" @click="setUnitFahrenheit">°F</button>
        </div>
      </div>

      <div class="flex flex-wrap justify-center w-full mt-3 pl-2">
        <div v-for="(item, index) in dataWeather" :key="index" class="mt-3 mr-3">
          <weather-card use-temp class="dashboard__weather-card w-32 h-40 rounded-sm" :item="item" :unit-fahrenheit="fahrenheit" />
        </div>
      </div>

      <div class="flex flex-wrap justify-center w-full mt-12 pb-10">
        <div class="sm:mr-3">
          <div class="font-extrabold text-2xl text-white">Today's Hightlights</div>
          <weather-card use-wind class="w-64 lg:w-72 h-32 mt-6" :item="getWeatherToday()" />
          <weather-card use-air-pressure class="w-64 lg:w-72 mt-3" :item="getWeatherToday()" />
        </div>
        <div class="mt-14">
          <weather-card use-humidity class="w-64 lg:w-72 h-32" :item="getWeatherToday()" />
          <weather-card use-visibility class="w-64 lg:w-72 mt-3" :item="getWeatherToday()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from '../helper/formatDate.js'
import WeatherCard from '../components/WeatherCard.vue'
import WeatherToday from '../components/WeatherToday.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    WeatherToday,
    WeatherCard
  },

  data () {
    return {
      fahrenheit: true,
      dataWeather: []
    }
  },

  computed: {
    ...mapGetters(['weather', 'locations'])
  },

  created () {
    this.getWeather('455827')
  },

  mounted () {
    this.setWeather()
  },

  methods: {
    ...mapActions([
      'getWeather',
      'getRefresh',
      'getLocation'
    ]),

    formatDate,

    setWeather () {
      this.dataWeather = this.weather.consolidated_weather.splice(1, 5)
    },

    getWeatherToday () {
      return this.weather.consolidated_weather[0]
    },

    getLocationTitle () {
      return this.weather.title
    },

    refresh () {
      this.getRefresh(this.weather.woeid)
    },

    fetchSearch (searchLocation) {
      this.getLocation(searchLocation)
    },

    fetchCity (model) {
      this.getRefresh(model)
    },

    setUnitCelsius () {
      document.querySelector('#celsius').classList.add('active')
      document.querySelector('#fahrenheit').classList.remove('active')
      this.fahrenheit = true
    },

    setUnitFahrenheit () {
      document.querySelector('#fahrenheit').classList.add('active')
      document.querySelector('#celsius').classList.remove('active')
      this.fahrenheit = false
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  &__weather-card {
    transform: scale(1);
    transition-duration: 1s;
    border: 1px solid #1E213A;

    &:hover {
      transform: scale(1.1);
      transition-duration: 1s;
      border: 1px solid white;
    }
  }
}

.active {
  border: 1px solid white;
  background-color: #1E213A;
}
</style>
