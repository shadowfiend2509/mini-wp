<template>
  <div class='signUpbackGround'>
    <div>
      <HomeNavBar />
    </div>
    <div class="container mainBackground">
      <div class="signup">
        <div class="signup-triangle"></div>

        <h2 class="signup-header">Create Account</h2>

        <form class="signup-container" @submit.prevent="signup">
          <p><input type='text' v-model='upusername' placeholder='username'></p>
          <p><input type="email" v-model='upemail' placeholder="username@example.com"></p>
          <p><input type="password" v-model='uppassword' placeholder="password"></p>
          <p><input type="submit" value="Sign Up"></p>
          <div style='border-bottom: 1px; border-top: 1px'>
            <center>OR</center>
          </div>
          <p><input type='button' class='g-signin2' data-onsuccess='onSignIn' value='Google Sign In'></p>
          <div class="link-home">
            <p><a href='#' @click='goToPageSignIn("signin")'>Already have an account?</a></p>
            <p><v-icon name='chevrons-left' class='iback'></v-icon> <a href='#' @click='backHome("home")'>Back to wordpress.dreamcaroffcial.com</a></p>
          </div>
        </form>
        </div>
    </div>
    <div class="footer">
      <p>Powered by <v-icon name='copy' class='iconcop'></v-icon> <span>DreamCar Official</span></p>
    </div>
  </div>
</template>

<script>
import HomeNavBar from './HomeNavBar'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      baseUrl: `http://localhost:3000`,
      upusername: '',
      upemail: '',
      uppassword: ''
    }
  },
  components: {
    HomeNavBar
  },
  methods: {
    backHome(name) {
      this.$emit('change-page', name)
    },
    goToPageSignIn(name) {
      this.$emit('change-page', name)
    },
    signup () {
      const username = this.upusername;
      const email = this.upemail;
      const password = this.uppassword;
      axios({
        method: 'post',
        url: `${this.baseUrl}/users/signup`,
        data: { username, password, email }
      })
        .then(({data}) => {
          localStorage.setItem('token', data.token);
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `success create your account`,
            showConfirmButton: false,
            timer: 1500
          })
          this.$emit('change-login')
          this.upusername = '',
          this.upemail = '',
          this.uppassword = ''
        })
        .catch(err => {
          swal.fire({
            type: 'warning',
            title: err.response.data.msg
          });
        })
    }
  }
}
</script>

<style>
.iback{
  width: 25px;
}
.iconcop{
  width: 20px;
}
p{
  font-size: 20px
}
span{
  font-size: 30px;
}
.footer{
  text-align: center;
  margin-top: 15px;
  font-size: 40px;
  background-color: #F6F7F7
}
.signUpbackGround{
  background-color:#F6F7F7;
  height: 100vh
}
.mainBackground{
  height: 86vh;
  display: flex;
  flex-direction: column;
  justify-content:space-around;
}


.signup {
  width: 800px;
  margin: 16px auto;
  font-size: 16px;
}

/* Reset top and bottom margins from certain elements */
.signup-header,
.signup p {
  margin-top: 0;
  margin-bottom: 0;
}

/* The triangle form is achieved by a CSS hack */
.signup-triangle {
  width: 0;
  margin-right: auto;
  margin-left: auto;
  border: 12px solid transparent;
  border-bottom-color: #28d;
}

.signup-header {
  background: #28d;
  padding: 20px;
  font-size: 1.4em;
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
}
.link-home{ 
  text-align: center;
}
.signup-container {
  background: #ebebeb;
  padding: 12px;
}

/* Every row inside .signup-container is defined with p tags */
.signup p {
  padding: 12px;
}

.signup input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  outline: 0;
  font-family: inherit;
  font-size: 0.95em;
}

.signup input[type="email"],
.signup input[type='text'],
.signup input[type="password"] {
  background: #fff;
  border-color: #bbb;
  color: #555;
}

/* Text fields' focus effect */
.signup input[type="email"]:focus,
.signup input[type='text'],
.signup input[type="password"]:focus {
  border-color: #888;
}

.signup input[type="submit"] {
  background: #AB235A;
  border-color: transparent;
  color: #fff;
  cursor: pointer;
}

.signup input[type="submit"]:hover {
  background: rgb(190, 37, 98);
}

/* Buttons' focus effect */
.signup input[type="submit"]:focus {
  border-color: #05a;
}

.signup input[type="button"] {
  background: #05a;
  border-color: transparent;
  color: #fff;
  cursor: pointer;
}

.signup input[type="button"]:hover {
  background: rgb(8, 106, 204);
}

/* Buttons' focus effect */
.signup input[type="button"]:focus {
  border-color: #05a;
}
</style>