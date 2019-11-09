<template>
  <div class='cardRequest'>
    <div class="dataRequest">
      <div class="profileRequest">
        <img :src='getUser.image'>
      </div>
        &nbsp; &nbsp; &nbsp;
      <div class="nameRequest">
        <h1> {{ getUser.username }} </h1>
      </div>
    </div>
    <div class="btnRequest">
      <div class="acceptRequest">
        <button class='btn btn-primary btn-lg' @click='accept(getUser._id)'>Accept</button>
      </div>
      <div class='mt-2'>
        <button class="btn btn-outline-danger btn-lg" @click='decline(getUser._id)'>Decline</button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['getUser'],
  methods: {
    accept (id) {
      this.$emit('response-accept', id)
    },
    decline (id) {
      this.$emit('response-decline', id)
    }
  },
  created () {
    if(this.getUser == null) {
      console.log('kosong')
    } else {
      console.log('ada')
    }
  }
}
</script>

<style scoped>
.dataRequest img {
  width: 100px;
  border-radius: 100px;
}
.dataRequest {
  display:flex;
  flex-direction: row;
  align-items: center;
}

.cardRequest {
  display:flex;
  flex-direction: row;
  justify-content: space-between
}
.btnRequest {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>