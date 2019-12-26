<template>
  <div class='resetBackground'>
    <div>
      <HomeNavBar />
    </div>
    <div class="container mainBackground">
      <div class="reset">
        <div class="reset-triangle"></div>

        <h2 class="reset-header">Reset Password</h2>

        <div class="reset-container">
          <p><input type="email" v-model='resemail' placeholder="input your email" :disabled='disable' :style='color'></p>
          <p v-if='!disable'><input type="submit" value="Send code" @click='sendVerify'></p>
          <p v-if='disable' style='margin-top:-20px'><center> you can request again in 60 sec</center></p>
          <p v-if='send'><input type='text' placeholder="secret code.." v-model='secretCode'></p>
          <p v-if='send'><input type='button' value='Verify' @click='checkVerify'></p>
          <p v-if='statusChangePass'><input type='password' placeholder="new password" v-model='newPass'></p>
          <p v-if='statusChangePass'><input type='button' value='Change Password' @click='changePassword'></p>
          <div class="link-home">
            <p><a href='#' @click='sendPage("signup")'>Create new account?</a></p>
            <p><v-icon name='chevrons-left' class='iback'></v-icon> <a href='#' @click='sendPage("home")'>Back to wordpress.dreamcaroffcial.com</a></p>
          </div>
        </div>
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
      baseUrl: 'http://wpserver.dreamcarofficial.com',
      resemail: '',
      disable: false,
      color: 'background-color: white',
      send: false,
      secretCode: '',
      newPass: '',
      statusChangePass: false
    }
  },
  components: {
    HomeNavBar
  },
  methods: {
    sendPage(name) {
      this.$emit('change-page', name)
    },
    changePassword () {
      const email = this.resemail.split(',')[0]
      axios({
        method: 'patch',
        url: `${this.baseUrl}/users/changepass`,
        data: { newpass: this.newPass, email }
      })
        .then(({data}) => {
          swal.fire({
            position: 'top-right',
            title: data.msg
          })
          this.statusChangePass = false;
          this.sendPage('signin')
        })
        .catch(err => {
          swal.fire({
            type: 'warning',
            title: err.response.data.msg
          })
        })
    },
    checkVerify () {
      setTimeout(() => {
        this.disable = false;
        const split = this.resemail.split(',')[0];
        this.resemail = split;
        this.color = 'background-color: white'
      }, 60000);
      let newSplit = this.resemail.split(',')[0];
      axios({
        method: 'patch',
        url: `${this.baseUrl}/users/confirm`,
        data: { email: newSplit, verify: this.secretCode }
      })
        .then(data => {
          this.statusChangePass = data.status;
          this.send = false;
          this.newPass = '';
          this.secretCode = ''
        })
        .catch(err => {
          swal.fire({
            type: 'warning',
            title: err.response.data.msg,
            showConfirmButton: false
          })
        })
    },
    sendVerify () {
      const email = this.resemail;
      swal.fire({
        position: 'top-right',
        type: 'info',
        title: 'Loading...',
        showConfirmButton: false,
        timer: 1500
      })
      axios({
        method: 'post',
        url: `${this.baseUrl}/users/confirm/verify`,
        data: { email }
      })
      .then(({data}) => {
        swal.fire({
          position: 'top-right',
          title: 'Check Your Email',
          timer: 1500
        })
        this.resemail += ',(disabled)'
        this.disable = true;
        this.color = `background-color: #F6F7F7`
        this.send = true
      })
      .catch(err => {
        swal.fire({
          type: 'warning',
          title: err.response.data.msg,
          showConfirmButton: false,
          timer: 1500
        })
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
.resetbackGround{
  background-color:#F6F7F7;
  height: 100vh
}
.mainBackground{
  height: 86vh;
  display: flex;
  flex-direction: column;
  justify-content:space-around;
}


.reset {
  width: 800px;
  margin: 16px auto;
  font-size: 16px;
}

/* Reset top and bottom margins from certain elements */
.reset-header,
.reset p {
  margin-top: 0;
  margin-bottom: 0;
}

/* The triangle form is achieved by a CSS hack */
.reset-triangle {
  width: 0;
  margin-right: auto;
  margin-left: auto;
  border: 12px solid transparent;
  border-bottom-color: #28d;
}

.reset-header {
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
.reset-container {
  background: #ebebeb;
  padding: 12px;
}

/* Every row inside .reset-container is defined with p tags */
.reset p {
  padding: 12px;
}

.reset input {
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

.reset input[type="email"],
.reset input[type='text'],
.reset input[type="password"] {
  background: #fff;
  border-color: #bbb;
  color: #555;
}

/* Text fields' focus effect */
.reset input[type="email"]:focus,
.reset input[type='text']:focus,
.reset input[type="password"]:focus {
  border-color: #888;
}

.reset input[type="submit"] {
  background: #AB235A;
  border-color: transparent;
  color: #fff;
  cursor: pointer;
}

.reset input[type="submit"]:hover {
  background: rgb(190, 37, 98);
}

/* Buttons' focus effect */
.reset input[type="submit"]:focus {
  border-color: #05a;
}

.reset input[type="button"] {
  background: #05a;
  border-color: transparent;
  color: #fff;
  cursor: pointer;
}

.reset input[type="button"]:hover {
  background: rgb(8, 106, 204);
}

/* Buttons' focus effect */
.reset input[type="button"]:focus {
  border-color: #05a;
}
</style>