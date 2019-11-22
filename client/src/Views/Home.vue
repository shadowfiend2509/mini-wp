<template>
<div id='homePagee'>
  <div>
    <HomeNavBar 
      />
  </div>
  <b-container>
    <div class="homePage">
      <div class="homeHead">
        <div class="quote">
          <span class="left">❝</span>
          <blockquote>
            “{{ quote.body }}”
          </blockquote>
          <small>{{ quote.author }}</small>
          <span class="right">❞</span>
        </div>

      </div>
      <div class="homeBody">
        <div class='homePageBtn'>
          <button class='btn btn-outline-info' id="btn-4" @click='sendPage("signin")'>
              SIGN IN
          </button>
          <button class='btn btn-outline-info signup' id="btn-4" @click='sendPage("signup")'>
              SIGN UP
          </button>
        </div>
      </div>
      <div class="homeFoot">
        <img src="https://storage.cloud.google.com/newminiwp/wordpress-wallpaper.png?authuser=1" alt="img">
      </div>
    </div>
  </b-container>
</div>
</template>

<script>
import HomeNavBar from '../components/HomeNavBar'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      statusNav: '',
      quote: null
    }
  },
  components: {
    HomeNavBar
  },
  methods: {
    sendPage(name) {
      this.$emit('change-page', name)
    },
    fetchQuote () {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: 'http://localhost:3000/quote'
        })
          .then(({data}) => {
            this.quote = data
            resolve()
          })
          .catch(reject)
      })
    }
  },
  created () {
    this.$awn.asyncBlock(
      this.fetchQuote(),
      'Finish',
      null,
      'Loading'
    )
  }
}
</script>

<style lang='scss'>
img{ 
  width:1500px;
}
.homePage{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 93vh;
}
.signup {
  margin-left: 20px
}
.homeBody{
  display: flex;
  justify-content: center;
}

#btn-4 {
  font-size: 25px;
  color: gold;
  width: 250px;
  height: 120px;
}
#btn-4::after{
   content: '\00bb';
   position: absolute;
   opacity: 0;
   transition: 0.5s;
}

#btn-4:hover{
  border-radius: .80rem;
  padding-right: 1.25rem;
  color: white;
  font-weight: bold
}

#btn-4:hover::after{
  opacity: 1;
  margin-left: 1.65rem;
}

.quote{
  text-align: center;
  font-size: 3.3rem;
  margin: auto;
  padding: 15px;
  border: 2px solid black;
  max-width: 100%;
  position: relative;
  font-family: 'Dancing Script', cursive;
}
blockquote{
  color: white;
  font-style: italic;
  position: relative;
  z-index: 20;
}
.left{
  position: absolute;
  top: -50px;
  left: -20px;
  width: 150px;
  text-align: left;
  z-index: 10;
  font-size: 5rem;
  color: #336699;
  line-height: 200px;
}
.right{
  position: absolute;
  bottom: -50px;
  right: -20px;
  width: 150px;
  text-align: right;
  z-index: 10;
  font-size: 5rem;
  color: #336699;
  line-height: 200px;
}
small{
  font-size: 1.7rem;
  color: #336699;
  position: relative;
  z-index: 20;
  
  &:before{
    content: "\2014 \0020";
    width: 5px;
  }
}

</style>