<template>
  <div class='forRequest'>
    <div class="headRequest">
      <div class="titleRequest">
        <h2>Request Follows</h2>
      </div>
      <hr>
      <div class="mainRequest">
        <div class="mt-2" v-for='(user, i) in getUser.RequestIn' :key='i'>
          <CardRequest :get-user='user' @response-decline='declineRequest' @response-accept='acceptRequest'/>
        </div>
      </div>
    </div>
    <div class="bodyRequest">
      <span style='font-size: 20px'>Criticism and Suggestions &nbsp; <v-icon name='mail' class='iconn2'></v-icon> &nbsp; sudhartioeric@gmail.com</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardRequest from '../LocalProfile/CardRequest'

export default {
  props: ['getUser'],
  components: {
    CardRequest
  },
  methods: {
    acceptRequest (id) {
      axios({
        method: 'patch',
        url: `http://localhost:3000/users/status/accept/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.getUser = data.user
          this.$emit('change-data', data.user)
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    declineRequest (id) {
      axios({
        method: 'patch',
        url: `http://localhost:3000/users/status/decline/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.getUser = data.user;
          this.$emit('change-data', data.user);
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  watch: {
    getUser: {
      handler(val) {
        if(val) {
          this.getUser = val
        }
      }
    }
  }
}
</script>

<style scoped>

.forRequest {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%
}
.iconn2{
  width: 40px
}
.bodyRequest {
  text-align: center;
}
.titleRequest {
  text-align: center;
}
</style>