<template>
  <div class="weather-today flex flex-col justify-between bg-cloud bg-secondary relative items-center py-1 text-white">
    <slot name="temp">
      <div class="flex justify-between w-full mt-12">
        <div class="mx-11">
          <button class="weather-today__search-btn shadow-md" @click="toggleSearch('in')">Search for Places</button>
        </div>
        <div class="mx-11">
          <button class="weather-today__location-btn shadow-md">
            <img src="../assets/gps.svg">
          </button>
        </div>
      </div>
      <div>
        <img :src="`https://www.metaweather.com/static/img/weather/${item.weather_state_abbr}.svg`" alt="cloudy" class="w-40">
      </div>
      <div class="flex justify-around w-full mt-2">
        <div class="mx-1 text-8xl">{{ item.the_temp.toFixed(0) }}°C</div>
      </div>
      <div>
        {{ item.weather_state_name }}
      </div>
      <div class="flex items-center flex-col mb-12">
        <div class="flex flex-nowrap">
          {{ formatDate(item.applicable_date, 'en-US') }}
          <img src="../assets/dot.svg" alt="dot" class="w-2 mx-2">
          {{ item.applicable_date }}
        </div>
        <div class="flex flex-nowrap mt-2">
          <img src="../assets/location_on.svg" alt="My-location">
          {{ location }}
        </div>
      </div>
      <div v-if="search" id="search-box" class="weather-today__search-box toggle-in bg-secondary overflow-y-auto">
        <div class="fixed px-4 pb-3 bg-secondary">
          <div class="flex justify-end">
            <button @click="toggleSearch('out')">
              <img src="../assets/close.svg">
            </button>
          </div>
          <div class="flex flex-nowrap mt-10">
            <div class="weather-today__search-input flex flex-nowrap py-2">
              <img src="../assets/search.svg" alt="search icon" class="ml-2">
              <input ref="search-field" v-model="searchLocation" type="text" class="weather-today__search-field w-full bg-secondary ml-2" placeholder="Search location">
            </div>
            <button class="weather-today__search shadow-md ml-2 bg-blue-700" @click="emitQuery()">Search</button>
          </div>
        </div>
        <div class="px-5 pt-5 mt-24">
          <div v-for="(city, index) in searchResults" :key="index" class="mt-10 " style="">
            <!-- TODO hover -->
            <button class="font-bold" @click="selectCity(city.woeid)">
              {{ city.title }}
            </button>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import formatDate from '../helper/formatDate.js'
import store from '../store/store'

export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },

    location: {
      type: String,
      default: ''
    },

    searchResult: {
      type: Object,
      default: () => ({})
    }

  },

  data () {
    return {
      searchLocation: '',
      search: false
    }
  },

  computed: {
    searchResults () {
      return store.state.weather.locations
    }
  },

  methods: {
    formatDate,

    toggleSearch (type) {
      if (type === 'out') {
        const ad = document.getElementById('search-box')
        ad.classList.toggle('toggle-out')
        ad.classList.remove('toggle-in')
        setTimeout(() => {
          this.search = !this.search
        }, 1000)
      }
      if (type === 'in') {
        this.search = !this.search
      }
    },

    emitQuery () {
      console.log(this.item, 'meu item')
      this.$emit('query', this.searchLocation)
    },

    selectCity (model) {
      this.toggleSearch('out')
      this.$emit('fetchCity', model)
    }
  }
}
</script>

<style lang="scss">
.weather-today {
  &__search {
    padding: 5px 5px 5px 7px;
    width: 90px;
  }

  &__search-btn {
    background-color: grey;
    padding: 5px 7px 5px 7px;
    width: 160px;
  }

  &__search-box {
    position: absolute;
    width: 100%;
    height: 99%;
    &::-webkit-scrollbar{
      display: none;
    }
  }

  &__location-btn {
    background-color: grey;
    padding: 1px 2px 1px 4px;
    width: 32px;
    height: 32px;
    border-radius: 1rem;
  }

  &__search-input {
    border-color: white;
    border-style: solid;
    border-width: 1px;
  }

  &__search-field {
    outline: none;
  }
}

.bg-cloud {
  top: 0;
  left: 0px;
  background-image:  url('../assets/cloud_white.svg'), url('../assets/cloud_white.svg'),
                     url('../assets/cloud_white.svg'), url('../assets/cloud_white.svg');
  background-size: 100px, 120px, 80px, 95px;
  background-repeat: no-repeat;
  background-position-y: 20%, 33%, 32%, 18%;
  background-position-x: -10%, -2%, 110%, 110%;
  animation: clouds 7s ease-in-out infinite;
}

.toggle-in  {
  animation: SlideIn 1s linear;
}

.toggle-out {
  animation: SlideOut 1s linear;
}

@keyframes SlideIn {
  from {
    margin-left: -200%;
    width: 100%;
    opacity: 0;
  }

  to {
    margin-left: 0%;
    width: 100%;
    opacity: 1;
  }
}

@keyframes SlideOut {
  from {
    margin-left: 0%;
    width: 100%;
    opacity: 1;
  }

  to {
    margin-left: -200%;
    width: 100%;
    opacity: 0;
  }
}

@keyframes clouds {
  0%   { background-position-x: -10%, -2%, 110%, 110%; }
  50%  { background-position-x:  -1%, -5%, 106%, 105%; }
  75%  { background-position-x:  -9%,  3%, 112%, 111%; }
  100% { background-position-x: -10%, -2%, 110%, 110%; }
}

</style>
