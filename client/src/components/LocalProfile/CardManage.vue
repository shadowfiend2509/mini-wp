<template>
  <div class='cardRequest'>
    <div class="dataRequest">
      <div class="profileRequest">
        <img :src='getUser.image'>
      </div>
        &nbsp; &nbsp; &nbsp;
      <div class="nameRequest">
        <h1> {{ getUser.username }} </h1>
        <div class="row">
          <div class="col-6">
            <h4>{{ getUser.Followers.length }} Followers</h4>
          </div>
          <div class="col-6">
            <h4>{{ getUser.Following.length }} Following</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="btnRequest" v-if='status'>
      <div class="acceptRequest">
        <button class='btn btn-primary btn-lg' @click='unfollow(getUser._id)'>Unfollow</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['getUser', 'status'],
  methods: {
    unfollow (id) {
      this.$emit('unfollow', id)
    }
  }
}
</script>

<style>
.cardRequest {
  display: flex;
  justify-content: space-between
}
.nameRequest{ 
  width:100%
}
.btnRequest {
  display: flex;
  align-items: center
}
.dataRequest {
  display:flex;
  align-items: center
}
.profileRequest img{
  width: 200px
}
</style>