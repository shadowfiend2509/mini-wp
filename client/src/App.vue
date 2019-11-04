<template>
<div>

  <!-- NavBar LoginPage -->

  <div v-if='page !== "home" && page !== "signin" && page !== "signup"'>
    <NavBar 
      />
  </div>
  
  <!-- Home Page without Login -->

  <div id='homee' v-if='page == "home"'>
    <Home 
      @change-page='gotPageFromChild'
      />
  </div>

  <!-- Signin Page -->

  <div id='signin' v-if='page == "signin"'>
    <SignIn />
  </div>

  <!-- Signup Page -->

  <div id="signup">

  </div>
  
</div>
</template>

<script>
import NavBar from './components/NavBar'
import Home from './components/Home'
import SignIn from './components/SignIn'

export default {
  data () {
    return {
      page: ''
    }
  },
  components: {
    NavBar,
    Home,
    SignIn
  },
  methods: {
    gotPageFromChild (name) {
      this.page = name
    }
  },
  created () {
    this.page = 'home'
  }
}
</script>

<style scoped>

#homee{
  background-color:#0087BE;
  height: 100vh;
}
</style>