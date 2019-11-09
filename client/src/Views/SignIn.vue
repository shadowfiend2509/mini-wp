<template>
  <div class='signInbackGround'>
    <div>
      <HomeNavBar />
    </div>
    <div class="container mainBackground">
      <div class="login">
        <div class="login-triangle"></div>

        <h2 class="login-header">Sign In</h2>

        <form class="login-container" @submit.prevent="signin">
          <p><input type="text" v-model='inemail' placeholder="username / email"></p>
          <p><input type="password" v-model='inpassword' placeholder="Password"></p>
          <p><input type="submit" value="Sign In"></p>
          <div style='border-bottom: 1px; border-top: 1px'>
            <center>OR</center>
          </div>
          <p>
            <g-signin-button
              :params="googleSignInParams"
              @success="onSignInSuccess"
              @error="onSignInError">
              Sign in with Google
            </g-signin-button>
          </p>
          <div class="link-home">
            <p><a href='#' @click='sendPage("signup")'>Don't have an account?</a></p>
            <p style='color:red' id='forgot' @click='sendPage("reset")'>Forgot Password?</p>
            <p><v-icon name='chevrons-left' class='iback'></v-icon> <a href='#' @click='sendPage("home")'>Back to wordpress.dreamcaroffcial.com</a></p>
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
import HomeNavBar from '../components/HomeNavBar'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      baseUrl: `http://localhost:3000`,
      inemail: '',
      inpassword: '',
      googleSignInParams: {
        client_id: '712137348260-44kc3nhpmtnrluo2b1g5anfbmk2pku50.apps.googleusercontent.com'
      }
    }
  },
  components: {
    HomeNavBar
  },
  methods: {
    sendPage(name) {
      this.$emit('change-page', name)
    },
    onSingInSuccess(googleUser){ 
      const id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: 'post',
        url: `${this.baseUrl}/users/signinG`,
        data: { id_token }
      })
        .then(({data}) => {
          localStorage.setItem('token', data.token)
          this.$emit('success-signin')
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    },
    signin() {
      this.$awn.asyncBlock(
        this.singinProcess(),
        'Welcome Back!',
        null,
        'Loading'
      )
    },
    singinProcess () {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'post',
          url: `${this.baseUrl}/users/signin`,
          data: {
            signuser: this.inemail,
            password: this.inpassword
          }
        })
          .then(({data}) => {
            this.$emit('success-signin')
            localStorage.setItem('token', data.token)
            this.inemail ='';
            this.inpassword = ''
            resolve()
          })
          .catch(err => {
            swal.fire({
              type: 'warning',
              title: err.response.data.msg
            })
            reject(err)
          });
      })
    }
  }
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
#forgot {
  cursor: pointer;
}
#forgot:hover {
  color: blue !important;
}
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
.signInbackGround{
  background-color:#F6F7F7;
  height: 100vh
}
.mainBackground{
  height: 86vh;
  display: flex;
  flex-direction: column;
  justify-content:space-around;
}


.login {
  width: 800px;
  margin: 16px auto;
  font-size: 16px;
}

/* Reset top and bottom margins from certain elements */
.login-header,
.login p {
  margin-top: 0;
  margin-bottom: 0;
}

/* The triangle form is achieved by a CSS hack */
.login-triangle {
  width: 0;
  margin-right: auto;
  margin-left: auto;
  border: 12px solid transparent;
  border-bottom-color: #28d;
}

.login-header {
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
.login-container {
  background: #ebebeb;
  padding: 12px;
}

/* Every row inside .login-container is defined with p tags */
.login p {
  padding: 12px;
}

.login input {
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

.login input[type="email"],
.login input[type="password"] {
  background: #fff;
  border-color: #bbb;
  color: #555;
}

/* Text fields' focus effect */
.login input[type="email"]:focus,
.login input[type="password"]:focus {
  border-color: #888;
}

.login input[type="submit"] {
  background: #AB235A;
  border-color: transparent;
  color: #fff;
  cursor: pointer;
}

.login input[type="submit"]:hover {
  background: rgb(190, 37, 98);
}

/* Buttons' focus effect */
.login input[type="submit"]:focus {
  border-color: #05a;
}

.login input[type="button"] {
  background: #05a;
  border-color: transparent;
  color: #fff;
  cursor: pointer;
}

.login input[type="button"]:hover {
  background: rgb(8, 106, 204);
}

/* Buttons' focus effect */
.login input[type="button"]:focus {
  border-color: #05a;
}
</style>