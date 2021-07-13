<template>
  <div class="weather-card flex flex-col justify-between items-center py-1 bg-secondary text-white">
    <slot v-if="useTemp" name="useTemp">
      <div>{{ formatDate(item.applicable_date, 'en-US') }}</div>
      <div>
        <img :src="`https://www.metaweather.com/static/img/weather/${item.weather_state_abbr}.svg`" class="w-16">
      </div>
      <div class="flex justify-around w-full mt-1">
        <div>{{ item.max_temp.toFixed(0) }}°C</div>
        <div class="text-gray-500">{{ item.min_temp.toFixed(0) }}°C</div>
      </div>
    </slot>

    <slot v-if="useWind" name="useWind">
      <div>Wind status</div>
      <div class="flex items-center"><span class="text-3xl mr-1">{{ item.wind_speed.toFixed(0) }} </span> mph</div>
      <div class="flex items-center mb-1">
        <img src="../assets/north_white_24dp.svg" class="bg-gray-500 rounded-full mx-1 p-1" :style="`transform: rotate(${item.wind_direction.toFixed(0)}deg)`">
        <div>{{ item.wind_direction_compass }}</div>
      </div>
    </slot>

    <slot v-if="useHumidity" name="useHumidity">
      <div>Humidity</div>
      <div class="flex items-center"><span class="text-2xl my-2">{{ item.humidity }}</span>%</div>
      <div class="w-full px-2">
        <div class="flex justify-between text-sm">
          <div>0</div><div>50</div><div>100</div>
        </div>
        <div class="weather-card__progress" :style="`--prog: ${item.humidity}%`">
          <div class="weather-card__progress-stripe" />
        </div>
        <div class="text-right text-sm">%</div>
      </div>
    </slot>

    <slot v-if="useAirPressure" name="useAirPressure">
      <div>Air Pressure</div>
      <div class="flex items-center"><span class="text-2xl mr-1">{{ item.air_pressure }}</span>mb</div>
    </slot>

    <slot v-if="useVisibility" name="useVisibility">
      <div>Visibility</div>
      <div class="flex items-center"><span class="text-2xl mr-1">{{ item.visibility.toFixed(1) }}</span>miles</div>
    </slot>
  </div>
</template>

<script>
import formatDate from '../helper/formatDate.js'

export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    useTemp: {
      type: Boolean
    },
    useWind: {
      type: Boolean
    },
    useHumidity: {
      type: Boolean
    },
    useAirPressure: {
      type: Boolean
    },
    useVisibility: {
      type: Boolean
    }
  },

  methods: {
    formatDate
  }
}
</script>

<style lang="scss">
.weather-card {
  &__progress {
    width: 100%;
    height: 8px;
    background-color: gray;
    border-radius: 5px;
  }

  &__progress-stripe {
    height: 8px;
    width: var(--prog);
    border-radius: 5px;
    background-color: #FFEC65;
    z-index: 2;
  }
}
</style>
