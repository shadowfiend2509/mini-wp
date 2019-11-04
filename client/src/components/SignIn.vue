<template>
  <div class='signInbackGround'>
    <div>
      <HomeNavBar />
    </div>
    <div class="container mainBackground">
      <div class="login">
        <div class="login-triangle"></div>

        <h2 class="login-header">Log in</h2>

        <form class="login-container">
          <p><input type="email" placeholder="Email"></p>
          <p><input type="password" placeholder="Password"></p>
          <p><input type="submit" value="Sign In"></p>
          <div style='border-bottom: 1px; border-top: 1px'>
            <center>OR</center>
          </div>
          <p><input type='button' class='g-signin2' data-onsuccess='onSignIn' value='Google Sign In'></p>
          <p><v-icon name='chevrons-left' class='iback'></v-icon> Back to DcWp.dreamcaroffcial.com</p>
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

export default {
  components: {
    HomeNavBar
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