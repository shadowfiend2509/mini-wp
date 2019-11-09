<template>
  <div class="containerr">
    <div class="mainCont">
      <div class="row btn2F">
        <div class="col-6 buttonFol">
          <div class="followers" @click='goFollowers'>
            <a>{{ getUser.Followers.length }} &nbsp; Followers</a>
          </div>
        </div>
        <div class="col-6 buttonFol" @click='goFollowing'>
          <div class="following">
            <a>{{ getUser.Following.length }} &nbsp; Following</a>
          </div>
        </div>
      </div>
      <div class='refreshFol'>
        <div class="mt-2" v-for='(user, i) in choiseFol' :key='i'>
          <CardManage :get-user='user' :status='status' @unfollow='unFollow'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardManage from './CardManage'

export default {
  data () {
    return {
      choiseFol: '',
      status: false
    }
  },
  props: ['getUser'],
  components: {
    CardManage
  },
  methods: {
    unFollow (id) {
      axios({
        method: 'patch',
        url: `http://localhost:3000/users/status/public/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          this.choiseFol = ''
          this.fetchUser()
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    fetchUser () {
      axios({
        method: 'get',
        url: `http://localhost:3000/users/find/login`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.getUser = data
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    goFollowers () {
      this.status = false
      this.choiseFol = ''
      this.choiseFol = this.getUser.Followers
    },
    goFollowing () {
      this.status = true
      this.choiseFol = ''
      this.choiseFol = this.getUser.Following
    }
  },
  watch: {
    getUser: {
      handler (val) {
        if(val) {
          this.getUser = val
        }
      }
    }
  }
}
</script>

<style>
.btn2F button {
  border-radius: 10px;
}
.buttonFol:hover {
  background-color: rgb(147, 213, 240)
}
.buttonFol {
  display: flex;
  justify-content: center;
  height: 100px;
  align-items: center;
  font-size: 40px;
  background-color:rgb(50, 179, 230);
}
.containerr {
  margin-top: 20px;
}
</style>