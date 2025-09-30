<script setup>
defineProps({
  rows: {
    type: Number,
    default: 10
  },
  columns: {
    type: Number,
    default: 5
  },
  checkable: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="animate-pulse">
    <table class="w-full">
      <thead>
        <tr>
          <th v-if="checkable" class="px-6 py-3 bg-gray-50">
            <div class="w-4 h-4 bg-gray-300 rounded"></div>
          </th>
          <th v-for="col in columns" :key="`header-${col}`" class="px-6 py-3 bg-gray-50">
            <div class="h-4 bg-gray-300 rounded w-24"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="`row-${row}`" :class="{ 'bg-gray-50': row % 2 === 0 }">
          <td v-if="checkable" class="px-6 py-4">
            <div class="w-4 h-4 bg-gray-200 rounded"></div>
          </td>
          <td v-for="col in columns" :key="`cell-${row}-${col}`" class="px-6 py-4">
            <div class="h-4 bg-gray-200 rounded" :class="getRandomWidth()"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  methods: {
    getRandomWidth() {
      const widths = ['w-16', 'w-20', 'w-24', 'w-32', 'w-40']
      return widths[Math.floor(Math.random() * widths.length)]
    }
  }
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

table {
  @apply min-w-full divide-y divide-gray-200;
}

thead th {
  @apply text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

tbody td {
  @apply whitespace-nowrap text-sm;
}
</style>