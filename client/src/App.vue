<template>
<div>

  <!-- NavBar LoginPage -->

  <div v-if='page == "mainPage"'>
    <div>
      <DashBoard 
        :get-user='user'
        :get-article='article'
        :isloading='isLoading'
        :promise-article='articleLogin'
        :notif='notification'
        @change-page='gotPageFromChild'
        @backHome='backhome'
        @delete-article='deleteArticle'
        @send-page-with-id='changePageWithId'
        :tag-from-sibling='gotTagArticle'
        @fetch-data='deleteArticle'
        @send-to-read-page='changePageWithId'
      />
    </div>
  </div>
  
  <!-- Create Page -->

  <div id="create" v-if='page == "makeArticle" && !isloader'>
    <CreateArticle
      @change-page='gotPageFromChild'
      @change-send='changeAndUpdate'
      />
  </div>

  <div id="readPage" v-else-if='page == "readPage" && !isloader'>
    <ReadPage
      :get-id='gotIdArticle'
      @change-page='gotPageFromChild'
      @search-tag='findTag'
      />
  </div>

  <!-- Home Page without Login -->

  <div id='homee' v-else-if='page == "home" && !isloader'>
    <Home 
      @change-page='gotPageFromChild'
      />
  </div>

  <!-- Signin Page -->

  <div id='signin' v-else-if='page == "signin" && !isloader'>
    <SignIn 
      @change-page='gotPageFromChild'
      @success-signin='statusLogin'
      />
  </div>

  <!-- Signup Page -->

  <div id="signup" v-else-if='page == "signup" && !isloader'>
    <SignUp
      @change-login='statusLogin'
      @change-page='gotPageFromChild'
      />
  </div>
  
  <!-- Reset Password -->

  <div id="reset" v-else-if='page == "reset" && !isloader'>
    <Reset
      @change-page='gotPageFromChild'
      />
  </div>


</div>
</template>

<script>
import CreateArticle from './Views/CreateArticle'
import DashBoard from './Views/DashBoard'
import Home from './Views/Home'
import SignIn from './Views/SignIn'
import SignUp from './Views/SignUp'
import Reset from './Views/Reset'
import ReadPage from './Views/ReadPage'
import swal from 'sweetalert2'
import axios from 'axios'

import io from 'socket.io-client'



export default {
  data () {
    return {
      baseUrl: 'http://wpserver.dreamcarofficial.com',
      page: '',
      isLogin: false,
      user: null,
      isloader: false,
      article: null,
      notification: 0,

      socket: io.connect('http://wpserver.dreamcarofficial.com'),
      pageDash: null,

      gotIdArticle: null,
      gotTagArticle: null
    }
  },
  components: {
    Home,
    SignIn,
    DashBoard,
    SignUp,
    Reset,
    CreateArticle,
    ReadPage
  },
  methods: {
    findTag (name) {
      this.gotTagArticle = name;
      this.page = 'mainPage'
    },
    changePageWithId (id) {
      this.page = 'readPage'
      this.gotIdArticle = id
    },
    changeAndUpdate (article) {
      console.log('ini dari app')
      console.log(article)
      this.articleLogin()
        .then(() => {
          this.$awn.success('test')
        })
        .catch(err => {
          this.$awn.warning('warewaf')
        })
      console.log(this.article)
      this.page = 'mainPage'
    },
    isLoading(status) {
      this.isloader = status
    },
    backhome () {
      this.page = 'home';
      this.user = null;
      this.notification = 0;
      this.article = null;
    },
    gotPageFromChild (name) {
      this.page = name
    },
    statusLogin() {
      this.isLogin = true;
      setTimeout(() => {
        this.profileLogin()
          .then(data => {
            return this.articleLogin()
          })
          .then(() => {
            this.getNotification()
            this.$awn.info(`You have ${this.notification} Notification`)
            this.page = 'mainPage'
          })
          .catch(err => {
            swal.fire({
              type: 'warning',
              title: err.msg
            })
          })
      }, 1000);
    },
    profileLogin () {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: `${this.baseUrl}/users/find/login`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            this.user = data
            resolve(data)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    articleLogin () {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: `${this.baseUrl}/articles`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            this.article = data
            resolve(data)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    getNotification () {
      this.notification += this.user.RequestIn.length
    },
    deleteArticle () {
      this.articleLogin()
        .then(data => {
          this.article = data;
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  created () {
    if(localStorage.getItem('token')) {
      this.page = 'mainPage';
      this.profileLogin()
        .then(data => {
          return this.articleLogin()
        })
        .then(data => {
          setTimeout(() => {
            this.getNotification()
            this.$awn.info(`You have ${this.notification} Notification`)            
          }, 4000);
        })
        .catch(err => {
          swal.fire({
            type: 'warning',
            title: err.msg
          })
        })
    } else {
      this.page = 'home'
    }

  }
}
</script>

<style scoped>

#homee{
  background-color:#0087BE;
  height: 100vh;
}

</style>