<template>
  <div class="container-fluid main">
    <div class="looprofile">
      <div class="card profile" v-for='(user, i) in users' :key='i'>
        <UsersComponent 
          :get-user='user'
          :get-login-user='dataLogin'
        ></UsersComponent>
      </div>
    </div>
</div>
</template>

<script>
import UsersComponent from './MakeFriends/UsersComponent'
import axios from 'axios'

export default {
  data () {
    return {
      users: null,
      dataLogin: null
    }
  },
  components: {
    UsersComponent
  },
  methods: {
    fetchUsers () {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: 'http://localhost:3000/users',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            this.users = data
            resolve()
          })
          .catch(err => {
            reject(err.response.data.msg)
          })
      })
    },
    fetchUserLogin() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/users/find/login',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.dataLogin = data
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  created () {
    this.$awn.asyncBlock(
      this.fetchUsers(),
      'Fetching Users',
      null,
      "Getting Users"
    )
    this.fetchUserLogin()
  }

}
</script>

<style scoped>
.looprofile {
  display: flex;
  flex-wrap: wrap;
}

.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fbfbfb;
}
.profile {
  margin-left: 15px;
  margin-top: 15px;
  background-color: #B9BBB7;
  width: 30%;
  height: 380px;
  background-repeat: no-repeat;
  background-size: cover;
  background-color:#444;
  border-radius:24px;
  border:none;
  box-shadow: 0 37.125px 70px -12.125px rgba(0,0,0,0.2);
  transition:all .3s;
}

</style>