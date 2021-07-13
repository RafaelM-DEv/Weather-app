<template>
  <div class="dashboard flex text-white">
    <div class=" w-[459px] h-screen mr-1 bg-blue-900">
      <weather-today class="w-full h-full" :item="getWeather('today')" :location="getLocation()" @query="fetchSearch" @fetchCity="fetchCity" />
    </div>
    <div class="w-full">
      <div class="flex justify-end items-center mr-16 mt-2 space-x-2 text-white">
        <div class="text-gray-500">Atualizado em: {{ formatDate(weather.time, 'en-US', 'time') }}</div>
        <button class="dashboard__celsius flex flex-nowrap font-bold" @click="refresh()">
          <img src="../assets/refresh.svg" alt="">
          <div>Refresh</div>
        </button>
        <button class="dashboard__celsius font-bold">°C</button>
        <button class="dashboard__fahrenheit font-bold">°F</button>
      </div>
      <div class=" flex flex-wrap justify-center w-full mt-3">
        <div v-for="(item, index) in getWeather()" :key="index" class="mt-3 mr-3">
          <weather-card use-temp class="dashboard__card-hover w-32 h-40" :item="item" />
        </div>
      </div>
      <div class="flex flex-wrap justify-center w-full mt-12">
        <div class="mr-3">
          <div class="text-white font-extrabold text-2xl">Today's Hightlights</div>
          <weather-card use-wind class="w-80 h-32 mt-6" :item="getWeather('today')" />
          <weather-card use-air-pressure class="w-80 mt-3" :item="getWeather('today')" />
        </div>
        <div class="mt-14">
          <weather-card use-humidity class="w-80 h-32" :item="getWeather('today')" />
          <weather-card use-visibility class="w-80 mt-3" :item="getWeather('today')" />
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
    return {}
  },

  computed: {
    ...mapGetters(['weather', 'locations'])
  },

  created () {
    this.GET_WEATHER('455827')
  },

  methods: {
    ...mapActions([
      'GET_WEATHER',
      'GET_REFRESH',
      'GET_LOCATION'
    ]),

    formatDate,

    getWeather (mode) {
      if (mode === 'today') {
        return this.weather.consolidated_weather[0]
      }
      const dashboardData = this.weather.consolidated_weather.splice(1, 5)
      return dashboardData
    },

    getLocation () {
      return this.weather.title
    },

    refresh () {
      this.GET_REFRESH(this.weather.woeid)
    },

    fetchSearch (searchLocation) {
      this.GET_LOCATION(searchLocation)
    },

    fetchCity (model) {
      console.log(model, 'dashboard data')
      this.GET_REFRESH(model)
    }
  }
}
</script>

<style lang="scss">
.dashboard {

  &__celsius {
    background-color: grey;
    padding: 6px 9px 4px 9px;
    border-radius: 2rem;
    &:hover {
      background-color: #1E213A;
    }
  }

  &__fahrenheit {
    background-color: grey;
    padding: 6px 9px 4px 9px;
    border-radius: 2rem;
    &:hover {
      background-color: #1E213A;
    }
  }

  &__card-hover {
    transform: scale(1);
    transition-duration: 1s;
    border: 1px;
    border-color: #1E213A;
    border-style: solid;

    &:hover {
      transform: scale(1.1);
      transition-duration: 1s;
      border: 1px;
      border-color: white;
      border-style: solid;
    }
  }
}

</style>
