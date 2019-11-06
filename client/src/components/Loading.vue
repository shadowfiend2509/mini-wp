<template>
  <div>
    <dotLoader :loading="loading" :color="color" :size="size"></dotLoader>
  </div>
</template>

<script>
import dotLoader from 'vue-spinner/src/dotLoader.vue'

export default {
  data () {
    return {
      color: 'blue',
      size: '100',
      loading: true
    }
  },
  components: {
    dotLoader
  }
}
</script>

<style>

</style>